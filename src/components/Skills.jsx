import React from 'react';
import { Code, Palette, Zap, FileCode, Coffee } from 'lucide-react';
import { profileData } from '../data/profile';

const iconMap = {
  html: Code,
  css: Palette,
  javascript: Zap,
  python: FileCode,
  java: Coffee
};

export default function Skills() {
  return (
    <section id="tecnologias" className="skills-section" aria-label="Tecnologias e Habilidades">
      <div className="section-container">
        <div className="section-badge">02 / TECNOLOGIAS</div>
        <h2 className="section-title">
          Conhecimentos & <br />
          <span className="text-gold-gradient">Ferramentas de Desenvolvimento</span>
        </h2>
        <p className="section-subtitle">
          Linguagens e fundamentos tecnológicos explorados ativamente em minha formação acadêmica e projetos práticos.
        </p>

        <div className="skills-grid">
          {profileData.skills.map((skill, index) => {
            const IconComponent = iconMap[skill.id] || Code;
            return (
              <div key={skill.id} className="skill-card">
                <div className="skill-top">
                  <div className="skill-icon-wrapper">
                    <IconComponent size={26} />
                  </div>
                  <span className="skill-index">0{index + 1}</span>
                </div>

                <div>
                  <h3 className="skill-name">{skill.name}</h3>
                  <p className="skill-desc">{skill.description}</p>
                </div>

                <div className="skill-footer">
                  <span className="skill-tag">{skill.category}</span>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-gold-metallic)'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

