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

        const response = await fetch(
            `${APP_CONFIG.API_BASE_URL}${endpoint}`,
            config
        );

        let data;

        try {
            data = await response.json();
        } catch {
            data = {
                success: false,
                message: 'Invalid server response'
            };
        }

        if (!response.ok) {
            throw new Error(
                data.message || 'Something went wrong'
            );
        }

        return data;
    },

    get(endpoint) {
        return this.request(endpoint, {
            method: 'GET'
        });
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
        return this.request(endpoint, {
            method: 'DELETE'
        });
    },

    async upload(endpoint, formData, method = 'POST') {
        const token = localStorage.getItem(APP_CONFIG.TOKEN_KEY);

        const headers = {};

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(
            `${APP_CONFIG.API_BASE_URL}${endpoint}`,
            {
                method,
                headers,
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || 'Upload failed'
            );
        }

        return data;
    }
};

window.API = API;