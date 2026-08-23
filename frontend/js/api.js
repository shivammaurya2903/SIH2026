const API = {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem(APP_CONFIG.storageKeys.token);

        const headers = {
            "Content-Type": "application/json",
            ...(options.headers || {})
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${APP_CONFIG.apiBaseUrl}${endpoint}`, {
            ...options,
            headers
        });

        let data;

        try {
            data = await response.json();
        } catch {
            data = {};
        }

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem(APP_CONFIG.storageKeys.token);
                localStorage.removeItem(APP_CONFIG.storageKeys.user);
                localStorage.removeItem(APP_CONFIG.storageKeys.role);
            }

            throw new Error(data.message || "Something went wrong");
        }

        return data;
    },

    get(endpoint) {
        return this.request(endpoint, {
            method: "GET"
        });
    },

    post(endpoint, data) {
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(data)
        });
    },

    put(endpoint, data) {
        return this.request(endpoint, {
            method: "PUT",
            body: JSON.stringify(data)
        });
    },

    patch(endpoint, data) {
        return this.request(endpoint, {
            method: "PATCH",
            body: JSON.stringify(data)
        });
    },

    delete(endpoint) {
        return this.request(endpoint, {
            method: "DELETE"
        });
    },

    async upload(endpoint, formData) {
        const token = localStorage.getItem(APP_CONFIG.storageKeys.token);

        const headers = {};

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${APP_CONFIG.apiBaseUrl}${endpoint}`, {
            method: "POST",
            headers,
            body: formData
        });

        let data;

        try {
            data = await response.json();
        } catch {
            data = {};
        }

        if (!response.ok) {
            throw new Error(data.message || "Upload failed");
        }

        return data;
    }
};

window.API = API;