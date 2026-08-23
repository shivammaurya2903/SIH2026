const Auth = {
    getToken() {
        return localStorage.getItem(APP_CONFIG.storageKeys.token);
    },

    getUser() {
        const user = localStorage.getItem(APP_CONFIG.storageKeys.user);

        if (!user) {
            return null;
        }

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

        window.location.href = "../../index.html";
    },

    redirectByRole(role) {
        const routes = {
            citizen: "../citizen/dashboard.html",
            government: "../government/dashboard.html",
            university: "../university/dashboard.html",
            industry: "../industry/dashboard.html",
            admin: "../admin/dashboard.html"
        };

        window.location.href = routes[role] || "../../index.html";
    }
};

async function handleLogin(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
        const response = await API.post("/auth/login", {
            email,
            password
        });

        Auth.saveSession(response);

        Toast.success("Login successful");

        setTimeout(() => {
            Auth.redirectByRole(response.user?.role);
        }, 500);
    } catch (error) {
        Toast.error(error.message);
    }
}

async function handleRegister(event) {
    event.preventDefault();

    const form = event.currentTarget;

    const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        role: form.role.value,
        password: form.password.value
    };

    try {
        const response = await API.post("/auth/register", data);

        if (response.token) {
            Auth.saveSession(response);
            Toast.success("Account created successfully");

            setTimeout(() => {
                Auth.redirectByRole(response.user?.role);
            }, 500);
        } else {
            Toast.success("Account created. Please login.");

            setTimeout(() => {
                window.location.href = "login.html";
            }, 700);
        }
    } catch (error) {
        Toast.error(error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener("submit", handleRegister);
    }
});

window.Auth = Auth;