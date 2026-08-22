const Challenge = require('../models/Challenge');
const University = require('../models/University');
const Industry = require('../models/Industry');
const { analyzeChallenge: runAIAnalysis, detectDuplicates } = require('../services/ai.service');
const { matchUniversities, matchIndustries } = require('../services/matching.service');
const { successResponse, errorResponse } = require('../utils/response');

const createChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.create({
      ...req.body,
      submittedBy: req.user._id,
      status: 'submitted'
    });

    return successResponse(res, challenge, 'Challenge submitted successfully', 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
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
      'attachments',
      'expectedOutcome'
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        challenge[field] = req.body[field];
      }
    });

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
      { new: true }
    );

    if (!challenge) {
      return errorResponse(res, 'Challenge not found', 404);
    }

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
      { new: true }
    );

    if (!challenge) {
      return errorResponse(res, 'Challenge not found', 404);
    }

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

module.exports = {
  createChallenge,
  getChallenges,
  getChallenge,
  updateChallenge,
  deleteChallenge,
  analyzeChallenge,
  approveChallenge,
  rejectChallenge,
  getMatches
};