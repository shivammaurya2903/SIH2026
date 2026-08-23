require('../src/config/env');
const connectDB = require('../src/config/db');
const app = require('../src/app');
const User = require('../src/models/User');
const University = require('../src/models/University');
const Industry = require('../src/models/Industry');
const Challenge = require('../src/models/Challenge');
const Project = require('../src/models/Project');
const Team = require('../src/models/Team');
const Milestone = require('../src/models/Milestone');
const Proposal = require('../src/models/Proposal');
const projectService = require('../src/services/project.service');

let server;
let baseUrl;

const results = [];

function recordTest(name, category, passed, detail) {
  results.push({
    name,
    category,
    status: passed ? 'PASS' : 'FAIL',
    detail
  });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${category} :: ${name} -> ${detail}`);
}

async function runTests() {
  await connectDB();

  server = app.listen(5010);
  baseUrl = 'http://localhost:5010';

  console.log('\n====== STARTING PHASE 2 MODULE COMPLETION & SECURITY SUITE ======\n');

  try {
    // 1. Health check
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthJson = await healthRes.json();
    recordTest('Health Check Endpoint', 'System', healthRes.status === 200 && healthJson.success, `HTTP ${healthRes.status}`);

    // Cleanup test data
    await User.deleteMany({ email: /@phase2test\.com$/ });
    await University.deleteMany({ code: /^P2-UNI-/ });
    await Industry.deleteMany({ email: /@phase2test\.com$/ });
    await Challenge.deleteMany({ title: /^P2-TEST-/ });

    // Register Users
    // Citizen
    const citizenReg = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Phase2 Citizen',
        email: 'citizen@phase2test.com',
        password: 'password123',
        role: 'citizen'
      })
    });
    const citizenData = await citizenReg.json();
    const citizenToken = citizenData.data?.token;

    // Student
    const studentReg = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Phase2 Student Researcher',
        email: 'student@phase2test.com',
        password: 'password123',
        role: 'student'
      })
    });
    const studentData = await studentReg.json();
    const studentToken = studentData.data?.token;
    const studentUserId = studentData.data?.user?.id;

    // Faculty Mentor
    const facultyReg = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Dr. Faculty Lead',
        email: 'faculty@phase2test.com',
        password: 'password123',
        role: 'faculty',
        organization: 'BIT Mesra'
      })
    });
    const facultyData = await facultyReg.json();
    const facultyToken = facultyData.data?.token;
    const facultyUserId = facultyData.data?.user?.id;

    // Industry Mentor
    const indMentorReg = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Er. Industry Expert',
        email: 'indexpert@phase2test.com',
        password: 'password123',
        role: 'industry',
        organization: 'Coal India Tech'
      })
    });
    const indMentorData = await indMentorReg.json();
    const indMentorUserId = indMentorData.data?.user?.id;

    // University User
    const uniUserReg = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'BIT Mesra Admin',
        email: 'bit@phase2test.com',
        password: 'password123',
        role: 'university',
        organization: 'BIT Mesra'
      })
    });
    const uniUserData = await uniUserReg.json();
    const uniToken = uniUserData.data?.token;

    // Government Official (created directly in DB)
    const govUser = await User.create({
      name: 'Jharkhand Nodal Officer',
      email: 'nodalofficer@phase2test.com',
      password: 'password123',
      role: 'government',
      isActive: true
    });
    const govLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'nodalofficer@phase2test.com', password: 'password123' })
    });
    const govToken = (await govLoginRes.json()).data?.token;

    // Create Base Models for test
    const uniDoc = await University.create({
      name: 'BIT Mesra',
      code: 'P2-UNI-BIT',
      email: 'bit@phase2test.com',
      district: 'Ranchi'
    });

    const challengeDoc = await Challenge.create({
      title: 'P2-TEST-Groundwater Fluoride Detection',
      description: 'High fluoride levels causing dental fluorosis',
      category: 'water',
      location: { district: 'Ranchi' },
      submittedBy: citizenData.data?.user?.id
    });

    // Create Project via Project Service
    const projectDoc = await projectService.createProject({
      title: 'BIT Fluoride Removal Project',
      description: 'Nanofiltration water purification device',
      challenge: challengeDoc._id,
      university: uniDoc._id,
      createdBy: govUser._id,
      status: 'planning'
    });

    // 2. TEAM MANAGEMENT TESTS
    // Citizen tries to create team -> DENY 403
    const citizenCreateTeam = await fetch(`${baseUrl}/api/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${citizenToken}` },
      body: JSON.stringify({ name: 'Citizen Team', project: projectDoc._id })
    });
    recordTest('Team Security (Citizen Create Denied)', 'Team API', citizenCreateTeam.status === 403, `HTTP ${citizenCreateTeam.status}`);

    // Faculty creates Team for project -> ALLOW 201
    const facultyCreateTeam = await fetch(`${baseUrl}/api/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${facultyToken}` },
      body: JSON.stringify({
        name: 'BIT Innovators Team Alpha',
        description: 'Multidisciplinary innovation squad',
        project: projectDoc._id,
        university: uniDoc._id,
        members: [{ user: studentUserId, role: 'student', responsibilities: 'CAD Design' }]
      })
    });
    const teamData = await facultyCreateTeam.json();
    const teamId = teamData.data?._id;
    recordTest('Team Creation (Faculty Create Allowed & Project Linked)', 'Team API', facultyCreateTeam.status === 201 && teamId, `HTTP ${facultyCreateTeam.status}`);

    // Add Member to Team
    const addMemberRes = await fetch(`${baseUrl}/api/teams/${teamId}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${facultyToken}` },
      body: JSON.stringify({ user: studentUserId, role: 'researcher', responsibilities: 'Testing' })
    });
    recordTest('Team Member Addition (Conflict handling on existing member)', 'Team API', addMemberRes.status === 409 || addMemberRes.status === 200, `HTTP ${addMemberRes.status}`);

    // Assign Faculty Mentor
    const assignFacMentorRes = await fetch(`${baseUrl}/api/teams/${teamId}/faculty-mentor`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${uniToken}` },
      body: JSON.stringify({ facultyMentor: facultyUserId })
    });
    recordTest('Team Mentor Assignment (Faculty Mentor)', 'Team API', assignFacMentorRes.status === 200, `HTTP ${assignFacMentorRes.status}`);

    // Assign Industry Mentor
    const assignIndMentorRes = await fetch(`${baseUrl}/api/teams/${teamId}/industry-mentor`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${uniToken}` },
      body: JSON.stringify({ industryMentor: indMentorUserId })
    });
    recordTest('Team Mentor Assignment (Industry Mentor)', 'Team API', assignIndMentorRes.status === 200, `HTTP ${assignIndMentorRes.status}`);

    // 3. MILESTONE MANAGEMENT & DYNAMIC PROGRESS TESTS
    // Create Milestone 1 (50% progress)
    const m1Res = await fetch(`${baseUrl}/api/milestones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${facultyToken}` },
      body: JSON.stringify({
        project: projectDoc._id,
        title: 'Prototype CAD Model & Filter Design',
        description: 'Complete CAD rendering and material selection',
        completionPercentage: 50,
        assignedMembers: [studentUserId]
      })
    });
    const m1Data = await m1Res.json();
    const m1Id = m1Data.data?._id;
    recordTest('Milestone Creation (50% progress)', 'Milestone API', m1Res.status === 201 && m1Id, `HTTP ${m1Res.status}`);

    // Create Milestone 2 (0% progress)
    const m2Res = await fetch(`${baseUrl}/api/milestones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${facultyToken}` },
      body: JSON.stringify({
        project: projectDoc._id,
        title: 'Field Testing in Ranchi District',
        description: 'Test filtration rate with groundwater samples',
        completionPercentage: 0,
        assignedMembers: [studentUserId]
      })
    });
    const m2Data = await m2Res.json();
    const m2Id = m2Data.data?._id;
    recordTest('Milestone Creation (0% progress)', 'Milestone API', m2Res.status === 201 && m2Id, `HTTP ${m2Res.status}`);

    // Verify dynamic project progress calculation via Project Service (50 + 0) / 2 = 25%
    const projDetail1 = await fetch(`${baseUrl}/api/projects/${projectDoc._id}`, {
      headers: { Authorization: `Bearer ${uniToken}` }
    });
    const projDetail1Data = await projDetail1.json();
    const calculatedProgress1 = projDetail1Data.data?.progressPercentage;
    recordTest('Dynamic Project Progress Calculation (25%)', 'Project Progress', projDetail1.status === 200 && calculatedProgress1 === 25, `Calculated Progress: ${calculatedProgress1}%`);

    // Complete Milestone 1 (patch status -> completed)
    const completeM1Res = await fetch(`${baseUrl}/api/milestones/${m1Id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${facultyToken}` },
      body: JSON.stringify({ status: 'completed' })
    });
    const completeM1Data = await completeM1Res.json();
    recordTest('Milestone Status Update (Completed -> Auto 100%)', 'Milestone API', completeM1Res.status === 200 && completeM1Data.data?.completionPercentage === 100, `Percentage: ${completeM1Data.data?.completionPercentage}%`);

    // Verify updated dynamic project progress (100 + 0) / 2 = 50%
    const projDetail2 = await fetch(`${baseUrl}/api/projects/${projectDoc._id}`, {
      headers: { Authorization: `Bearer ${uniToken}` }
    });
    const projDetail2Data = await projDetail2.json();
    const calculatedProgress2 = projDetail2Data.data?.progressPercentage;
    recordTest('Dynamic Project Progress Update (50%)', 'Project Progress', projDetail2.status === 200 && calculatedProgress2 === 50, `Calculated Progress: ${calculatedProgress2}%`);

    // 4. PROJECT CONTROLLED STATE MACHINE TESTS
    // Valid transition: PLANNING -> IN_PROGRESS
    const trans1 = await fetch(`${baseUrl}/api/projects/${projectDoc._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${govToken}` },
      body: JSON.stringify({ status: 'in_progress' })
    });
    recordTest('Project State Machine (PLANNING -> IN_PROGRESS)', 'State Machine', trans1.status === 200, `HTTP ${trans1.status}`);

    // Invalid transition: IN_PROGRESS -> COMPLETED (bypassing prototype, testing, pilot) -> DENY 400
    const invalidTrans = await fetch(`${baseUrl}/api/projects/${projectDoc._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${govToken}` },
      body: JSON.stringify({ status: 'completed' })
    });
    recordTest('Project State Machine (IN_PROGRESS -> COMPLETED Bypassing Steps Blocked)', 'State Machine', invalidTrans.status === 400, `HTTP ${invalidTrans.status}`);

    // Valid transition: IN_PROGRESS -> PROTOTYPE
    const trans2 = await fetch(`${baseUrl}/api/projects/${projectDoc._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${govToken}` },
      body: JSON.stringify({ status: 'prototype' })
    });
    recordTest('Project State Machine (IN_PROGRESS -> PROTOTYPE)', 'State Machine', trans2.status === 200, `HTTP ${trans2.status}`);

    // 5. PROPOSAL -> PROJECT DUP PROTECTION TEST
    const testPropDoc = await Proposal.create({
      challenge: challengeDoc._id,
      university: uniDoc._id,
      submittedBy: facultyUserId,
      title: 'Nanofiltration Solution Proposal',
      problemStatement: 'Groundwater contamination',
      proposedSolution: 'Solar driven filtration membrane',
      estimatedBudget: 450000,
      durationInMonths: 6,
      status: 'submitted'
    });

    // Approve proposal 1st time -> Creates Project
    const approveProp1 = await fetch(`${baseUrl}/api/proposals/${testPropDoc._id}/approve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${govToken}` }
    });
    const approveProp1Data = await approveProp1.json();
    const createdFromPropProjId = approveProp1Data.data?.project?._id;
    recordTest('Proposal Approval (Project Auto Created)', 'Proposal-Project Link', approveProp1.status === 200 && createdFromPropProjId && !approveProp1Data.data?.alreadyExisted, `Created Project ID: ${createdFromPropProjId}`);

    // Approve proposal 2nd time -> Returns existing project without duplicate creation!
    const approveProp2 = await fetch(`${baseUrl}/api/proposals/${testPropDoc._id}/approve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${govToken}` }
    });
    const approveProp2Data = await approveProp2.json();
    recordTest('Proposal Approval Duplicate Guard (Re-approval prevents Duplicate)', 'Proposal-Project Link', approveProp2.status === 200 && approveProp2Data.data?.alreadyExisted === true, `Already Existed: ${approveProp2Data.data?.alreadyExisted}`);

    // 6. MILESTONE SECURITY (Cross-Project Reattachment Guard)
    const updateM1Reattach = await fetch(`${baseUrl}/api/milestones/${m1Id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${facultyToken}` },
      body: JSON.stringify({ project: createdFromPropPropId = createdFromPropProjId })
    });
    recordTest('Milestone Security (Cross-Project Reattachment Blocked)', 'Milestone Security', updateM1Reattach.status === 403, `HTTP ${updateM1Reattach.status}`);

    // 7. REGRESSION CHECKS
    const challengeListRes = await fetch(`${baseUrl}/api/challenges`);
    recordTest('Regression: Challenge List API', 'Regression', challengeListRes.status === 200, `HTTP ${challengeListRes.status}`);

    const impactRes = await fetch(`${baseUrl}/api/impact/overview`);
    recordTest('Regression: Impact Metrics API', 'Regression', impactRes.status === 200, `HTTP ${impactRes.status}`);

  } catch (err) {
    console.error('PHASE 2 TEST EXCEPTION:', err);
  } finally {
    server.close();
    console.log('\n====== SUMMARY OF PHASE 2 AUDIT RESULTS ======\n');
    console.table(results);
    process.exit(0);
  }
}

runTests();
