const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: [
        'industry',
        'startup',
        'msme',
        'csr',
        'csr_org',
        'research_lab',
        'innovation_hub'
      ],
      default: 'industry'
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    phone: String,
    website: String,
    address: String,
    district: String,
    state: {
      type: String,
      default: 'Jharkhand'
    },
    domains: [String],
    expertise: [String],
    technologies: [String],
    csrInterests: [String],
    fundingCapabilities: [String],
    mentorshipCapabilities: [String],
    prototypingCapabilities: [String],
    deploymentCapabilities: [String],
    contactPerson: {
      name: String,
      email: String,
      phone: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

industrySchema.index({
  name: 'text',
  domains: 'text',
  expertise: 'text',
  technologies: 'text'
});

module.exports = mongoose.model('Industry', industrySchema);