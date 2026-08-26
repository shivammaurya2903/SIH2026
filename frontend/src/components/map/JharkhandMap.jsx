import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

const DISTRICT_HOTSPOTS = [
  { id: 'ranchi', name: 'Ranchi', nameHi: 'रांची', top: '56%', left: '44%', issues: 42, projects: 12, rating: '9.4' },
  { id: 'dhanbad', name: 'Dhanbad', nameHi: 'धनबाद', top: '38%', left: '76%', issues: 38, projects: 9, rating: '9.1' },
  { id: 'jamshedpur', name: 'East Singhbhum', nameHi: 'पूर्वी सिंहभूम', top: '78%', left: '74%', issues: 31, projects: 8, rating: '8.9' },
  { id: 'bokaro', name: 'Bokaro', nameHi: 'बोकारो', top: '44%', left: '68%', issues: 29, projects: 7, rating: '8.8' },
  { id: 'hazaribagh', name: 'Hazaribagh', nameHi: 'हजारीबाग', top: '38%', left: '48%', issues: 25, projects: 6, rating: '8.6' },
  { id: 'deoghar', name: 'Deoghar', nameHi: 'देवघर', top: '24%', left: '68%', issues: 22, projects: 5, rating: '8.5' },
  { id: 'giridih', name: 'Giridih', nameHi: 'गिरिडीह', top: '30%', left: '62%', issues: 20, projects: 4, rating: '8.4' },
  { id: 'palamu', name: 'Palamu', nameHi: 'पलामू', top: '26%', left: '22%', issues: 19, projects: 4, rating: '8.3' },
  { id: 'dumka', name: 'Dumka', nameHi: 'दुमका', top: '28%', left: '80%', issues: 18, projects: 3, rating: '8.2' },
  { id: 'west_singhbhum', name: 'West Singhbhum', nameHi: 'पश्चिमी सिंहभूम', top: '78%', left: '50%', issues: 16, projects: 3, rating: '8.0' }
];

export const JharkhandMap = ({ onSelectDistrict }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const [selected, setSelected] = useState(DISTRICT_HOTSPOTS[0]);

  const handleSelect = (dist) => {
    setSelected(dist);
    if (onSelectDistrict) onSelectDistrict(dist.id);
  };

  return (
    <div style={{ position: 'relative', width: '100%', background: '#0F172A', borderRadius: '16px', padding: '20px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', color: '#FFFFFF' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#38BDF8' }}>
            {isHi ? 'झारखंड 24-जिला नवाचार मानचित्र' : 'Jharkhand 24-District Innovation Map'}
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94A3B8' }}>
            {isHi ? 'जिले पर क्लिक करके सामाजिक चुनौतियां देखें' : 'Click hotspot to inspect district innovation statistics'}
          </p>
        </div>
        <span style={{ padding: '4px 10px', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', borderRadius: '9999px', fontSize: '12px', fontWeight: '700' }}>
          24/24 GIS Verified
        </span>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '360px', background: '#1E293B', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        {/* Geographic Base Illustration */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

        {DISTRICT_HOTSPOTS.map((dist) => (
          <button
            key={dist.id}
            onClick={() => handleSelect(dist)}
            style={{
              position: 'absolute',
              top: dist.top,
              left: dist.left,
              transform: 'translate(-50%, -50%)',
              background: selected.id === dist.id ? '#F59E0B' : '#1D4ED8',
              color: '#FFFFFF',
              border: selected.id === dist.id ? '2px solid #FFFFFF' : '1px solid rgba(255,255,255,0.4)',
              borderRadius: '9999px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease',
              zIndex: selected.id === dist.id ? 10 : 2
            }}
          >
            📍 {isHi ? dist.nameHi : dist.name} ({dist.issues})
          </button>
        ))}
      </div>

      {/* Selected District Info Overlay */}
      {selected && (
        <div style={{ marginTop: '16px', background: '#1E293B', borderRadius: '12px', padding: '16px', border: '1px solid #334155', color: '#FFFFFF', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#F59E0B' }}>
              📍 {isHi ? selected.nameHi : selected.name} {isHi ? 'जिला' : 'District'}
            </div>
            <div style={{ fontSize: '13px', color: '#94A3B8' }}>
              {isHi ? 'सक्रिय समस्या रिपोर्ट एवं आरएंडडी ट्रैकिंग' : 'Active societal issue reports and university R&D projects'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#38BDF8' }}>{selected.issues}</div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>{isHi ? 'चुनौतियां' : 'Challenges'}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#10B981' }}>{selected.projects}</div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>{isHi ? 'सक्रिय प्रोजेक्ट' : 'R&D Projects'}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#F59E0B' }}>{selected.rating}</div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>{isHi ? 'समाधान सूचकांक' : 'Impact Score'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
