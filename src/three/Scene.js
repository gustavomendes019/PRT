import * as THREE from 'three';
import gsap from 'gsap';
import { createLighting } from './Lighting.js';
import { createParticles } from './Particles.js';
import { createMainObject } from './MainObject.js';

export function initThreeScene(containerElement) {
  if (!containerElement) return null;

  // 1. Scene & Camera Setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050B19, 0.035);

  const camera = new THREE.PerspectiveCamera(
    48,
    containerElement.clientWidth / containerElement.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 7.5);

  // 2. High-Performance WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    powerPreference: 'high-performance',
    antialias: true,
    alpha: true
  });
  renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Clear existing children in container just in case
  while (containerElement.firstChild) {
    containerElement.removeChild(containerElement.firstChild);
  }
  containerElement.appendChild(renderer.domElement);

  // 3. Instantiate Sub-Systems
  const lighting = createLighting(scene);
  const particleCount = window.innerWidth < 768 ? 600 : 1300;
  const particles = createParticles(scene, particleCount);
  const mainObject = createMainObject(scene);

  // 4. Input Tracking State
  const mouse = { x: 0, y: 0 };
  const targetMouse = { x: 0, y: 0 };
  let isMobile = window.innerWidth < 768;

  // Responsive adjustments for mobile camera & 3D position
  function adjustResponsiveLayout() {
    isMobile = window.innerWidth < 768;
    if (isMobile) {
      camera.position.z = 9.5;
      mainObject.group.position.set(0, 1.2, 0); // Center on mobile
    } else {
      camera.position.z = 7.5;
      mainObject.group.position.set(2.2, 0, 0); // Side hero stage on desktop
    }
  }
  adjustResponsiveLayout();

  const handlePointerMove = (e) => {
    // Normalized device coordinates (-1 to 1)
    targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };
  window.addEventListener('pointermove', handlePointerMove, { passive: true });

  const handleResize = () => {
    if (!containerElement) return;
    const width = containerElement.clientWidth;
    const height = containerElement.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    adjustResponsiveLayout();
  };
  window.addEventListener('resize', handleResize);

  // 5. Cinematic Entrance Reveal
  function triggerEntranceAnimation() {
    gsap.fromTo(
      mainObject.group.scale,
      { x: 0.001, y: 0.001, z: 0.001 },
      {
        x: isMobile ? 0.75 : 1,
        y: isMobile ? 0.75 : 1,
        z: isMobile ? 0.75 : 1,
        duration: 2.2,
        ease: 'power3.out',
        delay: 0.4
      }
    );

    gsap.fromTo(
      camera.position,
      { z: 12 },
      {
        z: isMobile ? 9.5 : 7.5,
        duration: 2.5,
        ease: 'power2.out',
        delay: 0.2
      }
    );
  }

  // 6. Animation Render Loop
  let animationFrameId = null;
  const clock = new THREE.Clock();

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Lerp mouse positions for ultra silky motion
    mouse.x += (targetMouse.x - mouse.x) * 0.08;
    mouse.y += (targetMouse.y - mouse.y) * 0.08;

    lighting.update(mouse, elapsedTime);
    particles.update(elapsedTime, mouse);
    mainObject.update(elapsedTime, mouse);

    renderer.render(scene, camera);
  }

  animate();
  triggerEntranceAnimation();

  // 7. Public API to interact with Scroll and Lifecycle
  return {
    setScrollProgress(progress) {
      if (mainObject) {
        mainObject.setScrollProgress(progress);
      }
    },
    triggerEntranceAnimation,
    destroy() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      lighting.dispose();
      particles.dispose();
      mainObject.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }
  };
}

