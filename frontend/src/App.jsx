import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { LanguageProvider } from './i18n/LanguageContext';
import { AppRouter } from './app/router';
import { AppErrorBoundary } from './components/common/AppErrorBoundary';
import './styles/responsive.css';

export const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <AppErrorBoundary>
            <AppAppRouterWrapper />
          </AppErrorBoundary>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

const AppAppRouterWrapper = () => <AppRouter />;

export default App;
