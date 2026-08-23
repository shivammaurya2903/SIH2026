document.addEventListener('DOMContentLoaded', async () => {
    if (!Common.requireRole(['citizen'])) {
        return;
    }

    const tableLoading = document.querySelector('#tableLoading');
    const emptyState = document.querySelector('#emptyState');
    const tableWrapper = document.querySelector('#tableWrapper');
    const tableBody = document.querySelector('#challengeTableBody');
    const mobileList = document.querySelector('#mobileChallengeList');

    const searchInput = document.querySelector('#searchInput');
    const statusFilter = document.querySelector('#statusFilter');
    const categoryFilter = document.querySelector('#categoryFilter');

    const sidebar = document.querySelector('#sidebar');
    const dashboardMenu = document.querySelector('#dashboardMenu');

    let challenges = [];
    let filteredChallenges = [];

    dashboardMenu?.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    const user = Common.getUser();

    if (user) {
        const name = user.name || 'Citizen';

        document.querySelector('#userName').textContent = name;
        document.querySelector('#userAvatar').textContent =
            name.charAt(0).toUpperCase();
    }

    try {
        const response = await API.get('/challenges');

        challenges = normalizeChallenges(response.data);

        updateSummary(challenges);
        applyFilters();

    } catch (error) {
        Common.showToast(
            error.message || 'Unable to load challenges.',
            'error'
        );

        tableLoading.style.display = 'none';
        tableWrapper.style.display = 'none';
        emptyState.style.display = 'flex';

    } finally {
        tableLoading.style.display = 'none';
    }

    searchInput.addEventListener('input', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);

    function normalizeChallenges(data) {
        if (Array.isArray(data)) {
            return data;
        }

        if (Array.isArray(data?.challenges)) {
            return data.challenges;
        }

        if (Array.isArray(data?.items)) {
            return data.items;
        }

        return [];
    }

    function applyFilters() {
        const search =
            searchInput.value.trim().toLowerCase();

        const status =
            statusFilter.value;

        const category =
            categoryFilter.value;

        filteredChallenges = challenges.filter((challenge) => {
            const title =
                String(challenge.title || '').toLowerCase();

            const description =
                String(challenge.description || '').toLowerCase();

            const challengeStatus =
                String(challenge.status || '');

            const challengeCategory =
                String(challenge.category || '');

            const matchesSearch =
                !search ||
                title.includes(search) ||
                description.includes(search);

            const matchesStatus =
                !status ||
                challengeStatus === status;

            const matchesCategory =
                !category ||
                challengeCategory === category;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCategory
            );
        });

        renderChallenges();
    }

    function renderChallenges() {
        if (!filteredChallenges.length) {
            tableWrapper.style.display = 'none';
            emptyState.style.display = 'flex';
            mobileList.innerHTML = '';
            return;
        }

        emptyState.style.display = 'none';
        tableWrapper.style.display = 'block';

        tableBody.innerHTML =
            filteredChallenges
                .map(renderTableRow)
                .join('');

        mobileList.innerHTML =
            filteredChallenges
                .map(renderMobileCard)
                .join('');
    }

    function renderTableRow(challenge) {
        const id =
            challenge._id || challenge.id;

        const category =
            formatCategory(challenge.category);

        const priority =
            Number(challenge.priorityScore);

        return `
            <tr>
                <td class="challenge-title-cell">
                    <strong>
                        ${Common.escapeHTML(
                            challenge.title || 'Untitled Challenge'
                        )}
                    </strong>

                    <span>
                        ${Common.escapeHTML(
                            challenge.subCategory || 'Community Challenge'
                        )}
                    </span>
                </td>

                <td>
                    <span class="category-badge">
                        ${Common.escapeHTML(category)}
                    </span>
                </td>

                <td class="location-cell">
                    ${Common.escapeHTML(
                        challenge.location || challenge.district || '-'
                    )}
                </td>

                <td>
                    <span class="priority-score ${getPriorityClass(priority)}">
                        ${Number.isFinite(priority) ? priority : '-'}
                    </span>
                </td>

                <td>
                    <span class="status-badge status-${Common.escapeHTML(
                        challenge.status || 'submitted'
                    )}">
                        ${formatStatus(challenge.status)}
                    </span>
                </td>

                <td>
                    ${Common.formatDate(challenge.createdAt)}
                </td>

                <td>
                    <a
                        href="challenge-details.html?id=${encodeURIComponent(id)}"
                        class="view-button"
                    >
                        View
                    </a>
                </td>
            </tr>
        `;
    }

    function renderMobileCard(challenge) {
        const id =
            challenge._id || challenge.id;

        const priority =
            Number(challenge.priorityScore);

        return `
            <a
                href="challenge-details.html?id=${encodeURIComponent(id)}"
                class="mobile-challenge-card"
            >
                <div class="mobile-card-header">
                    <span class="category-badge">
                        ${Common.escapeHTML(
                            formatCategory(challenge.category)
                        )}
                    </span>

                    <span class="status-badge status-${Common.escapeHTML(
                        challenge.status || 'submitted'
                    )}">
                        ${formatStatus(challenge.status)}
                    </span>
                </div>

                <h3>
                    ${Common.escapeHTML(
                        challenge.title || 'Untitled Challenge'
                    )}
                </h3>

                <div class="mobile-card-meta">
                    <span>
                        ${Common.escapeHTML(
                            challenge.location ||
                            challenge.district ||
                            '-'
                        )}
                    </span>

                    <span>
                        Priority:
                        ${Number.isFinite(priority) ? priority : '-'}
                    </span>
                </div>

                <span class="mobile-card-date">
                    ${Common.formatDate(challenge.createdAt)}
                </span>
            </a>
        `;
    }

    function updateSummary(items) {
        document.querySelector('#totalCount').textContent =
            items.length;

        document.querySelector('#reviewCount').textContent =
            items.filter((item) =>
                [
                    'submitted',
                    'ai_analyzed',
                    'under_review'
                ].includes(item.status)
            ).length;

        document.querySelector('#activeCount').textContent =
            items.filter((item) =>
                [
                    'approved',
                    'matched',
                    'assigned',
                    'in_progress',
                    'prototype',
                    'testing',
                    'pilot'
                ].includes(item.status)
            ).length;

        document.querySelector('#completedCount').textContent =
            items.filter((item) =>
                item.status === 'completed'
            ).length;
    }

    function formatCategory(value) {
        if (!value) {
            return 'Uncategorized';
        }

        return String(value)
            .replaceAll('_', ' ')
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    }

    function formatStatus(value) {
        return formatCategory(value || 'submitted');
    }

    function getPriorityClass(score) {
        if (!Number.isFinite(score)) {
            return '';
        }

        if (score >= 70) {
            return 'priority-high';
        }

        if (score >= 40) {
            return 'priority-medium';
        }

        return 'priority-low';
    }
});