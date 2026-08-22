const Common = {
    getToken() {
        return localStorage.getItem(APP_CONFIG.TOKEN_KEY);
    },

    getUser() {
        const user = localStorage.getItem(APP_CONFIG.USER_KEY);

        if (!user) {
            return null;
        }

        try {
            return JSON.parse(user);
        } catch {
            return null;
        }
    },

    setAuth(token, user) {
        localStorage.setItem(
            APP_CONFIG.TOKEN_KEY,
            token
        );

        localStorage.setItem(
            APP_CONFIG.USER_KEY,
            JSON.stringify(user)
        );
    },

    clearAuth() {
        localStorage.removeItem(
            APP_CONFIG.TOKEN_KEY
        );

        localStorage.removeItem(
            APP_CONFIG.USER_KEY
        );
    },

    isAuthenticated() {
        return Boolean(this.getToken());
    },

    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/login.html';
            return false;
        }

        return true;
    },

    requireRole(roles) {
        if (!this.requireAuth()) {
            return false;
        }

        const user = this.getUser();

        if (!user || !roles.includes(user.role)) {
            this.redirectByRole();
            return false;
        }

        return true;
    },

    redirectByRole() {
        const user = this.getUser();

        if (!user) {
            window.location.href = '/login.html';
            return;
        }

        const dashboards = {
            citizen: '/pages/citizen/dashboard.html',
            government: '/pages/government/dashboard.html',
            university: '/pages/university/dashboard.html',
            faculty: '/pages/university/dashboard.html',
            student: '/pages/university/dashboard.html',
            industry: '/pages/industry/dashboard.html',
            admin: '/pages/government/dashboard.html'
        };

        window.location.href =
            dashboards[user.role] ||
            '/login.html';
    },

    logout() {
        this.clearAuth();
        window.location.href = '/login.html';
    },

    escapeHTML(value) {
        if (value === null || value === undefined) {
            return '';
        }

        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    },

    showLoading(element) {
        if (!element) {
            return;
        }

        element.classList.add('is-loading');
        element.setAttribute('aria-busy', 'true');
    },

    hideLoading(element) {
        if (!element) {
            return;
        }

        element.classList.remove('is-loading');
        element.setAttribute('aria-busy', 'false');
    },

    showToast(message, type = 'info') {
        let container =
            document.querySelector('.toast-container');

        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');

        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-hide');

            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3500);
    },

    formatDate(date) {
        if (!date) {
            return '-';
        }

        return new Intl.DateTimeFormat('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(new Date(date));
    },

    formatNumber(number) {
        return new Intl.NumberFormat('en-IN')
            .format(Number(number) || 0);
    }
};

window.Common = Common;

document.addEventListener('DOMContentLoaded', () => {
    const logoutButtons =
        document.querySelectorAll('[data-logout]');

    logoutButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            Common.logout();
        });
    });

    const menuToggle =
        document.querySelector('#menuToggle');

    const navigation =
        document.querySelector('.main-nav');

    if (menuToggle && navigation) {
        menuToggle.addEventListener('click', () => {
            navigation.classList.toggle('mobile-open');
        });
    }
});