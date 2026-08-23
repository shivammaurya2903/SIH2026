document.addEventListener("DOMContentLoaded", () => {
    loadDashboardData();
});

async function loadDashboardData() {
    const role = Auth.getRole();

    if (role === "citizen") {
        await loadCitizenDashboard();
    }

    if (role === "government") {
        await loadGovernmentDashboard();
    }

    if (role === "university") {
        await loadUniversityDashboard();
    }

    if (role === "industry") {
        await loadIndustryDashboard();
    }

    if (role === "admin") {
        await loadAdminDashboard();
    }
}

async function loadCitizenDashboard() {
    const container = document.getElementById("citizenChallenges");

    if (!container) {
        return;
    }

    try {
        const response = await API.get("/challenges/my");

        renderChallengeItems(container, response.data || response);
    } catch {
        renderChallengeItems(container, getDemoChallenges());
    }
}

async function loadGovernmentDashboard() {
    const container = document.getElementById("governmentChallenges");

    if (!container) {
        return;
    }

    try {
        const response = await API.get("/challenges");

        renderChallengeItems(container, response.data || response);
    } catch {
        renderChallengeItems(container, getDemoChallenges());
    }
}

async function loadUniversityDashboard() {
    const container = document.getElementById("universityChallenges");

    if (!container) {
        return;
    }

    try {
        const response = await API.get("/challenges/recommended");

        renderChallengeItems(container, response.data || response);
    } catch {
        renderChallengeItems(container, getDemoChallenges());
    }
}

async function loadIndustryDashboard() {
    const container = document.getElementById("industryOpportunities");

    if (!container) {
        return;
    }

    try {
        const response = await API.get("/projects/opportunities");

        renderProjectItems(container, response.data || response);
    } catch {
        renderProjectItems(container, getDemoProjects());
    }
}

async function loadAdminDashboard() {
    const container = document.getElementById("adminOverview");

    if (!container) {
        return;
    }

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

    lucide.createIcons();
}

function renderChallengeItems(container, challenges) {
    if (!challenges?.length) {
        container.innerHTML = `
            <div class="table-empty">
                <i data-lucide="inbox"></i>
                <p>No challenges found</p>
            </div>
        `;

        lucide.createIcons();
        return;
    }

    container.innerHTML = challenges.slice(0, 6).map(challenge => `
        <div class="challenge-item">
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

    lucide.createIcons();
}

function renderProjectItems(container, projects) {
    container.innerHTML = projects.slice(0, 5).map(project => `
        <div class="challenge-item">
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
                    ${project.status || "Open"}
                </span>
            </div>
        </div>
    `).join("");

    lucide.createIcons();
}

function getDemoChallenges() {
    return [
        {
            id: "#JH-10482",
            title: "Smart Irrigation for Rural Farmers",
            category: "Agriculture",
            district: "Ranchi",
            status: "In Progress",
            description: "Develop an affordable irrigation monitoring solution for rural farming communities."
        },
        {
            id: "#JH-10476",
            title: "Digital Learning Access",
            category: "Education",
            district: "Dumka",
            status: "Under Review",
            description: "Improve access to digital learning resources in rural schools."
        },
        {
            id: "#JH-10471",
            title: "Village Water Quality Monitoring",
            category: "Water",
            district: "Deoghar",
            status: "Validated",
            description: "Create an accessible system for monitoring local water quality."
        }
    ];
}

function getDemoProjects() {
    return [
        {
            title: "AI Crop Advisory Platform",
            category: "Agriculture",
            status: "Open",
            description: "Industry partner needed for AI infrastructure and deployment."
        },
        {
            title: "Rural Healthcare Assistant",
            category: "Healthcare",
            status: "Open",
            description: "Seeking technology and implementation partner."
        }
    ];
}