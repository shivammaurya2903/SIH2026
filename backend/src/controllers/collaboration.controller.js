const Collaboration = require('../models/Collaboration');
const Project = require('../models/Project');
const Challenge = require('../models/Challenge');
const { successResponse, errorResponse } = require('../utils/response');

const createCollaboration = async (req, res) => {
  try {
    const collaboration = await Collaboration.create({
      ...req.body,
      requestedBy: req.user._id
    });

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
    const collaboration = await Collaboration.findByIdAndUpdate(
      req.params.id,
      {
        status: 'rejected',
        respondedBy: req.user._id,
        respondedAt: new Date()
      },
      { new: true }
    );

    if (!collaboration) {
      return errorResponse(res, 'Collaboration request not found', 404);
    }

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