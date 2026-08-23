document.addEventListener("DOMContentLoaded", () => {
    loadAnalytics();
});

async function loadAnalytics() {
    const domainChart = document.getElementById("domainChart");
    const projectChart = document.getElementById("projectChart");
    const impactChart = document.getElementById("impactChart");

    let analytics;

    try {
        const response = await API.get("/analytics");
        analytics = response.data || response;
    } catch {
        analytics = window.getDemoAnalytics ? getDemoAnalytics() : {
            domains: [
                { label: "Education", value: 2480 },
                { label: "Health", value: 2140 },
                { label: "Agri", value: 2860 },
                { label: "Water", value: 1560 },
                { label: "Energy", value: 940 },
                { label: "Infra", value: 1222 }
            ],
            projects: [
                { label: "Review", value: 38 },
                { label: "Research", value: 62 },
                { label: "Prototype", value: 48 },
                { label: "Pilot", value: 35 },
                { label: "Deploy", value: 22 }
            ],
            impact: [
                { label: "Ranchi", value: 8400 },
                { label: "Dhanbad", value: 9100 },
                { label: "Bokaro", value: 6800 },
                { label: "Dumka", value: 6200 },
                { label: "Deoghar", value: 5700 },
                { label: "Gumla", value: 4300 }
            ]
        };
    }

    if (domainChart) {
        renderBarChart(
            domainChart,
            analytics.domains || []
        );
    }

    if (projectChart) {
        renderBarChart(
            projectChart,
            analytics.projects || []
        );
    }

    if (impactChart) {
        renderImpactChart(
            impactChart,
            analytics.impact || []
        );
    }
}

function renderBarChart(container, data) {
    if (!container || !data?.length) return;
    const max = Math.max(...data.map(item => item.value));

    container.innerHTML = `
        <div class="analytics-bars" style="display:flex;align-items:flex-end;gap:12px;height:180px;padding:10px 0">
            ${data.map(item => {
                const height = Math.max(12, (item.value / max) * 85);

                return `
                    <div class="analytics-bar" style="flex:1;display:flex;flex-direction:column;align-items:center;height:${height}%;background:var(--primary);border-radius:6px 6px 0 0;padding-top:6px;color:#fff;font-size:11px;position:relative">
                        <strong style="font-size:11px">${item.value}</strong>
                        <span style="position:absolute;bottom:-22px;color:var(--text-secondary);font-size:11px;white-space:nowrap">${item.label}</span>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}

function renderImpactChart(container, data) {
    if (!container || !data?.length) return;
    const max = Math.max(...data.map(item => item.value));

    container.innerHTML = `
        <div class="analytics-bars" style="display:flex;align-items:flex-end;gap:12px;height:180px;padding:10px 0">
            ${data.map(item => {
                const height = Math.max(12, (item.value / max) * 85);

                return `
                    <div class="analytics-bar" style="flex:1;display:flex;flex-direction:column;align-items:center;height:${height}%;background:var(--teal);border-radius:6px 6px 0 0;padding-top:6px;color:#fff;font-size:11px;position:relative">
                        <strong style="font-size:11px">${item.value.toLocaleString()}</strong>
                        <span style="position:absolute;bottom:-22px;color:var(--text-secondary);font-size:11px;white-space:nowrap">${item.label}</span>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}