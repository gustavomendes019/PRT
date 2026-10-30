import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';

import { initThreeScene } from './three/Scene';
import { initScrollAnimations } from './animations/scrollAnimations';
import { initCustomCursor } from './animations/cursorEffects';

export default function App() {
  const canvasContainerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const sceneInstanceRef = useRef(null);

  useEffect(() => {
    // 1. Initialize 3D Scene in canvas container
    if (canvasContainerRef.current) {
      sceneInstanceRef.current = initThreeScene(canvasContainerRef.current);
    }

    // 2. Initialize Lenis Smooth Scroll & GSAP ScrollTrigger
    const scrollAnimationManager = initScrollAnimations(sceneInstanceRef.current);

    // 3. Initialize Custom Luxury Cursor
    const cleanupCursor = initCustomCursor();

    return () => {
      if (sceneInstanceRef.current && sceneInstanceRef.current.destroy) {
        sceneInstanceRef.current.destroy();
      }
      if (scrollAnimationManager && scrollAnimationManager.destroy) {
        scrollAnimationManager.destroy();
      }
      if (cleanupCursor) {
        cleanupCursor();
      }
    };
  }, []);

  return (
    <>
      {/* Cinematic Intro Loader */}
      {!isLoaded && <Loader onLoaded={() => setIsLoaded(true)} />}

      {/* Luxury Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Atmospheric Overlays */}
      <div className="ambient-overlay" aria-hidden="true" />
      <div className="noise-grid-overlay" aria-hidden="true" />

      {/* Persistent Three.js Background & Hero 3D Stage */}
      <div
        ref={canvasContainerRef}
        className="webgl-canvas-container"
        aria-hidden="true"
      />

      {/* Fixed Luxury Navigation */}
      <Navbar />

      {/* Main Content Layout */}
      <div className="site-wrapper">
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

