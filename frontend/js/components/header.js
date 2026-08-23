function createHeader(user) {
    const name = user?.name || "Platform User";

    return `
        <div class="header-left">
            <button class="sidebar-toggle" type="button" aria-label="Toggle navigation">
                <i data-lucide="menu"></i>
            </button>

            <div class="header-search">
                <i data-lucide="search"></i>
                <input type="search" placeholder="Search platform">
            </div>
        </div>

        <div class="header-actions">
            <button class="header-icon-btn" type="button" aria-label="Notifications">
                <i data-lucide="bell"></i>
                <span class="notification-dot"></span>
            </button>

            <button class="header-icon-btn" type="button" aria-label="Help">
                <i data-lucide="circle-help"></i>
            </button>

            <div class="user-mini">
                <div class="user-avatar">
                    ${name
                        .split(" ")
                        .map(word => word.charAt(0))
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                </div>
                <div class="user-mini-info">
                    <strong>${name}</strong>
                    <span>Account</span>
                </div>
            </div>
        </div>
    `;
}

window.createHeader = createHeader;