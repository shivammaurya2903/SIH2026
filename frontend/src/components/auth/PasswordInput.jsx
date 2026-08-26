import React, { useState } from 'react';

export const PasswordInput = ({ value, onChange, name = 'password', placeholder = '••••••••', required = true }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px 42px 12px 14px',
          borderRadius: '10px',
          border: '1px solid #CBD5E1',
          fontSize: '15px',
          boxSizing: 'border-box',
          outline: 'none',
          transition: 'border-color 0.2s ease'
        }}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          color: '#64748B',
          padding: 0
        }}
      >
        {showPassword ? '👁️‍🗨️' : '👁️'}
      </button>
    </div>
  );
};
