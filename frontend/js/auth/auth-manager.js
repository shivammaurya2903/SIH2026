/**
 * SamadhanSetu Centralized Authentication & Role Guard Manager
 * SIH26043 — Societal Innovation Collaboration Platform
 */

(function (global) {
  const STORAGE_KEYS = {
    TOKEN: 'jhar_token',
    USER: 'jhar_user',
    LANG: 'jhar_language'
  };

  const ROLE_DASHBOARDS = {
    citizen: 'citizen-dashboard.html',
    government: 'government-dashboard.html',
    university: 'university-dashboard.html',
    faculty: 'faculty-dashboard.html',
    student: 'student-dashboard.html',
    industry: 'industry-dashboard.html',
    admin: 'admin-dashboard.html'
  };

  const AuthManager = {
    getToken() {
      return localStorage.getItem(STORAGE_KEYS.TOKEN);
    },

    getUser() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.USER);
        return raw ? JSON.parse(raw) : null;
      } catch (err) {
        console.error('Error parsing stored user:', err);
        return null;
      }
    },

    getRole() {
      const user = this.getUser();
      return user ? user.role : null;
    },

    isLoggedIn() {
      return !!(this.getToken() && this.getUser());
    },

    setSession(token, user) {
      if (!user) return;
      if (!user.id && user._id) user.id = String(user._id);
      if (!user._id && user.id) user._id = String(user.id);
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    },

    logout() {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      window.location.href = 'login.html';
    },

    getDashboardUrl(role) {
      const userRole = role || this.getRole() || 'citizen';
      return ROLE_DASHBOARDS[userRole] || ROLE_DASHBOARDS.citizen;
    },

    redirectToRoleDashboard(role) {
      const targetUrl = this.getDashboardUrl(role);
      window.location.href = targetUrl;
    },

    requireAuth(intent = null) {
      if (!this.isLoggedIn()) {
        const target = intent ? `login.html?intent=${encodeURIComponent(intent)}` : 'login.html';
        window.location.href = target;
        return false;
      }
      return true;
    },

    requireRole(allowedRoles, redirectOnForbidden = true) {
      if (!this.requireAuth()) return false;
      
      const role = this.getRole();
      const allowedList = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

      if (!allowedList.includes(role)) {
        if (redirectOnForbidden) {
          console.warn(`Access Denied: Role "${role}" is not authorized for this route.`);
          this.redirectToRoleDashboard(role);
        }
        return false;
      }
      return true;
    },

    handleAuthError(res, data) {
      const is401 = (res && res.status === 401) ||
                    (data && data.message && (
                      data.message.includes('no longer exists') ||
                      data.message.includes('expired') ||
                      data.message.includes('malformed') ||
                      data.message.includes('token')
                    ));
      if (is401) {
        this.logout();
        return true;
      }
      return false;
    }
  };

  global.AuthManager = AuthManager;
  global.redirectToRoleDashboard = function(role) {
    AuthManager.redirectToRoleDashboard(role);
  };
})(typeof window !== 'undefined' ? window : globalThis);
