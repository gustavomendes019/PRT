import React from 'react';
import { ArrowDown, ArrowUpRight, Compass } from 'lucide-react';
import { profileData } from '../data/profile';

export default function Hero() {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero-section" aria-label="Apresentação inicial">
      <div className="section-container">
        <div className="hero-grid">
          {/* Left Hero Content */}
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="status-dot"></span>
              <span className="section-badge">PORTFÓLIO DIGITAL 2026</span>
            </div>

            <h1 className="hero-name">
              Gustavo <br />
              <span className="text-gold-gradient">Mendes</span>
            </h1>

            <span className="hero-title-tag">
              {profileData.role}
            </span>

            <p className="hero-quote">
              "{profileData.quote}"
            </p>

            <p className="hero-description">
              {profileData.heroDescription}
            </p>

            <div className="hero-actions">
              <a
                href="#projetos"
                className="btn-luxury btn-primary-gold"
                onClick={(e) => scrollToSection(e, 'projetos')}
              >
                Explorar Projetos <ArrowUpRight size={18} />
              </a>

              <a
                href="#sobre"
                className="btn-luxury btn-secondary-blue"
                onClick={(e) => scrollToSection(e, 'sobre')}
              >
                Conhecer Minha Trajetória <Compass size={18} />
              </a>
            </div>

            {/* Quick Stats Strip */}
            <div className="hero-stats-strip">
              {profileData.stats.map((stat, idx) => (
                <div key={idx} className="hero-stat-item">
                  <h4>{stat.value}</h4>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Area is preserved for 3D Hero Sculpture Canvas Integration */}
          <div className="hero-3d-stage" aria-hidden="true">
            {/* The Three.js canvas in .webgl-canvas-container renders into this spatial quadrant */}
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="scroll-hint-wrapper">
        <span>Desça para explorar</span>
        <div className="scroll-bob">
          <ArrowDown size={18} color="#D4AF37" />
        </div>
      </div>
    </section>
  );
}

