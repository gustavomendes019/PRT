export function initCustomCursor() {
  if (typeof window === 'undefined') return () => {};

  // Check touch device or reduced motion
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouch || prefersReducedMotion) {
    return () => {};
  }

  const dot = document.querySelector('.luxury-cursor-dot');
  const halo = document.querySelector('.luxury-cursor-halo');

  if (!dot || !halo) return () => {};

  let mouseX = -100;
  let mouseY = -100;
  let haloX = -100;
  let haloY = -100;
  let animId = null;

  const onMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  };

  const renderHalo = () => {
    // Smooth lerp trailing effect
    haloX += (mouseX - haloX) * 0.15;
    haloY += (mouseY - haloY) * 0.15;

    halo.style.transform = `translate(${haloX}px, ${haloY}px)`;
    animId = requestAnimationFrame(renderHalo);
  };

  const handleMouseEnter = () => {
    halo.classList.add('hovering');
  };

  const handleMouseLeave = () => {
    halo.classList.remove('hovering');
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  renderHalo();

  // Attach hover events to interactive targets
  const interactiveSelector = 'a, button, input, textarea, .skill-card, .project-card, .btn-luxury';
  
  const setupHoverListeners = () => {
    const elements = document.querySelectorAll(interactiveSelector);
    elements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
  };

  setupHoverListeners();

  // Re-observe if DOM updates
  const observer = new MutationObserver(() => {
    setupHoverListeners();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  return () => {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('mousemove', onMouseMove);
    observer.disconnect();
    const elements = document.querySelectorAll(interactiveSelector);
    elements.forEach((el) => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    });
  };
}

