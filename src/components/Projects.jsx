import React from 'react';
import { ExternalLink, Github, Sparkles, PlusCircle } from 'lucide-react';
import { projectsData } from '../data/projects';

// Custom Visual Mockup Illustrations for each project
function ProjectMockupVisual({ type }) {
  if (type === 'skins') {
    return (
      <div className="project-preview-mockup">
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            background: 'rgba(9, 21, 46, 0.75)',
            padding: '12px 20px',
            borderRadius: '12px',
            border: '1px solid rgba(212, 175, 55, 0.4)'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #4169E1, #D4AF37)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#FFFFFF'
            }}
          >
            AG
          </div>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 600 }}>
              Skins Showcase
            </span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(234, 241, 255, 0.6)' }}>
              Vitrine & Catálogo Web
            </span>
          </div>
        </div>
        <span className="project-mockup-badge">Interface Temática</span>
      </div>
    );
  }

  if (type === 'game') {
    return (
      <div className="project-preview-mockup">
        <div
          style={{
            position: 'relative',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '2px dashed rgba(40, 123, 255, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#287BFF',
                boxShadow: '0 0 10px #287BFF'
              }}
            />
          </div>
        </div>
        <span className="project-mockup-badge">JavaScript Target Logic</span>
      </div>
    );
  }

  if (type === 'ai') {
    return (
      <div className="project-preview-mockup">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '180px',
            background: 'rgba(9, 21, 46, 0.8)',
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(65, 105, 225, 0.4)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#D4AF37" />
            <span style={{ fontSize: '0.75rem', color: '#FFFFFF', fontWeight: 500 }}>
              IA-JS Interaction
            </span>
          </div>
          <div
            style={{
              height: '6px',
              width: '75%',
              background: 'linear-gradient(90deg, #4169E1, #287BFF)',
              borderRadius: '3px'
            }}
          />
        </div>
        <span className="project-mockup-badge">DOM & Scripting</span>
      </div>
    );
  }

  return (
    <div className="project-preview-mockup">
      <div
        style={{
          width: '190px',
          height: '65px',
          borderRadius: '8px',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          background: 'rgba(16, 31, 61, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, #D4AF37, #F2E5BC)'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ width: '80px', height: '6px', background: '#FFFFFF', borderRadius: '2px' }} />
          <div style={{ width: '50px', height: '4px', background: 'rgba(234, 241, 255, 0.5)', borderRadius: '2px' }} />
        </div>
      </div>
      <span className="project-mockup-badge">Layout & Arquitetura</span>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projetos" className="projects-section" aria-label="Galeria de Projetos">
      <div className="section-container">
        <div className="section-badge">03 / PROJETOS EM DESTAQUE</div>
        <h2 className="section-title">
          Repositórios & <br />
          <span className="text-gold-gradient">Experiências Práticas</span>
        </h2>
        <p className="section-subtitle">
          Seleção de aplicações web, lógica em JavaScript e projetos verificados diretamente de meu GitHub público.
        </p>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <article key={project.id} className="project-card">
              {/* Visual Preview */}
              <div className="project-preview">
                <div className="project-preview-overlay"></div>
                <ProjectMockupVisual type={project.visualType} />
              </div>

              {/* Project Body */}
              <div className="project-body">
                <div>
                  <span className="project-tagline">{project.tagline}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="project-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-links">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-action"
                    >
                      <Github size={18} /> Código GitHub
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-action"
                      style={{ color: 'var(--color-gold-champagne)' }}
                    >
                      <ExternalLink size={18} /> Ver Demo Online
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

          {/* Reserved Slot for Upcoming Verified Works */}
          <div className="project-card project-card-reserved">
            <div className="slot-icon">
              <PlusCircle size={28} />
            </div>
            <h3>Novos Projetos em Desenvolvimento</h3>
            <p>
              Espaço reservado para os próximos trabalhos práticos, integrações com APIs e projetos acadêmicos no RDS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

