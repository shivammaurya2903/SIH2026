document.addEventListener("DOMContentLoaded", () => {
    initializeChallengeForm();
    initializeChallengeFilters();
    loadChallengePages();
});

function initializeChallengeForm() {
    const form = document.getElementById("challengeForm");
    if (!form) return;

    form.addEventListener("submit", async event => {
        event.preventDefault();
        const formData = new FormData(form);

        try {
            const response = await API.upload("/challenges", formData);
            if (window.Toast) {
                Toast.success(response.message || "Challenge submitted successfully!");
            }
            form.reset();
            setTimeout(() => {
                window.location.href = "my-challenges.html";
            }, 800);
        } catch (error) {
            console.warn("[Challenge Form] Upload API offline, simulating submission with demo data.");
            if (window.Toast) {
                Toast.success("Challenge submitted successfully (Demo Mode)!");
            }
            form.reset();
            setTimeout(() => {
                window.location.href = "my-challenges.html";
            }, 800);
        }
    });
}

function initializeChallengeFilters() {
    const search = document.getElementById("challengeSearch");
    const status = document.getElementById("statusFilter");
    const domain = document.getElementById("domainFilter");
    const district = document.getElementById("districtFilter");

    if (!search && !status && !domain && !district) return;

    [search, status, domain, district]
        .filter(Boolean)
        .forEach(input => {
            input.addEventListener("input", filterChallenges);
            input.addEventListener("change", filterChallenges);
        });
}

function filterChallenges() {
    const searchValue = document.getElementById("challengeSearch")?.value.toLowerCase().trim() || "";
    const statusValue = document.getElementById("statusFilter")?.value.toLowerCase() || "";
    const domainValue = document.getElementById("domainFilter")?.value.toLowerCase() || "";
    const districtValue = document.getElementById("districtFilter")?.value.toLowerCase() || "";

    document.querySelectorAll(".challenge-item").forEach(item => {
        const text = item.textContent.toLowerCase();

        const matchesSearch = !searchValue || text.includes(searchValue);
        const matchesStatus = !statusValue || text.includes(statusValue);
        const matchesDomain = !domainValue || text.includes(domainValue);
        const matchesDistrict = !districtValue || text.includes(districtValue);

        item.style.display = matchesSearch && matchesStatus && matchesDomain && matchesDistrict ? "" : "none";
    });
}

async function loadChallengePages() {
    const myChallenges = document.getElementById("myChallenges");
    const universityGrid = document.getElementById("universityChallengeGrid");
    const governmentList = document.getElementById("governmentChallenges");

    if (myChallenges) {
        try {
            const response = await API.get("/challenges/my");
            renderChallengeItems(myChallenges, response.data || response);
        } catch {
            renderChallengeItems(myChallenges, window.getDemoChallenges ? getDemoChallenges() : []);
        }
    }

    if (universityGrid) {
        try {
            const response = await API.get("/challenges/recommended");
            renderChallengeItems(universityGrid, response.data || response);
        } catch {
            renderChallengeItems(universityGrid, window.getDemoChallenges ? getDemoChallenges() : []);
        }
    }

    if (governmentList) {
        try {
            const response = await API.get("/challenges");
            renderChallengeItems(governmentList, response.data || response);
        } catch {
            renderChallengeItems(governmentList, window.getDemoChallenges ? getDemoChallenges() : []);
        }
    }
}

function renderChallengeItems(container, challenges) {
    if (!container) return;

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

    container.innerHTML = challenges.map(challenge => `
        <div class="challenge-item card" style="margin-bottom:16px;padding:20px">
            <div class="challenge-main">
                <div class="challenge-topline" style="display:flex;gap:10px;align-items:center;margin-bottom:8px">
                    <span class="challenge-id" style="font-weight:700;color:var(--primary)">
                        ${challenge.id || "#JH-10482"}
                    </span>
                    <span class="badge badge-primary">
                        ${challenge.category || "Agriculture"}
                    </span>
                    ${challenge.priority ? `<span class="badge badge-warning">${challenge.priority} Priority</span>` : ""}
                </div>

                <h3 style="margin-bottom:8px;font-size:18px">${challenge.title}</h3>

                <p style="color:var(--text-secondary);margin-bottom:12px;font-size:14px;line-height:1.6">
                    ${challenge.description || "Community challenge requiring an innovative solution."}
                </p>

                <div class="challenge-meta" style="display:flex;gap:16px;font-size:13px;color:var(--text-light)">
                    <span>
                        <i data-lucide="map-pin" style="width:14px;height:14px;vertical-align:-2px"></i>
                        ${challenge.location || challenge.district || "Ranchi"}
                    </span>

                    <span>
                        <i data-lucide="calendar" style="width:14px;height:14px;vertical-align:-2px"></i>
                        ${challenge.date || "Recently"}
                    </span>

                    ${challenge.aiScore ? `
                    <span style="color:var(--teal);font-weight:600">
                        <i data-lucide="sparkles" style="width:14px;height:14px;vertical-align:-2px"></i>
                        ${challenge.aiScore}% AI Match
                    </span>` : ""}
                </div>
            </div>

            <div class="challenge-action" style="display:flex;align-items:center;gap:10px;margin-top:12px">
                <span class="badge badge-success">
                    ${challenge.status || "In Progress"}
                </span>
                <a href="challenge-details.html?id=${challenge.id}" class="btn btn-outline btn-sm">
                    View Details
                </a>
            </div>
        </div>
    `).join("");

    if (window.lucide) lucide.createIcons();
}

window.renderChallengeItems = renderChallengeItems;