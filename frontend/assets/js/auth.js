const Auth = {
    async login(email, password) {
        const response = await API.post('/auth/login', {
            email,
            password
        });

        if (!response.success || !response.data) {
            throw new Error(
                response.message || 'Login failed'
            );
        }

        Common.setAuth(
            response.data.token,
            response.data.user
        );

        return response.data;
    },

    async getCurrentUser() {
        const response = await API.get('/auth/me');

        if (!response.success) {
            throw new Error(
                response.message || 'Unable to fetch user'
            );
        }

        return response.data;
    },

    async register(userData) {
        const response = await API.post(
            '/auth/register',
            userData
        );

        if (!response.success || !response.data) {
            throw new Error(
                response.message || 'Registration failed'
            );
        }

        Common.setAuth(
            response.data.token,
            response.data.user
        );

        return response.data;
    },

    logout() {
        Common.clearAuth();
        window.location.href = 'login.html';
    }
};

window.Auth = Auth;