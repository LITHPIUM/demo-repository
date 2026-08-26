(() => {
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
})();
