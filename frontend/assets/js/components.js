const Components = {
  getNavItems(role) {
    const navs = {
      citizen: [
        { id: 'dashboard', label: 'Dashboard', href: '/pages/citizen/dashboard.html', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'submit-challenge', label: 'Submit Challenge', href: '/pages/citizen/submit-challenge.html', icon: 'M12 4v16m8-8H4' },
        { id: 'my-challenges', label: 'My Challenges', href: '/pages/citizen/my-challenges.html', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        { id: 'notifications', label: 'Notifications', href: '/pages/citizen/notifications.html', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
        { id: 'profile', label: 'Profile', href: '/pages/citizen/profile.html', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'settings', label: 'Settings', href: '/pages/citizen/settings.html', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
      ],
      government: [
        { id: 'dashboard', label: 'Dashboard', href: '/pages/government/dashboard.html', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { id: 'challenges', label: 'Review Challenges', href: '/pages/government/challenges.html', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'universities', label: 'Universities', href: '/pages/government/universities.html', icon: 'M12 14l9-5-9-5-9 5 9 5z' },
        { id: 'industries', label: 'Industries', href: '/pages/government/industries.html', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        { id: 'projects', label: 'Projects', href: '/pages/government/projects.html', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7' },
        { id: 'analytics', label: 'Analytics', href: '/pages/government/analytics.html', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { id: 'impact', label: 'Social Impact', href: '/pages/government/impact.html', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
        { id: 'notifications', label: 'Notifications', href: '/pages/government/notifications.html', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
        { id: 'profile', label: 'Profile', href: '/pages/government/profile.html', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'settings', label: 'Settings', href: '/pages/government/settings.html', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
      ],
      university: [
        { id: 'dashboard', label: 'Dashboard', href: '/pages/university/dashboard.html', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'challenges', label: 'Marketplace', href: '/pages/university/challenges.html', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
        { id: 'proposals', label: 'Proposals', href: '/pages/university/proposals.html', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { id: 'teams', label: 'Teams', href: '/pages/university/teams.html', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { id: 'projects', label: 'Projects', href: '/pages/university/projects.html', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
        { id: 'collaborations', label: 'Collaborations', href: '/pages/university/collaborations.html', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { id: 'notifications', label: 'Notifications', href: '/pages/university/notifications.html', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
        { id: 'profile', label: 'Profile', href: '/pages/university/profile.html', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'settings', label: 'Settings', href: '/pages/university/settings.html', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
      ],
      industry: [
        { id: 'dashboard', label: 'Dashboard', href: '/pages/industry/dashboard.html', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'opportunities', label: 'Opportunities', href: '/pages/industry/opportunities.html', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { id: 'projects', label: 'Projects', href: '/pages/industry/projects.html', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
        { id: 'collaborations', label: 'Collaborations', href: '/pages/industry/collaborations.html', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { id: 'mentorship', label: 'Mentorship & CSR', href: '/pages/industry/mentorship.html', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
        { id: 'notifications', label: 'Notifications', href: '/pages/industry/notifications.html', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
        { id: 'profile', label: 'Profile', href: '/pages/industry/profile.html', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'settings', label: 'Settings', href: '/pages/industry/settings.html', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
      ],
      admin: [
        { id: 'dashboard', label: 'Dashboard', href: '/pages/admin/dashboard.html', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { id: 'users', label: 'Users', href: '/pages/admin/users.html', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { id: 'challenges', label: 'Challenges', href: '/pages/admin/challenges.html', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2' },
        { id: 'universities', label: 'Universities', href: '/pages/admin/universities.html', icon: 'M12 14l9-5-9-5-9 5 9 5z' },
        { id: 'industries', label: 'Industries', href: '/pages/admin/industries.html', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16' },
        { id: 'projects', label: 'Projects', href: '/pages/admin/projects.html', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2' },
        { id: 'analytics', label: 'Analytics', href: '/pages/admin/analytics.html', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z' },
        { id: 'settings', label: 'Settings', href: '/pages/admin/settings.html', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0' }
      ]
    };
    return navs[role] || navs.citizen;
  },

  renderSidebar(role, activeId) {
    const user = Common.getUser() || { name: 'User', role };
    const navItems = this.getNavItems(role);

    const navHtml = navItems.map((item) => `
      <a href="${item.href}" class="nav-item ${item.id === activeId ? 'active' : ''}">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="${item.icon}"/></svg>
        <span>${Common.escapeHTML(item.label)}</span>
      </a>
    `).join('');

    return `
      <div class="sidebar-header">
        <div class="sidebar-logo-icon">JH</div>
        <div class="sidebar-title">
          Societal Innovation
          <span>Jharkhand SIH</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-label">Main Menu</div>
        ${navHtml}
      </nav>
      <div class="sidebar-footer">
        <div class="user-card">
          <div class="user-avatar">${Common.escapeHTML(user.name.charAt(0).toUpperCase())}</div>
          <div class="user-info">
            <div class="user-name">${Common.escapeHTML(user.name)}</div>
            <div class="user-role">${Common.escapeHTML(user.role)}</div>
          </div>
          <button data-logout title="Logout" style="color:var(--text-muted); cursor:pointer;">
            <svg style="width:18px;height:18px;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
        </div>
      </div>
    `;
  },

  renderHeader(title) {
    const user = Common.getUser() || { name: 'User' };
    return `
      <div class="header-left">
        <button class="menu-toggle" id="menuToggle">
          <span></span><span></span><span></span>
        </button>
        <h1 class="page-title" style="font-size:1.25rem;">${Common.escapeHTML(title)}</h1>
      </div>
      <div class="header-right">
        <span class="badge badge-in_progress" style="font-weight:700;">Government of Jharkhand</span>
        <div class="user-avatar" style="cursor:pointer;" title="${Common.escapeHTML(user.name)}">${Common.escapeHTML(user.name.charAt(0).toUpperCase())}</div>
      </div>
    `;
  },

  renderBreadcrumb(items) {
    return `
      <div class="breadcrumb">
        <a href="/index.html">Home</a>
        ${items.map((it) => `
          <span class="breadcrumb-sep">/</span>
          ${it.href ? `<a href="${it.href}">${Common.escapeHTML(it.label)}</a>` : `<span>${Common.escapeHTML(it.label)}</span>`}
        `).join('')}
      </div>
    `;
  },

  renderStatusBadge(status) {
    const st = String(status || 'submitted').toLowerCase();
    const label = st.replace(/_/g, ' ');
    return `<span class="badge badge-${st}">${Common.escapeHTML(label)}</span>`;
  },

  renderTimeline(currentStatus) {
    const steps = ['submitted', 'ai_analyzed', 'approved', 'matched', 'assigned', 'in_progress', 'deployed'];
    const labels = ['Submitted', 'AI Analyzed', 'Gov Approved', 'Matched', 'Assigned', 'In Progress', 'Deployed'];
    
    const currentIndex = steps.indexOf(String(currentStatus).toLowerCase());

    return `
      <div class="lifecycle-timeline">
        ${steps.map((step, idx) => {
          let stepClass = '';
          if (idx < currentIndex) stepClass = 'completed';
          else if (idx === currentIndex) stepClass = 'active';

          return `
            <div class="timeline-step ${stepClass}">
              <div class="step-circle">${idx + 1}</div>
              <div class="step-label">${labels[idx]}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderAIAnalysisCard(aiAnalysis) {
    if (!aiAnalysis) {
      return `
        <div class="ai-analysis-card">
          <div class="ai-header">
            <div class="ai-icon-chip">AI</div>
            <div>
              <h4 style="color:var(--primary-dark); font-weight:800;">Groq AI Problem Analysis</h4>
              <p style="font-size:0.8rem; color:var(--text-muted);">AI classification pending for this challenge.</p>
            </div>
          </div>
        </div>
      `;
    }

    const score = Number(aiAnalysis.priorityScore) || 50;
    const keywords = (aiAnalysis.keywords || []).map((k) => `<span class="badge" style="background:rgba(255,255,255,0.9); border:1px solid var(--primary-border); color:var(--primary);">${Common.escapeHTML(k)}</span>`).join(' ');
    const skills = (aiAnalysis.requiredSkills || []).map((s) => `<span class="badge" style="background:rgba(255,255,255,0.9); border:1px solid var(--primary-border); color:var(--primary);">${Common.escapeHTML(s)}</span>`).join(' ');

    return `
      <div class="ai-analysis-card">
        <div class="ai-header">
          <div class="ai-icon-chip">AI</div>
          <div>
            <h4 style="color:var(--primary-dark); font-weight:800; font-size:1.1rem;">Groq AI Intelligent Classification</h4>
            <p style="font-size:0.8rem; color:var(--text-muted);">Powered by Groq API (llama-3.3-70b-versatile)</p>
          </div>
        </div>
        <p style="font-size:0.9rem; color:var(--text-body); margin-bottom:16px; font-weight:500;">
          <strong>Executive Brief:</strong> ${Common.escapeHTML(aiAnalysis.summary || 'No summary generated.')}
        </p>

        <div style="margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; font-size:0.82rem; font-weight:700; color:var(--primary-dark); margin-bottom:6px;">
            <span>Priority Score</span>
            <span>${score} / 100</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${score}%;"></div>
          </div>
        </div>

        <div class="ai-grid">
          <div class="ai-metric-item">
            <div class="ai-metric-label">Category</div>
            <div class="ai-metric-value" style="text-transform:capitalize;">${Common.escapeHTML(aiAnalysis.category || 'N/A')}</div>
          </div>
          <div class="ai-metric-item">
            <div class="ai-metric-label">Sub-Category</div>
            <div class="ai-metric-value" style="text-transform:capitalize;">${Common.escapeHTML(aiAnalysis.subCategory || 'General')}</div>
          </div>
          <div class="ai-metric-item">
            <div class="ai-metric-label">Severity Assessment</div>
            <div class="ai-metric-value" style="text-transform:capitalize; color:var(--danger);">${Common.escapeHTML(aiAnalysis.severity || 'Medium')}</div>
          </div>
        </div>

        <div style="margin-top:16px; display:flex; flex-direction:column; gap:8px;">
          <div><strong style="font-size:0.8rem; color:var(--text-muted);">Keywords:</strong> ${keywords || 'None'}</div>
          <div><strong style="font-size:0.8rem; color:var(--text-muted);">Required Skills:</strong> ${skills || 'None'}</div>
        </div>
      </div>
    `;
  },

  renderEmptyState(title, desc, actionHtml = '') {
    return `
      <div class="empty-state">
        <div class="empty-icon">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
        </div>
        <h3 class="empty-title">${Common.escapeHTML(title)}</h3>
        <p class="empty-desc">${Common.escapeHTML(desc)}</p>
        ${actionHtml}
      </div>
    `;
  },

  init() {
    const sidebarContainer = document.getElementById('appSidebar');
    const headerContainer = document.getElementById('appHeader');

    if (sidebarContainer) {
      const role = sidebarContainer.getAttribute('data-role') || 'citizen';
      const active = sidebarContainer.getAttribute('data-active') || 'dashboard';
      sidebarContainer.innerHTML = this.renderSidebar(role, active);
    }

    if (headerContainer) {
      const title = headerContainer.getAttribute('data-title') || 'Portal';
      headerContainer.innerHTML = this.renderHeader(title);
    }

    // Bind logout buttons
    document.querySelectorAll('[data-logout]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        Common.logout();
      });
    });

    // Mobile drawer toggle
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('appSidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }
  }
};

window.Components = Components;

document.addEventListener('DOMContentLoaded', () => {
  Components.init();
});
