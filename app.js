// Riba Landing - Vanilla JS interactions

// Helpers
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

// 1) Mobile menu toggle
(() => {
  const btn = $('#mobileMenuBtn');
  const menu = $('#mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false; // toggle returns true if now has 'hidden'
    btn.setAttribute('aria-expanded', String(open));
  });
  // Close on link click
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
  }));
})();

// 2) Hero background slider with crossfade
(() => {
  const hero = $('#hero');
  if (!hero) return;

  const SLIDE_INTERVAL = 3000; // milliseconds between hero image transitions

  // African small-business context via Unsplash Source (relevant themed queries)
  const slidesData = [
    { src: 'https://source.unsplash.com/1920x1080/?african,market,stall', alt: 'Open-air African market with fresh produce' },
    { src: 'https://source.unsplash.com/1920x1080/?african,fashion,boutique', alt: 'African fashion boutique with vibrant clothing' },
    { src: 'https://source.unsplash.com/1920x1080/?african,beauty,salon', alt: 'Beauty salon entrepreneur serving customers' },
    { src: 'https://source.unsplash.com/1920x1080/?african,retail,shop', alt: 'Local retail shop interior with products' },
    { src: 'https://source.unsplash.com/1920x1080/?african,cafe,coffee', alt: 'Cafe barista preparing coffee for a customer' }
  ];

  // Keep fallback until first slide loads successfully
  const fallback = $('.js-fallback', hero);

  // Create slide containers (use background images to avoid alt text showing if load fails)
  const slides = slidesData.map(({ src, alt }, i) => {
    const el = document.createElement('div');
    el.className = 'absolute inset-0 h-full w-full opacity-0';
    el.style.transition = 'opacity 900ms ease';
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', alt);
    hero.appendChild(el);

    // Preload image
    const imgLoader = new Image();
    imgLoader.crossOrigin = 'anonymous';
    imgLoader.decoding = 'async';
    const applyBackground = (url) => {
      el.style.backgroundImage = `url("${url}")`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
    };

    let triedFallback = false;
    const fallbackUrl = `https://source.unsplash.com/1920x1080/?african,business,storefront,${i}`;

    imgLoader.onload = () => {
      applyBackground(imgLoader.src);
      if (i === 0) {
        el.style.opacity = '1';
        fallback?.remove();
        if (!reduceMotion) start(); // start autoplay only after first successfully loaded
      }
    };
    imgLoader.onerror = () => {
      if (!triedFallback) {
        triedFallback = true;
        imgLoader.src = fallbackUrl;
        return;
      }
      // Only warn if both primary and fallback failed
      console.warn('Hero slide failed to load primary and fallback:', src, fallbackUrl);
      if (i === 0 && !reduceMotion) start();
    };
    imgLoader.src = src;
    return el;
  });

  let index = 0;
  let timer = null; // continuous autoplay; hover does not pause
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const advance = () => {
    const current = slides[index];
    index = (index + 1) % slides.length;
    const next = slides[index];
    if (!current || !next) return;
    current.style.opacity = '0';
    next.style.opacity = '1';
  };

  const start = () => { if (!timer && slides.length > 1) timer = setInterval(advance, SLIDE_INTERVAL); };
  const stop = () => { if (timer) { clearInterval(timer); timer = null; } };

  // If user prefers reduced motion, just show first (on load handler) without starting interval.
})();

