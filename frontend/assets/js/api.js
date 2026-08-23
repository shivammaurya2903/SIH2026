const API = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem(APP_CONFIG.TOKEN_KEY);

    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers
    };

    try {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}${endpoint}`, config);

      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = {
          success: false,
          message: 'Invalid JSON response from server'
        };
      }

      if (!response.ok) {
        if (response.status === 401) {
          Common.clearAuth();
          if (!window.location.pathname.endsWith('login.html')) {
            window.location.href = '/login.html';
          }
        }
        throw new Error(data.message || `HTTP error ${response.status}`);
      }

      return data;
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error('Unable to connect to the platform API. Please check backend server.');
      }
      throw err;
    }
  },

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  },

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  },

  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  },

  patch(endpoint, body = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  },

  async upload(endpoint, formData, method = 'POST') {
    const token = localStorage.getItem(APP_CONFIG.TOKEN_KEY);
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}${endpoint}`, {
        method,
        headers,
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'File upload failed');
      }
      return data;
    } catch (err) {
      throw err;
    }
  }
};

window.API = API;