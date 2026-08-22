const calculateUniversityMatchScore = (challenge, university) => {
  let score = 0;

  const challengeSkills = (challenge.aiAnalysis?.requiredSkills || []).map((s) => s.toLowerCase());
  const challengeKeywords = (challenge.aiAnalysis?.keywords || []).map((k) => k.toLowerCase());
  const category = (challenge.category || '').toLowerCase();

  const deptText = (university.departments || []).join(' ').toLowerCase();
  const expertiseText = (university.expertise || []).join(' ').toLowerCase();
  const researchText = (university.researchAreas || []).join(' ').toLowerCase();
  const facilityText = [
    ...(university.facilities || []),
    ...(university.laboratories || []),
    ...(university.innovationCenters || []),
    ...(university.incubationFacilities || [])
  ].join(' ').toLowerCase();

  if (deptText.includes(category) || expertiseText.includes(category) || researchText.includes(category)) {
    score += 30;
  }

  challengeSkills.forEach((skill) => {
    if (expertiseText.includes(skill) || researchText.includes(skill)) {
      score += 15;
    } else if (deptText.includes(skill) || facilityText.includes(skill)) {
      score += 10;
    }
  });

  challengeKeywords.forEach((kw) => {
    if (kw.length > 3 && (expertiseText.includes(kw) || researchText.includes(kw))) {
      score += 5;
    }
  });

  if (university.district && challenge.location?.district && 
      university.district.toLowerCase() === challenge.location.district.toLowerCase()) {
    score += 10;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
};

const calculateIndustryMatchScore = (challenge, industry) => {
  let score = 0;

  const challengeSkills = (challenge.aiAnalysis?.requiredSkills || []).map((s) => s.toLowerCase());
  const category = (challenge.category || '').toLowerCase();

  const domainText = (industry.domains || []).join(' ').toLowerCase();
  const techText = (industry.technologies || []).join(' ').toLowerCase();
  const csrText = (industry.csrInterests || []).join(' ').toLowerCase();
  const capText = [
    ...(industry.fundingCapabilities || []),
    ...(industry.mentorshipCapabilities || []),
    ...(industry.prototypingCapabilities || []),
    ...(industry.deploymentCapabilities || [])
  ].join(' ').toLowerCase();

  if (domainText.includes(category) || csrText.includes(category)) {
    score += 35;
  }

  challengeSkills.forEach((skill) => {
    if (techText.includes(skill)) {
      score += 15;
    } else if (capText.includes(skill) || domainText.includes(skill)) {
      score += 10;
    }
  });

  if (industry.district && challenge.location?.district && 
      industry.district.toLowerCase() === challenge.location.district.toLowerCase()) {
    score += 10;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
};

const matchUniversities = async (challenge, universities = []) => {
  return universities
    .map((university) => ({
      university: university._id,
      name: university.name,
      matchScore: calculateUniversityMatchScore(challenge, university)
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
};

const matchIndustries = async (challenge, industries = []) => {
  return industries
    .map((industry) => ({
      industry: industry._id,
      name: industry.name,
      matchScore: calculateIndustryMatchScore(challenge, industry)
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
};

module.exports = {
  calculateUniversityMatchScore,
  calculateIndustryMatchScore,
  matchUniversities,
  matchIndustries
};