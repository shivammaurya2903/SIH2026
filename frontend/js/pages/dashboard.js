document.addEventListener("DOMContentLoaded", () => {
    loadDashboardData();
});

async function loadDashboardData() {
    const role = (window.Auth && Auth.getRole()) || "citizen";

    if (role === "citizen") {
        await loadCitizenDashboard();
    } else if (role === "government") {
        await loadGovernmentDashboard();
    } else if (role === "university") {
        await loadUniversityDashboard();
    } else if (role === "industry") {
        await loadIndustryDashboard();
    } else if (role === "admin") {
        await loadAdminDashboard();
    }
}

async function loadCitizenDashboard() {
    const container = document.getElementById("citizenChallenges");
    if (!container) return;

    try {
        const response = await API.get("/challenges/my");
        renderChallengeItems(container, response.data || response);
    } catch {
        renderChallengeItems(container, window.getDemoChallenges ? getDemoChallenges() : []);
    }
}

async function loadGovernmentDashboard() {
    const container = document.getElementById("governmentChallenges");
    if (!container) return;

    try {
        const response = await API.get("/challenges");
        renderChallengeItems(container, response.data || response);
    } catch {
        renderChallengeItems(container, window.getDemoChallenges ? getDemoChallenges() : []);
    }
}

async function loadUniversityDashboard() {
    const container = document.getElementById("universityChallenges");
    const progressContainer = document.getElementById("universityProgress");

    if (container) {
        try {
            const response = await API.get("/challenges/recommended");
            renderChallengeItems(container, response.data || response);
        } catch {
            renderChallengeItems(container, window.getDemoChallenges ? getDemoChallenges() : []);
        }
    }

    if (progressContainer) {
        renderProjectItems(progressContainer, window.getDemoProjects ? getDemoProjects() : []);
    }
}

async function loadIndustryDashboard() {
    const container = document.getElementById("industryOpportunities");
    const collabContainer = document.getElementById("industryCollaborations");

    if (container) {
        try {
            const response = await API.get("/projects/opportunities");
            renderProjectItems(container, response.data || response);
        } catch {
            renderProjectItems(container, window.getDemoProjects ? getDemoProjects() : []);
        }
    }

    if (collabContainer) {
        renderProjectItems(collabContainer, window.getDemoProjects ? getDemoProjects().slice(0, 3) : []);
    }
}

async function loadAdminDashboard() {
    const container = document.getElementById("adminOverview");
    if (!container) return;

    container.innerHTML = `
        <div class="insight-list">
            <div>
                <span class="insight-icon primary">
                    <i data-lucide="users"></i>
                </span>
                <div>
                    <strong>28,482</strong>
                    <span>Registered users</span>
                </div>
            </div>

            <div>
                <span class="insight-icon green">
                    <i data-lucide="layers"></i>
                </span>
                <div>
                    <strong>12,482</strong>
                    <span>Challenges received</span>
                </div>
            </div>

            <div>
                <span class="insight-icon purple">
                    <i data-lucide="rocket"></i>
                </span>
                <div>
                    <strong>1,842</strong>
                    <span>Active projects</span>
                </div>
            </div>
        </div>
    `;

    if (window.lucide) {
        lucide.createIcons();
    }
}

function renderChallengeItems(container, challenges) {
    if (!challenges?.length) {
        container.innerHTML = `
            <div class="table-empty card" style="padding:40px;text-align:center">
                <i data-lucide="inbox" style="width:36px;height:36px;color:var(--text-light)"></i>
                <p style="margin-top:12px;color:var(--text-secondary)">No challenges found</p>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
        return;
    }

    container.innerHTML = challenges.slice(0, 6).map(challenge => `
        <div class="challenge-item card" style="margin-bottom:12px;padding:16px">
            <div class="challenge-main">
                <div class="challenge-topline">
                    <span class="challenge-id">
                        ${challenge.id || "#JH-10482"}
                    </span>
                    <span class="badge badge-primary">
                        ${challenge.category || "Agriculture"}
                    </span>
                </div>

                <h3>${challenge.title}</h3>

                <p>
                    ${challenge.description || "Community challenge requiring an innovative solution."}
                </p>

                <div class="challenge-meta">
                    <span>
                        <i data-lucide="map-pin"></i>
                        ${challenge.district || "Ranchi"}
                    </span>

                    <span>
                        <i data-lucide="calendar"></i>
                        ${challenge.date || "Recently"}
                    </span>
                </div>
            </div>

            <div class="challenge-action">
                <span class="badge badge-success">
                    ${challenge.status || "In Progress"}
                </span>
            </div>
        </div>
    `).join("");

    if (window.lucide) lucide.createIcons();
}

function renderProjectItems(container, projects) {
    if (!projects?.length) {
        container.innerHTML = `
            <div class="table-empty card" style="padding:40px;text-align:center">
                <i data-lucide="rocket" style="width:36px;height:36px;color:var(--text-light)"></i>
                <p style="margin-top:12px;color:var(--text-secondary)">No projects found</p>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
        return;
    }

    container.innerHTML = projects.slice(0, 5).map(project => `
        <div class="challenge-item card" style="margin-bottom:12px;padding:16px">
            <div class="challenge-main">
                <div class="challenge-topline">
                    <span class="badge badge-primary">
                        ${project.category || "Technology"}
                    </span>
                </div>

                <h3>${project.title}</h3>

                <p>
                    ${project.description || "Innovation project requiring industry collaboration."}
                </p>
            </div>

            <div class="challenge-action">
                <span class="badge badge-success">
                    ${project.status || "Active"}
                </span>
            </div>
        </div>
    `).join("");

    if (window.lucide) lucide.createIcons();
}