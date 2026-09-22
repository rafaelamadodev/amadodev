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

const copy = {
  pt: { about: 'Sobre', experience: 'Experiência', expertise: 'Especialidades', contact: 'Entre em contato', available: 'DISPONÍVEL PARA NOVOS DESAFIOS', hero: 'Construo produtos', heroAccent: 'que ganham vida.', intro: 'Desenvolvedor com 3 anos de experiência criando interfaces web e aplicativos mobile que equilibram performance, clareza e uma ótima experiência.', journey: 'Conheça minha jornada', explore: 'ROLE PARA EXPLORAR', aboutKicker: '01 / SOBRE MIM', aboutTitle: 'Do suporte à', aboutAccent: 'construção.', aboutOne: 'Minha jornada na tecnologia começou em 2017, resolvendo problemas onde eles aconteciam. Essa base me trouxe uma visão prática sobre pessoas, processos e qualidade.', aboutTwo: 'Desde o fim de 2023, transformo essa bagagem em produtos digitais — desenvolvendo experiências modernas para web e mobile.', yearsDev: 'Anos desenvolvendo', yearsTech: 'Anos em tecnologia', ecosystems: 'Ecossistemas principais', expertiseKicker: '02 / O QUE EU FAÇO', expertiseTitle: 'Especialidades', expertiseAccent: 'em foco.', reactTitle: 'Front-end com React', reactDesc: 'Interfaces rápidas, responsivas e pensadas para converter ideias complexas em experiências simples.', flutterTitle: 'Apps com Flutter', flutterDesc: 'Aplicações mobile consistentes para Android e iOS a partir de uma única base de código.', releaseTitle: 'Publicação de apps', releaseDesc: 'Configuração e gestão técnica para levar seu aplicativo até os usuários nas principais lojas.', responsive: 'UI responsiva', integration: 'Integração de APIs', crossPlatform: 'Apps multiplataforma', native: 'Interfaces nativas', releases: 'Releases e builds', journeyKicker: '03 / TRAJETÓRIA', journeyTitle: 'Experiência que', journeyAccent: 'conecta pontas.', current: '— atual', currentRole: 'ATUAL · OS GIDEÕES INTERNACIONAIS NO BRASIL', software: 'Desenvolvedor de software', softwareDesc: 'Desenvolvimento Front-end & Mobile (React / Flutter), cobrindo arquitetura, deploy e manutenção de produtos digitais.', frontEnd: 'Desenvolvedor front-end', frontEndDesc: 'Atuação no desenvolvimento web e mobile em um produto voltado a escolas de futebol.', success: 'Cases de sucesso', gideonSummary: '3 entregas que evoluíram o ecossistema digital', gtecSummary: 'Produto, feedback e publicação mobile', open: 'ABRIR ↗', close: 'FECHAR ×', appMobile: '01 / APP MOBILE', rebuild: 'Reconstrução do aplicativo Flutter', rebuildDesc: 'Modernização completa de um legado: performance, push notifications via FCM e publicação na Google Play e App Store.', donations: '02 / DOAÇÕES', fundraising: 'Captação de recursos integrada', fundraisingDesc: 'Interface React conectada a APIs REST, cobrança e validação em tempo real via Webhooks e Pix.', management: '03 / GESTÃO', dashboard: 'Dashboard financeiro interno', dashboardDesc: 'Plataforma para usuários, banners, notificações e métricas que centralizou a operação diária.', evaluation: 'APP DE AVALIAÇÃO', school: 'Experiência para escolas de futebol', schoolDesc: 'Desenvolvimento de um pacote do aplicativo que permite aos alunos avaliarem professores e as aulas realizadas, transformando feedback em uma ferramenta prática para a escola.', mobileReleases: 'RELEASES MOBILE', deploy: 'Deploy e atualizações nas lojas', deployDesc: 'Responsável pela publicação de novos aplicativos e atualizações para usuários Android e iOS.', support: 'Suporte de TI · N1 & N2', supportDesc: 'Atendimento técnico, resolução de incidentes, suporte a usuários e sistemas. Atuação complementar em QA com testes manuais.', contactKicker: '04 / CONTATO', contactTitle: 'Vamos criar algo', contactAccent: 'incrível juntos?', contactNote: 'Disponível para oportunidades, projetos e boas conversas.', top: 'TOPO', made: 'Feito com intenção e React.' },
  en: { about: 'About', experience: 'Experience', expertise: 'Expertise', contact: 'Get in touch', available: 'AVAILABLE FOR NEW CHALLENGES', hero: 'I build products', heroAccent: 'that come to life.', intro: 'Developer with 3 years of experience creating web interfaces and mobile apps that balance performance, clarity, and a great experience.', journey: 'Explore my journey', explore: 'SCROLL TO EXPLORE', aboutKicker: '01 / ABOUT ME', aboutTitle: 'From support to', aboutAccent: 'building.', aboutOne: 'My journey in technology began in 2017, solving problems where they happened. That foundation gave me a practical view of people, processes, and quality.', aboutTwo: 'Since late 2023, I have turned that experience into digital products — building modern web and mobile experiences.', yearsDev: 'Years building', yearsTech: 'Years in technology', ecosystems: 'Core ecosystems', expertiseKicker: '02 / WHAT I DO', expertiseTitle: 'Expertise', expertiseAccent: 'in focus.', reactTitle: 'Front-end with React', reactDesc: 'Fast, responsive interfaces designed to turn complex ideas into simple experiences.', flutterTitle: 'Apps with Flutter', flutterDesc: 'Consistent mobile applications for Android and iOS from a single codebase.', releaseTitle: 'App publishing', releaseDesc: 'Technical setup and management to bring your app to users in leading stores.', responsive: 'Responsive UI', integration: 'API integration', crossPlatform: 'Cross-platform apps', native: 'Native interfaces', releases: 'Releases and builds', journeyKicker: '03 / JOURNEY', journeyTitle: 'Experience that', journeyAccent: 'connects the dots.', current: '— present', currentRole: 'CURRENT · THE GIDEONS INTERNATIONAL IN BRAZIL', software: 'Software developer', softwareDesc: 'Front-end & Mobile development (React / Flutter), covering architecture, deployment, and digital product maintenance.', frontEnd: 'Front-end developer', frontEndDesc: 'Web and mobile development for a product focused on football schools.', success: 'Success stories', gideonSummary: '3 deliveries that evolved the digital ecosystem', gtecSummary: 'Product, feedback, and mobile publishing', open: 'OPEN ↗', close: 'CLOSE ×', appMobile: '01 / MOBILE APP', rebuild: 'Flutter app rebuild', rebuildDesc: 'Complete modernization of a legacy app: performance, FCM push notifications, and Google Play and App Store publishing.', donations: '02 / DONATIONS', fundraising: 'Integrated fundraising', fundraisingDesc: 'React interface connected to REST APIs, payments, and real-time validation through Webhooks and Pix.', management: '03 / MANAGEMENT', dashboard: 'Internal finance dashboard', dashboardDesc: 'Platform for users, banners, notifications, and metrics that centralized daily operations.', evaluation: 'ASSESSMENT APP', school: 'Experience for football schools', schoolDesc: 'Development of an app package that lets students evaluate teachers and classes, turning feedback into a practical tool for the school.', mobileReleases: 'MOBILE RELEASES', deploy: 'Store deployment and updates', deployDesc: 'Responsible for publishing new apps and updates for Android and iOS users.', support: 'IT Support · L1 & L2', supportDesc: 'Technical support, incident resolution, and user and system support. Additional QA work with manual testing.', contactKicker: '04 / CONTACT', contactTitle: 'Let’s create something', contactAccent: 'amazing together?', contactNote: 'Available for opportunities, projects, and good conversations.', top: 'TOP', made: 'Made with intention and React.' },
  es: { about: 'Sobre mí', experience: 'Experiencia', expertise: 'Especialidades', contact: 'Hablemos', available: 'DISPONIBLE PARA NUEVOS RETOS', hero: 'Creo productos', heroAccent: 'que cobran vida.', intro: 'Desarrollador con 3 años de experiencia creando interfaces web y aplicaciones móviles que equilibran rendimiento, claridad y una gran experiencia.', journey: 'Conoce mi trayectoria', explore: 'DESLIZA PARA EXPLORAR', aboutKicker: '01 / SOBRE MÍ', aboutTitle: 'Del soporte a la', aboutAccent: 'construcción.', aboutOne: 'Mi trayectoria en tecnología comenzó en 2017, resolviendo problemas donde ocurrían. Esa base me dio una visión práctica de las personas, los procesos y la calidad.', aboutTwo: 'Desde finales de 2023, transformo esa experiencia en productos digitales — desarrollando experiencias modernas para web y móvil.', yearsDev: 'Años desarrollando', yearsTech: 'Años en tecnología', ecosystems: 'Ecosistemas principales', expertiseKicker: '02 / LO QUE HAGO', expertiseTitle: 'Especialidades', expertiseAccent: 'en foco.', reactTitle: 'Front-end con React', reactDesc: 'Interfaces rápidas y responsivas, pensadas para transformar ideas complejas en experiencias simples.', flutterTitle: 'Apps con Flutter', flutterDesc: 'Aplicaciones móviles consistentes para Android e iOS desde una única base de código.', releaseTitle: 'Publicación de apps', releaseDesc: 'Configuración y gestión técnica para llevar tu aplicación a los usuarios en las principales tiendas.', responsive: 'UI responsiva', integration: 'Integración de APIs', crossPlatform: 'Apps multiplataforma', native: 'Interfaces nativas', releases: 'Releases y builds', journeyKicker: '03 / TRAYECTORIA', journeyTitle: 'Experiencia que', journeyAccent: 'conecta puntos.', current: '— actual', currentRole: 'ACTUAL · LOS GIDEONES INTERNACIONALES EN BRASIL', software: 'Desarrollador de software', softwareDesc: 'Desarrollo Front-end y Mobile (React / Flutter), cubriendo arquitectura, despliegue y mantenimiento de productos digitales.', frontEnd: 'Desarrollador front-end', frontEndDesc: 'Desarrollo web y móvil para un producto enfocado en escuelas de fútbol.', success: 'Casos de éxito', gideonSummary: '3 entregas que evolucionaron el ecosistema digital', gtecSummary: 'Producto, feedback y publicación móvil', open: 'ABRIR ↗', close: 'CERRAR ×', appMobile: '01 / APP MÓVIL', rebuild: 'Reconstrucción de la aplicación Flutter', rebuildDesc: 'Modernización completa de un legado: rendimiento, notificaciones push vía FCM y publicación en Google Play y App Store.', donations: '02 / DONACIONES', fundraising: 'Captación integrada', fundraisingDesc: 'Interfaz React conectada a APIs REST, cobros y validación en tiempo real mediante Webhooks y Pix.', management: '03 / GESTIÓN', dashboard: 'Dashboard financiero interno', dashboardDesc: 'Plataforma para usuarios, banners, notificaciones y métricas que centralizó la operación diaria.', evaluation: 'APP DE EVALUACIÓN', school: 'Experiencia para escuelas de fútbol', schoolDesc: 'Desarrollo de un paquete de aplicación que permite a los alumnos evaluar profesores y clases, convirtiendo el feedback en una herramienta práctica para la escuela.', mobileReleases: 'RELEASES MÓVILES', deploy: 'Despliegue y actualizaciones en tiendas', deployDesc: 'Responsable de publicar nuevas aplicaciones y actualizaciones para usuarios Android e iOS.', support: 'Soporte TI · N1 y N2', supportDesc: 'Soporte técnico, resolución de incidencias y atención a usuarios y sistemas. Trabajo adicional de QA con pruebas manuales.', contactKicker: '04 / CONTACTO', contactTitle: '¿Creamos algo', contactAccent: 'increíble juntos?', contactNote: 'Disponible para oportunidades, proyectos y buenas conversaciones.', top: 'ARRIBA', made: 'Hecho con intención y React.' }
}

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'pt')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [gideoesOpen, setGideoesOpen] = useState(false)
  const [gtecOpen, setGtecOpen] = useState(false)
  const t = copy[language]

  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme) }, [theme])
  useEffect(() => { document.documentElement.lang = language === 'pt' ? 'pt-BR' : language; localStorage.setItem('language', language) }, [language])

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
        <a href="#sobre" onClick={(event) => handleNav(event, '#sobre')}>{t.about}</a>
        <a href="#experiencia" onClick={(event) => handleNav(event, '#experiencia')}>{t.experience}</a>
        <a href="#especialidades" onClick={(event) => handleNav(event, '#especialidades')}>{t.expertise}</a>
      </nav>
      <div className="nav-tools"><div className="language-picker" aria-label="Language"><button onClick={() => setLanguage('pt')} className={language === 'pt' ? 'active' : ''}>PT</button><button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button><button onClick={() => setLanguage('es')} className={language === 'es' ? 'active' : ''}>ES</button></div><button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Alternar tema">{theme === 'dark' ? '☀' : '◐'}</button><button className="nav-contact" onClick={() => scrollTo('#contato')}>{t.contact} <Arrow /></button></div>
    </header>

    <section className="hero wrap" id="top">
      <div className="hero-copy reveal">
        <p className="eyebrow"><i /> {t.available}</p>
        <h1>{t.hero}<br /><em>{t.heroAccent}</em></h1>
        <p className="intro">{t.intro}</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => scrollTo('#experiencia')}>{t.journey} <Arrow /></button>
          <a className="text-link" href="#contato" onClick={(event) => handleNav(event, '#contato')}>{t.contact} <span>↗</span></a>
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
      <div className="scroll-note">{t.explore} <span>↓</span></div>
    </section>

    <section className="statement wrap" id="sobre">
      <p className="section-kicker">{t.aboutKicker}</p>
      <div className="statement-grid animate-on-scroll">
        <h2>{t.aboutTitle}<br /><span>{t.aboutAccent}</span></h2>
        <div><p>{t.aboutOne}</p><p>{t.aboutTwo}</p></div>
      </div>
      <div className="stats animate-on-scroll">
        <div><strong>03<span>+</span></strong><p>{t.yearsDev}</p></div>
        <div><strong>07</strong><p>{t.yearsTech}</p></div>
        <div><strong>02</strong><p>{t.ecosystems}</p></div>
      </div>
    </section>

    <section className="expertise" id="especialidades">
      <div className="wrap"><p className="section-kicker">{t.expertiseKicker}</p><h2 className="animate-on-scroll">{t.expertiseTitle}<br /><span>{t.expertiseAccent}</span></h2>
        <div className="service-grid">
          <article className="animate-on-scroll"><div className="service-icon"><Code /></div><span>01</span><h3>{t.reactTitle}</h3><p>{t.reactDesc}</p><ul><li><Check /> React & JavaScript</li><li><Check /> {t.responsive}</li><li><Check /> {t.integration}</li></ul><div className="service-motion" aria-hidden="true"><i className="service-glow" /><b>React <em>✦</em></b><span><small>const ui =</small><strong>▋</strong></span></div></article>
          <article className="animate-on-scroll delay-card-1"><div className="service-icon"><Mobile /></div><span>02</span><h3>{t.flutterTitle}</h3><p>{t.flutterDesc}</p><ul><li><Check /> Flutter & Dart</li><li><Check /> {t.crossPlatform}</li><li><Check /> {t.native}</li></ul><div className="service-motion" aria-hidden="true"><i className="service-glow" /><b>Flutter <em>◈</em></b><span><small>build() =&gt;</small><strong>▋</strong></span></div></article>
          <article className="animate-on-scroll delay-card-2"><div className="service-icon store-icon">↗</div><span>03</span><h3>{t.releaseTitle}</h3><p>{t.releaseDesc}</p><ul><li><Check /> Google Play Store</li><li><Check /> App Store Connect</li><li><Check /> {t.releases}</li></ul><div className="service-motion" aria-hidden="true"><i className="service-glow" /><b>Release <em>↗</em></b><span><small>ship(app)</small><strong>▋</strong></span></div></article>
        </div>
      </div>
    </section>

    <section className="journey wrap" id="experiencia">
      <p className="section-kicker">{t.journeyKicker}</p><h2>{t.journeyTitle}<br /><span>{t.journeyAccent}</span></h2>
      <div className="timeline">
        <div className="timeline-row current animate-on-scroll"><div className="year">2024 <small>{t.current}</small></div><div className="dot" /><div><p className="role-tag">{t.currentRole}</p><h3>{t.software}</h3><p>{t.softwareDesc}</p>
          <button className={`case-card ${gideoesOpen ? 'is-open' : ''}`} onClick={() => setGideoesOpen(!gideoesOpen)} aria-expanded={gideoesOpen}>
            <span className="case-orb case-orb-one" /><span className="case-orb case-orb-two" />
            <span className="case-window-bar"><i /><i /><i /><b>gideoes.cases</b><em>{gideoesOpen ? t.close : t.open}</em></span>
            <span className="case-summary"><strong>{t.success}</strong><small>{t.gideonSummary}</small><span className="case-arrow">{gideoesOpen ? '↑' : '↓'}</span></span>
            <span className="case-details"><span className="case-details-inner">
              <span className="case-item"><b>{t.appMobile}</b><strong>{t.rebuild}</strong><p>{t.rebuildDesc}</p><i>Flutter · FCM · App Store Connect</i></span>
              <span className="case-item"><b>{t.donations}</b><strong>{t.fundraising}</strong><p>{t.fundraisingDesc}</p><i>React · REST APIs · Webhooks</i></span>
              <span className="case-item"><b>{t.management}</b><strong>{t.dashboard}</strong><p>{t.dashboardDesc}</p><i>React · Authentication · Analytics</i></span>
            </span></span>
          </button>
        </div></div>
        <div className="timeline-row animate-on-scroll"><div className="year">2024 <small>· maio-outubro  </small></div><div className="dot" /><div><p className="role-tag">G-TEC / TEC SPORTS APP</p><h3>{t.frontEnd}</h3><p>{t.frontEndDesc}</p>
          <button className={`case-card case-card-gtec ${gtecOpen ? 'is-open' : ''}`} onClick={() => setGtecOpen(!gtecOpen)} aria-expanded={gtecOpen}>
            <span className="case-orb case-orb-one" /><span className="case-orb case-orb-two" />
            <span className="case-window-bar"><i /><i /><i /><b>gtec.case</b><em>{gtecOpen ? t.close : t.open}</em></span>
            <span className="case-summary"><strong>{t.success}</strong><small>{t.gtecSummary}</small><span className="case-arrow">{gtecOpen ? '↑' : '↓'}</span></span>
            <span className="case-details"><span className="case-details-inner">
              <span className="case-item"><b>{t.evaluation}</b><strong>{t.school}</strong><p>{t.schoolDesc}</p><i>Flutter · Mobile · Student experience</i></span>
              <span className="case-item"><b>{t.mobileReleases}</b><strong>{t.deploy}</strong><p>{t.deployDesc}</p><i>Google Play Console · App Store Connect</i></span>
            </span></span>
          </button>
        </div></div>
        <div className="timeline-row animate-on-scroll"><div className="year">2017 <small>— 2023</small></div><div className="dot" /><div><h3>{t.support}</h3><p>{t.supportDesc}</p><div className="pills"><b>SUPORTE N1 / N2</b><b>QA MANUAL</b><b>TESTES</b></div></div></div>
      </div>
    </section>

    <section className="contact" id="contato"><div className="contact-glow" /><div className="wrap contact-content"><p className="section-kicker">{t.contactKicker}</p><h2>{t.contactTitle}<br /><em>{t.contactAccent}</em></h2><a href="mailto:rafaelamado.dev@gmail.com" className="email">rafaelamado.dev@gmail.com<Arrow /></a><p className="contact-note">{t.contactNote}</p></div></section>
    <footer className="wrap"><a className="brand brand-image" href="#top" onClick={(event) => handleNav(event, '#top')}><img src={siteLogo} alt="Amado.dev" /></a><p>© 2026 · {t.made}</p><div><a href="https://www.linkedin.com/in/rafael-amado-4786a0193/">LinkedIn</a><a href="https://github.com/RafaelAmado97">GitHub</a></div></footer>
    <button className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`} onClick={() => scrollTo('#top')} aria-label="Voltar ao início">
      <span>↑</span><small>{t.top}</small>
    </button>
  </main>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
