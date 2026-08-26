import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';
import { useLanguage } from '../../i18n/LanguageContext';

export const IndustryProjectCard = ({ project, onOfferClick }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <StatusBadge status={project.stage || project.status || 'in_progress'} />
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#1D4ED8', background: '#EFF6FF', padding: '3px 8px', borderRadius: '6px' }}>
            📍 {project.district || 'Jharkhand'}
          </span>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A', marginBottom: '8px', lineHeight: '1.3' }}>
          {project.title}
        </h3>

        <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.5', marginBottom: '16px' }}>
          {project.description ? (project.description.length > 120 ? project.description.substring(0, 120) + '...' : project.description) : (isHi ? 'विवरण उपलब्ध नहीं' : 'No description provided.')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569', marginBottom: '20px', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
          <div>🏫 {isHi ? 'विश्वविद्यालय:' : 'University:'} <strong>{project.universityName || project.university?.name || 'BIT Mesra'}</strong></div>
          <div>👨‍🏫 {isHi ? 'संकाय मेंटर:' : 'Faculty Mentor:'} <strong>{project.facultyMentor || 'Prof. A. K. Singh'}</strong></div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => navigate(`/project/${project._id || project.id}`)}
          style={{
            flex: 1,
            padding: '10px',
            background: '#FFFFFF',
            color: '#1D4ED8',
            border: '1.5px solid #BFDBFE',
            borderRadius: '8px',
            fontWeight: '800',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          {isHi ? 'प्रोजेक्ट देखें' : 'View Project'}
        </button>

        <button
          onClick={() => onOfferClick(project)}
          style={{
            flex: 1,
            padding: '10px',
            background: '#1D4ED8',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '800',
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(29, 78, 216, 0.25)'
          }}
        >
          {isHi ? 'सहयोग प्रस्ताव' : 'Offer Collaboration'}
        </button>
      </div>
    </div>
  );
};
