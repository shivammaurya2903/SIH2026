const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    type: {
      type: String,
      enum: [
        'challenge',
        'project',
        'proposal',
        'collaboration',
        'milestone',
        'system',
        'challenge_submitted',
        'challenge_approved',
        'challenge_rejected',
        'proposal_submitted',
        'proposal_approved',
        'proposal_rejected',
        'project_created',
        'project_status_changed',
        'team_member_added',
        'team_member_removed',
        'mentor_assigned',
        'milestone_created',
        'milestone_completed',
        'collaboration_requested',
        'collaboration_accepted',
        'collaboration_rejected',
        'info',
        'warning',
        'error'
      ],
      default: 'system'
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    isRead: {
      type: Boolean,
      default: false
    },
    readAt: Date
  },
  {
    timestamps: true
  }
);

notificationSchema.index({
  recipient: 1,
  createdAt: -1
});

module.exports = mongoose.model('Notification', notificationSchema);