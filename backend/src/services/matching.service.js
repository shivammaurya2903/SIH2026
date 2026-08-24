const calculateUniversityMatchScore = (challenge, university) => {
  let score = 0;
  const reasons = {
    domainExpertise: 0,
    facultyExpertise: 0,
    researchCapability: 0,
    infrastructure: 0,
    locationProximity: 0
  };
  const explanation = [];

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
    reasons.domainExpertise = 30;
    explanation.push(`Strong ${category.replace(/_/g, ' ')} domain specialization`);
  }

  challengeSkills.forEach((skill) => {
    if (expertiseText.includes(skill) || researchText.includes(skill)) {
      score += 15;
      reasons.facultyExpertise += 15;
      explanation.push(`Faculty expertise in ${skill}`);
    } else if (deptText.includes(skill) || facilityText.includes(skill)) {
      score += 10;
      reasons.researchCapability += 10;
      explanation.push(`R&D capability matching ${skill}`);
    }
  });

  challengeKeywords.forEach((kw) => {
    if (kw.length > 3 && (expertiseText.includes(kw) || researchText.includes(kw))) {
      score += 5;
      reasons.researchCapability += 5;
    }
  });

  if (facilityText.length > 0) {
    reasons.infrastructure = 10;
    score += 10;
    explanation.push('Available research laboratory & innovation facilities');
  }

  if (university.district && challenge.location?.district && 
      university.district.toLowerCase() === challenge.location.district.toLowerCase()) {
    score += 10;
    reasons.locationProximity = 10;
    explanation.push(`Located in target district (${university.district})`);
  }

  const finalScore = Math.min(100, Math.max(0, Math.round(score)));

  return {
    score: finalScore,
    reasons,
    explanation: explanation.length > 0 ? explanation : ['General academic & R&D capability match']
  };
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
    .map((university) => {
      const matchResult = calculateUniversityMatchScore(challenge, university);
      const score = typeof matchResult === 'number' ? matchResult : matchResult.score;
      return {
        university: university._id,
        name: university.name,
        matchScore: score,
        reasons: matchResult.reasons || { domainExpertise: 30, facultyExpertise: 25, researchCapability: 20, infrastructure: 10 },
        explanation: matchResult.explanation || ['Strong academic and R&D capability match']
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
};

const matchIndustries = async (challenge, industries = []) => {
  return industries
    .map((industry) => ({
      industry: industry._id,
      name: industry.name,
      matchScore: typeof calculateIndustryMatchScore(challenge, industry) === 'number'
        ? calculateIndustryMatchScore(challenge, industry)
        : calculateIndustryMatchScore(challenge, industry).score
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
};

module.exports = {
  calculateUniversityMatchScore,
  calculateIndustryMatchScore,
  matchUniversities,
  matchIndustries
};