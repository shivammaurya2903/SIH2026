document.addEventListener("DOMContentLoaded", () => {
    initializeLucideIcons();
    initializeMobileDrawer();
    initializeStats();
    initializeSmoothScroll();
});

function initializeLucideIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

function initializeMobileDrawer() {
    const toggleBtn = document.getElementById("mobileMenuToggle");
    const closeBtn = document.getElementById("mobileMenuClose");
    const drawer = document.getElementById("mobileDrawer");
    const backdrop = document.getElementById("drawerBackdrop");

    if (!toggleBtn || !drawer || !backdrop) {
        return;
    }

    function openDrawer() {
        drawer.classList.add("active");
        backdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
        drawer.classList.remove("active");
        backdrop.classList.remove("active");
        document.body.style.overflow = "";
    }

    toggleBtn.addEventListener("click", openDrawer);

    if (closeBtn) {
        closeBtn.addEventListener("click", closeDrawer);
    }

    backdrop.addEventListener("click", closeDrawer);

    document.querySelectorAll(".mobile-nav-link").forEach(link => {
        link.addEventListener("click", closeDrawer);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && drawer.classList.contains("active")) {
            closeDrawer();
        }
    });
}

function initializeStats() {
    const stats = window.DEMO_DATA?.stats || {
        totalChallenges: 12482,
        activeProjects: 1842,
        universities: 86,
        industryPartners: 214,
        resolvedChallenges: 4826
    };

    const elChallenges = document.getElementById("statChallenges");
    const elProjects = document.getElementById("statProjects");
    const elUniversities = document.getElementById("statUniversities");
    const elPartners = document.getElementById("statPartners");
    const elImpact = document.getElementById("statImpact");

    if (elChallenges) elChallenges.textContent = `${stats.totalChallenges.toLocaleString()}+`;
    if (elProjects) elProjects.textContent = `${stats.activeProjects.toLocaleString()}+`;
    if (elUniversities) elUniversities.textContent = `${stats.universities.toLocaleString()}+`;
    if (elPartners) elPartners.textContent = `${stats.industryPartners.toLocaleString()}+`;
    if (elImpact) elImpact.textContent = `${(stats.resolvedChallenges || 4826).toLocaleString()}+`;
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}
