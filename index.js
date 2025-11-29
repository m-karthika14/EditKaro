// Cleaned index.js (no <script> wrappers). This file should be loaded after GSAP in index.html.

// Guard helper to safely query an element
function $id(id) { return document.getElementById(id); }

// --- GSAP small inits (guarded) -------------------------------------------------
(function() {
  function initAboutMini() {
    if (!window.gsap) return;
    try {
      // small hero/card reveals (use selectors only if present)
      const aboutHero = $id('aboutHero');
      if (aboutHero) gsap.to(aboutHero, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.25 });

      const aboutGlass = $id('aboutGlass');
      if (aboutGlass) gsap.to(aboutGlass, { y: -6, repeat: -1, yoyo: true, ease: 'sine.inOut', duration: 5, opacity: 1 });

      gsap.utils && gsap.utils.toArray && gsap.utils.toArray('.floating-shape').forEach((el, i) => {
        gsap.to(el, { y: (i % 2 ? -18 : -28), x: (i * 6), rotation: (i % 2 ? 6 : -6), duration: 12 + (i * 2), repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });
    } catch (err) { console.warn('GSAP small init failed', err); }
  }

  if (window.gsap) initAboutMini(); else window.addEventListener('load', initAboutMini);
})();

// --- About section reveal + lightweight parallax (guarded) --------------------
(function(){
  const about = $id('about');
  if (!about) return;

  const connector = about.querySelector('.choose-steps-wrap .connector');
  const title = $id('aboutTitle');
  const tagline = $id('aboutTagline');
  const text = $id('aboutText');
  const steps = about.querySelectorAll('.choose-steps li');
  const cards = about.querySelectorAll('.card');
  const nums = about.querySelectorAll('.num');

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);

      if (window.gsap) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.7 });
        if (tagline) tl.to(tagline, { opacity: 1, y: 0, duration: 0.6 }, '-=0.45');
        if (text) tl.to(text, { opacity: 1, y: 0, duration: 0.8 }, '-=0.55');
        if (connector) tl.to(connector, { scaleY: 1, duration: 0.9, ease: 'power2.out' }, '-=0.6');
        if (steps && steps.length) tl.to(steps, { opacity: 1, y: 0, stagger: 0.12, duration: 0.45, ease: 'power2.out' }, '-=0.6');
        if (cards && cards.length) tl.to(cards, { opacity: 1, x: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' }, '-=0.9');
        if (nums && nums.length) gsap.fromTo(nums, { scale: 0.88 }, { scale: 1, duration: 0.6, stagger: 0.08, ease: 'elastic.out(1,0.6)' });
      } else {
        if (title) { title.style.opacity = 1; title.style.transform = 'none'; }
        if (tagline) { tagline.style.opacity = 1; tagline.style.transform = 'none'; }
        if (text) { text.style.opacity = 1; text.style.transform = 'none'; }
        steps.forEach(s => { s.style.opacity = 1; s.style.transform = 'none'; });
        cards.forEach(c => { c.style.opacity = 1; c.style.transform = 'none'; });
        if (connector) connector.style.transform = 'scaleY(1)';
      }
    });
  }, { threshold: 0.12 });

  io.observe(about);

  // lightweight mouse parallax inside the about area
  const floating = about.querySelectorAll('.floating-shape');
  const cardStack = about.querySelector('.card-stack');
  about.addEventListener('mousemove', (ev) => {
    const r = about.getBoundingClientRect();
    const cx = (ev.clientX - r.left) / r.width - 0.5;
    const cy = (ev.clientY - r.top) / r.height - 0.5;
    floating.forEach((el, i) => {
      if (window.gsap) gsap.to(el, { x: cx * (8 + i * 6), y: cy * (6 + i * 6), duration: 0.6, ease: 'power3.out' });
      else el.style.transform = `translate(${cx * (8 + i * 6)}px, ${cy * (6 + i * 6)}px)`;
    });
    if (cardStack) {
      if (window.gsap) gsap.to(cardStack, { x: cx * 10, y: cy * 6, duration: 0.6, ease: 'power3.out' });
      else cardStack.style.transform = `translate(${cx * 10}px, ${cy * 6}px)`;
    }
  });
  about.addEventListener('mouseleave', () => {
    floating.forEach((el) => { if (window.gsap) gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' }); else el.style.transform = ''; });
    if (cardStack) { if (window.gsap) gsap.to(cardStack, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' }); else cardStack.style.transform = ''; }
  });
})();

// --- Mobile nav toggle ---------------------------------------------------------
(function() {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    const isClickInside = nav.contains(e.target) || btn.contains(e.target);
    if (!isClickInside) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });

  nav.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !nav.classList.contains('open')) return;
    const focusable = nav.querySelectorAll('a');
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();

// --- Data ---------------------------------------------------------------------
const demoUrl = 'https://www.youtube.com/watch?v=020g-0hhCAU';
const portfolioData = {
  short_form: [
    { url: demoUrl, thumb: 'shortform1.jpg', title: 'Short Form: Vlog Reel', desc: 'Dynamic cuts and energetic pacing for influencer content.' },
    { url: demoUrl, thumb: 'shortform2.webp', title: 'Short Form: Meme Compilation', desc: 'Fast edits with playful transitions and overlay effects.' }
  ],
  long_form: [
    { url: demoUrl, thumb: 'longform1.webp', title: 'Long Form: Brand Documentary', desc: 'Deep narrative structure, cinematic visuals and custom graphics.' },
    { url: demoUrl, thumb: 'longform2.webp', title: 'Long Form: Product Showcase', desc: 'Comprehensive walk-through with smooth transitions and overlay animation.' }
  ],
  gaming: [ { url: demoUrl, thumb: 'gaming.jpg', title: 'Gaming Edit: Montage', desc: 'High-energy gameplay edits, cinematic SFX and motion tracking.' } ],
  football: [ { url: demoUrl, thumb: 'football.webp', title: 'Football Highlight: EuroCup', desc: 'Action-packed montage, time ramps and crowd effects.' } ],
  ecommerce: [ { url: demoUrl, thumb: 'ecom.webp', title: 'E-commerce Ad: Product Scroll', desc: 'Clean edits, overlay promo graphics, call-to-action highlights.' } ],
  documentary: [ { url: demoUrl, thumb: 'documnetay sucess story.png', title: 'Documentary: Success Stories', desc: 'Interviews and motivating narrative with custom transitions.' } ],
  color_grading: [ { url: demoUrl, thumb: 'color grading.jpg', title: 'Color Grading: Mood Palette', desc: 'Cinematic before/after looks with grade breakdowns.' } ],
  anime: [ { url: demoUrl, thumb: 'anime.jpg', title: 'Anime AMV: Energetic Edits', desc: 'Rapid cuts and dynamic keyframes on anime clips.' } ],
  ads: [
    { url: demoUrl, thumb: 'ad1.avif', title: 'Ads: Brand Collab', desc: 'Bold typography, animation overlays and punchy branding.' },
    { url: demoUrl, thumb: 'add2.jpg', title: 'Ads: Social Promo', desc: 'Short ad with optimized cuts and clear CTA.' }
  ]
};

const servicesData = [
  { icon: '???', title: 'Video Editing', desc: 'Expert edits for all video styles � short-form, long-form, ads, or documentaries.' },
  { icon: '??', title: 'Color Grading', desc: 'Cinematic color grading to make footage pop, match mood, and elevate visuals.' },
  { icon: '??', title: 'Audio Enhancement', desc: 'Clean, crisp, professional sound mixing and audio treatment.' },
  { icon: '??', title: 'Social Media Marketing', desc: 'Strategic editing for Instagram, YouTube, TikTok, and brand campaigns.' },
  { icon: '??', title: 'Motion Graphics', desc: 'Animated overlays, title cards, SFX, logo reveals, and kinetic typography.' },
  { icon: '??', title: 'Content Strategy', desc: 'Ideation, optimization and creative planning for high-performing video content.' }
];

const testimonialsData = [
  { name: 'Dev Mishra', rating: 5, comment: 'Lightning fast edits, gorgeous transitions!' },
  { name: 'Ishita Verma', rating: 5, comment: 'EditKaro made our brand go viral. Stunning quality!' },
  { name: 'Rahul Singh', rating: 5, comment: 'Never seen smoother reel cuts � true professionals!' }
];

// --- Cursor glow (guarded) ---------------------------------------------------
(function() {
  const cursor = document.querySelector('.cursor-glow');
  if (!cursor) return;
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.addEventListener('mousedown', () => cursor.classList.add('active'));
  document.addEventListener('mouseup', () => cursor.classList.remove('active'));
})();

// --- Scroll progress (guarded) ------------------------------------------------
(function() {
  const progress = document.querySelector('.scroll-progress');
  if (!progress) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = pct + '%';
  }, { passive: true });
})();

