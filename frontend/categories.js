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

/* Canonical 24 Jharkhand Districts & Administrative Hierarchy */
const JHARKHAND_DISTRICTS = [
  { value: "Bokaro", label: { en: "Bokaro", hi: "बोकारो" }, blocks: ["Chas", "Bermo", "Chandankiyari", "Jaridih", "Kasmar", "Nawadih", "Petarwar", "Gomia"] },
  { value: "Chatra", label: { en: "Chatra", hi: "चतरा" }, blocks: ["Chatra Sadar", "Hunterganj", "Itkhori", "Simaria", "Tandwa", "Pratappur", "Gidhour", "Pathalgada", "Kanhachatti", "Lawalong"] },
  { value: "Deoghar", label: { en: "Deoghar", hi: "देवघर" }, blocks: ["Deoghar Sadar", "Devipur", "Mohanpur", "Sarwan", "Sarath", "Palojori", "Karpathar", "Margomunda", "Karon", "Sonaraithari"] },
  { value: "Dhanbad", label: { en: "Dhanbad", hi: "धनबाद" }, blocks: ["Dhanbad Sadar", "Jharia", "Baghmara", "Nirsa", "Govindpur", "Tundi", "East Tundi", "Topchanchi", "Baliapur", "Kaliasole"] },
  { value: "Dumka", label: { en: "Dumka", hi: "दुमका" }, blocks: ["Dumka Sadar", "Gopikandar", "Jama", "Jarmundi", "Kathikund", "Masalia", "Ramgarh", "Raneshwar", "Shikharipara", "Saraiyahat"] },
  { value: "East Singhbhum", label: { en: "East Singhbhum", hi: "पूर्वी सिंहभूम" }, blocks: ["Golmuri-cum-Jugsalai (Jamshedpur)", "Potka", "Patamda", "Borasol", "Ghatshila", "Musabani", "Dhalbhumgarh", "Ghurabandha", "Chakulia", "Baharagora"] },
  { value: "Garhwa", label: { en: "Garhwa", hi: "गढ़वा" }, blocks: ["Garhwa Sadar", "Meral", "Ranka", "Bhandaria", "Bhawnathpur", "Kharaundhi", "Kandi", "Majhiaon", "Nagar Untari", "Ramkanda"] },
  { value: "Giridih", label: { en: "Giridih", hi: "गिरिडीह" }, blocks: ["Giridih Sadar", "Gandey", "Bengabad", "Dumri", "Bagodar", "Sariya", "Pirtand", "Rajdhanwar", "Jamua", "Deori", "Tisri", "Gawan"] },
  { value: "Godda", label: { en: "Godda", hi: "गोड्डा" }, blocks: ["Godda Sadar", "Poreyahat", "Sundarpahari", "Pathargama", "Mahagama", "Mehma", "Boarijor", "Thakurgangti", "Hanwara"] },
  { value: "Gumla", label: { en: "Gumla", hi: "गुमला" }, blocks: ["Gumla Sadar", "Ghaghra", "Sisai", "Verno", "Kamdara", "Basia", "Palkot", "Raidih", "Chainpur", "Dumri", "Albert Ekka (Jari)"] },
  { value: "Hazaribagh", label: { en: "Hazaribagh", hi: "हजारीबाग" }, blocks: ["Sadar Hazaribagh", "Katkamsandi", "Katkamdag", "Ichak", "Barhi", "Chouparan", "Barkatha", "Bishnugarh", "Barkagaon", "Keradari", "Tati Jharia", "Daru"] },
  { value: "Jamtara", label: { en: "Jamtara", hi: "जामताड़ा" }, blocks: ["Jamtara Sadar", "Narayanpur", "Kundu", "Nala", "Fatehpur", "Karma Tanr"] },
  { value: "Khunti", label: { en: "Khunti", hi: "खूंटी" }, blocks: ["Khunti Sadar", "Murhu", "Torpa", "Rania", "Karra", "Arki"] },
  { value: "Koderma", label: { en: "Koderma", hi: "कोडरमा" }, blocks: ["Koderma Sadar", "Jainagar", "Chandwara", "Markacho", "Satgawan", "Domchanch"] },
  { value: "Latehar", label: { en: "Latehar", hi: "लातेहार" }, blocks: ["Latehar Sadar", "Chandwa", "Balumath", "Barwadih", "Mahuadanr", "Manika", "Herhanj", "Garu", "Bariatu"] },
  { value: "Lohardaga", label: { en: "Lohardaga", hi: "लोहरदगा" }, blocks: ["Lohardaga Sadar", "Kero", "Kuru", "Senha", "Bhandra", "Peshrar", "Kisko"] },
  { value: "Pakur", label: { en: "Pakur", hi: "पाकुड़" }, blocks: ["Pakur Sadar", "Hiranpur", "Littipara", "Amrapara", "Pakuria", "Maheshpur"] },
  { value: "Palamu", label: { en: "Palamu", hi: "पलामू" }, blocks: ["Medininagar (Daltonganj)", "Chainpur", "Lesliganj", "Panki", "Satbarwa", "Patan", "Chhatarpur", "Hariharganj", "Hussainabad", "Haidernagar", "Bishrampur", "Nawa Bazar", "Pandu", "Untari Road", "Tarhassi"] },
  { value: "Ramgarh", label: { en: "Ramgarh", hi: "रामगढ़" }, blocks: ["Ramgarh Sadar", "Gola", "Mandu", "Patratu", "Dulmi", "Chittorpur"] },
  { value: "Ranchi", label: { en: "Ranchi", hi: "रांची" }, blocks: ["Kanke", "Ranchi Urban / ULB", "Ormanjhi", "Namkum", "Ratu", "Nagri", "Mandar", "Bero", "Itki", "Burmu", "Khelari", "Bundu", "Rahe", "Sonahatu", "Silli", "Angara", "Chanho", "Lapung", "Tamar"] },
  { value: "Sahibganj", label: { en: "Sahibganj", hi: "साहिबगंज" }, blocks: ["Sahibganj Sadar", "Borio", "Taljhari", "Rajmahal", "Udhwa", "Pathna", "Barharwa", "Barhait", "Mandro"] },
  { value: "Seraikela-Kharsawan", label: { en: "Seraikela-Kharsawan", hi: "सरायकेला खरसावां" }, blocks: ["Seraikela", "Kharsawan", "Gamharia (Adityapur)", "Govindpur", "Rajnagar", "Kuchai", "Ichagarh", "Kukru", "Nimdih", "Chandil"] },
  { value: "Simdega", label: { en: "Simdega", hi: "सिमडेगा" }, blocks: ["Simdega Sadar", "Kurdeg", "Kerai", "Bano", "Kolebira", "Thethaitangar", "Jaldega", "Bansjor", "Bolba", "Pakartanr"] },
  { value: "West Singhbhum", label: { en: "West Singhbhum", hi: "पश्चिमी सिंहभूम" }, blocks: ["Chaibasa (Sadar)", "Jhinkpani", "Tonto", "Khuntpani", "Tantara", "Hatgamharia", "Jagannathpur", "Noamundi", "Kumardungi", "Manjhari", "Majhgaon", "Chakradharpur", "Bandgaon", "Sonua", "Goilkera", "Manoharpur", "Anandpur", "Gudri"] }
];

