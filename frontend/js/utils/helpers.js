const Helpers = {
    getElement(selector, parent = document) {
        return parent.querySelector(selector);
    },

    getElements(selector, parent = document) {
        return [...parent.querySelectorAll(selector)];
    },

    createElement(tag, className = "", content = "") {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (content) {
            element.innerHTML = content;
        }

        return element;
    },

    isEmpty(value) {
        return (
            value === null ||
            value === undefined ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
        );
    },

    truncate(text, length = 100) {
        if (!text) {
            return "";

        }

        if (text.length <= length) {
            return text;
        }

        return `${text.substring(0, length).trim()}...`;
    },

    capitalize(text) {
        if (!text) {
            return "";

        }

        return text.charAt(0).toUpperCase() + text.slice(1);
    },

    slugify(text) {
        return String(text)
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-");
    },

    getInitials(name, limit = 2) {
        if (!name) {
            return "U";
        }

        return name
            .trim()
            .split(/\s+/)
            .map(word => word.charAt(0))
            .join("")
            .substring(0, limit)
            .toUpperCase();
    },

    generateId(prefix = "ID") {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);

        return `${prefix}-${timestamp}-${random}`;
    },

    scrollTo(selector) {
        const element = document.querySelector(selector);

        if (!element) {
            return;
        }

        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    },

    copyToClipboard(text) {
        return navigator.clipboard.writeText(text);
    },

    sleep(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    },

    debounce(callback, delay = 300) {
        let timeout;

        return (...args) => {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }
};

window.Helpers = Helpers;