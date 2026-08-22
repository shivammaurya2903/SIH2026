const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge'
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University'
    },
    industry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Industry'
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: [
        'mentorship',
        'funding',
        'technology',
        'prototyping',
        'testing',
        'deployment',
        'co_development'
      ],
      required: true
    },
    message: String,
    proposedContribution: String,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'completed'],
      default: 'pending'
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Collaboration', collaborationSchema);