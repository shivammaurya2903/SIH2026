/**
 * SamadhanSetu Centralized Internationalization (i18n) Engine & Translation Dictionaries (Root Copy)
 * SIH26043 — Societal Innovation Collaboration Platform
 */

(function (global) {
  const STORAGE_KEY = 'jhar_language';

  const TRANSLATIONS = {
    en: {
      appName: 'SamadhanSetu',
      appSubtitle: 'Jharkhand Societal Innovation Platform',
      
      // Common UI & Navigation
      nav: {
        home: 'Home',
        dashboard: 'Dashboard',
        challenges: 'Explore Challenges',
        reports: 'My Reports',
        reportProblem: 'Report a Problem',
        analytics: 'State Analytics',
        impact: 'Impact Center',
        notifications: 'Notifications',
        profile: 'Profile',
        logout: 'Log Out',
        login: 'Sign In / Register',
        back: '← Back'
      },

      // Common Buttons
      btn: {
        submit: 'Submit',
        save: 'Save Changes',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        inspect: 'Inspect',
        approve: 'Approve',
        reject: 'Reject',
        viewDetails: 'View Details →',
        facingBtn: 'I Faced This Problem',
        markedFacing: 'Marked — You Faced This Problem',
        openWorkspace: 'Open Workspace →',
        offerSupport: 'Offer CSR Support →',
        close: 'Close'
      },

      // Status Labels
      status: {
        draft: 'Draft',
        submitted: 'Submitted / Pending Review',
        ai_analyzed: 'AI Analyzed',
        under_review: 'Under Government Review',
        approved: 'Approved / Validated',
        rejected: 'Rejected',
        duplicate: 'Duplicate Identified',
        matched: 'R&D Matched',
        assigned: 'Assigned to Team',
        in_progress: 'In Progress / R&D Active',
        prototype: 'Prototype Testing',
        testing: 'Quality Testing',
        pilot: 'Pilot Trial',
        deployed: 'Solutions Deployed',
        completed: 'Completed',
        on_hold: 'On Hold',
        cancelled: 'Cancelled'
      },

      // Priority Labels
      priority: {
        low: 'Low Priority',
        medium: 'Medium Priority',
        high: 'High Priority',
        critical: 'Critical Priority'
      },

      // Roles
      role: {
        citizen: 'Citizen / Community Member',
        student: 'Student Innovator',
        faculty: 'Faculty Mentor',
        university: 'University / Institute R&D',
        industry: 'Industry / CSR Partner',
        government: 'Government Official',
        admin: 'System Administrator'
      },

      // Categories
      category: {
        education: 'Education & Literacy',
        healthcare: 'Healthcare & Nutrition',
        agriculture: 'Agriculture & Farming',
        water: 'Water Infrastructure & Sanitation',
        sanitation: 'Sanitation & Waste Management',
        environment: 'Environment & Climate Response',
        energy: 'Renewable Energy & Power',
        urban_development: 'Urban Development & Housing',
        accessibility: 'Disability Accessibility',
        public_administration: 'Public Administration & Services',
        rural_livelihoods: 'Rural Livelihoods & Skill Development',
        infrastructure: 'Roads & Rural Infrastructure',
        other: 'General Community Issue'
      },

      // Messages & Alerts
      messages: {
        loading: 'Loading data...',
        noData: 'No records found matching your query.',
        successSubmit: 'Problem report submitted successfully!',
        errorNet: 'Unable to connect to SamadhanSetu backend services. Please check network connection.',
        sessionExpired: 'Your session has expired. Please sign in again.',
        accessDenied: 'Access Restricted — You do not have the required role authorization to access this page.'
      }
    },

    hi: {
      appName: 'समाधानसेतु',
      appSubtitle: 'झारखंड सामाजिक नवाचार मंच',
      
      // Common UI & Navigation
      nav: {
        home: 'मुख्य पृष्ठ',
        dashboard: 'डैशबोर्ड',
        challenges: 'चुनौतियां देखें',
        reports: 'मेरी रिपोर्ट',
        reportProblem: 'समस्या दर्ज करें',
        analytics: 'राज्य विश्लेषण',
        impact: 'प्रभाव केंद्र',
        notifications: 'सूचनाएं',
        profile: 'प्रोफ़ाइल',
        logout: 'लॉग आउट',
        login: 'साइन इन / पंजीकरण',
        back: '← वापस'
      },

      // Common Buttons
      btn: {
        submit: 'प्रस्तुत करें',
        save: 'सहेजें',
        cancel: 'रद्द करें',
        edit: 'संपादित करें',
        delete: 'हटाएं',
        inspect: 'निरीक्षण करें',
        approve: 'स्वीकृत करें',
        reject: 'अस्वीकार करें',
        viewDetails: 'विवरण देखें →',
        facingBtn: 'मुझे भी यह समस्या है',
        markedFacing: 'अंकित — आपको यह समस्या है',
        openWorkspace: 'कार्यस्थान खोलें →',
        offerSupport: 'सीएसआर सहायता प्रदान करें →',
        close: 'बंद करें'
      },

      // Status Labels
      status: {
        draft: 'प्रारूप',
        submitted: 'प्रस्तुत / लंबित समीक्षा',
        ai_analyzed: 'एआई विश्लेषित',
        under_review: 'सरकारी समीक्षा के अधीन',
        approved: 'स्वीकृत / सत्यापित',
        rejected: 'अस्वीकृत',
        duplicate: 'प्रतिलिपि चिह्नित',
        matched: 'आरएंडडी मिलान',
        assigned: 'टीम को आवंटित',
        in_progress: 'प्रगति पर / आरएंडडी सक्रिय',
        prototype: 'प्रोटोटाइप परीक्षण',
        testing: 'गुणवत्ता परीक्षण',
        pilot: 'पायलट परीक्षण',
        deployed: 'तैनात समाधान',
        completed: 'पूर्ण',
        on_hold: 'स्थगित',
        cancelled: 'रद्द'
      },

      // Priority Labels
      priority: {
        low: 'कम प्राथमिकता',
        medium: 'मध्यम प्राथमिकता',
        high: 'उच्च प्राथमिकता',
        critical: 'गंभीर प्राथमिकता'
      },

      // Roles
      role: {
        citizen: 'नागरिक / समुदाय सदस्य',
        student: 'छात्र नवाचारकर्ता',
        faculty: 'संकाय मेंटर',
        university: 'विश्वविद्यालय / संस्थान आरएंडडी',
        industry: 'उद्योग / सीएसआर भागीदार',
        government: 'सरकारी अधिकारी',
        admin: 'सिस्टम प्रशासक'
      },

      // Categories
      category: {
        education: 'शिक्षा एवं साक्षरता',
        healthcare: 'स्वास्थ्य सेवा एवं पोषण',
        agriculture: 'कृषि एवं खेती',
        water: 'जल अवसंरचना एवं स्वच्छता',
        sanitation: 'स्वच्छता एवं कचरा प्रबंधन',
        environment: 'पर्यावरण एवं जलवायु प्रतिक्रिया',
        energy: 'नवीकरणीय ऊर्जा एवं बिजली',
        urban_development: 'शहरी विकास एवं आवास',
        accessibility: 'दिव्यांग सुगमता',
        public_administration: 'लोक प्रशासन एवं जन सेवाएं',
        rural_livelihoods: 'ग्रामीण आजीविका एवं कौशल विकास',
        infrastructure: 'सड़क एवं ग्रामीण अवसंरचना',
        other: 'सामान्य सामुदायिक समस्या'
      },

      // Messages & Alerts
      messages: {
        loading: 'डेटा लोड हो रहा है...',
        noData: 'आपके प्रश्न से मेल खाने वाला कोई रिकॉर्ड नहीं मिला।',
        successSubmit: 'समस्या रिपोर्ट सफलतापूर्वक सबमिट की गई!',
        errorNet: 'समाधानसेतु बैकएंड सेवाओं से कनेक्ट करने में असमर्थ। कृपया नेटवर्क कनेक्शन की जांच करें।',
        sessionExpired: 'आपका सत्र समाप्त हो गया है। कृपया पुनः साइन इन करें।',
        accessDenied: 'पहुंच प्रतिबंधित — आपके पास इस पृष्ठ तक पहुंचने के लिए आवश्यक अधिकार नहीं हैं।'
      }
    }
  };

  const I18nEngine = {
    getLanguage() {
      return localStorage.getItem(STORAGE_KEY) || 'en';
    },

    setLanguage(lang) {
      const validLang = lang === 'hi' ? 'hi' : 'en';
      localStorage.setItem(STORAGE_KEY, validLang);
      document.documentElement.lang = validLang;
      this.applyLanguage(validLang);
      return validLang;
    },

    toggleLanguage() {
      const current = this.getLanguage();
      const next = current === 'en' ? 'hi' : 'en';
      return this.setLanguage(next);
    },

    t(keyPath, fallback = '') {
      const lang = this.getLanguage();
      const keys = keyPath.split('.');
      let obj = TRANSLATIONS[lang] || TRANSLATIONS.en;
      
      for (const k of keys) {
        if (!obj || obj[k] === undefined) {
          let enObj = TRANSLATIONS.en;
          for (const ek of keys) {
            if (!enObj || enObj[ek] === undefined) return fallback || keyPath;
            enObj = enObj[ek];
          }
          return enObj || fallback || keyPath;
        }
        obj = obj[k];
      }
      return obj || fallback || keyPath;
    },

    getStatusLabel(statusKey) {
      return this.t(`status.${statusKey}`, statusKey || 'Submitted');
    },

    getPriorityLabel(priorityKey) {
      return this.t(`priority.${priorityKey}`, priorityKey || 'Medium');
    },

    getCategoryLabel(categoryKey) {
      return this.t(`category.${categoryKey}`, categoryKey || 'General');
    },

    getRoleLabel(roleKey) {
      return this.t(`role.${roleKey}`, roleKey || 'User');
    },

    applyLanguage(lang) {
      const currentLang = lang || this.getLanguage();
      document.documentElement.lang = currentLang;

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = this.t(key);
        if (val && val !== key) {
          el.textContent = val;
        }
      });

      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const val = this.t(key);
        if (val && val !== key) {
          el.placeholder = val;
        }
      });

      document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const val = this.t(key);
        if (val && val !== key) {
          el.title = val;
        }
      });

      const toggleBtn = document.getElementById('langToggleBtn');
      if (toggleBtn) {
        toggleBtn.textContent = currentLang === 'en' ? 'EN | हिंदी' : 'हिंदी | EN';
      }
    }
  };

  global.I18nEngine = I18nEngine;
  global.TRANSLATIONS = TRANSLATIONS;
  global.getLanguage = function() { return I18nEngine.getLanguage(); };
  global.toggleLanguage = function() { return I18nEngine.toggleLanguage(); };
  global.t = function(key, fallback) { return I18nEngine.t(key, fallback); };
})(typeof window !== 'undefined' ? window : globalThis);
