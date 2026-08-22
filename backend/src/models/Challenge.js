const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema(
  {
    challengeId: {
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
    category: {
      type: String,
      required: true,
      enum: [
        'education',
        'healthcare',
        'agriculture',
        'water',
        'sanitation',
        'environment',
        'energy',
        'urban_development',
        'accessibility',
        'public_administration',
        'rural_livelihoods',
        'infrastructure',
        'other'
      ]
    },
    subCategory: {
      type: String,
      trim: true
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    location: {
      district: {
        type: String,
        required: true
      },
      block: String,
      village: String,
      address: String,
      latitude: Number,
      longitude: Number
    },
    attachments: [
      {
        name: String,
        url: String,
        type: String,
        size: Number
      }
    ],
    status: {
      type: String,
      enum: [
        'draft',
        'submitted',
        'ai_analyzed',
        'under_review',
        'approved',
        'rejected',
        'duplicate',
        'matched',
        'assigned',
        'in_progress',
        'prototype',
        'testing',
        'pilot',
        'deployed',
        'completed',
        'on_hold',
        'cancelled'
      ],
      default: 'submitted'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    aiAnalysis: {
      category: String,
      keywords: [String],
      requiredSkills: [String],
      priorityScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
      },
      confidence: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
      },
      summary: String,
      analyzedAt: Date
    },
    duplicateInfo: {
      isDuplicate: {
        type: Boolean,
        default: false
      },
      relatedChallenges: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Challenge'
        }
      ],
      similarityScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
      }
    },
    matchedUniversities: [
      {
        university: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'University'
        },
        matchScore: Number
      }
    ],
    matchedIndustries: [
      {
        industry: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Industry'
        },
        matchScore: Number
      }
    ],
    assignedUniversity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University'
    },
    assignedIndustry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Industry'
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    expectedOutcome: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

challengeSchema.pre('save', async function (next) {
  if (!this.challengeId) {
    const count = await mongoose.model('Challenge').countDocuments();
    this.challengeId = `CH-${String(count + 1).padStart(5, '0')}`;
  }

  next();
});

challengeSchema.index({
  title: 'text',
  description: 'text',
  category: 'text'
});

challengeSchema.index({
  'location.district': 1
});

module.exports = mongoose.model('Challenge', challengeSchema);