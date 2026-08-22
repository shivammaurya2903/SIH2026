const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      enum: ['university', 'college', 'institute', 'research_institute'],
      default: 'university'
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
    departments: [String],
    expertise: [String],
    researchAreas: [String],
    facilities: [String],
    laboratories: [String],
    innovationCenters: [String],
    incubationFacilities: [String],
    previousProjects: [String],
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

universitySchema.index({
  name: 'text',
  expertise: 'text',
  researchAreas: 'text',
  departments: 'text'
});

module.exports = mongoose.model('University', universitySchema);