// 3) Currency toggle (₦ default, toggle to $)
(() => {
  const switchEl = $('#currencySwitch');
  if (!switchEl) return;
  const prices = $$('.plan-price');

  const format = (amount, currency) => {
    if (currency === 'NGN') {
      return `₦${Number(amount).toLocaleString('en-NG')}`;
    }
    return `$${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const render = () => {
    const usd = switchEl.getAttribute('aria-checked') === 'true';
    prices.forEach(p => {
      const ngn = p.getAttribute('data-price-ngn') || '0';
      const usdVal = p.getAttribute('data-price-usd') || '0';
      const amount = usd ? usdVal : ngn;
      const currency = usd ? 'USD' : 'NGN';
      const currencySymbol = usd ? '$' : '₦';
      const amountNode = p.querySelector('.amount');
      const currencyNode = p.querySelector('.currency');
      if (amountNode) amountNode.textContent = usd ? Number(amount).toLocaleString('en-US') : Number(amount).toLocaleString('en-NG');
      if (currencyNode) currencyNode.textContent = currencySymbol;
    });
  };

  switchEl.addEventListener('click', () => {
    const next = switchEl.getAttribute('aria-checked') !== 'true';
    switchEl.setAttribute('aria-checked', String(next));
    render();
  });

  // Keyboard support for switch (Space/Enter)
  switchEl.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const next = switchEl.getAttribute('aria-checked') !== 'true';
      switchEl.setAttribute('aria-checked', String(next));
      render();
    }
  });

  render();
})();

// 4) FAQ accordion (accessible)
(() => {
  const items = $$('.faq-item');
  items.forEach(item => {
    const btn = $('.faq-button', item);
    const panel = $('.faq-panel', item);
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });

    // keyboard left/up to close, right/down to open
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { btn.setAttribute('aria-expanded', 'true'); panel.hidden = false; }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { btn.setAttribute('aria-expanded', 'false'); panel.hidden = true; }
    });
  });
})();

// 5) Smooth scroll for on-page links
(() => {
  const isHashLink = (a) => a.hash && a.origin === location.origin && a.pathname === location.pathname;
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      if (!isHashLink(a)) return;
      const target = $(a.hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', a.hash);
      }
    });
  });
})();

// 6) Waitlist form submission to Google Forms (supports multiple forms)
(() => {
  const forms = $$('[data-waitlist-form]');
  if (!forms.length) return;

  // Google Form endpoint (read from each form's action)
  const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSeAD5llB7G014dkRz5-Gvk6bFwK96-GR8bu368FEgfSVztElg/formResponse';

  const toJSON = (formEl) => Object.fromEntries(new FormData(formEl).entries());

  const attach = (form) => {
    const status = form.querySelector('[role="status"]') || document.createElement('p');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (status) status.textContent = '';

      // Minimal validation: use name selector (IDs start with digits and are not valid CSS selectors)
      const emailInput = form.querySelector('[name="entry.831820176"]');
      if (emailInput && !emailInput.value.trim()) {
        status.textContent = 'Please enter your email address.';
        status.className = 'form-status mt-3 text-sm text-red-600';
        emailInput.focus();
        return;
      }

      if (status) {
        status.textContent = 'Submitting…';
        status.className = 'form-status mt-3 text-sm text-slate-600';
      }

      // Use the form's own fields directly (IDs/names match Google Form exactly)
      const fd = new FormData(form);
      if (!fd.has('fbzx')) fd.append('fbzx', Date.now().toString());

      try {
        // Use no-cors to avoid CORS errors; response will be opaque but the submission will be recorded.
        await fetch(form.action || GOOGLE_FORM_ACTION, { method: 'POST', mode: 'no-cors', body: fd });
        if (status) {
          status.textContent = 'Thanks! You\'re on the waiting list. We\'ll be in touch soon.';
          status.className = 'form-status mt-3 text-sm text-emerald-700';
        }
        form.reset();
        status?.focus?.();
      } catch (err) {
        console.error('Google Form submit failed:', err);
        if (status) {
          status.textContent = 'Sorry, something went wrong. Please try again.';
          status.className = 'form-status mt-3 text-sm text-red-600';
        }
      }
    });
  };

  forms.forEach(attach);
})();

// 7) Footer year
(() => {
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
})();

// 8) Waitlist Modal (auto open after 3s, focus trap, CTA opens)
(() => {
  const modal = $('#waitlistModal');
  if (!modal) return;
  const overlay = modal.querySelector('[data-modal-overlay]');
  const panel = modal.querySelector('[data-modal-panel]');
  const closeBtn = modal.querySelector('[data-modal-close]');
  const firstInput = modal.querySelector('input');
  const body = document.body;

  let lastFocus = null;
  const storageKey = 'riba_waitlist_seen';

  const focusableSelectors = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const getFocusable = () => Array.from(panel.querySelectorAll(focusableSelectors)).filter(el => !el.hasAttribute('disabled'));

  const trap = (e) => {
    if (e.key !== 'Tab') return;
    const items = getFocusable();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const openModal = () => {
    if (!modal.classList.contains('hidden')) return;
    lastFocus = document.activeElement;
    modal.classList.remove('hidden');
    body.classList.add('overflow-hidden');
    document.addEventListener('keydown', onKey);
    panel.addEventListener('keydown', trap);
    setTimeout(() => firstInput?.focus(), 0);
  };

  const closeModal = () => {
    if (modal.classList.contains('hidden')) return;
    modal.classList.add('hidden');
    body.classList.remove('overflow-hidden');
    document.removeEventListener('keydown', onKey);
    panel.removeEventListener('keydown', trap);
    lastFocus?.focus?.();
  };

  const onKey = (e) => {
    if (e.key === 'Escape') closeModal();
  };

  overlay?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);

  // Auto open after 3s if not seen this session
  if (sessionStorage.getItem(storageKey) !== '1') {
    setTimeout(() => {
      openModal();
      sessionStorage.setItem(storageKey, '1');
    }, 3000);
  }

  // Open modal for all CTA links targeting #join
  $$('a[href="#join"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });
})();
