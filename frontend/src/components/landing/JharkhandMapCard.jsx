import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { DistrictInfoCard } from '../map/DistrictInfoCard';

const DISTRICT_DATA = [
  { id: 'ranchi', name: 'Ranchi', nameHi: 'रांची', top: '54%', left: '44%', challenges: 128, projects: 18, deployed: 7, citizens: '4,250', score: '82/100' },
  { id: 'dhanbad', name: 'Dhanbad', nameHi: 'धनबाद', top: '38%', left: '74%', challenges: 94, projects: 14, deployed: 5, citizens: '3,120', score: '78/100' },
  { id: 'jamshedpur', name: 'East Singhbhum', nameHi: 'पूर्वी सिंहभूम', top: '76%', left: '74%', challenges: 86, projects: 12, deployed: 4, citizens: '2,890', score: '76/100' },
  { id: 'bokaro', name: 'Bokaro', nameHi: 'बोकारो', top: '44%', left: '68%', challenges: 78, projects: 11, deployed: 4, citizens: '2,450', score: '74/100' },
  { id: 'hazaribagh', name: 'Hazaribagh', nameHi: 'हजारीबाग', top: '38%', left: '48%', challenges: 68, projects: 9, deployed: 3, citizens: '2,100', score: '72/100' },
  { id: 'deoghar', name: 'Deoghar', nameHi: 'देवघर', top: '24%', left: '68%', challenges: 54, projects: 7, deployed: 2, citizens: '1,840', score: '70/100' },
  { id: 'giridih', name: 'Giridih', nameHi: 'गिरिडीह', top: '30%', left: '62%', challenges: 48, projects: 6, deployed: 2, citizens: '1,620', score: '68/100' },
  { id: 'palamu', name: 'Palamu', nameHi: 'पलामू', top: '26%', left: '22%', challenges: 42, projects: 5, deployed: 2, citizens: '1,450', score: '66/100' },
  { id: 'dumka', name: 'Dumka', nameHi: 'दुमका', top: '28%', left: '80%', challenges: 38, projects: 4, deployed: 1, citizens: '1,280', score: '65/100' },
  { id: 'west_singhbhum', name: 'West Singhbhum', nameHi: 'पश्चिमी सिंहभूम', top: '78%', left: '50%', challenges: 34, projects: 4, deployed: 1, citizens: '1,120', score: '64/100' }
];

export const JharkhandMapCard = ({ stats }) => {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';
  const navigate = useNavigate();

  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICT_DATA[0]);

  const activeDistrict = selectedDistrict || hoveredDistrict;

  const handleCloseCard = () => {
    setSelectedDistrict(null);
    setHoveredDistrict(null);
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        padding: '24px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {/* Map Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: '800', color: '#1E293B', letterSpacing: '0.5px' }}>
          {t('hero.mapHeader', 'JHARKHAND • 24 DISTRICTS')}
        </span>
        <button
          onClick={() => navigate('/challenges')}
          style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
        >
          {t('hero.gridLink', ':: View Innovation Grid')}
        </button>
      </div>

      {/* Interactive Map Visual Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: '#F8FAFC',
          borderRadius: '16px',
          border: '1px solid #F1F5F9',
          overflow: 'hidden',
          display: 'flex',
          justify: 'center',
          alignItems: 'center'
        }}
      >
        {/* Real Jharkhand Map Visual Background */}
        <img
          src="/assets/jharkhand-map-visual.png"
          alt="Jharkhand 24-District Geographic Map"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: 0.9,
            pointerEvents: 'none'
          }}
        />

        {/* Clean District Text Labels (No Floating Pins or Count Bubbles) */}
        {DISTRICT_DATA.map((dist) => {
          const isActive = activeDistrict?.id === dist.id;
          return (
            <button
              key={dist.id}
              onClick={() => setSelectedDistrict(dist)}
              onMouseEnter={() => setHoveredDistrict(dist)}
              onMouseLeave={() => setHoveredDistrict(null)}
              aria-label={`${dist.name} district`}
              style={{
                position: 'absolute',
                top: dist.top,
                left: dist.left,
                transform: 'translate(-50%, -50%)',
                background: isActive ? '#1D4ED8' : 'rgba(255, 255, 255, 0.9)',
                color: isActive ? '#FFFFFF' : '#0F172A',
                border: isActive ? '2px solid #2563EB' : '1px solid #CBD5E1',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: isActive ? '0 4px 14px rgba(29, 78, 216, 0.35)' : '0 1px 3px rgba(0,0,0,0.08)',
                transition: 'all 0.2s ease',
                zIndex: isActive ? 10 : 2
              }}
            >
              {isHi ? dist.nameHi : dist.name}
            </button>
          );
        })}

        {/* Reusable District Information Card with X Close & Escape Key support */}
        {activeDistrict && (
          <DistrictInfoCard district={activeDistrict} onClose={handleCloseCard} />
        )}
      </div>

      {/* Bottom Metrics Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '10px',
          borderTop: '1px solid #F1F5F9',
          paddingTop: '14px',
          textAlign: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: '16px', fontWeight: '900', color: '#1D4ED8' }}>{stats?.challengesCount || 1248}</div>
          <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748B' }}>{t('hero.kpiChallenges', 'TOTAL CHALLENGES')}</div>
        </div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '900', color: '#10B981' }}>{stats?.projectsCount || 156}</div>
          <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748B' }}>{t('hero.kpiProjects', 'ACTIVE PROJECTS')}</div>
        </div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '900', color: '#F59E0B' }}>42</div>
          <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748B' }}>{t('hero.kpiDeployed', 'SOLUTIONS DEPLOYED')}</div>
        </div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '900', color: '#7C3AED' }}>18,540</div>
          <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748B' }}>{t('hero.kpiCitizens', 'CITIZENS ENGAGED')}</div>
        </div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '900', color: '#0F172A' }}>22</div>
          <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748B' }}>{t('hero.kpiUniversities', 'UNIVERSITIES')}</div>
        </div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '900', color: '#0F172A' }}>31</div>
          <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748B' }}>{t('hero.kpiIndustry', 'INDUSTRY PARTNERS')}</div>
        </div>
      </div>
    </div>
  );
};
