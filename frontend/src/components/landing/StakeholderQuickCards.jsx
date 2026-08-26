import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const StakeholderQuickCards = () => {
  const { t } = useLanguage();

  const cards = [
    {
      icon: '👥',
      title: t('quickStakeholders.citizens.title', 'Citizens'),
      desc: t('quickStakeholders.citizens.desc', 'Report problems in your area')
    },
    {
      icon: '🏛️',
      title: t('quickStakeholders.government.title', 'Government'),
      desc: t('quickStakeholders.government.desc', 'Review and prioritize')
    },
    {
      icon: '🎓',
      title: t('quickStakeholders.universities.title', 'Universities'),
      desc: t('quickStakeholders.universities.desc', 'Research and innovate')
    },
    {
      icon: '🏭',
      title: t('quickStakeholders.industry.title', 'Industry'),
      desc: t('quickStakeholders.industry.desc', 'Collaborate and implement')
    }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '16px',
        marginTop: '24px'
      }}
    >
      {cards.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div style={{ fontSize: '24px' }}>{item.icon}</div>
          <div>
            <h5 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>{item.title}</h5>
            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748B', lineHeight: '1.3' }}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
