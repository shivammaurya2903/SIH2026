document.addEventListener("DOMContentLoaded", () => {
    loadProjectPages();
});

async function loadProjectPages() {
    const containers = [
        ["governmentProjects", "/projects"],
        ["universityProjects", "/projects/my"],
        ["opportunityGrid", "/projects/opportunities"],
        ["collaborationGrid", "/projects/collaborations"]
    ];

    for (const [id, endpoint] of containers) {
        const container = document.getElementById(id);
        if (!container) continue;

        let projects;
        try {
            const response = await API.get(endpoint);
            projects = response.data || response;
        } catch {
            projects = window.getDemoProjects ? getDemoProjects() : [];
        }

        renderProjects(container, projects);
    }

    initializeTeamPage();
}

function renderProjects(container, projects) {
    if (!container) return;

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

    container.innerHTML = projects.map(project => `
        <article class="project-card card" style="margin-bottom:16px;padding:20px">
            <div class="project-card-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span class="project-icon" style="width:40px;height:40px;display:grid;place-items:center;background:var(--primary-light);color:var(--primary);border-radius:10px">
                    <i data-lucide="rocket"></i>
                </span>

                <span class="badge badge-success">
                    ${project.status || "Active"}
                </span>
            </div>

            <h3 style="margin-bottom:8px;font-size:18px">${project.title}</h3>

            <p style="color:var(--text-secondary);font-size:14px;line-height:1.6;margin-bottom:16px">
                ${project.description || "Innovation project focused on solving a real-world societal challenge."}
            </p>

            <div class="project-meta" style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-light);margin-bottom:12px">
                <div>
                    <span>DOMAIN: </span>
                    <strong style="color:var(--text)">${project.category || "Technology"}</strong>
                </div>

                <div>
                    <span>PROGRESS: </span>
                    <strong style="color:var(--primary)">${project.progress || 68}%</strong>
                </div>
            </div>

            <div class="project-progress" style="margin-bottom:16px">
                <div class="project-progress-bar" style="height:6px;background:var(--border-light);border-radius:3px;overflow:hidden">
                    <span style="display:block;height:100%;background:var(--primary);width:${project.progress || 68}%"></span>
                </div>
            </div>

            <div class="project-card-footer" style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid var(--border-light)">
                <div class="project-owner" style="display:flex;align-items:center;gap:8px;font-size:13px">
                    <span class="owner-avatar" style="width:28px;height:28px;display:grid;place-items:center;background:var(--primary);color:#fff;border-radius:50%;font-size:11px;font-weight:700">
                        ${getInitials(project.university || project.owner || "Innovation Team")}
                    </span>
                    <span>${project.university || project.owner || "Innovation Team"}</span>
                </div>

                <button class="btn btn-outline btn-sm" type="button" onclick="window.Toast ? Toast.info('Project details view open') : null">
                    View Project
                </button>
            </div>
        </article>
    `).join("");

    if (window.lucide) lucide.createIcons();
}

function initializeTeamPage() {
    const container = document.getElementById("teamGrid");
    if (!container) return;

    const teams = window.getDemoTeams ? getDemoTeams() : [
        { name: "Smart Agriculture Team", project: "AI Crop Advisory Platform", members: 8 },
        { name: "Healthcare Innovation Team", project: "Rural Healthcare Assistant", members: 6 },
        { name: "Water Technology Team", project: "Village Water Monitoring", members: 5 }
    ];

    container.innerHTML = teams.map(team => `
        <article class="team-card card" style="padding:20px;margin-bottom:16px">
            <div class="team-card-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span class="badge badge-primary">${team.status || "Active"}</span>
                <i data-lucide="more-horizontal" style="color:var(--text-light);cursor:pointer"></i>
            </div>

            <h3 style="margin-bottom:6px">${team.name}</h3>
            <p style="color:var(--text-secondary);font-size:14px;margin-bottom:16px">${team.project}</p>

            <div class="team-members" style="display:flex;align-items:center;gap:6px;margin-bottom:16px">
                <span class="team-member" style="width:30px;height:30px;display:grid;place-items:center;background:var(--primary-light);color:var(--primary);border-radius:50%;font-size:11px;font-weight:700">SM</span>
                <span class="team-member" style="width:30px;height:30px;display:grid;place-items:center;background:var(--teal-light);color:var(--teal);border-radius:50%;font-size:11px;font-weight:700">AK</span>
                <span class="team-member" style="width:30px;height:30px;display:grid;place-items:center;background:var(--purple-light);color:var(--purple);border-radius:50%;font-size:11px;font-weight:700">RS</span>
                <span class="team-member-more" style="font-size:12px;color:var(--text-light);margin-left:6px">
                    +${Math.max((team.members || 5) - 3, 1)} members
                </span>
            </div>

            <div class="team-card-footer" style="display:flex;justify-content:space-between;font-size:13px;color:var(--text-secondary);padding-top:12px;border-top:1px solid var(--border-light)">
                <span>Mentor: ${team.facultyMentor || "Dr. Anil Kumar"}</span>
                <span style="color:var(--primary);font-weight:600;cursor:pointer">View team &rarr;</span>
            </div>
        </article>
    `).join("");

    if (window.lucide) lucide.createIcons();
}

function getInitials(value) {
    if (!value) return "IT";
    return value
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();
}