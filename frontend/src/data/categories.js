export const CATEGORIES = [
  { id: 'education', nameEn: 'Education & Literacy', nameHi: 'शिक्षा एवं साक्षरता', icon: '🎓' },
  { id: 'healthcare', nameEn: 'Healthcare & Nutrition', nameHi: 'स्वास्थ्य सेवा एवं पोषण', icon: '🏥' },
  { id: 'agriculture', nameEn: 'Agriculture & Farming', nameHi: 'कृषि एवं खेती', icon: '🌾' },
  { id: 'water', nameEn: 'Water Infrastructure & Sanitation', nameHi: 'जल अवसंरचना एवं स्वच्छता', icon: '💧' },
  { id: 'sanitation', nameEn: 'Sanitation & Waste Management', nameHi: 'स्वच्छता एवं कचरा प्रबंधन', icon: '🧹' },
  { id: 'environment', nameEn: 'Environment & Climate Response', nameHi: 'पर्यावरण एवं जलवायु प्रतिक्रिया', icon: '🌱' },
  { id: 'energy', nameEn: 'Renewable Energy & Power', nameHi: 'नवीकरणीय ऊर्जा एवं बिजली', icon: '⚡' },
  { id: 'urban_development', nameEn: 'Urban Development & Housing', nameHi: 'शहरी विकास एवं आवास', icon: '🏙️' },
  { id: 'accessibility', nameEn: 'Disability Accessibility', nameHi: 'दिव्यांग सुगमता', icon: '♿' },
  { id: 'public_administration', nameEn: 'Public Administration & Services', nameHi: 'लोक प्रशासन एवं जन सेवाएं', icon: '🏛️' },
  { id: 'rural_livelihoods', nameEn: 'Rural Livelihoods & Skill Development', nameHi: 'ग्रामीण आजीविका एवं कौशल विकास', icon: '🛠️' },
  { id: 'infrastructure', nameEn: 'Roads & Rural Infrastructure', nameHi: 'सड़क एवं ग्रामीण अवसंरचना', icon: '🛣️' },
  { id: 'other', nameEn: 'General Community Issue', nameHi: 'सामान्य सामुदायिक समस्या', icon: '📌' }
];

export const getCategoryLabel = (catId, lang = 'en') => {
  const found = CATEGORIES.find(c => c.id === catId);
  if (!found) return catId || 'General';
  return lang === 'hi' ? found.nameHi : found.nameEn;
};
