import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PageContainer = ({ children, hideFooter = false }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F8FAFC' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};
