function createSidebar(role) {
    const menus = {
        citizen: [
            {
                title: "MAIN",
                items: [
                    ["dashboard.html", "Dashboard", "layout-dashboard"],
                    ["submit-challenge.html", "Report Challenge", "plus-circle"],
                    ["my-challenges.html", "My Challenges", "layers"]
                ]
            }
        ],

        government: [
            {
                title: "OVERVIEW",
                items: [
                    ["dashboard.html", "Dashboard", "layout-dashboard"],
                    ["challenges.html", "Challenges", "layers"],
                    ["districts.html", "Districts", "map"],
                    ["projects.html", "Projects", "rocket"],
                    ["analytics.html", "Analytics", "bar-chart-3"]
                ]
            }
        ],

        university: [
            {
                title: "WORKSPACE",
                items: [
                    ["dashboard.html", "Dashboard", "layout-dashboard"],
                    ["challenges.html", "Challenges", "search"],
                    ["projects.html", "Projects", "rocket"],
                    ["teams.html", "Teams", "users"]
                ]
            }
        ],

        industry: [
            {
                title: "PARTNERSHIPS",
                items: [
                    ["dashboard.html", "Dashboard", "layout-dashboard"],
                    ["opportunities.html", "Opportunities", "briefcase"],
                    ["collaborations.html", "Collaborations", "handshake"]
                ]
            }
        ],

        admin: [
            {
                title: "ADMINISTRATION",
                items: [
                    ["dashboard.html", "Dashboard", "layout-dashboard"],
                    ["users.html", "Users", "users"],
                    ["settings.html", "Settings", "settings"]
                ]
            }
        ]
    };

    const sections = menus[role] || menus.citizen;

    const currentPage = window.location.pathname.split("/").pop();

    const sectionHTML = sections.map(section => {
        const links = section.items.map(item => {
            const active = currentPage === item[0] ? "active" : "";

            return `
                <a href="${item[0]}" class="sidebar-link ${active}">
                    <i data-lucide="${item[2]}"></i>
                    <span>${item[1]}</span>
                </a>
            `;
        }).join("");

        return `
            <div class="sidebar-section">
                <span class="sidebar-section-title">${section.title}</span>
                ${links}
            </div>
        `;
    }).join("");

    return `
        <div class="sidebar-brand">
            <a href="../../index.html" class="brand">
                <span class="brand-mark">
                    <i data-lucide="zap"></i>
                </span>
                <span class="brand-text">
                    <strong>Jhar</strong>Innovate
                </span>
            </a>
        </div>

        <nav class="sidebar-nav">
            ${sectionHTML}
        </nav>

        <div class="sidebar-footer">
            <div class="user-mini">
                <div class="user-avatar">
                    ${getUserInitials()}
                </div>
                <div class="user-mini-info">
                    <strong>${getUserName()}</strong>
                    <span>${formatRole(role)}</span>
                </div>
            </div>

            <button class="sidebar-link logout-btn" type="button">
                <i data-lucide="log-out"></i>
                <span>Logout</span>
            </button>
        </div>
    `;
}

function getUserName() {
    const user = Auth.getUser();
    return user?.name || "Platform User";
}

function getUserInitials() {
    const name = getUserName();

    return name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();
}

function formatRole(role) {
    return role
        .replace("-", " ")
        .replace(/\b\w/g, char => char.toUpperCase());
}

window.createSidebar = createSidebar;