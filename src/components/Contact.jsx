import React, { useState } from 'react';
import { Github, Mail, Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { profileData } from '../data/profile';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, informe seu nome.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'O nome deve ter pelo menos 3 caracteres.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, informe seu e-mail.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Por favor, insira um formato de e-mail válido.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Por favor, digite sua mensagem.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'A mensagem deve ter pelo menos 10 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setFeedback({
        type: 'error',
        text: 'Por favor, corrija os campos indicados antes de prosseguir.'
      });
      return;
    }

    // Open direct mail client draft with pre-filled validated subject and body
    const subject = encodeURIComponent(`Contato através do Portfólio - ${formData.name}`);
    const body = encodeURIComponent(
      `Olá Gustavo,\n\nMeu nome é ${formData.name} (${formData.email}).\n\nMensagem:\n${formData.message}\n`
    );
    window.location.href = `mailto:${profileData.email}?subject=${subject}&body=${body}`;

    setFeedback({
      type: 'success',
      text: 'Seu cliente de e-mail padrão foi iniciado com os dados preenchidos. Caso prefira, copie o e-mail ou mande mensagem pelo GitHub.'
    });

    setFormData({ name: '', email: '', message: '' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contato" className="contact-section" aria-label="Contato e Conexão">
      <div className="section-container">
        <div className="contact-card-wrapper">
          <div className="contact-grid">
            {/* Left Contact Details */}
            <div className="contact-details">
              <div>
                <div className="section-badge">04 / CONEXÃO & OPORTUNIDADES</div>
                <h2 className="section-title">
                  Vamos criar algo <br />
                  <span className="text-gold-gradient">incrível?</span>
                </h2>
                <p className="section-subtitle">
                  Estou aberto a novas experiências, aprendizados e oportunidades que contribuam para minha evolução na tecnologia.
                </p>
              </div>

              <div className="contact-links-list">
                {/* Real Verified GitHub */}
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-card"
                >
                  <div className="contact-link-icon">
                    <Github size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(234, 241, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      GitHub Oficial
                    </span>
                    <h4 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>github.com/gustavomendes019</h4>
                  </div>
                </a>

                {/* Email Direct Action Card */}
                <div className="contact-link-card">
                  <div className="contact-link-icon">
                    <Mail size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(234, 241, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Canal de Contato
                    </span>
                    <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF' }}>{profileData.email}</h4>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="btn-luxury btn-secondary-blue"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                    title="Copiar e-mail"
                  >
                    {copied ? <Check size={16} color="#D4AF37" /> : <Copy size={16} />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  Seu Nome
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="form-input"
                  placeholder="Como você prefere ser chamado?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && (
                  <span style={{ color: '#ff4757', fontSize: '0.8rem' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  Seu E-mail
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="form-input"
                  placeholder="exemplo@dominio.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && (
                  <span style={{ color: '#ff4757', fontSize: '0.8rem' }}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Sua Mensagem ou Proposta
                </label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  placeholder="Conte sobre sua ideia, projeto ou oportunidade..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                {errors.message && (
                  <span style={{ color: '#ff4757', fontSize: '0.8rem' }}>
                    {errors.message}
                  </span>
                )}
              </div>

              {feedback && (
                <div className={`form-feedback ${feedback.type}`}>
                  {feedback.type === 'success' ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span>{feedback.text}</span>
                </div>
              )}

              <button type="submit" className="btn-luxury btn-primary-gold" style={{ width: '100%' }}>
                Iniciar Contato <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

