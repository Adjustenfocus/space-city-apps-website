document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

document.querySelectorAll('.nav-menu').forEach((menu) => {
  const trigger = menu.querySelector('.nav-menu-trigger');
  const dropdown = menu.querySelector('.nav-dropdown');
  if (!trigger || !dropdown) return;

  const setOpen = (open, returnFocus = false) => {
    trigger.setAttribute('aria-expanded', String(open));
    dropdown.hidden = !open;
    if (returnFocus) trigger.focus();
  };

  trigger.addEventListener('click', () => {
    setOpen(trigger.getAttribute('aria-expanded') !== 'true');
  });

  trigger.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowDown') return;
    event.preventDefault();
    setOpen(true);
    dropdown.querySelector('a')?.focus();
  });

  dropdown.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('pointerdown', (event) => {
    if (!menu.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });
});

const revealItems = [...document.querySelectorAll('[data-reveal]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (revealItems.length && !reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  requestAnimationFrame(() => revealItems.forEach((item) => revealObserver.observe(item)));
}
