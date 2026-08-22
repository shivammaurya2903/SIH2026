const ROLES = {
  CITIZEN: 'citizen',
  GOVERNMENT: 'government',
  UNIVERSITY: 'university',
  FACULTY: 'faculty',
  STUDENT: 'student',
  INDUSTRY: 'industry',
  ADMIN: 'admin'
};

const CHALLENGE_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  AI_ANALYZED: 'ai_analyzed',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  DUPLICATE: 'duplicate',
  MATCHED: 'matched',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  PROTOTYPE: 'prototype',
  TESTING: 'testing',
  PILOT: 'pilot',
  DEPLOYED: 'deployed',
  COMPLETED: 'completed',
  ON_HOLD: 'on_hold',
  CANCELLED: 'cancelled'
};

const PROJECT_STATUS = {
  PLANNING: 'planning',
  IN_PROGRESS: 'in_progress',
  PROTOTYPE: 'prototype',
  TESTING: 'testing',
  PILOT: 'pilot',
  DEPLOYED: 'deployed',
  COMPLETED: 'completed',
  ON_HOLD: 'on_hold',
  CANCELLED: 'cancelled'
};

const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

const CATEGORIES = [
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
];

module.exports = {
  ROLES,
  CHALLENGE_STATUS,
  PROJECT_STATUS,
  PRIORITY_LEVELS,
  CATEGORIES
};