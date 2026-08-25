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
    attachments: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },
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
    },
    facedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    facedCount: {
      type: Number,
      default: 0
    },
    officialRemarks: [
      {
        by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        role: String,
        remark: String,
        createdAt: {
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

challengeSchema.pre('save', async function () {
  if (!this.challengeId) {
    const count = await mongoose.model('Challenge').countDocuments();
    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
    this.challengeId = `CH-${String(count + 1).padStart(4, '0')}-${uniqueSuffix}`;
  }
});

challengeSchema.index({
  title: 'text',
  description: 'text',
  category: 'text'
});

challengeSchema.index({
  'location.district': 1
});

if (mongoose.models.Challenge) {
  delete mongoose.models.Challenge;
}

module.exports = mongoose.model('Challenge', challengeSchema);