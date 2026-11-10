// Theme toggle (same rk-theme key as the SvelteKit nav) and mobile menu
(function () {
  var root = document.documentElement;
  var themeBtn = document.querySelector('[data-theme-toggle]');
  var menuBtn = document.querySelector('[data-menu-toggle]');
  var links = document.getElementById('nav-links');

  function syncTheme() {
    var theme = root.getAttribute('data-theme') || 'dark';
    if (!themeBtn) return;
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeBtn.setAttribute('title', theme === 'dark' ? 'Light mode' : 'Dark mode');
    themeBtn.firstElementChild.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  if (themeBtn) {
    syncTheme();
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('rk-theme', next); } catch (e) {}
      syncTheme();
    });
  }

  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      var open = links.classList.toggle('nav__links--open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.firstElementChild.className = open ? 'fas fa-times' : 'fas fa-bars';
    });
  }
})();
