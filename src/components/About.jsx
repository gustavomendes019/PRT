import React from 'react';
import { GraduationCap, Target, Terminal, Sparkles } from 'lucide-react';
import { profileData } from '../data/profile';

export default function About() {
  return (
    <section id="sobre" className="about-section" aria-label="Sobre Gustavo Mendes">
      <div className="section-container">
        <div className="section-badge">01 / SOBRE MIM</div>
        <h2 className="section-title">
          Trajetória, Propósito & <br />
          <span className="text-gold-gradient">Evolução Tecnológica</span>
        </h2>
        <p className="section-subtitle">
          Construindo as bases de uma carreira em desenvolvimento de software com dedicação,
          aprendizado contínuo e paixão pela web.
        </p>

        <div className="about-editorial-grid" style={{ marginTop: '3.5rem' }}>
          {/* Left Visual Editorial Card */}
          <div className="about-visual-card">
            <div className="about-monogram">GM</div>
            <div className="about-badge-tag">Perfil Acadêmico & Técnico</div>

            <h3 className="about-headline">
              Gustavo Mendes
            </h3>

            <div className="about-info-item">
              <div className="about-info-icon">
                <Terminal size={22} />
              </div>
              <div className="about-info-text">
                <h5>Atuação</h5>
                <p>{profileData.role}</p>
              </div>
            </div>

            <div className="about-info-item">
              <div className="about-info-icon">
                <GraduationCap size={22} />
              </div>
              <div className="about-info-text">
                <h5>Formação Atual</h5>
                <p>{profileData.education}</p>
              </div>
            </div>

            <div className="about-info-item">
              <div className="about-info-icon">
                <Sparkles size={22} />
              </div>
              <div className="about-info-text">
                <h5>Localização</h5>
                <p>{profileData.location}</p>
              </div>
            </div>
          </div>

          {/* Right Narrative Flow */}
          <div className="about-narrative">
            <div className="about-quote-box">
              <p>"{profileData.bio}"</p>
            </div>

            <div className="about-objective-card">
              <div className="icon-box">
                <Target size={26} />
              </div>
              <div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--color-gold-metallic)',
                    fontFamily: 'var(--font-accent)'
                  }}
                >
                  Objetivo Profissional
                </span>
                <h4 style={{ fontSize: '1.35rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
                  "{profileData.careerGoal}"
                </h4>
              </div>
            </div>

            <p style={{ lineHeight: '1.8', color: 'rgba(234, 241, 255, 0.8)' }}>
              Cada linha de código escrita em meus estudos e projetos representa um degrau em direção
              ao domínio das melhores práticas de desenvolvimento web moderno. Meu compromisso é
              transformar desafios técnicos em soluções funcionais, elegantes e de alto impacto visual.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

