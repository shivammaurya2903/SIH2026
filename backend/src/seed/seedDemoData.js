/* SIH 2026 Controlled Jharkhand Demo Dataset Seed Script */
require('../config/env');
const mongoose = require('mongoose');

const User = require('../models/User.model');
const Challenge = require('../models/Challenge.model');
const University = require('../models/University.model');
const Industry = require('../models/Industry.model');
const Project = require('../models/Project.model');
const ImpactMetric = require('../models/ImpactMetric.model');
const Notification = require('../models/Notification.model');

const clearDemoData = async () => {
  console.log('🧹 Clearing demo dataset...');
  await Challenge.deleteMany({});
  await University.deleteMany({});
  await Industry.deleteMany({});
  await Project.deleteMany({});
  await ImpactMetric.deleteMany({});
  await Notification.deleteMany({});
  console.log('✅ Demo dataset cleared.');
};

const seedDemoData = async () => {
  console.log('🌱 Seeding SIH 2026 Jharkhand Demonstration Data...');

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/societal_innovation';
  await mongoose.connect(mongoUri);

  if (process.argv.includes('--clear')) {
    await clearDemoData();
    await mongoose.disconnect();
    process.exit(0);
  }

  await clearDemoData();

  // Find or create admin user for seeding references
  let admin = await User.findOne({ role: 'admin' });
  if (!admin) {
    admin = await User.create({
      name: 'System Admin',
      email: 'seed_admin@jharinnovate.gov.in',
      password: 'Password123!',
      role: 'admin',
      district: 'Ranchi',
      isVerified: true
    });
  }

  // 1. Seed Universities
  const unis = await University.insertMany([
    {
      name: 'BIT Mesra (Birla Institute of Technology)',
      code: 'BITM-001',
      district: 'Ranchi',
      departments: ['Environmental Engineering', 'Water Resource Management', 'Computer Science'],
      contactEmail: 'research@bitmesra.ac.in',
      facultyCount: 120,
      studentCount: 3400
    },
    {
      name: 'IIT (ISM) Dhanbad',
      code: 'IITD-002',
      district: 'Dhanbad',
      departments: ['Mining Engineering', 'Environmental Tech', 'Clean Energy'],
      contactEmail: 'rnd@iitism.ac.in',
      facultyCount: 180,
      studentCount: 4200
    },
    {
      name: 'NIT Jamshedpur',
      code: 'NITJ-003',
      district: 'East Singhbhum',
      departments: ['Civil & Structural Engineering', 'IoT & Embedded Systems'],
      contactEmail: 'director@nitjsr.ac.in',
      facultyCount: 95,
      studentCount: 2800
    }
  ]);

  // 2. Seed Industries
  const inds = await Industry.insertMany([
    {
      companyName: 'Tata Steel CSR & Sustainability Hub',
      cin: 'L27100MH1907PLC000260',
      industryType: 'Manufacturing & Steel',
      csrBudget: 5000000,
      focusAreas: ['Clean Drinking Water', 'Community Health', 'Tribal Welfare'],
      district: 'East Singhbhum'
    },
    {
      companyName: 'Coal India CSR Innovation Cell',
      cin: 'L10101WB1973GOI028844',
      industryType: 'Energy & Mining',
      csrBudget: 7500000,
      focusAreas: ['Environmental Restoration', 'Solar Power Grid', 'Air Quality'],
      district: 'Dhanbad'
    }
  ]);

  // 3. Seed Challenges across Jharkhand
  const challenges = await Challenge.insertMany([
    {
      title: 'Drinking Water Contamination in Rural Schools',
      description: 'High fluoride and heavy metal levels in groundwater across rural schools in Kanke block causing fluorosis among students.',
      category: 'Water Infrastructure',
      status: 'approved',
      priorityScore: 87,
      submittedBy: admin._id,
      location: { district: 'Ranchi', block: 'Kanke', state: 'Jharkhand' },
      aiAnalysis: {
        summary: 'Critical water quality problem affecting 1,200+ students requiring solar filtration and IoT turbidity sensors.',
        category: 'Water Infrastructure',
        severity: 'critical',
        priorityScore: 87,
        keywords: ['Water', 'Fluoride', 'Solar Filtration', 'Health'],
        requiredSkills: ['Hydrology', 'IoT Engineering', 'Water Chemistry']
      }
    },
    {
      title: 'Industrial Mining Slag Upcycling for Road Construction',
      description: 'Unprocessed steel slag and overburden dumps near Jharia mines occupying fertile land.',
      category: 'Waste Management',
      status: 'approved',
      priorityScore: 74,
      submittedBy: admin._id,
      location: { district: 'Dhanbad', block: 'Jharia', state: 'Jharkhand' },
      aiAnalysis: {
        summary: 'Industrial byproduct recycling challenge with high CSR alignment from mining & steel sectors.',
        category: 'Waste Management',
        severity: 'high',
        priorityScore: 74,
        keywords: ['Mining Slag', 'Recycling', 'Civil Infra', 'Roads'],
        requiredSkills: ['Materials Science', 'Civil Engineering']
      }
    },
    {
      title: 'Solar Micro-Grid Irrigation Pumps for Drought Resilience',
      description: 'Smallholder farmers in Palamu lack reliable electricity for tube wells during winter crop cycles.',
      category: 'Clean Energy',
      status: 'approved',
      priorityScore: 68,
      submittedBy: admin._id,
      location: { district: 'Palamu', block: 'Medininagar', state: 'Jharkhand' },
      aiAnalysis: {
        summary: 'High-impact agricultural renewable energy project boosting crop yields in drought prone regions.',
        category: 'Clean Energy',
        severity: 'medium',
        priorityScore: 68,
        keywords: ['Solar', 'Irrigation', 'Agriculture', 'Drought'],
        requiredSkills: ['Solar Photovoltaics', 'Agritech']
      }
    }
  ]);

  // 4. Seed Active R&D Projects
  await Project.insertMany([
    {
      title: 'Solar Water Filtration & Quality Monitoring Grid',
      description: 'Automated solar-powered filtration units with telemetry sensors deployed across 14 rural schools in Ranchi.',
      challengeId: challenges[0]._id,
      universityId: unis[0]._id,
      industryPartnerId: inds[0]._id,
      status: 'IN_PROGRESS',
      progressPercentage: 65,
      startDate: new Date('2026-01-15'),
      targetCompletionDate: new Date('2026-11-30')
    },
    {
      title: 'Eco-Friendly Road Aggregate from Steel Slag',
      description: 'Process optimization and field testing for slag-based road base layers in coal transport corridors.',
      challengeId: challenges[1]._id,
      universityId: unis[1]._id,
      industryPartnerId: inds[1]._id,
      status: 'PROTOTYPE',
      progressPercentage: 40,
      startDate: new Date('2026-02-01'),
      targetCompletionDate: new Date('2026-12-15')
    }
  ]);

  // 5. Seed Social Impact Metrics
  await ImpactMetric.insertMany([
    {
      district: 'Ranchi',
      category: 'Water Infrastructure',
      beneficiariesCount: 12450,
      costSaved: 1420000,
      jobsCreated: 42,
      patentsFiled: 2,
      startupsIncubated: 1
    },
    {
      district: 'Dhanbad',
      category: 'Waste Management',
      beneficiariesCount: 8900,
      costSaved: 950000,
      jobsCreated: 28,
      patentsFiled: 1,
      startupsIncubated: 1
    },
    {
      district: 'East Singhbhum',
      category: 'Clean Energy',
      beneficiariesCount: 7800,
      costSaved: 1110000,
      jobsCreated: 35,
      patentsFiled: 1,
      startupsIncubated: 0
    }
  ]);

  console.log('✨ Demo Dataset Successfully Seeded!');
  await mongoose.disconnect();
};

seedDemoData().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
