const Modal = {
    open(options = {}) {
        this.close();

        const {
            title = "Modal",
            content = "",
            size = "medium"
        } = options;

        const modal = document.createElement("div");

        modal.className = `modal-overlay modal-${size}`;

        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close" type="button">
                        <i data-lucide="x"></i>
                    </button>
                </div>

                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector(".modal-close").addEventListener("click", () => {
            this.close();
        });

        modal.addEventListener("click", event => {
            if (event.target === modal) {
                this.close();
            }
        });

        if (window.lucide) {
            lucide.createIcons();
        }
    },

    close() {
        const modal = document.querySelector(".modal-overlay");

        if (modal) {
            modal.remove();
        }
    }
};

window.Modal = Modal;