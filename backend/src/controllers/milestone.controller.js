const Milestone = require('../models/Milestone');
const Project = require('../models/Project');
const University = require('../models/University');
const Industry = require('../models/Industry');
const { successResponse, errorResponse } = require('../utils/response');

const ALLOWED_MILESTONE_STATUSES = ['pending', 'in_progress', 'completed', 'blocked', 'delayed'];

const canUserAccessProjectMilestones = async (project, user) => {
  if (['government', 'admin'].includes(user.role)) return true;

  if (project.createdBy && project.createdBy.toString() === user._id.toString()) return true;
  if (project.facultyMentor && project.facultyMentor.toString() === user._id.toString()) return true;

  if (user.role === 'university' && project.university) {
    const uni = await University.findById(project.university);
    if (
      uni &&
      ((uni.email && uni.email.toLowerCase() === user.email.toLowerCase()) ||
        (user.organization && uni.name.toLowerCase() === user.organization.toLowerCase()))
    ) {
      return true;
    }
  }

  if (user.role === 'industry' && project.industry) {
    const ind = await Industry.findById(project.industry);
    if (
      ind &&
      ((ind.email && ind.email.toLowerCase() === user.email.toLowerCase()) ||
        (user.organization && ind.name.toLowerCase() === user.organization.toLowerCase()))
    ) {
      return true;
    }
  }

  return false;
};

