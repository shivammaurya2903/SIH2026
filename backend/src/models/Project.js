const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      unique: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
      required: true
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University'
    },
    industry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Industry'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },
    facultyMentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: [
        'planning',
        'in_progress',
        'prototype',
        'testing',
        'pilot',
        'deployed',
        'completed',
        'on_hold',
        'cancelled'
      ],
      default: 'planning'
    },
    objectives: [String],
    technologies: [String],
    startDate: Date,
    expectedEndDate: Date,
    actualEndDate: Date,
    budget: {
      estimated: {
        type: Number,
        default: 0
      },
      allocated: {
        type: Number,
        default: 0
      },
      spent: {
        type: Number,
        default: 0
      }
    },
    documents: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },
    innovation: {
      patentStatus: {
        type: String,
        enum: ['not_filed', 'filed', 'granted'],
        default: 'not_filed'
      },
      publicationStatus: {
        type: String,
        enum: ['not_submitted', 'submitted', 'published'],
        default: 'not_submitted'
      },
      technologyTransferStatus: {
        type: String,
        enum: ['not_started', 'under_review', 'completed'],
        default: 'not_started'
      },
      ipAgreementStatus: {
        type: String,
        enum: ['draft', 'under_review', 'approved'],
        default: 'draft'
      },
      startupCreated: {
        type: Boolean,
        default: false
      },
      innovationOutcome: {
        type: String,
        default: ''
      }
    },
    testingDetails: {
      status: {
        type: String,
        enum: ['pending', 'in_progress', 'passed', 'failed'],
        default: 'pending'
      },
      summary: { type: String, default: '' },
      testDate: Date,
      result: { type: String, default: '' }
    },
    pilotDetails: {
      status: {
        type: String,
        enum: ['planned', 'active', 'completed', 'cancelled'],
        default: 'planned'
      },
      location: { type: String, default: '' },
      startDate: Date,
      endDate: Date,
      outcome: { type: String, default: '' }
    },
    deploymentDetails: {
      status: {
        type: String,
        enum: ['planned', 'deployed', 'scaled'],
        default: 'planned'
      },
      deploymentDate: Date,
      location: { type: String, default: '' },
      notes: { type: String, default: '' }
    }
  },
  {
    timestamps: true
  }
);

projectSchema.pre('save', async function () {
  if (!this.projectId) {
    const count = await mongoose.model('Project').countDocuments();
    this.projectId = `PRJ-${String(count + 1).padStart(5, '0')}`;
  }
});

module.exports = mongoose.model('Project', projectSchema);