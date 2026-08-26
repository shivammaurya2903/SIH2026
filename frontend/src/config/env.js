/**
 * Environment & API Base URL Configuration for SamadhanSetu Frontend
 * Handles Localhost, LAN, and Production Netlify automatically.
 */

const getDynamicApiBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname;
    // If running locally or over LAN, connect to backend on port 5000 of the same host
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.')
    ) {
      return `http://${hostname}:5000/api`;
    }
  }
  return 'https://sih2026-nx0u.onrender.com/api';
};

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || getDynamicApiBaseUrl();

export const CONFIG = {
  API_BASE_URL,
  IS_LOCAL:
    typeof window !== 'undefined' && window.location
      ? window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.startsWith('192.168.')
      : true,
  STORAGE_KEYS: {
    TOKEN: 'jhar_token',
    USER: 'jhar_user',
    LANG: 'jhar_language'
  }
};

export default CONFIG;
