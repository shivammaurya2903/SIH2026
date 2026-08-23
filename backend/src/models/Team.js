const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University'
    },
    facultyMentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    industryMentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'disbanded'],
      default: 'active'
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        role: {
          type: String,
          enum: ['leader', 'student', 'faculty', 'researcher', 'industry_mentor'],
          default: 'student'
        },
        responsibilities: {
          type: String,
          trim: true
        },
        joinedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Team', teamSchema);