const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: String,
    assignedMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    startDate: Date,
    dueDate: Date,
    completedAt: Date,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'blocked', 'delayed'],
      default: 'pending'
    },
    completionPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    deliverables: [
      {
        name: String,
        url: String,
        type: String
      }
    ],
    documents: [
      {
        name: String,
        url: String,
        type: String
      }
    ],
    remarks: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Milestone', milestoneSchema);