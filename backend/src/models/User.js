const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    phone: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: [
        'citizen',
        'government',
        'university',
        'faculty',
        'student',
        'industry',
        'admin'
      ],
      default: 'citizen'
    },
    profileImage: {
      type: String,
      default: null
    },
    organization: {
      type: String,
      trim: true
    },
    location: {
      district: String,
      state: {
        type: String,
        default: 'Jharkhand'
      }
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

userSchema.pre('save', async function () {
  if (!this.isModified('password') || this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) {
    return;
  }

  const rounds = process.env.NODE_ENV === 'test' ? 1 : 12;
  this.password = await bcrypt.hash(this.password, rounds);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);