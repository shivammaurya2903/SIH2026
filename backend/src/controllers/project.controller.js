const Project = require('../models/Project');
const Challenge = require('../models/Challenge');
const University = require('../models/University');
const Industry = require('../models/Industry');
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
  'objectives',
  'technologies',
  'startDate',
  'expectedEndDate',
  'actualEndDate',
  'budget',
  'documents'
];

const canUserAccessProject = async (project, user) => {
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

    const project = await Project.create(payload);

    if (project.challenge) {
      await Challenge.findByIdAndUpdate(project.challenge, {
        project: project._id,
        status: 'in_progress'
      });
    }

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

    const projects = await Project.find(filter)
      .populate('challenge', 'title category status location')
      .populate('university', 'name district')
      .populate('industry', 'name type')
      .populate('team')
      .populate('facultyMentor', 'name email role')
      .sort({ createdAt: -1 });

    return successResponse(res, projects, 'Projects retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('challenge')
      .populate('university')
      .populate('industry')
      .populate('team')
      .populate('facultyMentor', 'name email role');

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
    const project = await Project.findById(req.params.id);

    if (!project) {
      return errorResponse(res, 'Project not found', 404);
    }

    const isAuthorized = await canUserAccessProject(project, req.user);
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
      'objectives',
      'technologies',
      'startDate',
      'expectedEndDate',
      'actualEndDate',
      'budget',
      'documents'
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        project[field] = req.body[field];
      }
    });

    await project.save();

    if (req.body.status && project.challenge) {
      const challengeStatus = String(req.body.status).toLowerCase();
      const validChallengeStatuses = [
        'in_progress',
        'prototype',
        'testing',
        'pilot',
        'deployed',
        'completed',
        'on_hold',
        'cancelled'
      ];
      if (validChallengeStatuses.includes(challengeStatus)) {
        await Challenge.findByIdAndUpdate(project.challenge, {
          status: challengeStatus
        });
      }
    }

    return successResponse(res, project, 'Project updated successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
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

    await project.deleteOne();

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