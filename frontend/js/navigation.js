document.addEventListener("DOMContentLoaded", async () => {
    await loadSidebar();
    await loadHeader();

    initializeNavigation();

    if (window.lucide) {
        lucide.createIcons();
    }
});

async function loadSidebar() {
    const sidebar = document.getElementById("sidebar");

    if (!sidebar) {
        return;
    }

    const role = Auth.getRole() || "citizen";

    sidebar.innerHTML = createSidebar(role);
}

async function loadHeader() {
    const header = document.getElementById("header");

    if (!header) {
        return;
    }

    const user = Auth.getUser();

    header.innerHTML = createHeader(user);
}

function initializeNavigation() {
    const toggle = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");

    if (toggle && sidebar) {
        toggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
    }

    document.querySelectorAll(".logout-btn").forEach(button => {
        button.addEventListener("click", () => {
            Auth.logout();
        });
    });
}