// --- Background particles (guarded) ------------------------------------------
function generateParticles() {
  const particlesContainer = document.querySelector('.bg-particles');
  if (!particlesContainer) return;
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particlesContainer.appendChild(particle);
  }
}
generateParticles();

// --- Smooth anchor scrolling --------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

function scrollToSection(id) { const t = $id(id); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

// --- YouTube helpers ---------------------------------------------------------
function getYouTubeID(url) {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}
function getYouTubeThumbnail(url) { const id = getYouTubeID(url); return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : ''; }

// --- Portfolio rendering -----------------------------------------------------
function renderPortfolio(filter = 'all') {
  const grid = $id('portfolioGrid');
  if (!grid) return;
  grid.classList.remove('masonry'); grid.classList.add('grid');
  grid.classList.add('is-filtering'); grid.style.opacity = '0.4';

  setTimeout(() => {
    grid.innerHTML = '';
    Object.keys(portfolioData).forEach(category => {
      if (filter === 'all' || filter === category) {
        portfolioData[category].forEach(item => {
          const card = document.createElement('div');
          card.classList.add('portfolio-card');
          card.dataset.category = category;
          // Ensure thumbnails point to the `public/` folder unless they're full URLs
          const thumbSrc = (function(){
            if (item.thumb) {
              // absolute URL -> use as-is
              if (/^(https?:)?\/\//.test(item.thumb)) return item.thumb;
              // already prefixed -> use as-is
              if (item.thumb.startsWith('public/')) return item.thumb;
              // otherwise prefix with public/
              return 'public/' + item.thumb;
            }
            return getYouTubeThumbnail(item.url);
          })();
          card.innerHTML = `
            <div class="thumb-wrap"><img src="${thumbSrc}" alt="${item.title}"></div>
            <div class="portfolio-card-content">
              <span class="portfolio-badge">${category.replace('_', ' ').toUpperCase()}</span>
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
            </div>`;

          card.addEventListener('click', () => openVideoModal(item.url));
          grid.appendChild(card);
          attachTilt(card);
          setTimeout(() => observePortfolioCards(), 10);
        });
      }
    });

    // few / paint tweaks
    const itemCount = grid.querySelectorAll('.portfolio-card').length;
    grid.classList.toggle('few', itemCount > 0 && itemCount <= 2);

    requestAnimationFrame(() => {
      grid.style.opacity = '1'; grid.classList.remove('is-filtering');
      document.querySelectorAll('.portfolio-card').forEach((c, i) => setTimeout(() => c.classList.add('in-view'), i * 60));
    });
  }, 160);
}
renderPortfolio();

document.querySelectorAll('.filter-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active'); renderPortfolio(tab.dataset.filter);
}));

