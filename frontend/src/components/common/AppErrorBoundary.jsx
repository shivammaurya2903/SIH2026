import React from 'react';

export class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AppErrorBoundary caught a runtime rendering error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#F8FAFC', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ background: '#FFFFFF', padding: '36px', borderRadius: '16px', border: '1px solid #E2E8F0', maxWidth: '480px', width: '100%', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '42px', marginBottom: '12px' }}>⚠️</div>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0F172A', marginBottom: '8px' }}>
              Something went wrong
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>
              An unexpected error occurred while rendering this page. You can return home or try again.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                style={{ padding: '10px 20px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
              >
                Try Again
              </button>
              <button
                onClick={this.handleReset}
                style={{ padding: '10px 20px', background: '#1D4ED8', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
