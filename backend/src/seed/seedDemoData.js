/* SamadhanSetu — SIH26043 Jharkhand Comprehensive Demo Dataset Seed Script */
require('../config/env');
const mongoose = require('mongoose');

const User = require('../models/User');
const Challenge = require('../models/Challenge');
const University = require('../models/University');
const Industry = require('../models/Industry');
const Proposal = require('../models/Proposal');
const Project = require('../models/Project');
const Team = require('../models/Team');
const Milestone = require('../models/Milestone');
const Collaboration = require('../models/Collaboration');
const ImpactMetric = require('../models/ImpactMetric');
const Notification = require('../models/Notification');
const connectDB = require('../config/db');

const clearDemoData = async () => {
  console.log('🧹 Clearing existing SamadhanSetu demo dataset...');
  await Challenge.deleteMany({});
  await University.deleteMany({});
  await Industry.deleteMany({});
  await Proposal.deleteMany({});
  await Project.deleteMany({});
  await Team.deleteMany({});
  await Milestone.deleteMany({});
  await Collaboration.deleteMany({});
  await ImpactMetric.deleteMany({});
  await Notification.deleteMany({});
  console.log('✅ Previous demo dataset cleared.');
};

const seedDemoData = async () => {
  console.log('🌱 Seeding SamadhanSetu (SIH26043) 24-District Jharkhand Demo Dataset...');

  await connectDB();

  if (process.argv.includes('--clear')) {
    await clearDemoData();
    await mongoose.disconnect();
    process.exit(0);
  }

  await clearDemoData();

  // 1. Seed Key Platform Users Across Roles
  console.log('👤 Seeding 7-Role Platform Users...');
  let admin = await User.findOne({ email: 'admin@samadhansetu.gov.in' });
  if (!admin) {
    admin = await User.create({
      name: 'Dr. Ramesh Kumar (State Innovation Cell)',
      email: 'admin@samadhansetu.gov.in',
      password: 'Password123!',
      role: 'admin',
      location: { district: 'Ranchi', state: 'Jharkhand' },
      isVerified: true
    });
  }

  const govUser = await User.create({
    name: 'Shri S. K. Verma (Dept of Urban & Rural Dev)',
    email: 'gov_reviewer@samadhansetu.gov.in',
    password: 'Password123!',
    role: 'government',
    location: { district: 'Ranchi', state: 'Jharkhand' },
    isVerified: true
  });

  const uniUser = await User.create({
    name: 'Prof. Animesh Mukherjee (BIT Mesra R&D)',
    email: 'uni_lead@bitmesra.ac.in',
    password: 'Password123!',
    role: 'university',
    location: { district: 'Ranchi', state: 'Jharkhand' },
    isVerified: true
  });

  const facultyUser = await User.create({
    name: 'Dr. Sunita Sharma (IIT ISM Environmental Science)',
    email: 'faculty@iitism.ac.in',
    password: 'Password123!',
    role: 'faculty',
    location: { district: 'Dhanbad', state: 'Jharkhand' },
    isVerified: true
  });

  const studentUser = await User.create({
    name: 'Rahul Sen (NIT Jamshedpur Innovator)',
    email: 'student@nitjsr.ac.in',
    password: 'Password123!',
    role: 'student',
    location: { district: 'East Singhbhum', state: 'Jharkhand' },
    isVerified: true
  });

  const indUser = await User.create({
    name: 'Vikramaditya Tata (Tata Steel CSR Lead)',
    email: 'csr@tatasteel.com',
    password: 'Password123!',
    role: 'industry',
    location: { district: 'East Singhbhum', state: 'Jharkhand' },
    isVerified: true
  });

  const citizenUser = await User.create({
    name: 'Birsa Munda (Gram Sabha Representative)',
    email: 'citizen_khunti@gmail.com',
    password: 'Password123!',
    role: 'citizen',
    location: { district: 'Khunti', block: 'Murhu', state: 'Jharkhand' },
    isVerified: true
  });

  // 2. Seed Universities / HEIs
  console.log('🏛️ Seeding Jharkhand Universities & HEIs...');
  const unis = await University.insertMany([
    {
      name: 'Birla Institute of Technology (BIT) Mesra',
      code: 'BITM-RNC',
      district: 'Ranchi',
      departments: ['Environmental Engineering', 'Water Resource Tech', 'Computer Science & AI', 'Remote Sensing'],
      contactEmail: 'research@bitmesra.ac.in',
      user: uniUser._id,
      facultyCount: 140,
      studentCount: 3800
    },
    {
      name: 'IIT (ISM) Dhanbad',
      code: 'IITD-DHN',
      district: 'Dhanbad',
      departments: ['Mining & Environmental Tech', 'Clean Energy', 'Applied Geology', 'Electronics'],
      contactEmail: 'rnd@iitism.ac.in',
      facultyCount: 210,
      studentCount: 4500
    },
    {
      name: 'National Institute of Technology (NIT) Jamshedpur',
      code: 'NITJ-JSR',
      district: 'East Singhbhum',
      departments: ['Civil & Structural Engineering', 'IoT & Embedded Systems', 'Mechanical Engineering'],
      contactEmail: 'director@nitjsr.ac.in',
      facultyCount: 110,
      studentCount: 3100
    },
    {
      name: 'Birsa Agricultural University (BAU) Kanke',
      code: 'BAU-KNK',
      district: 'Ranchi',
      departments: ['Agronomy', 'Soil Conservation', 'Solar Irrigation Systems', 'Forestry Technology'],
      contactEmail: 'research@bau.ac.in',
      facultyCount: 85,
      studentCount: 1900
    }
  ]);

  // 3. Seed Industry Partners & CSR Cells
  console.log('🏭 Seeding Industry & CSR Partners...');
  const inds = await Industry.insertMany([
    {
      name: 'Tata Steel Foundation CSR & Sustainability Hub',
      type: 'csr',
      email: 'csr@tatasteel.com',
      district: 'East Singhbhum',
      domains: ['Clean Drinking Water', 'Community Health', 'Tribal Livelihoods'],
      user: indUser._id
    },
    {
      name: 'Coal India CSR Innovation Cell (BCCL / CCL)',
      type: 'csr',
      email: 'csr@coalindia.in',
      district: 'Dhanbad',
      domains: ['Environmental Restoration', 'Solar Power Microgrids', 'Air & Water Quality']
    },
    {
      name: 'Jindal Steel & Power CSR Foundation',
      type: 'csr',
      email: 'csr@jindalsteel.com',
      district: 'Ramgarh',
      domains: ['Rural School Infrastructure', 'Skill Development', 'Road Construction']
    }
  ]);

  // 4. Seed 25 Realistic Jharkhand Challenges across Canonical Enums & All 24 Districts
  console.log('📋 Seeding 25 Jharkhand Challenges across 24 Districts...');
  const challengeRawData = [
    {
      title: 'Groundwater Fluoride & Heavy Metal Contamination in Primary Schools',
      description: 'High fluoride and arsenic levels detected in tube-well water across 18 rural schools in Kanke block, causing fluorosis among primary students.',
      category: 'water',
      district: 'Ranchi', block: 'Kanke', village: 'Nagri', lat: 23.4351, lng: 85.3214,
      priority: 'high', severity: 'high', status: 'approved',
      aiSummary: 'Critical groundwater quality hazard affecting 1,400+ primary students requiring solar-powered reverse osmosis and IoT telemetry sensors.',
      skills: ['Hydrology', 'Water Chemistry', 'IoT Telemetry']
    },
    {
      title: 'Industrial Mining Slag & Overburden Dump Upcycling for Highway Construction',
      description: 'Unprocessed coal mining overburden and slag dumps near Jharia mines polluting agricultural land and creating landslide hazards.',
      category: 'environment',
      district: 'Dhanbad', block: 'Jharia', village: 'Tisra', lat: 23.7412, lng: 86.4150,
      priority: 'high', severity: 'high', status: 'approved',
      aiSummary: 'Mining byproduct recycling opportunity aligned with Coal India CSR and civil engineering road base utilization.',
      skills: ['Materials Science', 'Environmental Engineering', 'Highway Construction']
    },
    {
      title: 'Solar Micro-Grid Irrigation & Smart Pump System for Smallholder Farmers',
      description: 'Marginal farmers in Medininagar suffer crop loss during rabi season due to unreliable electrical grid access for tube well irrigation.',
      category: 'agriculture',
      district: 'Palamu', block: 'Medininagar', village: 'Chainpur', lat: 24.0321, lng: 84.0715,
      priority: 'medium', severity: 'medium', status: 'approved',
      aiSummary: 'Solar photovoltaic micro-grid project boosting multi-crop yield in drought prone Palamu belt.',
      skills: ['Solar Photovoltaics', 'Smart Agritech', 'Drip Irrigation']
    },
    {
      title: 'Cold-Chain Storage Deficit for Tribal Lac & Organic Forest Produce',
      description: 'Lack of temperature-controlled storage in Khunti results in 35% spoilage of raw lac and mahua harvested by tribal self-help groups.',
      category: 'rural_livelihoods',
      district: 'Khunti', block: 'Murhu', village: 'Karra', lat: 23.0711, lng: 85.2789,
      priority: 'high', severity: 'medium', status: 'approved',
      aiSummary: 'Low-cost solar refrigeration and cooperative supply chain management solution for tribal bio-resources.',
      skills: ['Thermal Refrigeration', 'Supply Chain Management', 'Tribal Enterprise']
    },
    {
      title: 'Bridge Approach Road Washout & Seasonal Connectivity Disruption',
      description: 'Monsoon floods washed away the eastern embankment of Koel river bridge, isolating 12 villages in Garhwa Sadar.',
      category: 'infrastructure',
      district: 'Garhwa', block: 'Garhwa Sadar', village: 'Meral', lat: 24.1810, lng: 83.8012,
      priority: 'high', severity: 'high', status: 'approved',
      aiSummary: 'Rapid Modular Geosynthetic Soil Reinforcement and pre-cast culvert engineering challenge.',
      skills: ['Geotechnical Engineering', 'Structural Civil Engineering']
    },
    {
      title: 'Digital Learning Infrastructure Gap in Secondary Schools',
      description: 'Secondary government schools in Barhi lack computer labs, internet connectivity, and digital STEM curriculum content.',
      category: 'education',
      district: 'Hazaribagh', block: 'Barhi', village: 'Chouparan', lat: 24.3012, lng: 85.4215,
      priority: 'medium', severity: 'medium', status: 'approved',
      aiSummary: 'Offline-first solar-powered tablet server ecosystem equipped with localized NCERT/Jharkhand State Board digital content.',
      skills: ['EdTech Architecture', 'Offline Sync Systems', 'Solar Computing']
    },
    {
      title: 'Maternal Tele-ICU & Emergency Ambulance Response Delay',
      description: 'Sub-divisional health centre in Latehar lacks neonatal specialist doctors and emergency ICU transport telemetry.',
      category: 'healthcare',
      district: 'Latehar', block: 'Chandwa', village: 'Balumath', lat: 23.6842, lng: 84.6710,
      priority: 'high', severity: 'high', status: 'approved',
      aiSummary: 'Satellite-enabled point-of-care vital signs telemetry unit connecting rural ASHAs with RIMS Ranchi specialists.',
      skills: ['Biomedical Engineering', 'Telemedicine Protocols', 'Mobile Health']
    },
    {
      title: 'Urban Plastic Waste Accumulation & Drainage Blockage',
      description: 'Single-use plastic waste clogging municipal storm channels in Chas municipal region leading to urban flooding.',
      category: 'sanitation',
      district: 'Bokaro', block: 'Chas', village: 'Bermo', lat: 23.6312, lng: 86.1711,
      priority: 'medium', severity: 'medium', status: 'approved',
      aiSummary: 'Community plastic shredder-to-paver block conversion micro-plant with municipal incentives.',
      skills: ['Waste Polymer Processing', 'Mechanical Design']
    },
    {
      title: 'Unreliable Rural Feeder Power Voltage Fluctuations',
      description: 'Frequent voltage drops and power outages in Gola block damaging agricultural flour mills and rural handicraft units.',
      category: 'energy',
      district: 'Ramgarh', block: 'Gola', village: 'Patratu', lat: 23.5912, lng: 85.7110,
      priority: 'medium', severity: 'medium', status: 'approved',
      aiSummary: 'Automatic line voltage stabilizer and battery storage micro-inverter for rural micro-enterprises.',
      skills: ['Power Electronics', 'Electrical Grid Systems']
    },
    {
      title: 'Traffic Congestion & Intelligent Signal Control at Main Road Junctions',
      description: 'Peak hour bottleneck at Albert Ekka Chowk and Firayalal intersection causing emergency ambulance delays.',
      category: 'urban_development',
      district: 'Ranchi', block: 'Ranchi Urban / ULB', village: 'Main Road', lat: 23.3700, lng: 85.3250,
      priority: 'medium', severity: 'medium', status: 'under_review',
      aiSummary: 'Computer-vision adaptive traffic signal timing system prioritizing emergency vehicle corridors.',
      skills: ['Computer Vision', 'Urban Traffic Systems', 'AI Edge Computing']
    },
    {
      title: 'Public Building Wheelchair Ramp & Tactile Paving Deficit',
      description: 'District collectorate and civil hospital in Giridih lack wheelchair ramps, tactile paving, and accessible restrooms.',
      category: 'accessibility',
      district: 'Giridih', block: 'Giridih Sadar', village: 'Gandey', lat: 24.1812, lng: 86.3011,
      priority: 'medium', severity: 'medium', status: 'submitted',
      aiSummary: 'Universal architectural accessibility retrofit design and low-cost modular aluminum ramp assembly.',
      skills: ['Universal Design', 'Civil Architecture', 'Assistive Tech']
    },
    {
      title: 'Delayed Pension & Rice Ration Grievance Resolution Tracker',
      description: 'Elderly citizens in Hunterganj spend weeks tracking physical ration card updates and pension disbursal status.',
      category: 'public_administration',
      district: 'Chatra', block: 'Hunterganj', village: 'Itkhori', lat: 24.3510, lng: 84.8112,
      priority: 'medium', severity: 'medium', status: 'under_review',
      aiSummary: 'SMS-based localized IVR grievance tracking portal with automated Block Development Officer escalation.',
      skills: ['IVR Systems', 'E-Governance APIs', 'Software Engineering']
    },
    {
      title: 'Soil Erosion & Topsoil Depletion in Terrace Farming Belts',
      description: 'Heavy monsoon runoff washing away fertile topsoil on hill slopes in Simdega Sadar affecting paddy cultivation.',
      category: 'agriculture',
      district: 'Simdega', block: 'Simdega Sadar', village: 'Kurdeg', lat: 22.6120, lng: 84.5110,
      priority: 'medium', severity: 'medium', status: 'submitted',
      aiSummary: 'Vetiver grass bio-fencing and gabion check dam construction framework for slope stabilization.',
      skills: ['Soil Science', 'Agro-Forestry', 'Hydro-Geology']
    },
    {
      title: 'Contaminated Surface Pond Restoration for Village Fisheries',
      description: 'Algal bloom and domestic sewage inflow rendering central village pond unusable for aquaculture in Jamtara.',
      category: 'water',
      district: 'Jamtara', block: 'Jamtara Sadar', village: 'Nala', lat: 23.9512, lng: 86.8010,
      priority: 'medium', severity: 'medium', status: 'submitted',
      aiSummary: 'Bio-remediation floating wetland island mats and solar aeration fountains to restore dissolved oxygen.',
      skills: ['Limnology', 'Bioremediation', 'Aquaculture']
    },
    {
      title: 'Solar Cold Storage for Perishable Vegetable Farmers',
      description: 'Tomato and chili growers in Dumka suffer distressed sales during peak harvest season.',
      category: 'rural_livelihoods',
      district: 'Dumka', block: 'Dumka Sadar', village: 'Jama', lat: 24.2612, lng: 87.2410,
      priority: 'high', severity: 'medium', status: 'submitted',
      aiSummary: 'Phase-change material (PCM) hybrid solar cold chamber keeping produce fresh for 21 days without grid power.',
      skills: ['HVAC Design', 'Phase Change Materials', 'Agribusiness']
    },
    {
      title: 'Safe Drinking Water Kiosks for Tribal Hostels',
      description: 'High iron content in well water at tribal welfare residential hostel in Pakur causing gastrointestinal illnesses.',
      category: 'water',
      district: 'Pakur', block: 'Pakur Sadar', village: 'Hiranpur', lat: 24.6310, lng: 87.8412,
      priority: 'high', severity: 'high', status: 'approved',
      aiSummary: 'Community activated alumina and sand filtration system with UV disinfection.',
      skills: ['Chemical Engineering', 'Public Health']
    },
    {
      title: 'Solar Powered Smart Classroom for Rural Primary Schools',
      description: 'Lack of steady grid electricity prevents usage of smart TVs and digital educational tools in Sahibganj schools.',
      category: 'education',
      district: 'Sahibganj', block: 'Sahibganj Sadar', village: 'Rajmahal', lat: 25.0512, lng: 87.8310,
      priority: 'medium', severity: 'medium', status: 'submitted',
      aiSummary: 'Plug-and-play 1kW solar roof kit with integrated DC smart TV and offline educational storage.',
      skills: ['Solar Engineering', 'Educational Technology']
    },
    {
      title: 'Bio-Medical Waste Incineration Deficit in Rural Clinics',
      description: 'Improper disposal of medical syringes and bandages behind primary health centre in Deoghar causing health hazards.',
      category: 'healthcare',
      district: 'Deoghar', block: 'Deoghar Sadar', village: 'Sarath', lat: 24.4812, lng: 86.7011,
      priority: 'high', severity: 'high', status: 'submitted',
      aiSummary: 'Smokeless micro-pyrolysis medical waste incinerator meeting Central Pollution Control Board guidelines.',
      skills: ['Thermal Design', 'Bio-Medical Safety']
    },
    {
      title: 'Silk & Tussar Weaving Loom Modernization for Tribal Artisans',
      description: 'Traditional manual looms in Godda yield low production volume and cause chronic back fatigue for women weavers.',
      category: 'rural_livelihoods',
      district: 'Godda', block: 'Godda Sadar', village: 'Poreyahat', lat: 24.8312, lng: 87.2110,
      priority: 'medium', severity: 'medium', status: 'submitted',
      aiSummary: 'Ergonomic solar-assisted motorized winding and weaving mechanism increasing daily artisan yield by 150%.',
      skills: ['Textile Machine Design', 'Ergonomics', 'Solar Motors']
    },
    {
      title: 'Low-Cost Weather Station Grid for Micro-Climate Crop Insurance',
      description: 'Farmers in Koderma lack hyper-local rainfall data required to settle crop damage insurance claims promptly.',
      category: 'agriculture',
      district: 'Koderma', block: 'Koderma Sadar', village: 'Jainagar', lat: 24.4612, lng: 85.5910,
      priority: 'medium', severity: 'medium', status: 'submitted',
      aiSummary: 'Open-source LoRaWAN automated weather monitoring stations recording rainfall, humidity, and temperature.',
      skills: ['IoT Sensors', 'Wireless Networks', 'Climatology']
    },
    {
      title: 'Pothole Detection & Rapid Bitumen Repair Tracker for District Roads',
      description: 'Heavy ore trucks create deep potholes along Chaibasa-Hatgamharia highway risking commuter accidents.',
      category: 'infrastructure',
      district: 'West Singhbhum', block: 'Chaibasa (Sadar)', village: 'Jhinkpani', lat: 22.5512, lng: 85.8110,
      priority: 'high', severity: 'high', status: 'submitted',
      aiSummary: 'Mobile app AI accelerometer pothole mapping with cold-mix polymer bitumen patching.',
      skills: ['Pavement Engineering', 'Mobile AI']
    },
    {
      title: 'Sub-Centre Tele-Diagnostics & Diagnostic Kit for Rural Nurses',
      description: 'Auxiliary Nurse Midwives (ANMs) in Lohardaga lack portable blood analysis and ECG kits for home visits.',
      category: 'healthcare',
      district: 'Lohardaga', block: 'Lohardaga Sadar', village: 'Kuru', lat: 23.4312, lng: 84.6810,
      priority: 'high', severity: 'medium', status: 'submitted',
      aiSummary: 'Ruggedized IoT diagnostic briefcase measuring 12 vital parameters with Bluetooth cloud syncing.',
      skills: ['Biomedical Instrumentation', 'Mobile Tele-Health']
    },
    {
      title: 'Auto-Irrigation Drip System for Hillside Horticulture Crops',
      description: 'Horticulture farmers in Seraikela struggle with water distribution on terraced guava and mango orchards.',
      category: 'agriculture',
      district: 'Seraikela-Kharsawan', block: 'Seraikela', village: 'Kharsawan', lat: 22.7012, lng: 85.9310,
      priority: 'medium', severity: 'medium', status: 'submitted',
      aiSummary: 'Gravity-fed soil moisture sensor automated drip valves for terraced orchards.',
      skills: ['Irrigation Hydraulics', 'Sensor Electronics']
    },
    {
      title: 'Forest Fire Detection Sensor Mesh for Timber & Wildlife Protection',
      description: 'Summer forest fires in Betla reserve fringe area in Latehar burn valuable timber and medicinal herbs.',
      category: 'environment',
      district: 'Latehar', block: 'Barwadih', village: 'Mahuadanr', lat: 23.8512, lng: 84.1210,
      priority: 'high', severity: 'high', status: 'submitted',
      aiSummary: 'Thermal optical smoke sensors mounted on high-altitude forest watchtowers broadcasting mesh alerts.',
      skills: ['Optical Sensors', 'Wireless Sensor Networks']
    },
    {
      title: 'Community Wastewater Recycling for Tree Plantation & Green Belts',
      description: 'Greywater from residential colonies in Adityapur flows untreated into Subarnarekha river.',
      category: 'sanitation',
      district: 'Seraikela-Kharsawan', block: 'Gamharia (Adityapur)', village: 'Adityapur', lat: 22.7812, lng: 86.1510,
      priority: 'medium', severity: 'medium', status: 'submitted',
      aiSummary: 'Constructed root-zone wetland treatment plant recycling 50,000 liters of greywater daily for industrial green belts.',
      skills: ['Wastewater Engineering', 'Ecological Restoration']
    }
  ];

  const challenges = [];
  for (let i = 0; i < challengeRawData.length; i++) {
    const d = challengeRawData[i];
    const c = await Challenge.create({
      title: d.title,
      description: d.description,
      category: d.category,
      status: d.status,
      priority: d.priority,
      severity: d.severity,
      submittedBy: d.category === 'water' ? citizenUser._id : admin._id,
      location: {
        district: d.district,
        block: d.block,
        village: d.village,
        state: 'Jharkhand',
        latitude: d.lat,
        longitude: d.lng
      },
      aiAnalysis: {
        summary: d.aiSummary,
        category: d.category,
        severity: d.severity,
        priorityScore: d.priority === 'high' ? 88 : (d.priority === 'medium' ? 72 : 54),
        keywords: [d.category, d.district, 'Jharkhand', 'Innovation'],
        requiredSkills: d.skills
      }
    });
    challenges.push(c);
  }

  // 5. Seed R&D Proposals
  console.log('📜 Seeding University R&D Proposals...');
  const proposal1 = await Proposal.create({
    challenge: challenges[0]._id,
    university: unis[0]._id,
    submittedBy: uniUser._id,
    title: 'Solar RO & Telemetry Filtration Grid for Rural Ranchi Schools',
    problemStatement: challenges[0].description,
    proposedSolution: 'Solar RO membrane filtration + ESP32 cellular sensor nodes.',
    budget: 850000,
    durationMonths: 6,
    status: 'approved'
  });

  const proposal2 = await Proposal.create({
    challenge: challenges[1]._id,
    university: unis[1]._id,
    submittedBy: facultyUser._id,
    title: 'Geotechnical Utilization of Steel Slag in Highway Base Courses',
    problemStatement: challenges[1].description,
    proposedSolution: 'Crushing, magnetic metal separation, and lime stabilization.',
    budget: 1200000,
    durationMonths: 8,
    status: 'approved'
  });

  // 6. Seed Active R&D Projects
  console.log('🚀 Seeding Active Projects across Lifecycle Stages...');
  const project1 = await Project.create({
    projectCode: 'PRJ-2026-001',
    title: 'Solar Water Filtration & Quality Telemetry Grid',
    description: 'Automated solar-powered filtration units with live sensor dashboards across 18 rural schools in Kanke block.',
    challenge: challenges[0]._id,
    university: unis[0]._id,
    industry: inds[0]._id,
    createdBy: uniUser._id,
    status: 'in_progress',
    progressPercentage: 65,
    startDate: new Date('2026-01-15'),
    targetCompletionDate: new Date('2026-11-30')
  });

  const project2 = await Project.create({
    projectCode: 'PRJ-2026-002',
    title: 'Mining Slag Road Aggregate Polymer Stabilization',
    description: 'Process optimization and field testing for slag-based road base layers in coal transport corridors.',
    challenge: challenges[1]._id,
    university: unis[1]._id,
    industry: inds[1]._id,
    createdBy: facultyUser._id,
    status: 'prototype',
    progressPercentage: 40,
    startDate: new Date('2026-02-01'),
    targetCompletionDate: new Date('2026-12-15')
  });

  const project3 = await Project.create({
    projectCode: 'PRJ-2026-003',
    title: 'Tribal Lac Cold-Chain Solar Micro-Chamber',
    description: 'Phase-change material solar cold storage unit operational in Murhu block, Khunti.',
    challenge: challenges[3]._id,
    university: unis[3]._id,
    industry: inds[0]._id,
    createdBy: admin._id,
    status: 'pilot',
    progressPercentage: 85,
    startDate: new Date('2025-11-01'),
    targetCompletionDate: new Date('2026-06-30')
  });

  // 7. Seed Project R&D Teams
  console.log('👥 Seeding R&D Project Teams...');
  await Team.create({
    project: project1._id,
    name: 'BIT Mesra Hydro-Innovation Team',
    university: unis[0]._id,
    facultyMentor: uniUser._id,
    createdBy: uniUser._id,
    members: [
      { user: uniUser._id, role: 'leader', responsibilities: 'Principal Investigator' },
      { user: studentUser._id, role: 'student', responsibilities: 'Lead IoT Engineer' }
    ]
  });

  // 8. Seed Milestones
  console.log('🚩 Seeding Project Milestones...');
  await Milestone.create({
    project: project1._id,
    title: 'Water Quality Baseline Survey & Fluoride Testing',
    description: 'Sampling 18 school tube-wells in Kanke block.',
    dueDate: new Date('2026-03-15'),
    status: 'completed',
    progressContribution: 30,
    deliverables: [{ title: 'Hydrological Test Report PDF', link: '/uploads/sample_report.pdf' }]
  });

  await Milestone.create({
    project: project1._id,
    title: 'Solar RO Pilot Fabrication & Sensor Integration',
    description: 'Assembling 5 pilot filtration units with cellular telemetry.',
    dueDate: new Date('2026-07-30'),
    status: 'in_progress',
    progressContribution: 35,
    deliverables: []
  });

  // 9. Seed Industry CSR Collaborations
  console.log('🤝 Seeding Industry CSR Collaborations...');
  await Collaboration.create({
    project: project1._id,
    industry: inds[0]._id,
    requestedBy: indUser._id,
    type: 'funding',
    fundingAmount: 850000,
    status: 'accepted',
    scope: 'Co-funding solar filtration hardware deployment for 18 rural schools.'
  });

  await Collaboration.create({
    project: project2._id,
    industry: inds[1]._id,
    requestedBy: facultyUser._id,
    type: 'testing',
    fundingAmount: 1200000,
    status: 'accepted',
    scope: 'Providing access to BCCL slag dumps and heavy axle load test track.'
  });

  // 10. Seed Measurable Social Impact Metrics Across Districts
  console.log('📊 Seeding Social Impact Metrics...');
  await ImpactMetric.create({
    project: project1._id,
    district: 'Ranchi',
    category: 'water',
    beneficiaries: 14200,
    districtsImpacted: 1,
    villagesImpacted: 18,
    costSaved: 1850000,
    jobsCreated: 45,
    patentsFiled: 2,
    startupsIncubated: 1
  });

  await ImpactMetric.create({
    project: project2._id,
    district: 'Dhanbad',
    category: 'environment',
    beneficiaries: 9800,
    districtsImpacted: 1,
    villagesImpacted: 12,
    costSaved: 1250000,
    jobsCreated: 32,
    patentsFiled: 1,
    startupsIncubated: 1
  });

  await ImpactMetric.create({
    project: project3._id,
    district: 'Khunti',
    category: 'rural_livelihoods',
    beneficiaries: 6400,
    districtsImpacted: 2,
    villagesImpacted: 15,
    costSaved: 920000,
    jobsCreated: 60,
    patentsFiled: 1,
    startupsIncubated: 1
  });

  console.log('🎉 SamadhanSetu (SIH26043) 24-District Jharkhand Demo Dataset Successfully Seeded!');
  await mongoose.disconnect();
};

seedDemoData().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
