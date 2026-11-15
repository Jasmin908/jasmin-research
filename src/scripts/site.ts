// Small progressive enhancements. The site works without any of this.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Scroll reveal ---------- */
const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((el) => el.classList.add('is-in'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
  );
  revealItems.forEach((el) => revealObserver.observe(el));
}

/* ---------- Navigation indicator ---------- */
const navList = document.querySelector<HTMLElement>('[data-nav-list]');
const indicator = navList?.querySelector<HTMLElement>('[data-nav-indicator]');

if (navList && indicator) {
  const links = [...navList.querySelectorAll<HTMLAnchorElement>('a[data-nav]')];
  const active = links.find((link) => link.hasAttribute('aria-current')) ?? null;

  const moveTo = (link: HTMLElement | null) => {
    if (!link) {
      indicator.style.opacity = '0';
      return;
    }
    indicator.style.opacity = '1';
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
  };

  links.forEach((link) => {
    link.addEventListener('pointerenter', () => moveTo(link));
    link.addEventListener('focus', () => moveTo(link));
  });
  navList.addEventListener('pointerleave', () => moveTo(active));
  navList.addEventListener('focusout', () => moveTo(active));
  window.addEventListener('resize', () => moveTo(active));
  document.fonts?.ready.then(() => moveTo(active));
  moveTo(active);
}

/* ---------- Mobile menu ---------- */
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-button]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

if (menuButton && menu) {
  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', (open ? menuButton.dataset.labelClose : menuButton.dataset.labelOpen) ?? '');
  };

  menuButton.addEventListener('click', () => setOpen(Boolean(menu.hidden)));
  menu.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      menuButton.focus();
    }
  });
  document.addEventListener('click', (event) => {
    const target = event.target as Node;
    if (!menu.hidden && !menu.contains(target) && !menuButton.contains(target)) setOpen(false);
  });
}

/* ---------- Card spotlight ---------- */
if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll<HTMLElement>('[data-spot]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

/* ---------- Library: search, filters, sorting ---------- */
// Without JavaScript the controls stay hidden and every publication is listed.
const library = document.querySelector<HTMLElement>('[data-library]');

if (library) {
  const form = library.querySelector<HTMLFormElement>('[data-library-form]')!;
  const list = library.querySelector<HTMLElement>('[data-library-list]')!;
  const status = library.querySelector<HTMLElement>('[data-library-status]')!;
  const empty = library.querySelector<HTMLElement>('[data-library-empty]')!;
  const cards = [...list.querySelectorAll<HTMLElement>('[data-pub]')];
  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement;
  const names = ['q', 'subject', 'type', 'lang', 'sort'] as const;

  // Filters can be linked to, e.g. /en/publications/?subject=history
  const params = new URLSearchParams(window.location.search);
  for (const name of names) {
    const value = params.get(name);
    if (value === null) continue;
    const input = field(name);
    if (input instanceof HTMLSelectElement && ![...input.options].some((o) => o.value === value)) continue;
    input.value = value;
  }

  const apply = () => {
    const q = field('q').value.trim().toLowerCase();
    const words = q.split(/\s+/).filter(Boolean);
    const subject = field('subject').value;
    const type = field('type').value;
    const lang = field('lang').value;
    const sort = field('sort').value;

    let shown = 0;
    for (const card of cards) {
      const d = card.dataset;
      const match =
        (!subject || (d.subjects ?? '').split(' ').includes(subject)) &&
        (!type || d.type === type) &&
        (!lang || d.lang === lang) &&
        words.every((word) => (d.search ?? '').includes(word));
      card.hidden = !match;
      // Keep newly shown cards visible even if they were never scrolled to.
      if (match) {
        card.classList.add('is-in');
        shown++;
      }
    }

    const sorted = [...cards].sort((a, b) => {
      if (sort === 'title') return (a.dataset.title ?? '').localeCompare(b.dataset.title ?? '');
      const diff = (a.dataset.date ?? '').localeCompare(b.dataset.date ?? '');
      return sort === 'oldest' ? diff : -diff;
    });
    sorted.forEach((card) => list.append(card));

    status.textContent =
      shown === 1 ? (status.dataset.one ?? '') : (status.dataset.many ?? '').replace('{n}', String(shown));
    empty.hidden = shown > 0;

    // Mirror the state in the address bar, so a filtered view can be shared.
    const next = new URLSearchParams();
    for (const name of names) {
      const value = field(name).value.trim();
      if (value && !(name === 'sort' && value === 'newest')) next.set(name, value);
    }
    const query = next.toString();
    history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
  };

  form.addEventListener('input', apply);
  form.addEventListener('change', apply);
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('reset', () => setTimeout(apply));
  library.querySelectorAll('[data-library-reset]').forEach((button) =>
    button.addEventListener('click', () => {
      form.reset();
      field('q').focus();
    }),
  );

  // "/" focuses the search field, as on many reference sites.
  document.addEventListener('keydown', (event) => {
    const target = event.target as HTMLElement;
    if (event.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(target.tagName)) {
      event.preventDefault();
      field('q').focus();
    }
  });

  form.hidden = false;
  apply();
}

/* ---------- Article: table of contents, progress, citation ---------- */
const toc = document.querySelector<HTMLDetailsElement>('[data-toc]');

// On narrow screens the contents start collapsed above the text.
if (toc && window.matchMedia('(max-width: 1000px)').matches) toc.open = false;

if (toc && 'IntersectionObserver' in window) {
  const links = [...toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const headings = links
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter((el): el is HTMLElement => el !== null);
  const visible = new Set<Element>();

  const highlight = () => {
    // The first heading on screen, or the last one passed.
    let current = headings.find((h) => visible.has(h));
    if (!current) current = [...headings].reverse().find((h) => h.getBoundingClientRect().top < 120);
    links.forEach((link) => {
      const on = current !== undefined && link.hash === `#${encodeURIComponent(current.id)}`;
      if (on) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target)));
      highlight();
    },
    { rootMargin: '-80px 0px -55% 0px' },
  );
  headings.forEach((heading) => spy.observe(heading));
}

const progress = document.querySelector<HTMLElement>('[data-progress]');
const prose = document.querySelector<HTMLElement>('[data-prose]');

if (progress && prose) {
  let ticking = false;
  const update = () => {
    const rect = prose.getBoundingClientRect();
    const total = rect.height - window.innerHeight * 0.6;
    const done = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
    progress.style.transform = `scaleX(${done})`;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) requestAnimationFrame(update);
      ticking = true;
    },
    { passive: true },
  );
  update();
}

document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
  button.hidden = false;
  button.addEventListener('click', async () => {
    const source = document.getElementById(button.dataset.copy ?? '');
    if (!source) return;
    try {
      await navigator.clipboard.writeText(source.innerText.trim());
      const label = button.querySelector('span');
      if (!label) return;
      const before = label.textContent;
      label.textContent = button.dataset.done ?? before;
      setTimeout(() => (label.textContent = before), 1800);
    } catch {
      // Clipboard can be blocked; the text is still selectable.
    }
  });
});
