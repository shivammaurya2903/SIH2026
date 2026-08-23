const Validators = {
    required(value) {
        return String(value || "").trim().length > 0;
    },

    email(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            String(value || "").trim()
        );
    },

    password(value) {
        return String(value || "").length >= 8;
    },

    phone(value) {
        return /^[6-9]\d{9}$/.test(
            String(value || "").trim()
        );
    },

    minLength(value, length) {
        return String(value || "").trim().length >= length;
    },

    maxLength(value, length) {
        return String(value || "").trim().length <= length;
    },

    file(file, options = {}) {
        if (!file) {
            return {
                valid: false,
                message: "Please select a file"
            };
        }

        const maxSize =
            options.maxSize || 10 * 1024 * 1024;

        const allowedTypes =
            options.types || [];

        if (file.size > maxSize) {
            return {
                valid: false,
                message: `File size must be less than ${Formatters.fileSize(maxSize)}`
            };
        }

        if (
            allowedTypes.length &&
            !allowedTypes.includes(file.type)
        ) {
            return {
                valid: false,
                message: "This file type is not supported"
            };
        }

        return {
            valid: true,
            message: ""
        };
    },

    challenge(data) {
        const errors = {};

        if (!this.required(data.title)) {
            errors.title = "Challenge title is required";
        }

        if (!this.required(data.description)) {
            errors.description =
                "Challenge description is required";
        }

        if (!this.minLength(data.description, 30)) {
            errors.description =
                "Description should contain at least 30 characters";
        }

        if (!this.required(data.category)) {
            errors.category = "Please select a category";
        }

        if (!this.required(data.district)) {
            errors.district = "District is required";
        }

        return {
            valid: Object.keys(errors).length === 0,
            errors
        };
    },

    login(data) {
        const errors = {};

        if (!this.email(data.email)) {
            errors.email = "Enter a valid email";
        }

        if (!this.required(data.password)) {
            errors.password = "Password is required";
        }

        return {
            valid: Object.keys(errors).length === 0,
            errors
        };
    },

    register(data) {
        const errors = {};

        if (!this.required(data.name)) {
            errors.name = "Name is required";
        }

        if (!this.email(data.email)) {
            errors.email = "Enter a valid email";
        }

        if (!this.password(data.password)) {
            errors.password =
                "Password must contain at least 8 characters";
        }

        if (!this.required(data.role)) {
            errors.role = "Please select a role";
        }

        return {
            valid: Object.keys(errors).length === 0,
            errors
        };
    }
};

window.Validators = Validators;