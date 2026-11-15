// Theme toggle (same rk-theme key as the SvelteKit nav), mobile menu and giscus comments
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
      syncGiscusTheme(next);
    });
  }

  function syncGiscusTheme(theme) {
    var frame = document.querySelector('iframe.giscus-frame');
    if (frame) frame.contentWindow.postMessage({ giscus: { setConfig: { theme: theme } } }, 'https://giscus.app');
  }

  // Inject giscus only when the comments box nears the viewport, using the current site theme
  var giscusEl = document.querySelector('[data-giscus]');
  if (giscusEl) {
    var loadGiscus = function () {
      var d = giscusEl.dataset;
      var s = document.createElement('script');
      s.src = 'https://giscus.app/client.js';
      s.async = true;
      s.crossOrigin = 'anonymous';
      var attrs = {
        'data-repo': d.repo, 'data-repo-id': d.repoId, 'data-category': d.category, 'data-category-id': d.categoryId,
        'data-mapping': 'pathname', 'data-strict': '1', 'data-reactions-enabled': '1', 'data-emit-metadata': '0',
        'data-input-position': 'top', 'data-lang': 'en', 'data-loading': 'lazy',
        'data-theme': root.getAttribute('data-theme') === 'light' ? 'light' : 'dark',
      };
      for (var k in attrs) s.setAttribute(k, attrs[k]);
      giscusEl.appendChild(s);
    };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { io.disconnect(); loadGiscus(); }
      }, { rootMargin: '400px' });
      io.observe(giscusEl);
    } else {
      loadGiscus();
    }
  }

  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      var open = links.classList.toggle('nav__links--open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.firstElementChild.className = open ? 'fas fa-times' : 'fas fa-bars';
    });
  }
})();
