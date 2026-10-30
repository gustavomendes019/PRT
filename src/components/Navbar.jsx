import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll Spy for active section
      const sections = ['inicio', 'sobre', 'tecnologias', 'projetos', 'contato'];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (onNavigate) onNavigate(targetId);
  };

  return (
    <>
      <header className="navbar-fixed" role="banner">
        <nav
          className={`navbar-inner ${isScrolled ? 'scrolled' : ''}`}
          aria-label="Navegação principal"
        >
          {/* Brand Logo */}
          <a
            href="#inicio"
            className="brand-logo"
            onClick={(e) => handleLinkClick(e, 'inicio')}
          >
            <div className="brand-logo-mark">GM</div>
            <span>GUSTAVO MENDES</span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            <li className="nav-link-item">
              <a
                href="#inicio"
                className={activeSection === 'inicio' ? 'active' : ''}
                onClick={(e) => handleLinkClick(e, 'inicio')}
              >
                Início
              </a>
            </li>
            <li className="nav-link-item">
              <a
                href="#sobre"
                className={activeSection === 'sobre' ? 'active' : ''}
                onClick={(e) => handleLinkClick(e, 'sobre')}
              >
                Sobre mim
              </a>
            </li>
            <li className="nav-link-item">
              <a
                href="#tecnologias"
                className={activeSection === 'tecnologias' ? 'active' : ''}
                onClick={(e) => handleLinkClick(e, 'tecnologias')}
              >
                Tecnologias
              </a>
            </li>
            <li className="nav-link-item">
              <a
                href="#projetos"
                className={activeSection === 'projetos' ? 'active' : ''}
                onClick={(e) => handleLinkClick(e, 'projetos')}
              >
                Projetos
              </a>
            </li>
            <li className="nav-link-item">
              <a
                href="#contato"
                className={activeSection === 'contato' ? 'active' : ''}
                onClick={(e) => handleLinkClick(e, 'contato')}
              >
                Contato
              </a>
            </li>
          </ul>

          {/* CTA Right */}
          <a
            href="#contato"
            className="nav-cta-btn"
            onClick={(e) => handleLinkClick(e, 'contato')}
          >
            Fale Comigo
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <a href="#inicio" onClick={(e) => handleLinkClick(e, 'inicio')}>
          Início
        </a>
        <a href="#sobre" onClick={(e) => handleLinkClick(e, 'sobre')}>
          Sobre mim
        </a>
        <a
          href="#tecnologias"
          onClick={(e) => handleLinkClick(e, 'tecnologias')}
        >
          Tecnologias
        </a>
        <a href="#projetos" onClick={(e) => handleLinkClick(e, 'projetos')}>
          Projetos
        </a>
        <a href="#contato" onClick={(e) => handleLinkClick(e, 'contato')}>
          Contato
        </a>

        <div className="mobile-drawer-cta">
          <a
            href="#contato"
            className="btn-luxury btn-primary-gold"
            onClick={(e) => handleLinkClick(e, 'contato')}
          >
            Fale Comigo <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </>
  );
}