const createMilestone = async (req, res) => {
  try {
    const {
      project: projectId,
      title,
      description,
      dueDate,
      startDate,
      assignedMembers,
      assignedTo,
      deliverables,
      documents,
      completionPercentage,
      progress,
      status
    } = req.body;

    if (!title || !projectId) {
      return errorResponse(res, 'Milestone title and project ID are required', 400);
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return errorResponse(res, 'Target project not found', 404);
    }

    const isAuthorized = await canUserAccessProjectMilestones(project, req.user);
    if (!isAuthorized) {
      return errorResponse(res, 'Forbidden: You are not authorized to create milestones for this project', 403);
    }

    const initialPercentage =
      completionPercentage !== undefined ? Number(completionPercentage) : progress !== undefined ? Number(progress) : 0;

    if (isNaN(initialPercentage) || initialPercentage < 0 || initialPercentage > 100) {
      return errorResponse(res, 'Completion percentage must be a number between 0 and 100', 400);
    }

    let targetStatus = ALLOWED_MILESTONE_STATUSES.includes(status) ? status : 'pending';
    let completedAt = null;

    if (initialPercentage === 100 || targetStatus === 'completed') {
      targetStatus = 'completed';
      completedAt = new Date();
    }

    const milestone = await Milestone.create({
      project: projectId,
      title,
      description: description || '',
      dueDate,
      startDate,
      assignedMembers: assignedMembers || assignedTo || [],
      assignedTo: assignedTo || assignedMembers || [],
      deliverables: deliverables || [],
      documents: documents || [],
      completionPercentage: initialPercentage === 100 ? 100 : initialPercentage,
      progress: initialPercentage === 100 ? 100 : initialPercentage,
      status: targetStatus,
      completedAt,
      createdBy: req.user._id
    });

    return successResponse(res, milestone, 'Milestone created successfully', 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getMilestones = async (req, res) => {
  try {
    const filter = {};
    const targetProjectId = req.params.projectId || req.query.project;

    if (targetProjectId) {
      filter.project = targetProjectId;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const milestones = await Milestone.find(filter)
      .populate('project', 'title status')
      .populate('assignedMembers', 'name email role')
      .populate('createdBy', 'name email role')
      .sort({ dueDate: 1, createdAt: -1 });

    return successResponse(res, milestones, 'Milestones retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getMilestoneById = async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id)
      .populate('project')
      .populate('assignedMembers', 'name email role')
      .populate('createdBy', 'name email role');

    if (!milestone) {
      return errorResponse(res, 'Milestone not found', 404);
    }

    return successResponse(res, milestone, 'Milestone details retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const updateMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id);
    if (!milestone) {
      return errorResponse(res, 'Milestone not found', 404);
    }

    const project = await Project.findById(milestone.project);
    if (!project) {
      return errorResponse(res, 'Associated project not found', 404);
    }

    const isAuthorized = await canUserAccessProjectMilestones(project, req.user);
    if (!isAuthorized) {
      return errorResponse(res, 'Forbidden: You are not authorized to update milestones for this project', 403);
    }

    if (req.body.project && req.body.project.toString() !== milestone.project.toString()) {
      return errorResponse(res, 'Forbidden: Reattaching milestone to another project is not allowed', 403);
    }

    const newPercentage =
      req.body.completionPercentage !== undefined
        ? Number(req.body.completionPercentage)
        : req.body.progress !== undefined
        ? Number(req.body.progress)
        : undefined;

    if (newPercentage !== undefined) {
      if (isNaN(newPercentage) || newPercentage < 0 || newPercentage > 100) {
        return errorResponse(res, 'Completion percentage must be a number between 0 and 100', 400);
      }
      milestone.completionPercentage = newPercentage;
      milestone.progress = newPercentage;
    }

    if (req.body.status && ALLOWED_MILESTONE_STATUSES.includes(req.body.status)) {
      milestone.status = req.body.status;
    }

    if (milestone.status === 'completed' || milestone.completionPercentage === 100) {
      milestone.status = 'completed';
      milestone.completionPercentage = 100;
      milestone.progress = 100;
      if (!milestone.completedAt) {
        milestone.completedAt = new Date();
      }
    }

    const updatableFields = [
      'title',
      'description',
      'dueDate',
      'startDate',
      'assignedMembers',
      'assignedTo',
      'deliverables',
      'documents',
      'remarks'
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        milestone[field] = req.body[field];
      }
    });

    await milestone.save();

    return successResponse(res, milestone, 'Milestone updated successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const updateMilestoneStatus = async (req, res) => {
  try {
    const { status, completionPercentage, remarks } = req.body;

    const milestone = await Milestone.findById(req.params.id);
    if (!milestone) {
      return errorResponse(res, 'Milestone not found', 404);
    }

    const project = await Project.findById(milestone.project);
    if (!project) {
      return errorResponse(res, 'Associated project not found', 404);
    }

    const isAuthorized = await canUserAccessProjectMilestones(project, req.user);
    if (!isAuthorized) {
      return errorResponse(res, 'Forbidden: You are not authorized to update status for this milestone', 403);
    }

    if (status && !ALLOWED_MILESTONE_STATUSES.includes(status)) {
      return errorResponse(res, `Invalid milestone status. Allowed: [${ALLOWED_MILESTONE_STATUSES.join(', ')}]`, 400);
    }

    if (status) {
      milestone.status = status;
    }

    if (completionPercentage !== undefined) {
      const perc = Number(completionPercentage);
      if (isNaN(perc) || perc < 0 || perc > 100) {
        return errorResponse(res, 'Completion percentage must be a number between 0 and 100', 400);
      }
      milestone.completionPercentage = perc;
      milestone.progress = perc;
    }

    if (milestone.status === 'completed' || milestone.completionPercentage === 100) {
      milestone.status = 'completed';
      milestone.completionPercentage = 100;
      milestone.progress = 100;
      if (!milestone.completedAt) {
        milestone.completedAt = new Date();
      }
    }

    if (remarks !== undefined) {
      milestone.remarks = remarks;
    }

    await milestone.save();

    return successResponse(res, milestone, 'Milestone status updated successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const deleteMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id);
    if (!milestone) {
      return errorResponse(res, 'Milestone not found', 404);
    }

    const project = await Project.findById(milestone.project);
    if (project) {
      const isAuthorized = await canUserAccessProjectMilestones(project, req.user);
      if (!isAuthorized) {
        return errorResponse(res, 'Forbidden: You are not authorized to delete milestones for this project', 403);
      }
    }

    await milestone.deleteOne();

    return successResponse(res, null, 'Milestone deleted successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  createMilestone,
  getMilestones,
  getMilestoneById,
  updateMilestone,
  updateMilestoneStatus,
  deleteMilestone
};
