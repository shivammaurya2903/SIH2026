const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema(
  {
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
      required: true
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
      required: true
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    problemStatement: {
      type: String,
      required: true
    },
    proposedSolution: {
      type: String,
      required: true
    },
    methodology: String,
    expectedImpact: String,
    requiredResources: [String],
    technologies: [String],
    estimatedBudget: {
      type: Number,
      default: 0
    },
    durationInMonths: {
      type: Number,
      default: 1
    },
    documents: [
      {
        name: String,
        url: String,
        type: String
      }
    ],
    status: {
      type: String,
      enum: ['submitted', 'under_review', 'approved', 'rejected'],
      default: 'submitted'
    },
    reviewComment: String,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Proposal', proposalSchema);