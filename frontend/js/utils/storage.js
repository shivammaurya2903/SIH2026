const Storage = {
    set(key, value) {
        try {
            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;
        } catch {
            return false;
        }
    },

    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);

            if (value === null) {
                return defaultValue;
            }

            return JSON.parse(value);
        } catch {
            return defaultValue;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    },

    has(key) {
        return localStorage.getItem(key) !== null;
    },

    setToken(token) {
        localStorage.setItem(
            APP_CONFIG.storageKeys.token,
            token
        );
    },

    getToken() {
        return localStorage.getItem(
            APP_CONFIG.storageKeys.token
        );
    },

    removeToken() {
        localStorage.removeItem(
            APP_CONFIG.storageKeys.token
        );
    },

    setUser(user) {
        this.set(
            APP_CONFIG.storageKeys.user,
            user
        );
    },

    getUser() {
        return this.get(
            APP_CONFIG.storageKeys.user
        );
    },

    removeUser() {
        this.remove(
            APP_CONFIG.storageKeys.user
        );
    }
};

window.Storage = Storage;