// --- Tiny tilt effect --------------------------------------------------------
function attachTilt(card) {
  if (!card) return;
  const intensity = 12;
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const cx = rect.width / 2; const cy = rect.height / 2;
    const dx = (x - cx) / cx; const dy = (y - cy) / cy;
    const rotY = dx * intensity; const rotX = -dy * (intensity * 0.6);
    card.style.transform = `perspective(900px) translateZ(0) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.02)`;
    card.style.transition = 'transform 120ms linear';
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.transition = 'transform 320ms cubic-bezier(.2,.9,.3,1)'; });
  card.addEventListener('touchstart', () => { card.style.transition = 'transform 160ms linear'; });
  card.addEventListener('touchend', () => { card.style.transform = ''; card.style.transition = ''; });
}

// --- Modal helpers -----------------------------------------------------------
let _prevBodyOverflow = null; let _prevBodyPaddingRight = null;
function disableBodyScroll() {
  _prevBodyOverflow = document.body.style.overflow || null;
  _prevBodyPaddingRight = document.body.style.paddingRight || null;
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollBarWidth > 0) document.body.style.paddingRight = scrollBarWidth + 'px';
  document.body.style.overflow = 'hidden';
}
function restoreBodyScroll() {
  document.body.style.overflow = _prevBodyOverflow === null ? '' : _prevBodyOverflow;
  document.body.style.paddingRight = _prevBodyPaddingRight === null ? '' : _prevBodyPaddingRight;
  _prevBodyOverflow = null; _prevBodyPaddingRight = null;
}

