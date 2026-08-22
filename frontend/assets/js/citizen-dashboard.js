document.addEventListener('DOMContentLoaded', async () => {
    if (!Common.requireRole([
        'citizen'
    ])) {
        return;
    }

    const user = Common.getUser();

    if (user) {
        const name = user.name || 'Citizen';

        document.querySelector('#userName').textContent = name;
        document.querySelector('#welcomeName').textContent = name;

        document.querySelector('#userAvatar').textContent =
            name.charAt(0).toUpperCase();
    }

    const menu =
        document.querySelector('#dashboardMenu');

    const sidebar =
        document.querySelector('#sidebar');

    menu?.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    try {
        const response = await API.get(
            '/challenges?limit=5'
        );

        const challenges = response.data || [];

        updateStats(challenges);
        renderRecentChallenges(challenges);

    } catch (error) {
        Common.showToast(
            error.message || 'Unable to load dashboard',
            'error'
        );
    }

    function updateStats(challenges) {
        document.querySelector('#totalChallenges').textContent =
            challenges.length;

        document.querySelector('#reviewChallenges').textContent =
            challenges.filter((challenge) =>
                [
                    'submitted',
                    'ai_analyzed',
                    'under_review'
                ].includes(challenge.status)
            ).length;

        document.querySelector('#activeProjects').textContent =
            challenges.filter((challenge) =>
                [
                    'assigned',
                    'in_progress',
                    'prototype',
                    'testing',
                    'pilot'
                ].includes(challenge.status)
            ).length;

        document.querySelector('#completedChallenges').textContent =
            challenges.filter((challenge) =>
                challenge.status === 'completed'
            ).length;
    }

    function renderRecentChallenges(challenges) {
        const container =
            document.querySelector('#recentChallenges');

        if (!challenges.length) {
            return;
        }

        container.innerHTML = challenges
            .slice(0, 5)
            .map((challenge) => `
                <a
                    href="challenge-details.html?id=${encodeURIComponent(challenge._id)}"
                    class="challenge-row"
                >
                    <div class="challenge-row-main">
                        <strong>
                            ${Common.escapeHTML(challenge.title)}
                        </strong>

                        <span>
                            ${Common.escapeHTML(
                                challenge.category || 'Uncategorized'
                            )}
                            ·
                            ${Common.formatDate(
                                challenge.createdAt
                            )}
                        </span>
                    </div>

                    <span class="status-badge status-${challenge.status}">
                        ${formatStatus(challenge.status)}
                    </span>
                </a>
            `)
            .join('');
    }

    function formatStatus(status) {
        return String(status || 'unknown')
            .replaceAll('_', ' ')
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    }
});