# GUSTAVO MENDES — Premium 3D Digital Portfolio

Uma experiência digital interativa, tridimensional e cinematográfica desenvolvida para apresentar a trajetória, habilidades e projetos de **Gustavo Mendes**, estudante de Tecnologia da Informação no RDS e aspirante a Desenvolvedor Web.

---

## 💎 Conceito & Direção Criativa

O projeto combina a estética de três grandes referências de design e tecnologia:
- **Cartier Roadster Universe**: Sofisticação de alta relojoaria, detalhes em ouro metálico (`#D4AF37`) e champagne (`#F2E5BC`), acabamentos cromados e iluminação de prestígio.
- **Nick Ho Motorsports**: Tipografia editorial expressiva, narrativa pessoal clara, estrutura hierárquica e apresentação sincera.
- **Studio Mirage**: Experiência 3D imersiva com Three.js, partículas atmosféricas, iluminação volumétrica dinâmica e movimentação espacial sincronizada com a rolagem.

---

## 🎨 Paleta de Cores

- **Azul Profundo**: `#09152E` (base do ambiente)
- **Azul Noturno**: `#050B19` (profundidade espacial e sombras)
- **Azul Royal**: `#4169E1` (luzes de realce e destaques)
- **Azul Elétrico**: `#287BFF` (especulares e detalhes neon)
- **Branco & Branco Azulado**: `#FFFFFF` / `#EAF1FF` (tipografia de alta legibilidade)
- **Dourado Metálico**: `#D4AF37` (anéis metálicos, bordas de luxo e acentos)
- **Dourado Champagne**: `#F2E5BC` (brilhos suaves e halos)

---

## 🛠️ Stack Tecnológica

- **HTML5 Semântico**: Estruturação acessível com `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` e `<footer>`.
- **CSS3 Moderno**: Custom properties, Glassmorphism, gradientes multicamadas, animações fluidas e responsividade completa.
- **JavaScript (ES6+)**: Lógica moderna, manipulação reativa e desacoplamento arquitetural.
- **React 18 + Vite**: Renderização rápida com code splitting e modularidade.
- **Three.js & WebGL**: Escultura abstrata 3D (Astrolábio Metachronos) com anéis de gimbal concêntricos, núcleo facetado icosaédrico translúcido, iluminação direcional dupla, point light interativo acoplado ao mouse e campo de 1.200+ partículas estelares.
- **GSAP & GSAP ScrollTrigger**: Orquestração cinematográfica de entrada, revelação escalonada de elementos e sincronização do 3D com a rolagem.
- **Lenis**: Rolagem suave inercial integrada ao ticker do GSAP.
- **Lucide React**: Ícones minimalistas de alta precisão.

---

## 📂 Estrutura do Projeto

```
portfolio-gustavo/
├── index.html                  # Ponto de entrada HTML com tipografia luxury (Syne, Cinzel, Plus Jakarta Sans)
├── package.json                # Dependências e scripts
├── vite.config.js              # Configuração Vite com code-splitting otimizado
├── public/
│   └── favicon.svg             # Favicon exclusivo com monograma GM
└── src/
    ├── main.jsx                # Ponto de montagem React
    ├── App.jsx                 # Orquestrador da cena 3D, rolagem e seções
    ├── components/
    │   ├── Navbar.jsx          # Menu flutuante com blur e gaveta mobile
    │   ├── Hero.jsx            # Primeira tela com composição em tela cheia e CTAs
    │   ├── About.jsx           # Apresentação editorial com dados reais
    │   ├── Skills.jsx          # Cartões 3D com as tecnologias dominadas
    │   ├── Projects.jsx        # Galeria com projetos reais do GitHub e Vercel
    │   ├── Contact.jsx         # Formulário com validação e atalho direto para e-mail/GitHub
    │   ├── Footer.jsx          # Rodapé com monograma e botão de retorno ao topo
    │   ├── CustomCursor.jsx    # Cursor de luxo com halo suave
    │   └── Loader.jsx          # Abertura cinematográfica rápida
    ├── three/
    │   ├── Scene.js            # Gerenciador da cena WebGL, câmera e ciclo de animação
    │   ├── MainObject.js       # Escultura tridimensional em Three.js
    │   ├── Lighting.js         # Sistema de luzes direcionais, ambiente e interativas
    │   └── Particles.js        # Campo de partículas com textura procedural
    ├── animations/
    │   ├── scrollAnimations.js # Integração Lenis + GSAP ScrollTrigger
    │   └── cursorEffects.js    # Física de interpolação do cursor luminoso
    ├── styles/
    │   ├── variables.css       # Tokens de design, cores, tipografia e sombras
    │   ├── global.css          # Reset, scrollbar customizado e utilitários
    │   ├── animations.css      # Keyframes, pulsações e linhas de brilho
    │   ├── components.css      # Estilização completa de botões, cartões e seções
    │   └── responsive.css      # Regras para Desktop, Laptop, Tablet e Mobile
    └── data/
        ├── profile.js          # Informações biográficas, acadêmicas e objetivos reais
        └── projects.js         # Repositórios e demos reais verificados no GitHub
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js instalado (versão 18 ou superior).

### 1. Clonar ou navegar até a pasta do projeto
```bash
cd c:\Users\Aluno\Desktop\portifolio
```

### 2. Instalar dependências (já instaladas)
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
O servidor estará disponível em `http://localhost:3000`.

### 4. Gerar build para produção
```bash
npm run build
```
Os arquivos otimizados e minificados serão gerados na pasta `dist/`.

---

## 🌐 Publicação (Deploy)

### Na Vercel (Recomendado):
1. Suba o repositório para o GitHub (`https://github.com/gustavomendes019`).
2. Conecte sua conta na [Vercel](https://vercel.com).
3. Importe o repositório — o Vite será detectado automaticamente (`Build Command: npm run build`, `Output Directory: dist`).
4. Clique em **Deploy**.

### No Netlify:
1. Conecte o repositório no [Netlify](https://www.netlify.com).
2. Configure `Publish directory: dist` e `Build command: npm run build`.
3. Conclua a publicação.

