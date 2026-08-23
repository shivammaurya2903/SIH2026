const Proposal = require('../models/Proposal');
const Challenge = require('../models/Challenge');
const Project = require('../models/Project');
const University = require('../models/University');
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
      'durationInMonths',
      'documents'
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

    const proposal = await Proposal.create(payload);

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

    const proposal = await Proposal.findById(req.params.id).populate('challenge');
    if (!proposal) {
      return errorResponse(res, 'Proposal not found', 404);
    }

    proposal.status = 'approved';
    proposal.reviewedBy = req.user._id;
    proposal.reviewedAt = new Date();
    proposal.reviewComment = req.body.reviewComment || proposal.reviewComment || '';

    let project = await Project.findOne({ challenge: proposal.challenge._id });
    if (!project) {
      project = await Project.create({
        title: proposal.title,
        description: proposal.proposedSolution || proposal.problemStatement,
        challenge: proposal.challenge._id,
        university: proposal.university,
        createdBy: req.user._id,
        status: 'planning',
        budget: {
          estimated: proposal.estimatedBudget || 0,
          allocated: proposal.estimatedBudget || 0,
          spent: 0
        },
        technologies: proposal.technologies || []
      });
    }

    proposal.project = project._id;
    await proposal.save();

    await Challenge.findByIdAndUpdate(proposal.challenge._id, {
      status: 'assigned',
      assignedUniversity: proposal.university,
      project: project._id
    });

    return successResponse(
      res,
      { proposal, project },
      'Proposal approved and linked to project successfully',
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