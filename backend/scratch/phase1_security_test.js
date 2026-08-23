require('../src/config/env');
const connectDB = require('../src/config/db');
const app = require('../src/app');
const User = require('../src/models/User');
const University = require('../src/models/University');
const Industry = require('../src/models/Industry');
const Challenge = require('../src/models/Challenge');
const Project = require('../src/models/Project');
const Collaboration = require('../src/models/Collaboration');

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

  server = app.listen(5009);
  baseUrl = 'http://localhost:5009';

  console.log('\n====== STARTING PHASE 1 SECURITY & REGRESSION AUDIT SUITE ======\n');

  try {
    // 1. Health check
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthJson = await healthRes.json();
    recordTest('Health Check Endpoint', 'System', healthRes.status === 200 && healthJson.success, `HTTP ${healthRes.status}`);

    // 2. CORS check
    const corsRes = await fetch(`${baseUrl}/api/health`, {
      headers: { Origin: 'http://malicious-hacker-site.com' }
    });
    const corsHeader = corsRes.headers.get('access-control-allow-origin');
    recordTest('CORS Origin Restriction', 'CORS', !corsHeader || corsHeader !== 'http://malicious-hacker-site.com', `Allowed Origin Header: ${corsHeader || 'None'}`);

    // Clean up test users & documents from previous runs
    await User.deleteMany({ email: /@testdomain\.com$/ });
    await University.deleteMany({ code: /^TEST-UNI-/ });
    await Industry.deleteMany({ email: /@testdomain\.com$/ });
    await Challenge.deleteMany({ title: /^TEST-/ });

    // 3. User Registration
    const citizenReg = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Citizen A',
        email: 'citizena@testdomain.com',
        password: 'password123',
        role: 'citizen'
      })
    });
    const citizenData = await citizenReg.json();
    const citizenToken = citizenData.data?.token;
    recordTest('Citizen Public Registration', 'Auth', citizenReg.status === 201 && citizenToken, `HTTP ${citizenReg.status}`);

    // 4. Role Escalation Prevention during Registration
    const adminEscalationReg = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Fake Admin',
        email: 'fakeadmin@testdomain.com',
        password: 'password123',
        role: 'admin'
      })
    });
    recordTest('Role Escalation Prevention (Admin Register)', 'Auth', adminEscalationReg.status === 403, `HTTP ${adminEscalationReg.status}`);

    // Register University A User
    const uniAReg = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Uni Admin A',
        email: 'unia@testdomain.com',
        password: 'password123',
        role: 'university',
        organization: 'Ranchi University A'
      })
    });
    const uniAData = await uniAReg.json();
    const uniAToken = uniAData.data?.token;
    const uniAUserId = uniAData.data?.user?.id;

    // Register University B User
    const uniBReg = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Uni Admin B',
        email: 'unib@testdomain.com',
        password: 'password123',
        role: 'university',
        organization: 'Dhanbad Institute B'
      })
    });
    const uniBData = await uniBReg.json();
    const uniBToken = uniBData.data?.token;

    // Register Industry A User
    const indAReg = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Industry Admin A',
        email: 'inda@testdomain.com',
        password: 'password123',
        role: 'industry',
        organization: 'Tata Steel Tech A'
      })
    });
    const indAData = await indAReg.json();
    const indAToken = indAData.data?.token;
    const indAUserId = indAData.data?.user?.id;

    // Register Industry B User
    const indBReg = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Industry Admin B',
        email: 'indb@testdomain.com',
        password: 'password123',
        role: 'industry',
        organization: 'Bokaro Industries B'
      })
    });
    const indBData = await indBReg.json();
    const indBToken = indBData.data?.token;

    // Create Government User directly in DB for testing admin operations
    const govUser = await User.create({
      name: 'Jharkhand Gov Official',
      email: 'official@testdomain.com',
      password: 'password123',
      role: 'government',
      isActive: true
    });

    const govLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'official@testdomain.com',
        password: 'password123'
      })
    });
    const govLoginData = await govLoginRes.json();
    const govToken = govLoginData.data?.token;
    recordTest('Government Login & Token Generation', 'Auth', govLoginRes.status === 200 && govToken, `HTTP ${govLoginRes.status}`);

    // Create a base Challenge for test projects
    const testChallengeDoc = await Challenge.create({
      title: 'TEST-Water Contamination in District',
      description: 'High fluoride content in groundwater',
      category: 'water',
      location: { district: 'Ranchi' },
      submittedBy: citizenData.data?.user?.id
    });

    // 5. University Profile Creation & IDOR Verification
    const uniDocA = await University.create({
      name: 'Ranchi University A',
      code: 'TEST-UNI-A',
      email: 'unia@testdomain.com',
      district: 'Ranchi',
      departments: ['Computer Science', 'Civil Engineering'],
      expertise: ['water management', 'ai']
    });

    const uniDocB = await University.create({
      name: 'Dhanbad Institute B',
      code: 'TEST-UNI-B',
      email: 'unib@testdomain.com',
      district: 'Dhanbad',
      departments: ['Mining', 'Electrical Engineering'],
      expertise: ['solar energy', 'soil health']
    });

    // Test: University A updates University A -> ALLOW
    const updateUniAByA = await fetch(`${baseUrl}/api/universities/${uniDocA._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${uniAToken}`
      },
      body: JSON.stringify({ description: 'Updated by Uni A' })
    });
    recordTest('University IDOR (Self Update)', 'University IDOR', updateUniAByA.status === 200, `HTTP ${updateUniAByA.status}`);

    // Test: University A updates University B -> DENY
    const updateUniBByA = await fetch(`${baseUrl}/api/universities/${uniDocB._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${uniAToken}`
      },
      body: JSON.stringify({ description: 'Hacked by Uni A' })
    });
    recordTest('University IDOR (Cross-University Attack)', 'University IDOR', updateUniBByA.status === 403, `HTTP ${updateUniBByA.status}`);

    // Test: Citizen updates University A -> DENY
    const updateUniByCitizen = await fetch(`${baseUrl}/api/universities/${uniDocA._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${citizenToken}`
      },
      body: JSON.stringify({ description: 'Hacked by Citizen' })
    });
    recordTest('University IDOR (Citizen Update Denied)', 'University IDOR', updateUniByCitizen.status === 403, `HTTP ${updateUniByCitizen.status}`);

    // 6. Industry Profile Creation & IDOR Verification
    const indDocA = await Industry.create({
      name: 'Tata Steel Tech A',
      email: 'inda@testdomain.com',
      district: 'East Singhbhum',
      domains: ['water management', 'manufacturing'],
      technologies: ['IoT', 'Solar']
    });

    const indDocB = await Industry.create({
      name: 'Bokaro Industries B',
      email: 'indb@testdomain.com',
      district: 'Bokaro',
      domains: ['energy'],
      technologies: ['Automation']
    });

    // Test: Industry A updates Industry A -> ALLOW
    const updateIndAByA = await fetch(`${baseUrl}/api/industries/${indDocA._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${indAToken}`
      },
      body: JSON.stringify({ description: 'Updated by Industry A' })
    });
    recordTest('Industry IDOR (Self Update)', 'Industry IDOR', updateIndAByA.status === 200, `HTTP ${updateIndAByA.status}`);

    // Test: Industry A updates Industry B -> DENY
    const updateIndBByA = await fetch(`${baseUrl}/api/industries/${indDocB._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${indAToken}`
      },
      body: JSON.stringify({ description: 'Hacked by Industry A' })
    });
    recordTest('Industry IDOR (Cross-Industry Attack)', 'Industry IDOR', updateIndBByA.status === 403, `HTTP ${updateIndBByA.status}`);

    // 7. Collaboration IDOR Verification
    const testProject = await Project.create({
      title: 'Solar Water Filtration Unit',
      description: 'Clean drinking water for rural villages',
      challenge: testChallengeDoc._id,
      university: uniDocA._id,
      createdBy: govUser._id
    });

    const collabReq = await Collaboration.create({
      project: testProject._id,
      university: uniDocA._id,
      industry: indDocA._id,
      requestedBy: indAUserId, // Requested by Industry A User
      type: 'funding',
      message: 'We offer 5 Lakhs funding'
    });

    // Test: Sender (Industry A) tries to accept own request -> DENY
    const senderAccept = await fetch(`${baseUrl}/api/collaborations/${collabReq._id}/accept`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${indAToken}` }
    });
    recordTest('Collaboration IDOR (Sender Cannot Accept Self)', 'Collaboration IDOR', senderAccept.status === 403, `HTTP ${senderAccept.status}`);

    // Test: Unrelated Industry B tries to accept -> DENY
    const intruderAccept = await fetch(`${baseUrl}/api/collaborations/${collabReq._id}/accept`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${indBToken}` }
    });
    recordTest('Collaboration IDOR (Intruder Industry Cannot Accept)', 'Collaboration IDOR', intruderAccept.status === 403, `HTTP ${intruderAccept.status}`);

    // Test: Authorized University A accepts -> ALLOW
    const targetUniAccept = await fetch(`${baseUrl}/api/collaborations/${collabReq._id}/accept`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${uniAToken}` }
    });
    recordTest('Collaboration IDOR (Authorized Recipient Accepts)', 'Collaboration IDOR', targetUniAccept.status === 200, `HTTP ${targetUniAccept.status}`);

    // 8. Project RBAC & Ownership Verification
    // Test: Citizen tries to create a project directly -> DENY
    const citizenCreateProj = await fetch(`${baseUrl}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${citizenToken}`
      },
      body: JSON.stringify({
        title: 'Unauthorized Citizen Project',
        description: 'Should be blocked by RBAC',
        challenge: testChallengeDoc._id
      })
    });
    recordTest('Project RBAC (Citizen Create Denied)', 'Project RBAC', citizenCreateProj.status === 403, `HTTP ${citizenCreateProj.status}`);

    // Test: University A creates project -> ALLOW
    const uniCreateProj = await fetch(`${baseUrl}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${uniAToken}`
      },
      body: JSON.stringify({
        title: 'Ranchi Water Project',
        description: 'High capacity filtration project',
        challenge: testChallengeDoc._id,
        university: uniDocA._id
      })
    });
    const uniProjData = await uniCreateProj.json();
    const uniProjId = uniProjData.data?._id;
    recordTest('Project RBAC (University Create Allowed)', 'Project RBAC', uniCreateProj.status === 201 && uniProjId, `HTTP ${uniCreateProj.status}`);

    // Test: Industry B tries to modify University A's project -> DENY
    const indModifyUniProj = await fetch(`${baseUrl}/api/projects/${uniProjId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${indBToken}`
      },
      body: JSON.stringify({ title: 'Hacked Title' })
    });
    recordTest('Project Ownership (Cross-Role Update Denied)', 'Project Ownership', indModifyUniProj.status === 403, `HTTP ${indModifyUniProj.status}`);

    // 9. Mass Assignment Field Injection Protection
    const massAssignRes = await fetch(`${baseUrl}/api/challenges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${citizenToken}`
      },
      body: JSON.stringify({
        title: 'Dirty Water in Village',
        description: 'Water source contaminated with iron and bacteria',
        category: 'water',
        location: { district: 'Ranchi' },
        status: 'approved', // Injected status! Should be sanitized to 'submitted'
        priority: 'critical' // Injected priority! Should be sanitized to 'medium'
      })
    });
    const massAssignData = await massAssignRes.json();
    const createdChallenge = massAssignData.data;
    recordTest(
      'Mass Assignment Protection (Status Injection Stripped)',
      'Mass Assignment',
      massAssignRes.status === 201 && createdChallenge.status === 'submitted',
      `Assigned Status: ${createdChallenge?.status}`
    );

    // 10. Invalid ObjectId Validation
    const invalidObjIdRes = await fetch(`${baseUrl}/api/projects/not-an-id`, {
      headers: { Authorization: `Bearer ${citizenToken}` }
    });
    recordTest('Invalid ObjectId Validation (HTTP 400)', 'ObjectId Validation', invalidObjIdRes.status === 400, `HTTP ${invalidObjIdRes.status}`);

    const invalidImpactObjIdRes = await fetch(`${baseUrl}/api/impact/project/invalid-id`);
    recordTest('Invalid Impact ObjectId Validation (HTTP 400)', 'ObjectId Validation', invalidImpactObjIdRes.status === 400, `HTTP ${invalidImpactObjIdRes.status}`);

    // 11. Sensitive Data Leakage Check
    const meRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${citizenToken}` }
    });
    const meData = await meRes.json();
    recordTest('Response Security (No Password Leakage)', 'Security', meRes.status === 200 && !meData.data.password && !meData.data.passwordHash, 'Password absent from payload');

    // 12. Regression: Groq AI & Matching Workflow
    if (createdChallenge && createdChallenge._id) {
      const aiRes = await fetch(`${baseUrl}/api/challenges/${createdChallenge._id}/analyze`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${citizenToken}` }
      });
      const aiData = await aiRes.json();
      recordTest('Groq AI Analysis & Duplicate Check Workflow', 'Regression', aiRes.status === 200 && aiData.data?.aiAnalysis, `Priority Score: ${aiData.data?.aiAnalysis?.priorityScore}`);

      const matchRes = await fetch(`${baseUrl}/api/challenges/${createdChallenge._id}/matches`, {
        headers: { Authorization: `Bearer ${citizenToken}` }
      });
      const matchData = await matchRes.json();
      recordTest('University & Industry Matching Engine', 'Regression', matchRes.status === 200 && Array.isArray(matchData.data?.universities), `Matches Calculated: ${matchData.data?.universities?.length}`);
    }

    // 13. Regression: Analytics Endpoint
    const analyticsRes = await fetch(`${baseUrl}/api/analytics/overview`);
    const analyticsData = await analyticsRes.json();
    recordTest('Analytics Overview Aggregation', 'Regression', analyticsRes.status === 200 && analyticsData.success, `Total Challenges: ${analyticsData.data?.totalChallenges}`);

  } catch (err) {
    console.error('TEST SUITE EXCEPTION:', err);
  } finally {
    server.close();
    console.log('\n====== SUMMARY OF PHASE 1 SECURITY AUDIT RESULTS ======\n');
    console.table(results);
    process.exit(0);
  }
}

runTests();
