const Auth = {
    getToken() {
        return localStorage.getItem(APP_CONFIG.storageKeys.token);
    },

    getUser() {
        const user = localStorage.getItem(APP_CONFIG.storageKeys.user);
        if (!user) return null;
        try {
            return JSON.parse(user);
        } catch {
            return null;
        }
    },

    getRole() {
        return localStorage.getItem(APP_CONFIG.storageKeys.role);
    },

    isAuthenticated() {
        return Boolean(this.getToken());
    },

    saveSession(data) {
        if (data.token) {
            localStorage.setItem(APP_CONFIG.storageKeys.token, data.token);
        }
        if (data.user) {
            localStorage.setItem(
                APP_CONFIG.storageKeys.user,
                JSON.stringify(data.user)
            );
        }
        if (data.user?.role) {
            localStorage.setItem(
                APP_CONFIG.storageKeys.role,
                data.user.role
            );
        }
    },

    logout() {
        localStorage.removeItem(APP_CONFIG.storageKeys.token);
        localStorage.removeItem(APP_CONFIG.storageKeys.user);
        localStorage.removeItem(APP_CONFIG.storageKeys.role);

        const currentPath = window.location.pathname;
        if (currentPath.includes("/pages/")) {
            window.location.href = "../../index.html";
        } else {
            window.location.href = "index.html";
        }
    },

    redirectByRole(role) {
        const userRole = role || this.getRole() || "citizen";
        const currentPath = window.location.pathname;

        const rolePages = {
            citizen: "pages/citizen/dashboard.html",
            government: "pages/government/dashboard.html",
            university: "pages/university/dashboard.html",
            industry: "pages/industry/dashboard.html",
            admin: "pages/admin/dashboard.html"
        };

        const page = rolePages[userRole] || rolePages.citizen;

        if (currentPath.includes("/pages/auth/")) {
            window.location.href = `../${userRole}/dashboard.html`;
        } else if (currentPath.includes("/pages/")) {
            window.location.href = `../../${page}`;
        } else {
            window.location.href = page;
        }
    }
};

window.Auth = Auth;