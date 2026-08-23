const Team = require('../models/Team');
const Project = require('../models/Project');
const User = require('../models/User');
const University = require('../models/University');
const Industry = require('../models/Industry');
const projectService = require('../services/project.service');
const { successResponse, errorResponse } = require('../utils/response');

const ALLOWED_MEMBER_ROLES = ['leader', 'student', 'faculty', 'researcher', 'industry_mentor'];

const canUserManageTeam = async (team, user) => {
  if (['government', 'admin'].includes(user.role)) return true;

  if (team.createdBy && team.createdBy.toString() === user._id.toString()) return true;
  if (team.facultyMentor && team.facultyMentor.toString() === user._id.toString()) return true;

  if (team.project) {
    const project = await Project.findById(team.project);
    if (project) {
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
    }
  }

  return false;
};

const createTeam = async (req, res) => {
  try {
    const { project: projectId, name, description, university, facultyMentor, industryMentor, members } = req.body;

    if (!name || !projectId) {
      return errorResponse(res, 'Team name and project ID are required', 400);
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return errorResponse(res, 'Associated project not found', 404);
    }

    const isAuthorized = await canUserManageTeam({ project: projectId, createdBy: req.user._id }, req.user);
    if (!isAuthorized) {
      return errorResponse(res, 'Forbidden: You are not authorized to create a team for this project', 403);
    }

    const sanitizedMembers = [];
    if (Array.isArray(members)) {
      members.forEach((m) => {
        if (m && m.user) {
          const role = ALLOWED_MEMBER_ROLES.includes(m.role) ? m.role : 'student';
          sanitizedMembers.push({
            user: m.user,
            role,
            responsibilities: m.responsibilities || '',
            joinedAt: new Date()
          });
        }
      });
    }

    const team = await Team.create({
      name,
      description: description || '',
      project: projectId,
      university: university || project.university,
      facultyMentor: facultyMentor || project.facultyMentor,
      industryMentor,
      createdBy: req.user._id,
      status: 'active',
      members: sanitizedMembers
    });

    await projectService.associateTeam(projectId, team._id);

    return successResponse(res, team, 'Team created and linked to project successfully', 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getTeams = async (req, res) => {
  try {
    const filter = {};
    if (req.query.project) filter.project = req.query.project;
    if (req.query.university) filter.university = req.query.university;
    if (req.query.status) filter.status = req.query.status;

    const teams = await Team.find(filter)
      .populate('project', 'title status')
      .populate('university', 'name district')
      .populate('facultyMentor', 'name email role')
      .populate('industryMentor', 'name email role')
      .populate('members.user', 'name email role organization')
      .sort({ createdAt: -1 });

    return successResponse(res, teams, 'Teams retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('project')
      .populate('university')
      .populate('facultyMentor', 'name email role')
      .populate('industryMentor', 'name email role')
      .populate('members.user', 'name email role organization');

    if (!team) {
      return errorResponse(res, 'Team not found', 404);
    }

    return successResponse(res, team, 'Team details retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const updateTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return errorResponse(res, 'Team not found', 404);
    }

    const isAuthorized = await canUserManageTeam(team, req.user);
    if (!isAuthorized) {
      return errorResponse(res, 'Forbidden: You are not authorized to update this team', 403);
    }

    const allowedFields = ['name', 'description', 'university', 'facultyMentor', 'industryMentor', 'status'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        team[field] = req.body[field];
      }
    });

    await team.save();

    return successResponse(res, team, 'Team updated successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const addMember = async (req, res) => {
  try {
    const { user: memberUserId, role, responsibilities } = req.body;
    if (!memberUserId) {
      return errorResponse(res, 'User ID is required for team member', 400);
    }

    const team = await Team.findById(req.params.id);
    if (!team) {
      return errorResponse(res, 'Team not found', 404);
    }

    const isAuthorized = await canUserManageTeam(team, req.user);
    if (!isAuthorized) {
      return errorResponse(res, 'Forbidden: You are not authorized to add members to this team', 403);
    }

    const targetUser = await User.findById(memberUserId);
    if (!targetUser) {
      return errorResponse(res, 'User to add not found', 404);
    }

    const alreadyMember = team.members.some((m) => m.user.toString() === memberUserId.toString());
    if (alreadyMember) {
      return errorResponse(res, 'User is already a member of this team', 409);
    }

    const targetRole = ALLOWED_MEMBER_ROLES.includes(role) ? role : 'student';

    team.members.push({
      user: memberUserId,
      role: targetRole,
      responsibilities: responsibilities || '',
      joinedAt: new Date()
    });

    await team.save();

    return successResponse(res, team, 'Team member added successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const removeMember = async (req, res) => {
  try {
    const { userId: memberUserId } = req.params;
    const team = await Team.findById(req.params.id);

    if (!team) {
      return errorResponse(res, 'Team not found', 404);
    }

    const isAuthorized = await canUserManageTeam(team, req.user);
    if (!isAuthorized) {
      return errorResponse(res, 'Forbidden: You are not authorized to remove members from this team', 403);
    }

    const initialLength = team.members.length;
    team.members = team.members.filter((m) => m.user.toString() !== memberUserId.toString());

    if (team.members.length === initialLength) {
      return errorResponse(res, 'Member not found in this team', 404);
    }

    await team.save();

    return successResponse(res, team, 'Team member removed successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const assignFacultyMentor = async (req, res) => {
  try {
    const { facultyMentor: facultyMentorId } = req.body;
    if (!facultyMentorId) {
      return errorResponse(res, 'Faculty Mentor User ID is required', 400);
    }

    const team = await Team.findById(req.params.id);
    if (!team) {
      return errorResponse(res, 'Team not found', 404);
    }

    const isAuthorized = await canUserManageTeam(team, req.user);
    if (!isAuthorized) {
      return errorResponse(res, 'Forbidden: You are not authorized to assign mentors to this team', 403);
    }

    const mentorUser = await User.findById(facultyMentorId);
    if (!mentorUser || !['faculty', 'admin', 'university'].includes(mentorUser.role)) {
      return errorResponse(res, 'Invalid faculty mentor user specified', 400);
    }

    team.facultyMentor = facultyMentorId;
    await team.save();

    if (team.project) {
      await Project.findByIdAndUpdate(team.project, { facultyMentor: facultyMentorId });
    }

    return successResponse(res, team, 'Faculty mentor assigned to team successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const assignIndustryMentor = async (req, res) => {
  try {
    const { industryMentor: industryMentorId } = req.body;
    if (!industryMentorId) {
      return errorResponse(res, 'Industry Mentor User ID is required', 400);
    }

    const team = await Team.findById(req.params.id);
    if (!team) {
      return errorResponse(res, 'Team not found', 404);
    }

    const isAuthorized = await canUserManageTeam(team, req.user);
    if (!isAuthorized) {
      return errorResponse(res, 'Forbidden: You are not authorized to assign mentors to this team', 403);
    }

    const mentorUser = await User.findById(industryMentorId);
    if (!mentorUser || !['industry', 'admin', 'faculty'].includes(mentorUser.role)) {
      return errorResponse(res, 'Invalid industry mentor user specified', 400);
    }

    team.industryMentor = industryMentorId;
    await team.save();

    return successResponse(res, team, 'Industry mentor assigned to team successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return errorResponse(res, 'Team not found', 404);
    }

    const isAuthorized = await canUserManageTeam(team, req.user);
    if (!isAuthorized) {
      return errorResponse(res, 'Forbidden: You are not authorized to delete this team', 403);
    }

    await team.deleteOne();

    return successResponse(res, null, 'Team deleted successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  addMember,
  removeMember,
  assignFacultyMentor,
  assignIndustryMentor,
  deleteTeam
};
