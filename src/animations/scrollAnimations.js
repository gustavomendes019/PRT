import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations(threeSceneInstance) {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 1.5
  });

  // Connect Lenis to ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  const tickerCallback = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  // 2. Global Scroll Progress for 3D Camera / Object Choreography
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    onUpdate: (self) => {
      if (threeSceneInstance && threeSceneInstance.setScrollProgress) {
        threeSceneInstance.setScrollProgress(self.progress);
      }
    }
  });

  // 3. Section Reveal Animations

  // Hero Section Elements Reveal
  gsap.fromTo(
    '.hero-content > *',
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.3
    }
  );

  // About Section Animations
  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  aboutTl
    .fromTo(
      '.about-visual-card',
      { opacity: 0, x: -40, scale: 0.96 },
      { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(
      '.about-narrative > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      '-=0.6'
    );

  // Skills Cards Stagger Reveal
  gsap.fromTo(
    '.skill-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Projects Cards Stagger Reveal
  gsap.fromTo(
    '.project-card',
    { opacity: 0, y: 50, scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      stagger: 0.18,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Contact Section Reveal
  gsap.fromTo(
    '.contact-card-wrapper',
    { opacity: 0, y: 50, scale: 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  return {
    lenis,
    destroy() {
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
    }
  };
}

