const Proposal = require('../models/Proposal');
const Challenge = require('../models/Challenge');
const Project = require('../models/Project');
const University = require('../models/University');
const User = require('../models/User');
const projectService = require('../services/project.service');
const { createNotification, createBulkNotifications, safeNotify } = require('../services/notification.service');
const { extractUploadedFiles } = require('../services/file.service');
const { successResponse, errorResponse } = require('../utils/response');

const createProposal = async (req, res) => {
  try {
    const { challenge: challengeId, university: universityId } = req.body;

    if (!challengeId) {
      return errorResponse(res, 'Challenge ID is required', 400);
    }

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return errorResponse(res, 'Target challenge not found', 404);
    }

    let targetUniId = universityId;
    if (!targetUniId && req.user) {
      const uniDoc = await University.findOne({
        $or: [
          { name: req.user.organization },
          { email: req.user.email }
        ]
      });
      if (uniDoc) {
        targetUniId = uniDoc._id;
      }
    }

    const allowedFields = [
      'challenge',
      'university',
      'title',
      'problemStatement',
      'proposedSolution',
      'methodology',
      'expectedImpact',
      'requiredResources',
      'technologies',
      'estimatedBudget',
      'durationInMonths'
    ];

    const payload = {
      challenge: challengeId,
      university: targetUniId || req.body.university,
      submittedBy: req.user._id,
      status: 'submitted'
    };

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        payload[field] = req.body[field];
      }
    });

    const fileDocs = extractUploadedFiles(req, 'documents', req.body.documents);
    if (fileDocs.length > 0) {
      payload.documents = fileDocs;
    }

    const proposal = await Proposal.create(payload);

    await safeNotify(async () => {
      const govUsers = await User.find({ role: { $in: ['government', 'admin'] } }).select('_id');
      const govUserIds = govUsers.map((u) => u._id);
      await createBulkNotifications({
        recipients: govUserIds,
        sender: req.user._id,
        type: 'proposal_submitted',
        title: 'New Solution Proposal Submitted',
        message: `Proposal "${proposal.title}" was submitted for challenge "${challenge.title}".`,
        relatedId: proposal._id
      });
    });

    return successResponse(res, proposal, 'Proposal submitted successfully', 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getProposals = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.challenge) filter.challenge = req.query.challenge;
    if (req.query.university) filter.university = req.query.university;

    const proposals = await Proposal.find(filter)
      .populate('challenge', 'title category status')
      .populate('university', 'name district')
      .populate('submittedBy', 'name email role')
      .populate('project', 'title status')
      .sort({ createdAt: -1 });

    return successResponse(res, proposals, 'Proposals retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id)
      .populate('challenge')
      .populate('university')
      .populate('submittedBy', 'name email role')
      .populate('reviewedBy', 'name email')
      .populate('project');

    if (!proposal) {
      return errorResponse(res, 'Proposal not found', 404);
    }

    return successResponse(res, proposal, 'Proposal details retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const approveProposal = async (req, res) => {
  try {
    if (!['government', 'admin'].includes(req.user.role)) {
      return errorResponse(res, 'Only government or admin can approve proposals', 403);
    }

    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return errorResponse(res, 'Proposal not found', 404);
    }

    const { project, alreadyExisted } = await projectService.createProjectFromProposal(
      proposal._id,
      req.user._id
    );

    if (req.body && req.body.reviewComment) {
      proposal.reviewComment = req.body.reviewComment;
      await proposal.save();
    }

    await safeNotify(async () => {
      if (proposal.submittedBy) {
        await createNotification({
          recipient: proposal.submittedBy,
          sender: req.user._id,
          type: 'proposal_approved',
          title: 'Proposal Approved',
          message: `Your proposal "${proposal.title}" has been approved! Project "${project.title}" has been initialized.`,
          relatedId: project._id
        });
      }
    });

    return successResponse(
      res,
      { proposal, project, alreadyExisted },
      alreadyExisted
        ? 'Proposal approved. Linked to pre-existing project.'
        : 'Proposal approved and project created successfully',
      200
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const rejectProposal = async (req, res) => {
  try {
    if (!['government', 'admin'].includes(req.user.role)) {
      return errorResponse(res, 'Only government or admin can reject proposals', 403);
    }

    const proposal = await Proposal.findByIdAndUpdate(
      req.params.id,
      {
        status: 'rejected',
        reviewedBy: req.user._id,
        reviewedAt: new Date(),
        reviewComment: req.body.reviewComment || ''
      },
      { returnDocument: 'after' }
    );

    if (!proposal) {
      return errorResponse(res, 'Proposal not found', 404);
    }

    await safeNotify(async () => {
      if (proposal.submittedBy) {
        await createNotification({
          recipient: proposal.submittedBy,
          sender: req.user._id,
          type: 'proposal_rejected',
          title: 'Proposal Review Update',
          message: `Your proposal "${proposal.title}" was reviewed. Status: Rejected.`,
          relatedId: proposal._id
        });
      }
    });

    return successResponse(res, proposal, 'Proposal rejected successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  createProposal,
  getProposals,
  getProposal,
  approveProposal,
  rejectProposal
};