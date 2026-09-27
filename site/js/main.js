/* ==========================================================================
   Prapet — interações e animações
   GSAP + ScrollTrigger para animações, Lenis para o scroll suave.
   ========================================================================== */
(() => {
  const root = document.documentElement;
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sem GSAP (falha de carregamento) ou com movimento reduzido: conteúdo visível, sem animação
  if (!hasGsap || reduceMotion) root.classList.remove('js');

  const header = document.querySelector('.site-header');
  const headerOffset = () => header.getBoundingClientRect().height;

  /* ------------------------------------------------------------------------
     Scroll suave (Lenis)
     ------------------------------------------------------------------------ */
  let lenis = null;

  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  if (hasGsap && !reduceMotion && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const scrollToTarget = (hash) => {
    const target = hash === '#inicio' ? 0 : document.querySelector(hash);
    if (target === null) return;

    if (lenis) {
      lenis.scrollTo(target, { offset: target === 0 ? 0 : -headerOffset() + 1, duration: 1.2 });
    } else if (target === 0) {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    } else {
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  /* ------------------------------------------------------------------------
     Menu mobile
     ------------------------------------------------------------------------ */
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu-mobile');
  const menuItems = menu.querySelectorAll('li, .btn');
  let menuOpen = false;

  const openMenu = () => {
    menuOpen = true;
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();

    if (hasGsap && !reduceMotion) {
      gsap.killTweensOf([menu, menuItems]);
      gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.55, ease: 'expo.out' });
      gsap.fromTo(menuItems, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.045, delay: 0.08 });
    }
  };

  const closeMenu = (instant = false) => {
    if (!menuOpen) return;
    menuOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';
    if (lenis) lenis.start();

    const finish = () => { menu.hidden = true; };
    if (hasGsap && !reduceMotion && !instant) {
      gsap.killTweensOf([menu, menuItems]);
      gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.4, ease: 'expo.inOut', onComplete: finish });
    } else {
      finish();
    }
  };

  toggle.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
      closeMenu();
      toggle.focus();
    }
  });

  window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => {
    if (e.matches) closeMenu(true);
  });

  /* ------------------------------------------------------------------------
     Links âncora
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (hash.length < 2) return;
      if (hash !== '#inicio' && !document.querySelector(hash)) return;
      e.preventDefault();

      const wasOpen = menuOpen;
      closeMenu(true);
      // Aguarda o menu fechar para o Lenis voltar a responder
      requestAnimationFrame(() => scrollToTarget(hash));
      if (wasOpen) toggle.focus({ preventScroll: true });
      history.replaceState(null, '', hash);
    });
  });

  /* ------------------------------------------------------------------------
     Cabeçalho: sombra ao rolar
     ------------------------------------------------------------------------ */
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (!hasGsap || reduceMotion) return;

  /* ------------------------------------------------------------------------
     Link ativo na navegação conforme a seção visível
     ------------------------------------------------------------------------ */
  const navLinks = document.querySelectorAll('.header__nav a');
  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: (self) => link.classList.toggle('is-active', self.isActive),
    });
  });

  /* ------------------------------------------------------------------------
     Hero: entrada
     ------------------------------------------------------------------------ */
  const heroMedia = document.querySelector('.hero__media');
  const heroImg = heroMedia.querySelector('img');

  const playHero = () => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.1 } });

    tl.fromTo(header, { yPercent: -100 }, { yPercent: 0, duration: 0.9 })
      .fromTo('.hero [data-hero]:first-child', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.1)
      .fromTo('.hero__title .line__inner', { autoAlpha: 0, yPercent: 105 }, { autoAlpha: 1, yPercent: 0, stagger: 0.1 }, 0.18)
      .fromTo(heroMedia, { autoAlpha: 0, clipPath: 'inset(12% 8% 12% 8% round 12px)' }, { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 1.4, ease: 'expo.inOut' }, 0.15)
      .fromTo(heroImg, { scale: 1.25 }, { scale: 1.08, duration: 1.8, ease: 'expo.out' }, 0.15)
      .fromTo('.hero [data-hero]:not(:first-child)', { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.9 }, 0.45);

    // Paralaxe leve na foto conforme o scroll
    gsap.to(heroImg, {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: heroMedia, start: 'top top+=88', end: 'bottom top', scrub: true },
    });
  };

  // Espera a fonte para as máscaras de linha usarem a métrica correta
  const fontsReady = document.fonts ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 800))]) : Promise.resolve();
  fontsReady.then(() => {
    playHero();
    ScrollTrigger.refresh();
  });

  /* ------------------------------------------------------------------------
     Revelações ao rolar
     ------------------------------------------------------------------------ */
  const revealDefaults = { start: 'top 88%', once: true };

  ScrollTrigger.batch('[data-reveal]', {
    ...revealDefaults,
    onEnter: (els) =>
      gsap.fromTo(els, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.09, overwrite: true }),
  });

  document.querySelectorAll('[data-stagger]').forEach((grid) => {
    ScrollTrigger.batch(grid.children, {
      ...revealDefaults,
      start: 'top 92%',
      interval: 0.12,
      onEnter: (els) =>
        gsap.fromTo(els, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05, overwrite: true }),
    });
  });

  /* ------------------------------------------------------------------------
     Relógio 24h: toca ao entrar na tela
     ------------------------------------------------------------------------ */
  const icon = document.querySelector('.h24__icon');
  const ring = gsap.timeline({ paused: true })
    .fromTo(icon, { autoAlpha: 0, scale: 0.6, rotation: -20 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(2)' })
    .fromTo('.h24__hands', { rotation: -360 }, { rotation: 0, duration: 1.4, ease: 'expo.out' }, 0)
    .to('.h24__bells', { keyframes: { y: [0, -3, 0, -3, 0, -2, 0], rotation: [0, -6, 6, -5, 5, -2, 0] }, duration: 0.7, ease: 'none' }, 0.55);

  ScrollTrigger.create({
    trigger: icon,
    start: 'top 85%',
    onEnter: () => ring.restart(),
    onEnterBack: () => ring.restart(),
  });

  /* ------------------------------------------------------------------------
     Manifesto "Popular é cuidado"
     ------------------------------------------------------------------------ */
  const manifesto = document.querySelector('.manifesto__card');
  gsap.fromTo(manifesto,
    { autoAlpha: 0, scale: 0.82, rotation: -6 },
    {
      autoAlpha: 1, scale: 1, rotation: 0, duration: 1.1, ease: 'back.out(1.6)',
      scrollTrigger: { trigger: manifesto, start: 'top 85%', once: true },
    });
  gsap.fromTo(manifesto.querySelector('span'),
    { autoAlpha: 0, y: 18 },
    {
      autoAlpha: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'expo.out',
      scrollTrigger: { trigger: manifesto, start: 'top 85%', once: true },
    });

  /* ------------------------------------------------------------------------
     Mapa
     ------------------------------------------------------------------------ */
  const map = document.querySelector('.location__map');
  gsap.fromTo(map,
    { autoAlpha: 0, clipPath: 'inset(0% 0% 100% 0% round 16px)' },
    {
      autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 1.3, ease: 'expo.inOut',
      scrollTrigger: { trigger: map, start: 'top 85%', once: true },
      onComplete: () => gsap.set(map, { clearProps: 'clipPath' }),
    });

  /* ------------------------------------------------------------------------
     CTA final: slogan em linhas
     ------------------------------------------------------------------------ */
  gsap.fromTo('.final-cta__title .line__inner',
    { autoAlpha: 0, yPercent: 105 },
    {
      autoAlpha: 1, yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12,
      scrollTrigger: { trigger: '.final-cta__title', start: 'top 88%', once: true },
    });

  // Recalcula posições quando o mapa/imagens terminam de carregar
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
