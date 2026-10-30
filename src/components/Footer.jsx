import React from 'react';
import { ArrowUp, Github } from 'lucide-react';
import { profileData } from '../data/profile';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper" role="contentinfo">
      <div className="section-container">
        <div className="footer-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="brand-logo-mark">GM</div>
            <div>
              <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', letterSpacing: '0.05em' }}>
                GUSTAVO MENDES
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(234, 241, 255, 0.6)' }}>
                {profileData.role} — RDS
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury btn-secondary-blue"
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.82rem' }}
            >
              <Github size={18} /> GitHub
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="btn-luxury btn-primary-gold"
              style={{ width: '44px', height: '44px', padding: 0 }}
              aria-label="Voltar ao topo da página"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Gustavo Mendes. Todos os direitos reservados.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-gold-metallic)'
              }}
            />
            Experiência digital interativa com Three.js, GSAP & React
          </p>
        </div>
      </div>
    </footer>
  );
}

