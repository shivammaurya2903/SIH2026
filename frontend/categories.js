/* Canonical Category Mapping for JharInnovate / SamadhanSetu */
const CHALLENGE_CATEGORIES = [
  {
    value: "water",
    label: {
      en: "Water Infrastructure",
      hi: "जल अवसंरचना"
    },
    icon: "💧"
  },
  {
    value: "healthcare",
    label: {
      en: "Healthcare & Public Health",
      hi: "स्वास्थ्य सेवा एवं जन स्वास्थ्य"
    },
    icon: "🏥"
  },
  {
    value: "agriculture",
    label: {
      en: "Agriculture & Farming",
      hi: "कृषि एवं खेती"
    },
    icon: "🌾"
  },
  {
    value: "education",
    label: {
      en: "Education & Literacy",
      hi: "शिक्षा एवं साक्षरता"
    },
    icon: "🎓"
  },
  {
    value: "infrastructure",
    label: {
      en: "Infrastructure & Roads",
      hi: "अवसंरचना एवं सड़कें"
    },
    icon: "🛣️"
  },
  {
    value: "sanitation",
    label: {
      en: "Sanitation & Waste Management",
      hi: "स्वच्छता एवं अपशिष्ट प्रबंधन"
    },
    icon: "🗑️"
  },
  {
    value: "energy",
    label: {
      en: "Energy & Electricity",
      hi: "ऊर्जा एवं बिजली"
    },
    icon: "💡"
  },
  {
    value: "urban_development",
    label: {
      en: "Urban Development",
      hi: "शहरी विकास"
    },
    icon: "🏙️"
  },
  {
    value: "accessibility",
    label: {
      en: "Accessibility & Inclusion",
      hi: "सुलभता एवं समावेश"
    },
    icon: "♿"
  },
  {
    value: "public_administration",
    label: {
      en: "Public Administration & Governance",
      hi: "लोक प्रशासन एवं शासन"
    },
    icon: "🏛️"
  },
  {
    value: "rural_livelihoods",
    label: {
      en: "Rural Livelihoods & Employment",
      hi: "ग्रामीण आजीविका एवं रोजगार"
    },
    icon: "🚜"
  },
  {
    value: "environment",
    label: {
      en: "Environment & Conservation",
      hi: "पर्यावरण एवं संरक्षण"
    },
    icon: "🌱"
  },
  {
    value: "other",
    label: {
      en: "Other Societal Issues",
      hi: "अन्य सामाजिक मुद्दे"
    },
    icon: "📋"
  }
];

const CATEGORY_ALIASES = {
  "water infrastructure": "water",
  "water_infrastructure": "water",
  "water": "water",
  "agriculture": "agriculture",
  "agri": "agriculture",
  "rural health": "healthcare",
  "rural_health": "healthcare",
  "healthcare": "healthcare",
  "health": "healthcare",
  "education technology": "education",
  "education_technology": "education",
  "education": "education",
  "edu": "education",
  "roads & infra": "infrastructure",
  "roads_&_infra": "infrastructure",
  "roads": "infrastructure",
  "infrastructure": "infrastructure",
  "infra": "infrastructure",
  "waste management": "sanitation",
  "waste_management": "sanitation",
  "sanitation": "sanitation",
  "waste": "sanitation",
  "clean energy": "energy",
  "clean_energy": "energy",
  "electricity": "energy",
  "energy": "energy",
  "public safety": "public_administration",
  "public_administration": "public_administration",
  "pubadmin": "public_administration",
  "urban_development": "urban_development",
  "urban": "urban_development",
  "accessibility": "accessibility",
  "access": "accessibility",
  "rural_livelihoods": "rural_livelihoods",
  "livelihoods": "rural_livelihoods",
  "environment": "environment",
  "other": "other"
};

/**
 * Normalizes any category string (canonical enum or legacy alias) to canonical backend enum value.
 */
function normalizeCategoryValue(rawCategory) {
  if (!rawCategory) return "other";
  const lower = String(rawCategory).trim().toLowerCase();
  if (CATEGORY_ALIASES[lower]) {
    return CATEGORY_ALIASES[lower];
  }
  const match = CHALLENGE_CATEGORIES.find(c => c.value === lower);
  if (match) return match.value;
  return "other";
}

/**
 * Returns human-friendly label for a category in the specified language ('en' or 'hi').
 */
function getCategoryLabel(rawCategory, lang = 'en') {
  const canonicalVal = normalizeCategoryValue(rawCategory);
  const found = CHALLENGE_CATEGORIES.find(c => c.value === canonicalVal);
  if (!found) return canonicalVal;
  return found.label[lang] || found.label.en;
}

/**
 * Returns icon emoji for a category.
 */
function getCategoryIcon(rawCategory) {
  const canonicalVal = normalizeCategoryValue(rawCategory);
  const found = CHALLENGE_CATEGORIES.find(c => c.value === canonicalVal);
  return found ? found.icon : "📋";
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CHALLENGE_CATEGORIES,
    CATEGORY_ALIASES,
    normalizeCategoryValue,
    getCategoryLabel,
    getCategoryIcon
  };
}
