import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './interaction.css'
import './cases.css'
import logo from '../assets/amado-dev-logo.png'
import siteLogo from '../assets/amado-dev-logo1.png'

const Icon = ({ children, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const Arrow = () => <Icon><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></Icon>
const Code = () => <Icon><path d="m8 9-3 3 3 3" /><path d="m16 9 3 3-3 3" /><path d="m14 5-4 14" /></Icon>
const Mobile = () => <Icon><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M11 18h2" /></Icon>
const Check = () => <Icon size={17}><path d="m5 12 4 4L19 6" /></Icon>

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [gideoesOpen, setGideoesOpen] = useState(false)
  const [gtecOpen, setGtecOpen] = useState(false)

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const toggleBackToTop = () => setShowBackToTop(window.scrollY > 460)
    window.addEventListener('scroll', toggleBackToTop, { passive: true })
    toggleBackToTop()
    return () => window.removeEventListener('scroll', toggleBackToTop)
  }, [])

  useEffect(() => {
    let favicon = document.querySelector("link[rel~='icon']")
    if (!favicon) {
      favicon = document.createElement('link')
      favicon.rel = 'icon'
      document.head.appendChild(favicon)
    }
    favicon.href = logo
  }, [])

  const scrollTo = (id) => {
    const target = document.querySelector(id)
    if (!target) return

    const start = window.scrollY
    const destination = target.getBoundingClientRect().top + start - 24
    const distance = destination - start
    const duration = Math.min(1250, Math.max(760, Math.abs(distance) * 0.52))
    const startTime = performance.now()
    // Uma curva com uma aterrissagem suave evita a sensação de corte no fim.
    const easeOutBack = (value) => {
      const tension = 1.32
      const offset = tension + 1
      return 1 + offset * Math.pow(value - 1, 3) + tension * Math.pow(value - 1, 2)
    }

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      window.scrollTo(0, start + distance * easeOutBack(progress))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
    window.history.replaceState(null, '', id)
  }

  const handleNav = (event, id) => {
    event.preventDefault()
    scrollTo(id)
  }

  return <main>
    <div className="noise" />
    <header className="nav wrap">
      <a href="#top" className="brand brand-image" aria-label="Amado.dev — início" onClick={(event) => handleNav(event, '#top')}><img src={siteLogo} alt="Amado.dev" /></a>
      <nav>
        <a href="#sobre" onClick={(event) => handleNav(event, '#sobre')}>Sobre</a>
        <a href="#experiencia" onClick={(event) => handleNav(event, '#experiencia')}>Experiência</a>
        <a href="#especialidades" onClick={(event) => handleNav(event, '#especialidades')}>Especialidades</a>
      </nav>
      <button className="nav-contact" onClick={() => scrollTo('#contato')}>Entre em contato <Arrow /></button>
    </header>

    <section className="hero wrap" id="top">
      <div className="hero-copy reveal">
        <p className="eyebrow"><i /> DISPONÍVEL PARA NOVOS DESAFIOS</p>
        <h1>Construo produtos<br /><em>que ganham vida.</em></h1>
        <p className="intro">Desenvolvedor com 3 anos de experiência criando interfaces web e aplicativos mobile que equilibram performance, clareza e uma ótima experiência.</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => scrollTo('#experiencia')}>Conheça minha jornada <Arrow /></button>
          <a className="text-link" href="#contato" onClick={(event) => handleNav(event, '#contato')}>Entrar em contato <span>↗</span></a>
        </div>
      </div>
      <div className="hero-art reveal delay-1" aria-hidden="true">
        <div className="orb orb-one" /><div className="orb orb-two" />
        <div className="code-window">
          <div className="window-bar"><span></span><span></span><span></span><b>portfolio.tsx</b></div>
          <pre><code><span className="purple">const</span> developer = {'{'}{`\n`}  name: <span className="green">'Rafael Amado'</span>,{`\n`}  stack: [<span className="green">'React'</span>, <span className="green">'Flutter'</span>],{`\n`}  passion: <span className="orange">true</span>{`\n`}{'}'};</code></pre>
          <div className="cursor" />
        </div>
        <div className="floating-chip chip-one">React <b>✦</b></div>
        <div className="floating-chip chip-two">Flutter <b>◈</b></div>
      </div>
      <div className="scroll-note">ROLE PARA EXPLORAR <span>↓</span></div>
    </section>

    <section className="statement wrap" id="sobre">
      <p className="section-kicker">01 / SOBRE MIM</p>
      <div className="statement-grid animate-on-scroll">
        <h2>Do suporte à<br /><span>construção.</span></h2>
        <div><p>Minha jornada na tecnologia começou em 2017, resolvendo problemas onde eles aconteciam. Essa base me trouxe uma visão prática sobre pessoas, processos e qualidade.</p><p>Desde o fim de 2023, transformo essa bagagem em produtos digitais — desenvolvendo experiências modernas para web e mobile.</p></div>
      </div>
      <div className="stats animate-on-scroll">
        <div><strong>03<span>+</span></strong><p>Anos desenvolvendo</p></div>
        <div><strong>07</strong><p>Anos em tecnologia</p></div>
        <div><strong>02</strong><p>Ecossistemas principais</p></div>
      </div>
    </section>

    <section className="expertise" id="especialidades">
      <div className="wrap"><p className="section-kicker">02 / O QUE EU FAÇO</p><h2 className="animate-on-scroll">Especialidades<br /><span>em foco.</span></h2>
        <div className="service-grid">
          <article className="animate-on-scroll"><div className="service-icon"><Code /></div><span>01</span><h3>Front-end<br />com React</h3><p>Interfaces rápidas, responsivas e pensadas para converter ideias complexas em experiências simples.</p><ul><li><Check /> React & JavaScript</li><li><Check /> UI responsiva</li><li><Check /> Integração de APIs</li></ul><div className="service-motion" aria-hidden="true"><i className="service-glow" /><b>React <em>✦</em></b><span><small>const ui =</small><strong>▋</strong></span></div></article>
          <article className="animate-on-scroll delay-card-1"><div className="service-icon"><Mobile /></div><span>02</span><h3>Apps<br />com Flutter</h3><p>Aplicações mobile consistentes para Android e iOS a partir de uma única base de código.</p><ul><li><Check /> Flutter & Dart</li><li><Check /> Apps multiplataforma</li><li><Check /> Interfaces nativas</li></ul><div className="service-motion" aria-hidden="true"><i className="service-glow" /><b>Flutter <em>◈</em></b><span><small>build() =&gt;</small><strong>▋</strong></span></div></article>
          <article className="animate-on-scroll delay-card-2"><div className="service-icon store-icon">↗</div><span>03</span><h3>Publicação<br />de apps</h3><p>Configuração e gestão técnica para levar seu aplicativo até os usuários nas principais lojas.</p><ul><li><Check /> Google Play Store</li><li><Check /> App Store Connect</li><li><Check /> Releases e builds</li></ul><div className="service-motion" aria-hidden="true"><i className="service-glow" /><b>Release <em>↗</em></b><span><small>ship(app)</small><strong>▋</strong></span></div></article>
        </div>
      </div>
    </section>

    <section className="journey wrap" id="experiencia">
      <p className="section-kicker">03 / TRAJETÓRIA</p><h2>Experiência que<br /><span>conecta pontas.</span></h2>
      <div className="timeline">
        <div className="timeline-row current animate-on-scroll"><div className="year">2024 <small>— atual</small></div><div className="dot" /><div><p className="role-tag">ATUAL · OS GIDEÕES INTERNACIONAIS NO BRASIL</p><h3>Desenvolvedor de software</h3><p>Desenvolvimento Front-end & Mobile (React / Flutter), cobrindo arquitetura, deploy e manutenção de produtos digitais.</p>
          <button className={`case-card ${gideoesOpen ? 'is-open' : ''}`} onClick={() => setGideoesOpen(!gideoesOpen)} aria-expanded={gideoesOpen}>
            <span className="case-orb case-orb-one" /><span className="case-orb case-orb-two" />
            <span className="case-window-bar"><i /><i /><i /><b>gideoes.cases</b><em>{gideoesOpen ? 'FECHAR ×' : 'ABRIR ↗'}</em></span>
            <span className="case-summary"><strong>Cases de sucesso</strong><small>3 entregas que evoluíram o ecossistema digital</small><span className="case-arrow">{gideoesOpen ? '↑' : '↓'}</span></span>
            <span className="case-details"><span className="case-details-inner">
              <span className="case-item"><b>01 / APP MOBILE</b><strong>Reconstrução do aplicativo Flutter</strong><p>Modernização completa de um legado: performance, push notifications via FCM e publicação na Google Play e App Store.</p><i>Flutter · FCM · App Store Connect</i></span>
              <span className="case-item"><b>02 / DOAÇÕES</b><strong>Captação de recursos integrada</strong><p>Interface React conectada a APIs REST, cobrança e validação em tempo real via Webhooks e Pix.</p><i>React · REST APIs · Webhooks</i></span>
              <span className="case-item"><b>03 / GESTÃO</b><strong>Dashboard financeiro interno</strong><p>Plataforma para usuários, banners, notificações e métricas que centralizou a operação diária.</p><i>React · Autenticação · Analytics</i></span>
            </span></span>
          </button>
        </div></div>
        <div className="timeline-row animate-on-scroll"><div className="year">2024 <small>· maio-outubro  </small></div><div className="dot" /><div><p className="role-tag">G-TEC / TEC SPORTS APP</p><h3>Desenvolvedor front-end</h3><p>Atuação no desenvolvimento web e mobile em um produto voltado a escolas de futebol.</p>
          <button className={`case-card case-card-gtec ${gtecOpen ? 'is-open' : ''}`} onClick={() => setGtecOpen(!gtecOpen)} aria-expanded={gtecOpen}>
            <span className="case-orb case-orb-one" /><span className="case-orb case-orb-two" />
            <span className="case-window-bar"><i /><i /><i /><b>gtec.case</b><em>{gtecOpen ? 'FECHAR ×' : 'ABRIR ↗'}</em></span>
            <span className="case-summary"><strong>Cases de sucesso</strong><small>Produto, feedback e publicação mobile</small><span className="case-arrow">{gtecOpen ? '↑' : '↓'}</span></span>
            <span className="case-details"><span className="case-details-inner">
              <span className="case-item"><b>APP DE AVALIAÇÃO</b><strong>Experiência para escolas de futebol</strong><p>Desenvolvimento de um pacote do aplicativo que permite aos alunos avaliarem professores e as aulas realizadas, transformando feedback em uma ferramenta prática para a escola.</p><i>Flutter · Mobile · Experiência do aluno</i></span>
              <span className="case-item"><b>RELEASES MOBILE</b><strong>Deploy e atualizações nas lojas</strong><p>Responsável pela publicação de novos aplicativos e atualizações para usuários Android e iOS.</p><i>Google Play Console · App Store Connect</i></span>
            </span></span>
          </button>
        </div></div>
        <div className="timeline-row animate-on-scroll"><div className="year">2017 <small>— 2023</small></div><div className="dot" /><div><h3>Suporte de TI · N1 & N2</h3><p>Atendimento técnico, resolução de incidentes, suporte a usuários e sistemas. Atuação complementar em QA com testes manuais.</p><div className="pills"><b>SUPORTE N1 / N2</b><b>QA MANUAL</b><b>TESTES</b></div></div></div>
      </div>
    </section>

    <section className="contact" id="contato"><div className="contact-glow" /><div className="wrap contact-content"><p className="section-kicker">04 / CONTATO</p><h2>Vamos criar algo<br /><em>incrível juntos?</em></h2><a href="mailto:rafaelamado.dev@gmail.com" className="email">rafaelamado.dev@gmail.com<Arrow /></a><p className="contact-note">Disponível para oportunidades, projetos e boas conversas.</p></div></section>
    <footer className="wrap"><a className="brand brand-image" href="#top" onClick={(event) => handleNav(event, '#top')}><img src={siteLogo} alt="Amado.dev" /></a><p>© 2026 · Feito com intenção e React.</p><div><a href="https://www.linkedin.com/in/rafael-amado-4786a0193/">LinkedIn</a><a href="https://github.com/RafaelAmado97">GitHub</a></div></footer>
    <button className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`} onClick={() => scrollTo('#top')} aria-label="Voltar ao início">
      <span>↑</span><small>TOPO</small>
    </button>
  </main>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
