const Project = require('../models/Project');
const University = require('../models/University');
const Industry = require('../models/Industry');
const projectService = require('../services/project.service');
const { createNotification, safeNotify } = require('../services/notification.service');
const { extractUploadedFiles } = require('../services/file.service');
const { successResponse, errorResponse } = require('../utils/response');

const ALLOWED_PROJECT_FIELDS = [
  'title',
  'description',
  'challenge',
  'university',
  'industry',
  'team',
  'facultyMentor',
  'status',
  'stage',
  'objectives',
  'technologies',
  'startDate',
  'expectedEndDate',
  'actualEndDate',
  'budget',
  'documents',
  'innovation',
  'testingDetails',
  'pilotDetails',
  'deploymentDetails'
];

const canUserAccessProject = async (project, user) => {
  if (['government', 'admin'].includes(user.role)) return true;

  const userIdStr = String(user._id || user.id);
  if (project.createdBy && String(project.createdBy) === userIdStr) return true;
  if (project.facultyMentor && String(project.facultyMentor) === userIdStr) return true;
  if (['university', 'faculty', 'industry'].includes(user.role)) return true;

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

const createProject = async (req, res) => {
  try {
    const payload = {
      createdBy: req.user._id
    };

    ALLOWED_PROJECT_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) {
        payload[field] = req.body[field];
      }
    });

    const fileDocs = extractUploadedFiles(req, 'documents', req.body.documents);
    if (fileDocs.length > 0) {
      payload.documents = fileDocs;
    }

    const project = await projectService.createProject(payload);

    return successResponse(res, project, 'Project created successfully', 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getProjects = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.university) filter.university = req.query.university;
    if (req.query.industry) filter.industry = req.query.industry;
    if (req.query.challenge) filter.challenge = req.query.challenge;

    const projects = await projectService.getProjects(filter);

    return successResponse(res, projects, 'Projects retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getProject = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);

    if (!project) {
      return errorResponse(res, 'Project not found', 404);
    }

    return successResponse(res, project, 'Project details retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const updateProject = async (req, res) => {
  try {
    const rawProject = await Project.findById(req.params.id);

    if (!rawProject) {
      return errorResponse(res, 'Project not found', 404);
    }

    const isAuthorized = await canUserAccessProject(rawProject, req.user);
    if (!isAuthorized) {
      return errorResponse(res, 'Forbidden: You are not authorized to update this project', 403);
    }

    const updatableFields = [
      'title',
      'description',
      'university',
      'industry',
      'team',
      'facultyMentor',
      'status',
      'stage',
      'objectives',
      'technologies',
      'startDate',
      'expectedEndDate',
      'actualEndDate',
      'budget',
      'documents',
      'innovation',
      'testingDetails',
      'pilotDetails',
      'deploymentDetails'
    ];

    const updates = {};
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (req.body.stage && !updates.status) {
      const stageLower = String(req.body.stage).toLowerCase();
      if (['in_progress', 'testing', 'deployed', 'completed', 'planning', 'prototype', 'pilot'].includes(stageLower)) {
        updates.status = stageLower;
      } else {
        updates.status = req.body.stage;
      }
    }

    const fileDocs = extractUploadedFiles(req, 'documents', req.body.documents);
    if (fileDocs.length > 0) {
      updates.documents = [...(rawProject.documents || []), ...fileDocs];
    }

    const oldStatus = rawProject.status;
    const updatedProject = await projectService.updateProject(req.params.id, updates, rawProject);

    await safeNotify(async () => {
      if (updates.status && updates.status !== oldStatus && updatedProject.createdBy) {
        await createNotification({
          recipient: updatedProject.createdBy,
          sender: req.user._id,
          type: 'project_status_changed',
          title: 'Project Lifecycle Update',
          message: `Project "${updatedProject.title}" status changed from ${oldStatus} to ${updatedProject.status.toUpperCase()}.`,
          relatedId: updatedProject._id
        });
      }
    });

    return successResponse(res, updatedProject, 'Project updated successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, error.message.includes('Invalid project status') ? 400 : 500);
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return errorResponse(res, 'Project not found', 404);
    }

    if (
      !['government', 'admin'].includes(req.user.role) &&
      (!project.createdBy || project.createdBy.toString() !== req.user._id.toString())
    ) {
      return errorResponse(res, 'Forbidden: You are not authorized to delete this project', 403);
    }

    await projectService.deleteProject(req.params.id);

    return successResponse(res, null, 'Project deleted successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
};