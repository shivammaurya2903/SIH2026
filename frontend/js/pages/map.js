document.addEventListener("DOMContentLoaded", () => {
    initializeMaps();
});

function initializeMaps() {
    const governmentMap = document.getElementById("governmentMap");
    const districtMap = document.getElementById("districtMap");

    if (governmentMap) {
        renderInnovationMap(governmentMap);
    }

    if (districtMap) {
        renderInnovationMap(districtMap, true);
    }
}

function renderInnovationMap(container, large = false) {
    const districts = [
        { name: "Ranchi", x: 47, y: 48, value: 2480 },
        { name: "Dumka", x: 70, y: 30, value: 1420 },
        { name: "Deoghar", x: 80, y: 40, value: 1680 },
        { name: "Dhanbad", x: 65, y: 56, value: 2140 },
        { name: "Bokaro", x: 55, y: 61, value: 1780 },
        { name: "Gumla", x: 30, y: 60, value: 980 },
        { name: "Hazaribagh", x: 49, y: 35, value: 1530 }
    ];

    container.innerHTML = `
        <div class="innovation-map ${large ? "map-large-view" : ""}">
            <div class="map-grid"></div>

            <div class="map-shape"></div>

            ${districts.map(district => `
                <button
                    class="map-district-point"
                    style="left:${district.x}%;top:${district.y}%"
                    data-name="${district.name}"
                    data-value="${district.value}"
                    type="button"
                >
                    <span></span>
                </button>
            `).join("")}

            <div class="map-tooltip" id="mapTooltip"></div>
        </div>
    `;

    container
        .querySelectorAll(".map-district-point")
        .forEach(point => {
            point.addEventListener("mouseenter", event => {
                showMapTooltip(
                    event.currentTarget,
                    container
                );
            });

            point.addEventListener("mouseleave", () => {
                hideMapTooltip(container);
            });

            point.addEventListener("click", event => {
                showMapTooltip(
                    event.currentTarget,
                    container
                );
            });
        });

    renderDistrictCards(districts);
}

function showMapTooltip(point, container) {
    const tooltip = container.querySelector(".map-tooltip");

    if (!tooltip) {
        return;
    }

    const name = point.dataset.name;
    const value = point.dataset.value;

    tooltip.innerHTML = `
        <strong>${name}</strong>
        <span>${Number(value).toLocaleString()} challenges</span>
    `;

    const pointRect = point.getBoundingClientRect();
    const containerRect = container
        .querySelector(".innovation-map")
        .getBoundingClientRect();

    tooltip.style.left =
        `${pointRect.left - containerRect.left + 15}px`;

    tooltip.style.top =
        `${pointRect.top - containerRect.top - 15}px`;

    tooltip.classList.add("show");
}

function hideMapTooltip(container) {
    const tooltip = container.querySelector(".map-tooltip");

    if (tooltip) {
        tooltip.classList.remove("show");
    }
}

function renderDistrictCards(districts) {
    const container = document.getElementById("districtCards");

    if (!container) {
        return;
    }

    container.innerHTML = districts.map(district => `
        <article class="district-stat-card card">
            <h3>${district.name}</h3>
            <p>Innovation activity</p>

            <div class="district-stat-row">
                <div>
                    <span>Challenges</span>
                    <strong>${district.value.toLocaleString()}</strong>
                </div>

                <div>
                    <span>Status</span>
                    <strong class="trend-up">Active</strong>
                </div>
            </div>
        </article>
    `).join("");
}