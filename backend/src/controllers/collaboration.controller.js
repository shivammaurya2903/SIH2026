const Collaboration = require('../models/Collaboration');
const Project = require('../models/Project');
const Challenge = require('../models/Challenge');
const University = require('../models/University');
const Industry = require('../models/Industry');
const { successResponse, errorResponse } = require('../utils/response');

const canRespondToCollaboration = async (collaboration, user) => {
  if (['government', 'admin'].includes(user.role)) return true;

  if (collaboration.requestedBy.toString() === user._id.toString()) return false;

  if (collaboration.university) {
    const uni = await University.findById(collaboration.university);
    if (
      uni &&
      ((uni.email && uni.email.toLowerCase() === user.email.toLowerCase()) ||
        (uni.contactPerson && uni.contactPerson.email && uni.contactPerson.email.toLowerCase() === user.email.toLowerCase()) ||
        (user.organization && uni.name.toLowerCase() === user.organization.toLowerCase()))
    ) {
      return true;
    }
  }

  if (collaboration.industry) {
    const ind = await Industry.findById(collaboration.industry);
    if (
      ind &&
      ((ind.email && ind.email.toLowerCase() === user.email.toLowerCase()) ||
        (ind.contactPerson && ind.contactPerson.email && ind.contactPerson.email.toLowerCase() === user.email.toLowerCase()) ||
        (user.organization && ind.name.toLowerCase() === user.organization.toLowerCase()))
    ) {
      return true;
    }
  }

  if (collaboration.project) {
    const project = await Project.findById(collaboration.project);
    if (
      project &&
      (project.createdBy.toString() === user._id.toString() ||
        (project.facultyMentor && project.facultyMentor.toString() === user._id.toString()))
    ) {
      return true;
    }
  }

  return false;
};

const createCollaboration = async (req, res) => {
  try {
    const allowedFields = [
      'project',
      'challenge',
      'university',
      'industry',
      'type',
      'message',
      'proposedContribution'
    ];

    const payload = {
      requestedBy: req.user._id,
      status: 'pending'
    };

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        payload[field] = req.body[field];
      }
    });

    const collaboration = await Collaboration.create(payload);

    return successResponse(
      res,
      collaboration,
      'Collaboration request created successfully',
      201
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getCollaborations = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.project) filter.project = req.query.project;
    if (req.query.industry) filter.industry = req.query.industry;
    if (req.query.university) filter.university = req.query.university;

    const collaborations = await Collaboration.find(filter)
      .populate('project', 'title status')
      .populate('challenge', 'title category')
      .populate('university', 'name')
      .populate('industry', 'name type')
      .populate('requestedBy', 'name email role')
      .populate('respondedBy', 'name email role')
      .sort({ createdAt: -1 });

    return successResponse(res, collaborations, 'Collaborations retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const acceptCollaboration = async (req, res) => {
  try {
    const collaboration = await Collaboration.findById(req.params.id);

    if (!collaboration) {
      return errorResponse(res, 'Collaboration request not found', 404);
    }

    const isAuthorized = await canRespondToCollaboration(collaboration, req.user);
    if (!isAuthorized) {
      return errorResponse(res, 'Forbidden: You are not authorized to accept this collaboration request', 403);
    }

    collaboration.status = 'accepted';
    collaboration.respondedBy = req.user._id;
    collaboration.respondedAt = new Date();
    await collaboration.save();

    if (collaboration.project && collaboration.industry) {
      await Project.findByIdAndUpdate(collaboration.project, {
        industry: collaboration.industry
      });
    }

    if (collaboration.challenge && collaboration.industry) {
      await Challenge.findByIdAndUpdate(collaboration.challenge, {
        assignedIndustry: collaboration.industry
      });
    }

    return successResponse(res, collaboration, 'Collaboration request accepted', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const rejectCollaboration = async (req, res) => {
  try {
    const collaboration = await Collaboration.findById(req.params.id);

    if (!collaboration) {
      return errorResponse(res, 'Collaboration request not found', 404);
    }

    const isAuthorized = await canRespondToCollaboration(collaboration, req.user);
    if (!isAuthorized) {
      return errorResponse(res, 'Forbidden: You are not authorized to reject this collaboration request', 403);
    }

    collaboration.status = 'rejected';
    collaboration.respondedBy = req.user._id;
    collaboration.respondedAt = new Date();
    await collaboration.save();

    return successResponse(res, collaboration, 'Collaboration request rejected', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  createCollaboration,
  getCollaborations,
  acceptCollaboration,
  rejectCollaboration
};