/**
 * SamadhanSetu Mobile & Responsive Navigation Manager
 * SIH26043 — Societal Innovation Collaboration Platform
 */

(function (global) {
  const ROLE_NAV_ITEMS = {
    citizen: [
      { label: { en: 'Dashboard', hi: 'डैशबोर्ड' }, url: 'citizen-dashboard.html' },
      { label: { en: 'My Reports', hi: 'मेरी रिपोर्ट' }, url: 'my-reports.html' },
      { label: { en: 'Explore Challenges', hi: 'चुनौतियां देखें' }, url: 'challenges.html' },
      { label: { en: 'Report Problem', hi: 'समस्या दर्ज करें' }, url: 'report-problem.html' },
      { label: { en: 'Profile', hi: 'प्रोफ़ाइल' }, url: 'profile.html' }
    ],
    student: [
      { label: { en: 'Dashboard', hi: 'डैशबोर्ड' }, url: 'student-dashboard.html' },
      { label: { en: 'Challenges', hi: 'चुनौतियां' }, url: 'challenges.html' },
      { label: { en: 'Project Workspace', hi: 'प्रोजेक्ट कार्यस्थान' }, url: 'project-workspace.html' },
      { label: { en: 'Profile', hi: 'प्रोफ़ाइल' }, url: 'profile.html' }
    ],
    faculty: [
      { label: { en: 'Dashboard', hi: 'डैशबोर्ड' }, url: 'faculty-dashboard.html' },
      { label: { en: 'Challenges Feed', hi: 'चुनौतियां' }, url: 'challenges.html' },
      { label: { en: 'Project Workspace', hi: 'प्रोजेक्ट कार्यस्थान' }, url: 'project-workspace.html' },
      { label: { en: 'Profile', hi: 'प्रोफ़ाइल' }, url: 'profile.html' }
    ],
    university: [
      { label: { en: 'Dashboard', hi: 'डैशबोर्ड' }, url: 'university-dashboard.html' },
      { label: { en: 'Challenges Feed', hi: 'चुनौतियां' }, url: 'challenges.html' },
      { label: { en: 'State Analytics', hi: 'राज्य विश्लेषण' }, url: 'analytics.html' },
      { label: { en: 'Profile', hi: 'प्रोफ़ाइल' }, url: 'profile.html' }
    ],
    industry: [
      { label: { en: 'CSR Dashboard', hi: 'सीएसआर डैशबोर्ड' }, url: 'industry-dashboard.html' },
      { label: { en: 'Opportunities', hi: 'चुनौतियां देखें' }, url: 'challenges.html' },
      { label: { en: 'Impact Center', hi: 'प्रभाव केंद्र' }, url: 'impact.html' },
      { label: { en: 'Profile', hi: 'प्रोफ़ाइल' }, url: 'profile.html' }
    ],
    government: [
      { label: { en: 'Command Center', hi: 'कमांड सेंटर' }, url: 'government-dashboard.html' },
      { label: { en: 'Public Feed', hi: 'सार्वजनिक फीड' }, url: 'challenges.html' },
      { label: { en: 'Analytics', hi: 'राज्य विश्लेषण' }, url: 'analytics.html' },
      { label: { en: 'Impact Center', hi: 'प्रभाव केंद्र' }, url: 'impact.html' },
      { label: { en: 'Profile', hi: 'प्रोफ़ाइल' }, url: 'profile.html' }
    ],
    admin: [
      { label: { en: 'Admin Console', hi: 'एडमिन कंसोल' }, url: 'admin-dashboard.html' },
      { label: { en: 'Gov Command', hi: 'सरकारी कमांड' }, url: 'government-dashboard.html' },
      { label: { en: 'Challenges Feed', hi: 'चुनौतियां' }, url: 'challenges.html' },
      { label: { en: 'Analytics', hi: 'विश्लेषण' }, url: 'analytics.html' },
      { label: { en: 'Profile', hi: 'प्रोफ़ाइल' }, url: 'profile.html' }
    ]
  };

  const MobileNav = {
    init() {
      const navEl = document.querySelector('.civic-nav') || document.querySelector('.navbar');
      if (!navEl) return;

      if (document.getElementById('mobileNavToggleBtn')) return;

      const user = global.AuthManager ? global.AuthManager.getUser() : null;
      const role = user ? user.role : null;
      const lang = localStorage.getItem('jhar_language') || 'en';

      let rightNavBox = navEl.querySelector('div:last-child');
      if (!rightNavBox) {
        rightNavBox = document.createElement('div');
        rightNavBox.style.display = 'flex';
        rightNavBox.style.alignItems = 'center';
        rightNavBox.style.gap = '12px';
        navEl.appendChild(rightNavBox);
      }

      const toggleBtn = document.createElement('button');
      toggleBtn.id = 'mobileNavToggleBtn';
      toggleBtn.className = 'mobile-nav-toggle';
      toggleBtn.setAttribute('aria-label', 'Toggle Mobile Navigation Menu');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = '☰';
      rightNavBox.prepend(toggleBtn);

      const drawer = document.createElement('div');
      drawer.id = 'mobileNavDrawer';
      drawer.className = 'mobile-nav-drawer';

      let navHtml = `<div class="mobile-drawer-header">
        <div style="font-weight: 800; font-size: 15px; color: var(--primary-dark);">SamadhanSetu Menu</div>
        <button id="closeMobileDrawerBtn" class="close-drawer-btn" aria-label="Close Navigation Menu">✕</button>
      </div>
      <div class="mobile-drawer-links">`;

      if (role && ROLE_NAV_ITEMS[role]) {
        ROLE_NAV_ITEMS[role].forEach(item => {
          const title = item.label[lang] || item.label.en;
          navHtml += `<a href="${item.url}" class="mobile-drawer-link">${title}</a>`;
        });
      } else {
        navHtml += `
          <a href="index.html" class="mobile-drawer-link">Home</a>
          <a href="challenges.html" class="mobile-drawer-link">Explore Challenges</a>
          <a href="report-problem.html" class="mobile-drawer-link">Report a Problem</a>
          <a href="login.html" class="mobile-drawer-link" style="color: var(--primary); font-weight:800;">Sign In / Register</a>
        `;
      }

      if (user) {
        navHtml += `<button onclick="AuthManager ? AuthManager.logout() : (localStorage.clear(), window.location.href='login.html')" class="mobile-drawer-link logout-link">Log Out (${user.name || role})</button>`;
      }

      navHtml += `</div>`;
      drawer.innerHTML = navHtml;
      document.body.appendChild(drawer);

      const backdrop = document.createElement('div');
      backdrop.id = 'mobileNavBackdrop';
      backdrop.className = 'mobile-nav-backdrop';
      document.body.appendChild(backdrop);

      function openMenu() {
        drawer.classList.add('open');
        backdrop.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }

      function closeMenu() {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        drawer.classList.contains('open') ? closeMenu() : openMenu();
      });

      document.getElementById('closeMobileDrawerBtn')?.addEventListener('click', closeMenu);
      backdrop.addEventListener('click', closeMenu);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
          closeMenu();
        }
      });

      drawer.querySelectorAll('.mobile-drawer-link').forEach(link => {
        link.addEventListener('click', closeMenu);
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MobileNav.init());
  } else {
    MobileNav.init();
  }

  global.MobileNav = MobileNav;
})(typeof window !== 'undefined' ? window : globalThis);
