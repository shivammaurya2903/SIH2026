import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const styles = {
    primary: { background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE' },
    success: { background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' },
    warning: { background: '#FEF3C7', color: '#D97706', border: '1px solid #FDE68A' },
    danger: { background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' },
    neutral: { background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' },
    purple: { background: '#F5F3FF', color: '#7C3AED', border: '1px solid #DDD6FE' }
  };

  const currentStyle = styles[variant] || styles.neutral;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: '700',
        lineHeight: '1',
        ...currentStyle
      }}
    >
      {children}
    </span>
  );
};
