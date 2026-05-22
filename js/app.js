// DebtZero Pro - Enhanced JS with proper language toggle for ALL pages
document.addEventListener('DOMContentLoaded', function() {
  let currentLang = localStorage.getItem('preferredLang') || 'zh';
  initLanguageToggle(currentLang);

  function initLanguageToggle(lang) {
    localStorage.setItem('preferredLang', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
        btn.textContent = lang === 'zh' ? '中文' : 'ENG';
      } else {
        btn.classList.remove('active');
        btn.textContent = btn.dataset.lang === 'zh' ? '中文' : 'ENG';
      }
    });

    // Update Home button text
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
      homeBtn.textContent = lang === 'zh' ? '返回主頁' : 'Back to Home';
    }
  }

  // Language button clicks
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const newLang = this.dataset.lang;
      initLanguageToggle(newLang);
      // For non-index pages, redirect to index if switching to ZH
      if (newLang === 'zh' && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
      }
    });
  });

  console.log('DebtZero Pro language system initialized');
  // ... rest of original app logic for calculator remains unchanged ...
});