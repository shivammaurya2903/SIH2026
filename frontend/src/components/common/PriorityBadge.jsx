import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const PriorityBadge = ({ priority }) => {
  const { t } = useLanguage();

  const getVariant = (p) => {
    const key = (p || '').toLowerCase();
    switch (key) {
      case 'critical': return { bg: '#FEF2F2', text: '#991B1B', border: '#FCA5A5', label: t('priority.critical', 'Critical') };
      case 'high': return { bg: '#FFF7ED', text: '#C2410C', border: '#FFEDD5', label: t('priority.high', 'High') };
      case 'medium': return { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A', label: t('priority.medium', 'Medium') };
      case 'low': return { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0', label: t('priority.low', 'Low') };
      default: return { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0', label: priority || 'Medium' };
    }
  };

  const style = getVariant(priority);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 8px',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        background: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`
      }}
    >
      {style.label}
    </span>
  );
};
