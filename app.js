(() => {
  const pillStyles = document.createElement('link');
  pillStyles.rel = 'stylesheet';
  pillStyles.href = '/demo-repository/pill-nav.css?v=1';
  document.head.appendChild(pillStyles);

  const loader = document.querySelector('.site-loader');
  const hideLoader = () => {
    if (!loader) return;
    loader.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
  };

  if (loader) {
    window.setTimeout(hideLoader, 850);
    window.addEventListener('load', () => window.setTimeout(hideLoader, 220));
  }

  const count = document.querySelector('[data-github-stars]');
  if (count) {
    fetch('https://api.github.com/repos/LITHPIUM/demo-repository', {
      headers: { Accept: 'application/vnd.github+json' }
    })
      .then(response => response.ok ? response.json() : Promise.reject(response.status))
      .then(repo => {
        count.textContent = Number(repo.stargazers_count || 0).toLocaleString();
      })
      .catch(() => {
        count.textContent = '—';
      });
  }

  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.pill[href^="/demo-repository/"]').forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '') || '/';
    if (linkPath === currentPath) link.classList.add('is-active');
  });

  const menuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu-popover');
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const open = !mobileMenu.classList.contains('is-open');
      mobileMenu.classList.toggle('is-open', open);
      menuButton.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        menuButton.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
      });
    });
  }
})();
