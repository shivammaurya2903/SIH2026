const mongoose = require('mongoose');

const impactMetricSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    beneficiaries: {
      type: Number,
      default: 0
    },
    districtsImpacted: {
      type: Number,
      default: 0
    },
    villagesImpacted: {
      type: Number,
      default: 0
    },
    costSaved: {
      type: Number,
      default: 0
    },
    timeSaved: {
      type: Number,
      default: 0
    },
    citizenSatisfaction: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    environmentalImpact: String,
    scalabilityScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    sustainabilityScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    impactScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    patents: {
      type: Number,
      default: 0
    },
    startupsCreated: {
      type: Number,
      default: 0
    },
    jobsCreated: {
      type: Number,
      default: 0
    },
    measuredAt: {
      type: Date,
      default: Date.now
    },
    remarks: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ImpactMetric', impactMetricSchema);