/**
 * Returns human-friendly district name in requested language ('en' or 'hi')
 */
function getDistrictLabel(rawDistrict, lang = 'en') {
  if (!rawDistrict) return 'Ranchi';
  const found = JHARKHAND_DISTRICTS.find(d => d.value.toLowerCase() === String(rawDistrict).trim().toLowerCase());
  if (!found) return rawDistrict;
  return found.label[lang] || found.label.en;
}

/**
 * Returns array of administrative blocks for a given district
 */
function getBlocksForDistrict(rawDistrict) {
  if (!rawDistrict) return ["Sadar Block", "Urban Local Body / Ward", "North Block", "South Block"];
  const found = JHARKHAND_DISTRICTS.find(d => d.value.toLowerCase() === String(rawDistrict).trim().toLowerCase());
  return found ? found.blocks : ["Sadar Block", "Urban Local Body / Ward", "North Block", "South Block"];
}

/**
 * Global 401 Session Invalidation Helper
 * If server returns 401 or invalid token message, clears localStorage session and redirects to login.
 */
function handleAuthError(res, data) {
  const is401 = (res && res.status === 401) ||
                (data && data.message && (
                  data.message.includes('no longer exists') ||
                  data.message.includes('expired') ||
                  data.message.includes('malformed') ||
                  data.message.includes('token')
                ));
  if (is401) {
    localStorage.removeItem('jhar_token');
    localStorage.removeItem('jhar_user');
    const msg = (typeof getLanguage === 'function' && getLanguage() === 'hi')
      ? 'आपका सत्र समाप्त हो गया है। कृपया पुनः साइन इन करें।'
      : 'Your session has expired. Please sign in again.';
    alert(msg);
    window.location.href = 'login.html';
    return true;
  }
  return false;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CHALLENGE_CATEGORIES,
    CATEGORY_ALIASES,
    JHARKHAND_DISTRICTS,
    normalizeCategoryValue,
    getCategoryLabel,
    getCategoryIcon,
    getDistrictLabel,
    getBlocksForDistrict,
    handleAuthError
  };
}
