const Project = require('../models/Project');
const Challenge = require('../models/Challenge');
const Milestone = require('../models/Milestone');
const Proposal = require('../models/Proposal');

const VALID_TRANSITIONS = {
  planning: ['in_progress', 'on_hold', 'cancelled'],
  in_progress: ['prototype', 'on_hold', 'cancelled'],
  prototype: ['testing', 'on_hold', 'cancelled'],
  testing: ['pilot', 'on_hold', 'cancelled'],
  pilot: ['deployed', 'on_hold', 'cancelled'],
  deployed: ['completed', 'on_hold', 'cancelled'],
  on_hold: ['planning', 'in_progress', 'prototype', 'testing', 'pilot', 'deployed', 'cancelled'],
  completed: [],
  cancelled: []
};

const validateProjectTransition = (currentStatus, newStatus) => {
  const current = String(currentStatus || 'planning').toLowerCase();
  const target = String(newStatus || '').toLowerCase();

  if (current === target) {
    return { valid: true };
  }

  const allowedNext = VALID_TRANSITIONS[current] || [];
  if (!allowedNext.includes(target)) {
    return {
      valid: false,
      message: `Invalid project status transition from '${current}' to '${target}'. Allowed transitions: [${allowedNext.join(', ')}]`
    };
  }

  return { valid: true };
};

const calculateProjectProgress = async (projectId) => {
  const milestones = await Milestone.find({ project: projectId });
  if (!milestones || milestones.length === 0) {
    return 0;
  }

  const totalProgress = milestones.reduce((sum, m) => {
    const val = m.completionPercentage !== undefined ? m.completionPercentage : (m.progress || 0);
    return sum + Number(val);
  }, 0);

  return Math.min(100, Math.max(0, Math.round(totalProgress / milestones.length)));
};

const createProject = async (data) => {
  const project = await Project.create(data);

  if (project.challenge) {
    await Challenge.findByIdAndUpdate(project.challenge, {
      project: project._id,
      status: 'in_progress'
    });
  }

  return project;
};

const getProjects = async (filter = {}) => {
  const projects = await Project.find(filter)
    .populate('challenge', 'title category status location')
    .populate('university', 'name district')
    .populate('industry', 'name type')
    .populate('team')
    .populate('facultyMentor', 'name email role')
    .sort({ createdAt: -1 });

  return projects;
};

const getProjectById = async (id) => {
  const project = await Project.findById(id)
    .populate('challenge')
    .populate('university')
    .populate('industry')
    .populate('team')
    .populate('facultyMentor', 'name email role');

  if (!project) {
    return null;
  }

  const progress = await calculateProjectProgress(project._id);
  const projectObj = project.toObject();
  projectObj.progressPercentage = progress;

  return projectObj;
};

const updateProject = async (id, data, currentProject = null) => {
  const project = currentProject || (await Project.findById(id));
  if (!project) {
    throw new Error('Project not found');
  }

  if (data.status && data.status !== project.status) {
    const transitionCheck = validateProjectTransition(project.status, data.status);
    if (!transitionCheck.valid) {
      throw new Error(transitionCheck.message);
    }
  }

  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined) {
      project[key] = data[key];
    }
  });

  await project.save();

  if (data.status && project.challenge) {
    const challengeStatus = String(data.status).toLowerCase();
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

  return project;
};

const deleteProject = async (id) => {
  return Project.findByIdAndDelete(id);
};

const createProjectFromProposal = async (proposalId, createdByUserId) => {
  const proposal = await Proposal.findById(proposalId).populate('challenge');
  if (!proposal) {
    throw new Error('Proposal not found');
  }

  if (proposal.project) {
    const existingProject = await Project.findById(proposal.project);
    if (existingProject) {
      return { project: existingProject, alreadyExisted: true };
    }
  }

  const project = await Project.create({
    title: proposal.title,
    description: proposal.proposedSolution || proposal.problemStatement,
    challenge: proposal.challenge._id,
    university: proposal.university,
    createdBy: createdByUserId,
    status: 'planning',
    budget: {
      estimated: proposal.estimatedBudget || 0,
      allocated: proposal.estimatedBudget || 0,
      spent: 0
    },
    technologies: proposal.technologies || []
  });

  proposal.project = project._id;
  proposal.status = 'approved';
  proposal.reviewedBy = createdByUserId;
  proposal.reviewedAt = new Date();
  await proposal.save();

  await Challenge.findByIdAndUpdate(proposal.challenge._id, {
    status: 'assigned',
    assignedUniversity: proposal.university,
    project: project._id
  });

  return { project, alreadyExisted: false };
};

const associateTeam = async (projectId, teamId) => {
  return Project.findByIdAndUpdate(
    projectId,
    { team: teamId },
    { new: true, runValidators: true }
  );
};

const associateUniversity = async (projectId, universityId) => {
  return Project.findByIdAndUpdate(
    projectId,
    { university: universityId },
    { new: true, runValidators: true }
  );
};

const associateIndustry = async (projectId, industryId) => {
  return Project.findByIdAndUpdate(
    projectId,
    { industry: industryId },
    { new: true, runValidators: true }
  );
};

module.exports = {
  validateProjectTransition,
  calculateProjectProgress,
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  createProjectFromProposal,
  associateTeam,
  associateUniversity,
  associateIndustry
};
