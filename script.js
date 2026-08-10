// Fetch a shared partial (nav/footer) and inject it into a mount point.
async function loadPartial(mountId, path, homePrefix) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const res = await fetch(path);
  const html = await res.text();
  mount.outerHTML = html.replaceAll('{{HOME}}', homePrefix);
}

async function init() {
  const homePrefix = document.body.dataset.home === 'true' ? '' : 'index.html';
  await Promise.all([
    loadPartial('nav-mount', 'partials/nav.html', homePrefix),
    loadPartial('footer-mount', 'partials/footer.html', homePrefix),
  ]);

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
      });
    });
  }

  // Scroll-reveal for elements marked with .reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
}

init();
