/* Centralized API & Application Configuration for JharInnovate / SamadhanSetu */
(function(global) {
  const hostname = global.location ? global.location.hostname : 'localhost';
  const isLocal = hostname === 'localhost' || 
                  hostname === '127.0.0.1' || 
                  hostname === '::1' || 
                  hostname.startsWith('192.168.') || 
                  hostname.startsWith('10.');

  const LOCAL_BACKEND_URL = 'http://localhost:5000';
  const PRODUCTION_BACKEND_URL = 'https://sih2026-nx0u.onrender.com';

  const BACKEND_URL = isLocal ? LOCAL_BACKEND_URL : PRODUCTION_BACKEND_URL;
  const API_BASE_URL = `${BACKEND_URL}/api`;

  const CONFIG = {
    IS_LOCAL: isLocal,
    BACKEND_URL: BACKEND_URL,
    API_BASE_URL: API_BASE_URL,
    STORAGE_KEYS: {
      TOKEN: 'jhar_token',
      USER: 'jhar_user',
      LANG: 'jhar_language'
    },
    getFriendlyErrorMessage: function(err, defaultMsg) {
      const fallback = defaultMsg || 'Unable to connect to SamadhanSetu services. Please try again.';
      if (!err) return fallback;
      const str = String(err.message || err);
      if (str.includes('Failed to fetch') || str.includes('NetworkError') || str.includes('CORS') || str.includes('ERR_FAILED') || str.includes('Load failed')) {
        return 'Unable to connect to SamadhanSetu backend services. Please check your network connection or try again shortly.';
      }
      return err.message || fallback;
    }
  };

  if (isLocal) {
    console.log(`[SamadhanSetu Config] Running in LOCAL mode -> API: ${API_BASE_URL}`);
  } else {
    console.log(`[SamadhanSetu Config] Running in PRODUCTION mode -> API: ${API_BASE_URL}`);
  }

  global.CONFIG = CONFIG;
})(typeof window !== 'undefined' ? window : globalThis);
