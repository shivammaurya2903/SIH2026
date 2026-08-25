/**
 * SamadhanSetu Centralized API Client
 * SIH26043 — Societal Innovation Collaboration Platform
 */

(function (global) {
  const ApiClient = {
    getBaseUrl() {
      if (global.CONFIG && global.CONFIG.API_BASE_URL) {
        return global.CONFIG.API_BASE_URL;
      }
      return '/api';
    },

    getHeaders(customHeaders = {}, includeAuth = true) {
      const headers = {
        'Content-Type': 'application/json',
        ...customHeaders
      };

      if (includeAuth && global.AuthManager) {
        const token = global.AuthManager.getToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }
      return headers;
    },

    async request(endpoint, options = {}) {
      const url = endpoint.startsWith('http') ? endpoint : `${this.getBaseUrl()}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
      
      const config = {
        method: options.method || 'GET',
        headers: this.getHeaders(options.headers, options.includeAuth !== false),
        ...options
      };

      if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
        config.body = JSON.stringify(options.body);
      }

      try {
        const response = await fetch(url, config);
        const data = await response.json().catch(() => ({}));

        if (global.AuthManager && global.AuthManager.handleAuthError(response, data)) {
          throw new Error('Session expired');
        }

        if (!response.ok) {
          const errMsg = data.message || `Request failed with status ${response.status}`;
          const error = new Error(errMsg);
          error.status = response.status;
          error.data = data;
          throw error;
        }

        return data;
      } catch (err) {
        if (global.CONFIG && global.CONFIG.getFriendlyErrorMessage) {
          err.friendlyMessage = global.CONFIG.getFriendlyErrorMessage(err);
        }
        throw err;
      }
    },

    get(endpoint, options = {}) {
      return this.request(endpoint, { ...options, method: 'GET' });
    },

    post(endpoint, body, options = {}) {
      return this.request(endpoint, { ...options, method: 'POST', body });
    },

    put(endpoint, body, options = {}) {
      return this.request(endpoint, { ...options, method: 'PUT', body });
    },

    patch(endpoint, body, options = {}) {
      return this.request(endpoint, { ...options, method: 'PATCH', body });
    },

    delete(endpoint, options = {}) {
      return this.request(endpoint, { ...options, method: 'DELETE' });
    }
  };

  global.ApiClient = ApiClient;
})(typeof window !== 'undefined' ? window : globalThis);