function openVideoModal(url) {
  const modal = $id('videoModal');
  const modalVideo = $id('modalVideo');
  if (!modal || !modalVideo) return;
  const videoId = getYouTubeID(url);
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  const autoplayAttr = isTouch ? '' : 'autoplay';
  const blockedIds = ['020g-0hhCAU'];
  if (!videoId || blockedIds.includes(videoId)) {
    modalVideo.innerHTML = `<video controls ${autoplayAttr} playsinline preload="metadata" style="width:100%; height:100%; max-height:80vh; object-fit:contain; display:block;"></video>`;
    const v = modalVideo.querySelector('video'); if (v) { const src = document.createElement('source'); src.src = 'public/236711_small.mp4'; src.type = 'video/mp4'; v.appendChild(src); }
  } else {
    modalVideo.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?${autoplayAttr ? 'autoplay=1&' : ''}rel=0&modestbranding=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
  modal.classList.add('active'); if (window.innerWidth <= 480) modal.classList.add('fullscreen'); requestAnimationFrame(() => modal.classList.add('show'));
  disableBodyScroll();
}

function closeModal() {
  const modal = $id('videoModal'); const modalVideo = $id('modalVideo'); if (!modal || !modalVideo) return;
  modal.classList.remove('show'); setTimeout(() => { modal.classList.remove('active'); modal.classList.remove('fullscreen'); modalVideo.innerHTML = ''; restoreBodyScroll(); }, 260);
}

const videoModalEl = $id('videoModal'); if (videoModalEl) videoModalEl.addEventListener('click', (e) => { if (e.target.id === 'videoModal') closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { const m = $id('videoModal'); if (m && m.classList.contains('active')) closeModal(); } });

// --- Services render (simple, guarded) --------------------------------------
const serviceIconsSVG = [
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 6h18v12H3z" opacity="0.12"/><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8zM7 9h2v2H7V9zm0 4h2v2H7v-2zM11 9h2v2h-2V9zm0 4h2v2h-2v-2zM15 9h2v2h-2V9zm0 4h2v2h-2v-2z"/></svg>`,
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 3C7 3 3 7 3 12s4 9 9 9c.6 0 1.1-.4 1.2-1 .1-.6-.3-1.2-.9-1.4-.8-.2-1.8-.5-2.7-1.5-1.3-1.3-1.2-3 .2-4.4 1.1-1.1 2.8-1.5 4.4-.7.6.3 1.2 0 1.4-.6.2-.7.9-1.1 1.6-.9.8.2 1.6.3 2.3.3 0-5-4-9-9-9z"/></svg>`,
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.94 7-4.49 7-8.77s-2.99-7.83-7-8.77z"/></svg>`,
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7 2h10a1 1 0 011 1v18a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1zm5 19a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM8 4v14h8V4H8z"/></svg>`,
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17 10.5V6c0-1.1-.9-2-2-2H3C1.9 4 1 4.9 1 6v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.5l4 4v-11l-4 4z"/></svg>`,
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2C8.1 2 5 5.1 5 9c0 2.6 1.6 4.8 3.8 5.7.1.1.2.3.2.5v.8c0 .6.4 1 1 1h.5l.5 2h4l.5-2H14c.6 0 1-.4 1-1v-.8c0-.2.1-.4.2-.5C17.4 13.8 19 11.6 19 9c0-3.9-3.1-7-7-7z"/></svg>`
];

function renderServices() {
  const grid = $id('servicesGrid'); if (!grid) return;
  servicesData.forEach((service, index) => {
    const card = document.createElement('div'); card.classList.add('service-card');
    const iconSVG = serviceIconsSVG[index] || serviceIconsSVG[0];
    card.innerHTML = `<div class="service-icon" aria-hidden="true">${iconSVG}</div><h3>${service.title}</h3><p>${service.desc}</p>`;
    grid.appendChild(card);
  });
}
renderServices();

// Animate services with GSAP if available, otherwise reveal immediately
(function() {
  const servicesSection = $id('services'); if (!servicesSection) return;
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animateServices = () => {
    const cards = Array.from(servicesSection.querySelectorAll('.service-card'));
    if (prefersReduce || !window.gsap) { cards.forEach(c => c.classList.add('visible')); return; }
    gsap.set(cards, { opacity: 0, y: 30 });
    gsap.to(cards, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' });
  };
  const sObserver = new IntersectionObserver((entries, obs) => { entries.forEach(entry => { if (entry.isIntersecting) { animateServices(); obs.unobserve(entry.target); } }); }, { threshold: 0.15 });
  sObserver.observe(servicesSection);
})();

// --- Counters + intersection observers ---------------------------------------
function animateCounter(element) {
  const target = parseInt(element.dataset.target || '0', 10);
  if (!target) { element.textContent = '0+'; return; }
  const duration = 2000; const increment = target / (duration / 16); let current = 0;
  const timer = setInterval(() => { current += increment; if (current >= target) { element.textContent = target + '+'; clearInterval(timer); } else { element.textContent = Math.floor(current) + '+'; } }, 16);
}

const observerOptions = { threshold: 0.3, rootMargin: '0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    if (entry.target.id === 'stats') {
      document.querySelectorAll('.stat-number').forEach(num => { if (!num.classList.contains('animated')) { num.classList.add('animated'); animateCounter(num); } });
    }
    if (entry.target.id === 'newsletter') { entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards'; }
  });
}, observerOptions);
const statsEl = $id('stats'); if (statsEl) observer.observe(statsEl);
const newsletterEl = $id('newsletter'); if (newsletterEl) observer.observe(newsletterEl);

