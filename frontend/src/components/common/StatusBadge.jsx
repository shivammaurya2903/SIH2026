import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const StatusBadge = ({ status }) => {
  const { t } = useLanguage();

  const getVariant = (s) => {
    switch (s) {
      case 'submitted': return { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE', label: t('status.submitted', 'Submitted') };
      case 'under_review': return { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A', label: t('status.under_review', 'Under Review') };
      case 'approved':
      case 'validated': return { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0', label: t('status.approved', 'Approved') };
      case 'rejected': return { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA', label: t('status.rejected', 'Rejected') };
      case 'in_progress':
      case 'matched': return { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE', label: t('status.in_progress', 'In Progress') };
      case 'deployed':
      case 'completed': return { bg: '#F0FDF4', text: '#16A34A', border: '#86EFAC', label: t('status.deployed', 'Deployed') };
      default: return { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0', label: status || 'Submitted' };
    }
  };

  const style = getVariant(status);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: '700',
        background: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`
      }}
    >
      {style.label}
    </span>
  );
};
