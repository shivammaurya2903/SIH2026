const Challenge = require('../models/Challenge');
const University = require('../models/University');
const Industry = require('../models/Industry');
const User = require('../models/User');
const { analyzeChallenge: runAIAnalysis, detectDuplicates } = require('../services/ai.service');
const { matchUniversities, matchIndustries } = require('../services/matching.service');
const { createNotification, createBulkNotifications, safeNotify } = require('../services/notification.service');
const { extractUploadedFiles, processAndUploadFiles, rollbackCloudinaryUploads } = require('../services/file.service');
const { successResponse, errorResponse } = require('../utils/response');

const createChallenge = async (req, res) => {
  let fileAttachments = [];
  try {
    const allowedFields = [
      'title',
      'description',
      'category',
      'subCategory',
      'location',
      'expectedOutcome'
    ];

    const payload = {
      submittedBy: req.user._id,
      status: 'submitted',
      priority: 'medium',
      severity: 'medium'
    };

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        payload[field] = req.body[field];
      }
    });

    if (typeof payload.location === 'string') {
      try {
        payload.location = JSON.parse(payload.location);
      } catch (e) {
        payload.location = { district: payload.location };
      }
    }

    if (!payload.location || !payload.location.district) {
      const districtVal = req.body.district || req.body['location[district]'] || 'Ranchi';
      payload.location = {
        district: districtVal,
        ...(typeof payload.location === 'object' ? payload.location : {})
      };
    }

    fileAttachments = await processAndUploadFiles(req, 'attachments');
    if (fileAttachments.length > 0) {
      payload.attachments = fileAttachments;
    }

    let challenge;
    try {
      challenge = await Challenge.create(payload);
    } catch (dbErr) {
      await rollbackCloudinaryUploads(fileAttachments);
      throw dbErr;
    }

    await safeNotify(async () => {
      const govUsers = await User.find({ role: { $in: ['government', 'admin'] } }).select('_id');
      const govUserIds = govUsers.map((u) => u._id);
      await createBulkNotifications({
        recipients: govUserIds,
        sender: req.user._id,
        type: 'challenge_submitted',
        title: 'New Societal Challenge Submitted',
        message: `Challenge "${challenge.title}" was submitted by ${req.user.name || 'a citizen'} for review.`,
        relatedId: challenge._id
      });
    });

    return successResponse(res, challenge, 'Challenge submitted successfully', 201);
  } catch (error) {
    const statusCode = error.name === 'ValidationError' || error.name === 'CastError' ? 400 : 500;
    return errorResponse(res, error.message, statusCode);
  }
};