// Portfolio card observer
const portfolioObserver = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); portfolioObserver.unobserve(entry.target); } }); }, { threshold: 0.18 });
function observePortfolioCards() { document.querySelectorAll('.portfolio-card').forEach(c => { if (!c.classList.contains('observed')) { portfolioObserver.observe(c); c.classList.add('observed'); } }); }

// --- Testimonials ------------------------------------------------------------
function renderTestimonials() {
  const track = $id('testimonialTrack'); const dots = $id('carouselDots'); if (!track || !dots) return;
  testimonialsData.forEach((t, idx) => {
    const card = document.createElement('div'); card.classList.add('testimonial-card'); if (idx === 0) card.classList.add('active');
    const stars = '?'.repeat(t.rating); const initials = t.name.split(' ').map(n => n[0]).join('');
    card.innerHTML = `<div class="testimonial-avatar">${initials}</div><div class="testimonial-stars">${stars}</div><p class="testimonial-comment">"${t.comment}"</p><div class="testimonial-name">${t.name}</div>`;
    track.appendChild(card);
    const dot = document.createElement('div'); dot.classList.add('carousel-dot'); if (idx === 0) dot.classList.add('active'); dot.addEventListener('click', () => goToSlide(idx)); dots.appendChild(dot);
  });
}
renderTestimonials();

let currentSlide = 0;
function goToSlide(index) {
  const track = $id('testimonialTrack'); const dots = document.querySelectorAll('.carousel-dot'); const cards = document.querySelectorAll('.testimonial-card'); if (!track) return;
  currentSlide = index; track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  cards.forEach((card, i) => card.classList.toggle('active', i === currentSlide));
}
setInterval(() => { currentSlide = (currentSlide + 1) % Math.max(1, testimonialsData.length); goToSlide(currentSlide); }, 5000);

// --- Forms: submit to Google Apps Script webapp ------------------------------
const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzKtMC1sYRRxKM3saXpealJ-1n9sCK1hNejJp3DTXeyTNA_Z4NoeD-q36cFwJhcU4tQbw/exec';

