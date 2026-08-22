const Groq = require('groq-sdk');
const config = require('../config/env');
const { CATEGORIES, PRIORITY_LEVELS } = require('../utils/constants');

let groqClient = null;

const getGroqClient = () => {
  const apiKey = config.groqApiKey || process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured');
  }
  if (!groqClient) {
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
};

const sanitizeCategory = (category) => {
  if (!category) return 'other';
  const catLower = String(category).toLowerCase().trim().replace(/[\s-]+/g, '_');
  if (CATEGORIES.includes(catLower)) return catLower;
  const match = CATEGORIES.find((c) => catLower.includes(c) || c.includes(catLower));
  return match || 'other';
};

const sanitizeSeverity = (severity) => {
  if (!severity) return 'medium';
  const sevLower = String(severity).toLowerCase().trim();
  const valid = ['low', 'medium', 'high', 'critical'];
  return valid.includes(sevLower) ? sevLower : 'medium';
};

const sanitizeScore = (score) => {
  const num = Number(score);
  if (isNaN(num)) return 50;
  return Math.max(0, Math.min(100, Math.round(num)));
};

const analyzeChallenge = async (challenge) => {
  const modelName = process.env.AI_MODEL || config.aiModel || 'llama-3.3-70b-versatile';

  const systemPrompt = `You are an AI problem classification system for the Government of Jharkhand's Societal Innovation Platform.
Your task is to analyze societal challenge submissions from citizens and produce strict, valid JSON output containing categorization, severity assessment, technical skill requirements, and priority scoring.

CATEGORIES ALLOWED: ${CATEGORIES.join(', ')}
SEVERITY ALLOWED: low, medium, high, critical

OUTPUT JSON STRUCTURE ONLY (No markdown wrappers, no commentary):
{
  "category": "<one of allowed categories>",
  "subCategory": "<specific sub-domain string>",
  "severity": "<low|medium|high|critical>",
  "priorityScore": <integer 0 to 100 representing societal urgency and impact>,
  "keywords": ["<keyword1>", "<keyword2>", "<keyword3>"],
  "requiredSkills": ["<skill1>", "<skill2>", "<skill3>"],
  "summary": "<concise 2-3 sentence executive summary of the problem>"
}`;

  const userPrompt = `CHALLENGE DETAILS:
Title: ${challenge.title}
Category Selected by User: ${challenge.category || 'N/A'}
Description: ${challenge.description}
Location: ${challenge.location?.district || 'Unknown District'}, ${challenge.location?.block || ''}, Jharkhand
Expected Outcome: ${challenge.expectedOutcome || 'N/A'}`;

  try {
    const client = getGroqClient();
    const response = await client.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: modelName,
      temperature: 0.2,
      response_format: { type: 'json_object' }
    });

    const rawContent = response.choices[0]?.message?.content || '{}';
    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch (e) {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    }

    return {
      category: sanitizeCategory(parsed.category || challenge.category),
      subCategory: String(parsed.subCategory || challenge.subCategory || '').trim(),
      severity: sanitizeSeverity(parsed.severity),
      priorityScore: sanitizeScore(parsed.priorityScore),
      keywords: Array.isArray(parsed.keywords) ? parsed.keywords.map(String) : [],
      requiredSkills: Array.isArray(parsed.requiredSkills) ? parsed.requiredSkills.map(String) : [],
      summary: String(parsed.summary || challenge.description || '').trim()
    };
  } catch (error) {
    console.error('Groq AI Analysis Error:', error.message);
    return {
      category: sanitizeCategory(challenge.category),
      subCategory: challenge.subCategory || '',
      severity: 'medium',
      priorityScore: 50,
      keywords: challenge.title ? challenge.title.split(' ').slice(0, 5) : [],
      requiredSkills: ['general problem solving'],
      summary: challenge.description || challenge.title || ''
    };
  }
};

const tokenize = (text) => {
  if (!text) return new Set();
  return new Set(
    String(text)
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 3)
  );
};

const calculateJaccardSimilarity = (setA, setB) => {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  setA.forEach((token) => {
    if (setB.has(token)) intersection++;
  });
  const union = setA.size + setB.size - intersection;
  return union > 0 ? (intersection / union) * 100 : 0;
};

const detectDuplicates = async (challenge, existingChallenges = []) => {
  const currentTokens = tokenize(`${challenge.title} ${challenge.description}`);
  const currentDistrict = challenge.location?.district?.toLowerCase();
  const currentCategory = challenge.category;

  const related = [];
  let maxScore = 0;

  existingChallenges.forEach((item) => {
    if (String(item._id) === String(challenge._id)) return;

    const itemTokens = tokenize(`${item.title} ${item.description}`);
    const tokenScore = calculateJaccardSimilarity(currentTokens, itemTokens);

    let bonus = 0;
    if (item.category === currentCategory) bonus += 15;
    if (item.location?.district?.toLowerCase() === currentDistrict) bonus += 15;

    const finalScore = Math.min(100, Math.round(tokenScore + bonus));

    if (finalScore >= 35) {
      related.push({
        challengeId: item._id,
        title: item.title,
        similarityScore: finalScore
      });
    }

    if (finalScore > maxScore) {
      maxScore = finalScore;
    }
  });

  related.sort((a, b) => b.similarityScore - a.similarityScore);

  return {
    isDuplicate: maxScore >= 60,
    relatedChallenges: related.map((r) => r.challengeId),
    similarityScore: maxScore
  };
};

module.exports = {
  analyzeChallenge,
  detectDuplicates
};