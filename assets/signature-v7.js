(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.motion-toggle');
  const label = toggle?.querySelector('.motion-label');
  const symbol = toggle?.querySelector('.motion-symbol');
  const progress = document.querySelector('.reading-progress');
  let paused = false;
  let pending = false;
  let observer;

  function updateMotion() {
    document.body.classList.toggle('motion-paused', paused);
    if (toggle) {
      toggle.hidden = reduce.matches;
      toggle.setAttribute('aria-pressed', String(paused));
      if (label) label.textContent = paused ? 'Resume motion' : 'Pause motion';
      if (symbol) symbol.textContent = paused ? '▷' : 'Ⅱ';
    }
  }

  toggle?.addEventListener('click', () => {
    paused = !paused;
    updateMotion();
  });
  if (reduce.addEventListener) reduce.addEventListener('change', updateMotion);
  updateMotion();

  // Page content is always visible; a reveal starts only on entry.
  // No layout or content depends on JavaScript being available.
  if ('IntersectionObserver' in window && !reduce.matches) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (!paused) entry.target.classList.add('reveal-enter');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  }

  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    if (progress) progress.style.transform = `scaleX(${Math.max(0, Math.min(1, ratio))})`;
    pending = false;
  }
  function requestProgress() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(updateProgress);
  }
  window.addEventListener('scroll', requestProgress, { passive: true });
  window.addEventListener('resize', requestProgress, { passive: true });
  window.addEventListener('load', requestProgress);
  updateProgress();

  // Keep the mobile menu usable with native details, keyboard and no JS.
  const menu = document.querySelector('.mobile-menu');
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.open) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });
  document.addEventListener('click', event => {
    if (menu?.open && !menu.contains(event.target)) menu.open = false;
  });
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.open = false;
  }));
})();