// Helper: send request using JSONP as a fallback when CORS blocks fetch.
// JSONP creates a <script> tag calling the webapp with a callback param.
function sendViaJSONP(params = {}){
  return new Promise((resolve, reject) => {
    // create a unique callback name
    const cbName = '__gas_jsonp_cb_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    // attach callback to window
    window[cbName] = function(resp){
      try { resolve(resp); } finally { // cleanup
        try { delete window[cbName]; } catch(e) { window[cbName] = null; }
        const s = document.getElementById(cbName + '_script'); if (s && s.parentNode) s.parentNode.removeChild(s);
      }
    };

    // build URL (GET) - encode params and append callback
    const urlParams = new URLSearchParams(params);
    urlParams.set('callback', cbName);
    const url = WEBAPP_URL + '?' + urlParams.toString();

    const script = document.createElement('script');
    script.src = url;
    script.id = cbName + '_script';
    script.onerror = function(err){
      try { delete window[cbName]; } catch(e) { window[cbName] = null; }
      if (script && script.parentNode) script.parentNode.removeChild(script);
      reject(new Error('JSONP script load error'));
    };
    document.head.appendChild(script);
  });
}

// Try fetch first (AJAX). If it fails (commonly CORS), fall back to JSONP (GET via <script>). JSONP requires the Apps Script doGet to return `callbackName(...)`.
window.handleNewsletterSubmit = async function(e){
  e.preventDefault();
  const form = document.getElementById('emailForm') || e.target;
  if (!form) return;
  
  // Convert formData to simple object for JSONP fallback
  const asObj = { type: 'email' };
  const formData = new FormData(form);
  formData.forEach((v,k) => { asObj[k] = v; });
  
  console.log('Newsletter form data being sent:', asObj);

  try {
    // Try JSONP first since it's more reliable with Google Apps Script
    const resp = await sendViaJSONP(asObj);
    console.log('Newsletter JSONP response:', resp);
    const msg = (resp && resp.message) ? resp.message : 'Thank you for subscribing!';
    alert(msg);
    form.reset();
  } catch(err){
    console.error('Newsletter JSONP failed, trying fetch POST', err);
    try {
      // Fallback to fetch POST
      const formDataPost = new FormData(form);
      formDataPost.append('type','email');
      const res = await fetch(WEBAPP_URL, { method: 'POST', body: formDataPost });
      const text = await res.text();
      console.log('Newsletter fetch response text:', text);
      let parsed = null;
      try { parsed = JSON.parse(text); } catch(_) { /* not JSON */ }
      const msg = (parsed && parsed.message) ? parsed.message : 'Thank you for subscribing!';
      alert(msg);
      form.reset();
    } catch(err2){
      console.error('Newsletter submit completely failed', err2);
      alert('Submission failed — please try again later.');
    }
  }
};

window.handleContactSubmit = async function(e){
  e.preventDefault();
  const form = document.getElementById('contactForm') || e.target;
  if (!form) return;
  
  // Convert formData to simple object for JSONP
  const asObj = { type: 'contact' };
  const formData = new FormData(form);
  formData.forEach((v,k) => { asObj[k] = v; });
  
  console.log('Contact form data being sent:', asObj);

  try {
    // Try JSONP first since it's more reliable with Google Apps Script
    const resp = await sendViaJSONP(asObj);
    console.log('Contact JSONP response:', resp);
    const msg = (resp && resp.message) ? resp.message : 'Your message has been sent!';
    alert(msg);
    form.reset();
  } catch(err){
    console.error('Contact JSONP failed, trying fetch POST', err);
    try {
      // Fallback to fetch POST
      const formDataPost = new FormData(form);
      formDataPost.append('type','contact');
      const res = await fetch(WEBAPP_URL, { method: 'POST', body: formDataPost });
      const text = await res.text();
      console.log('Contact fetch response text:', text);
      let parsed = null;
      try { parsed = JSON.parse(text); } catch(_) { /* not JSON */ }
      const msg = (parsed && parsed.message) ? parsed.message : 'Your message has been sent!';
      alert(msg);
      form.reset();
    } catch(err2){
      console.error('Contact submit completely failed', err2);
      alert('Submission failed — please try again later.');
    }
  }
};

// --- Newsletter keyframes (injected) ----------------------------------------
(function() {
  const style = document.createElement('style'); style.textContent = `@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`;
  document.head.appendChild(style);
})();

// --- Auto-hide header on scroll ---------------------------------------------
(function() {
  const header = document.querySelector('header'); if (!header) return; let lastScrollY = window.scrollY; let ticking = false;
  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (Math.abs(currentScrollY - lastScrollY) >= 8) {
          if (currentScrollY > lastScrollY && currentScrollY > 80) header.classList.add('header-hidden'); else header.classList.remove('header-hidden');
          lastScrollY = currentScrollY;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