const getChallenges = async (req, res) => {
  try {
    const { category, status, priority, district, page = 1, limit = 20, search } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (district) filter['location.district'] = district;

    if (search) {
      filter.$text = { $search: search };
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Math.min(100, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [challenges, total] = await Promise.all([
      Challenge.find(filter)
        .populate('submittedBy', 'name email role')
        .populate('assignedUniversity', 'name district')
        .populate('assignedIndustry', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Challenge.countDocuments(filter)
    ]);

    return successResponse(res, challenges, 'Challenges retrieved successfully', 200, {
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('submittedBy', 'name email role')
      .populate('assignedUniversity')
      .populate('assignedIndustry')
      .populate('project');

    if (!challenge) {
      return errorResponse(res, 'Challenge not found', 404);
    }

    return successResponse(res, challenge, 'Challenge details retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return errorResponse(res, 'Challenge not found', 404);
    }

    if (
      challenge.submittedBy.toString() !== req.user._id.toString() &&
      !['government', 'admin'].includes(req.user.role)
    ) {
      return errorResponse(res, 'You are not authorized to update this challenge', 403);
    }

    const allowedFields = [
      'title',
      'description',
      'category',
      'subCategory',
      'location',
      'expectedOutcome'
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        challenge[field] = req.body[field];
      }
    });

    const fileAttachments = await processAndUploadFiles(req, 'attachments');
    if (fileAttachments.length > 0) {
      challenge.attachments = [...(challenge.attachments || []), ...fileAttachments];
    }

    await challenge.save();

    return successResponse(res, challenge, 'Challenge updated successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return errorResponse(res, 'Challenge not found', 404);
    }

    if (
      challenge.submittedBy.toString() !== req.user._id.toString() &&
      !['government', 'admin'].includes(req.user.role)
    ) {
      return errorResponse(res, 'You are not authorized to delete this challenge', 403);
    }

    await challenge.deleteOne();

    return successResponse(res, null, 'Challenge deleted successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const analyzeChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return errorResponse(res, 'Challenge not found', 404);
    }

    const analysis = await runAIAnalysis(challenge);

    const existingChallenges = await Challenge.find({
      _id: { $ne: challenge._id }
    }).limit(100);

    const duplicateInfo = await detectDuplicates(challenge, existingChallenges);

    challenge.aiAnalysis = {
      ...analysis,
      analyzedAt: new Date()
    };
    challenge.duplicateInfo = duplicateInfo;

    if (analysis.priorityScore >= 80) {
      challenge.priority = 'critical';
    } else if (analysis.priorityScore >= 60) {
      challenge.priority = 'high';
    } else if (analysis.priorityScore >= 30) {
      challenge.priority = 'medium';
    } else {
      challenge.priority = 'low';
    }

    challenge.status = 'ai_analyzed';
    await challenge.save();

    return successResponse(res, challenge, 'Groq AI challenge analysis complete', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const approveChallenge = async (req, res) => {
  try {
    if (!['government', 'admin'].includes(req.user.role)) {
      return errorResponse(res, 'Only government or admin can approve challenges', 403);
    }

    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { returnDocument: 'after' }
    );

    if (!challenge) {
      return errorResponse(res, 'Challenge not found', 404);
    }

    await safeNotify(async () => {
      if (challenge.submittedBy) {
        await createNotification({
          recipient: challenge.submittedBy,
          sender: req.user._id,
          type: 'challenge_approved',
          title: 'Challenge Approved',
          message: `Your submitted challenge "${challenge.title}" has been approved by government officials.`,
          relatedId: challenge._id
        });
      }
    });

    return successResponse(res, challenge, 'Challenge approved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const rejectChallenge = async (req, res) => {
  try {
    if (!['government', 'admin'].includes(req.user.role)) {
      return errorResponse(res, 'Only government or admin can reject challenges', 403);
    }

    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { returnDocument: 'after' }
    );

    if (!challenge) {
      return errorResponse(res, 'Challenge not found', 404);
    }

    await safeNotify(async () => {
      if (challenge.submittedBy) {
        await createNotification({
          recipient: challenge.submittedBy,
          sender: req.user._id,
          type: 'challenge_rejected',
          title: 'Challenge Status Update',
          message: `Your submitted challenge "${challenge.title}" was reviewed. Status: Rejected.`,
          relatedId: challenge._id
        });
      }
    });

    return successResponse(res, challenge, 'Challenge rejected successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getMatches = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return errorResponse(res, 'Challenge not found', 404);
    }

    const [universities, industries] = await Promise.all([
      University.find({ isActive: true }),
      Industry.find({ isActive: true })
    ]);

    const [universityMatches, industryMatches] = await Promise.all([
      matchUniversities(challenge, universities),
      matchIndustries(challenge, industries)
    ]);

    challenge.matchedUniversities = universityMatches.map((item) => ({
      university: item.university,
      matchScore: item.matchScore
    }));

    challenge.matchedIndustries = industryMatches.map((item) => ({
      industry: item.industry,
      matchScore: item.matchScore
    }));

    challenge.status = 'matched';
    await challenge.save();

    return successResponse(
      res,
      {
        universities: universityMatches,
        industries: industryMatches
      },
      'University and Industry matches computed successfully',
      200
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getDuplicates = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return errorResponse(res, 'Challenge not found', 404);
    }

    const existingChallenges = await Challenge.find({
      _id: { $ne: challenge._id }
    }).limit(100);

    const duplicateInfo = await detectDuplicates(challenge, existingChallenges);

    const relatedList = await Challenge.find({
      _id: { $in: duplicateInfo.relatedChallenges }
    }).select('title category location status');

    const result = relatedList.map((item) => {
      return {
        _id: item._id,
        title: item.title,
        category: item.category,
        similarityScore: duplicateInfo.similarityScore
      };
    });

    return successResponse(res, result, 'Duplicates computed successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  createChallenge,
  getChallenges,
  getChallenge,
  updateChallenge,
  deleteChallenge,
  analyzeChallenge,
  approveChallenge,
  rejectChallenge,
  getMatches,
  getDuplicates
};