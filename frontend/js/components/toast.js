const Toast = {
    container: null,

    init() {
        if (this.container) {
            return;
        }

        this.container = document.createElement("div");
        this.container.className = "toast-container";

        document.body.appendChild(this.container);
    },

    show(message, type = "info") {
        this.init();

        const toast = document.createElement("div");

        toast.className = `toast toast-${type}`;

        const icons = {
            success: "check-circle",
            error: "x-circle",
            warning: "alert-triangle",
            info: "info"
        };

        toast.innerHTML = `
            <i data-lucide="${icons[type] || icons.info}"></i>
            <span>${message}</span>
            <button type="button">
                <i data-lucide="x"></i>
            </button>
        `;

        this.container.appendChild(toast);

        if (window.lucide) {
            lucide.createIcons();
        }

        toast.querySelector("button").addEventListener("click", () => {
            toast.remove();
        });

        setTimeout(() => {
            toast.remove();
        }, 4000);
    },

    success(message) {
        this.show(message, "success");
    },

    error(message) {
        this.show(message, "error");
    },

    warning(message) {
        this.show(message, "warning");
    },

    info(message) {
        this.show(message, "info");
    }
};

window.Toast = Toast;