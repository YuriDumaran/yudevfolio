import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Moon, MoveUpRight, Sun } from 'lucide-react';
import Musings from './components/Musings.jsx';
import Experience from './components/Experience.jsx';
import ContactModal from './components/ContactModal.jsx';
import './styles.css';

const projects = [
  { number: '01', name: 'Norovia', kind: 'B2B CHEMICAL DISTRIBUTION · TECH LEAD', description: 'Tech Lead at a B2B chemical distribution startup connecting industrial buyers with suppliers across the US. I work across product, infrastructure, and client delivery, from discovery through deployment.', color: 'peach', glyph: 'NOROVIA', href: 'https://norovia.us.com', linkLabel: 'Visit Norovia', external: true },
  { number: '02', name: 'NK Studio Portfolio', kind: 'ILLUSTRATION PORTFOLIO · IN DEVELOPMENT', description: 'A portfolio for NK Studio featuring an interactive artwork gallery, character design and game art, commission tiers, and a contact form.', color: 'lavender', glyph: 'NK', href: 'https://github.com/YuriDumaran/nat_portfolio', linkLabel: 'View source', external: true },
  { number: '03', name: 'Musings', kind: 'NOTES · IDEAS · WHATEVER’S ON MY MIND', description: 'A casual collection of writeups, observations, and ideas across whatever topics catch my interest.', color: 'mint', glyph: 'm.', href: '#musings', linkLabel: 'Read musings' },
];

function isLocalNight() {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
}

function App() {
  const [showMusings, setShowMusings] = useState(() => window.location.hash === '#musings');
  const [isNight, setIsNight] = useState(isLocalNight);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const syncView = () => setShowMusings(window.location.hash === '#musings');
    window.addEventListener('hashchange', syncView);
    return () => window.removeEventListener('hashchange', syncView);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showMusings]);

  const toggleTheme = () => setIsNight(value => !value);

  if (showMusings) return <Musings isNight={isNight} onToggleTheme={toggleTheme} />;

  return <div className={`site-shell ${isNight ? 'theme-night' : 'theme-day'}`}>
    <header className="topbar"><a className="wordmark" href="#home"><span className="mark">y.</span> Yuri<span className="wordmark-muted">’s portfolio</span></a><nav><a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a><button className="nav-contact-button" type="button" onClick={() => setShowContact(true)}>Contact <ArrowUpRight size={13}/></button></nav></header>
    <main>
      <section className="hero" id="home">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot"/> FULL STACK DEVELOPER · TECH LEAD</p><h1>Making the<br/>web feel a little<br/><span className="serif">more human.</span></h1><p className="intro">Hey, I’m Yuri, a full stack developer and tech lead. I build useful digital products, guide work from discovery to deployment, and care about the people on the other side of the screen.</p><div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowDown size={15}/></a><a className="text-link" href="https://www.linkedin.com/in/devvit-yuri/" target="_blank" rel="noreferrer">Let’s connect <ArrowUpRight size={15}/></a></div></div>
        <div className="hero-art" aria-label="Illustration of a sun and leaves"><button className={`sun sun-toggle ${isNight ? 'is-night' : ''}`} type="button" onClick={toggleTheme} aria-label={`Switch to ${isNight ? 'day' : 'night'} mode`} title={`Switch to ${isNight ? 'day' : 'night'} mode`}>{isNight ? <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M65 12a37 37 0 1 0 24 65A36 36 0 0 1 65 12Z" fill="#f7e7ad"/><path d="m28 28 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Zm44 36 1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5 1.5-4Z" fill="#f7e7ad"/></svg> : <svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="#775b35" strokeWidth="4" strokeLinecap="round"><path d="M50 5v10m0 70v10M5 50h10m70 0h10M18 18l7 7m50 50 7 7m0-64-7 7m-50 50-7 7"/><circle cx="50" cy="50" r="28" fill="#f8d786"/><circle cx="41" cy="46" r="2.6" fill="#775b35" stroke="none"/><circle cx="59" cy="46" r="2.6" fill="#775b35" stroke="none"/><path d="M40 57q10 12 20 0" fill="none"/></g></svg>}<span className="sun-toggle-label">CLICK ME</span></button><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="plant plant-left"><i/><i/><i/><i/><b/></div><div className="plant plant-right"><i/><i/><i/><i/><b/></div></div>
        <a className="scroll-cue" href="#work"><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/></a>
        <div className="hero-index">01 / 04</div>
      </section>
      <section className="work section" id="work"><div className="section-heading"><div><p className="eyebrow">A FEW THINGS I’VE MADE</p><h2>Selected <span className="serif">work.</span></h2></div><p className="heading-aside">Good work starts with a good question.<br/>Here are a few answers I’ve explored.</p></div><div className="project-list">{projects.map(project => <a className="project project-card-link" key={project.number} href={project.href} target={project.external ? '_blank' : undefined} rel={project.external ? 'noreferrer' : undefined} aria-label={`Open ${project.name}`}><div className={`project-visual ${project.color} ${project.number === '01' ? 'norovia-visual' : ''}`}><div className="visual-top"><span>{project.number === '01' ? 'NOROVIA' : 'YURI’S STUDIO'}</span><span>PROJECT {project.number}</span></div><div className={`visual-glyph ${project.number === '01' ? 'norovia-glyph' : project.number === '02' ? 'nk-studio-glyph' : project.number === '03' ? 'musings-glyph' : ''}`}>{project.number === '01' ? <img className="norovia-logo" src="/projects/norovia/logo.png" alt="" /> : project.number === '02' ? <><span>NK</span><small>STUDIO</small></> : project.glyph}</div><div className="visual-bottom"><span>{project.kind}</span><ArrowUpRight size={18}/></div></div><div className="project-info"><div className="project-title"><span className="project-number">({project.number})</span><h3>{project.name}</h3><ArrowDownRight className="project-arrow" size={19}/></div><p>{project.description}</p><span className="project-link">{project.linkLabel} <ArrowUpRight size={14}/></span></div></a>)}</div><p className="project-footnote">MORE GOOD THINGS ARE IN THE WORKS</p></section>
      <section className="about section" id="about"><img className="about-photo" src="/yuri-profile.jpg" alt="Yuri, full stack developer"/><div className="about-copy"><p className="eyebrow">THE PERSON BEHIND THE PIXELS</p><h2>Building things,<br/>staying <span className="serif">curious.</span></h2><p className="about-lede">I believe the best digital experiences feel effortless, even when a lot of thought went into them.</p><p className="about-body">I’m Yuri, a full stack developer at LaVie Resort and Casino Manila and Technical Lead at Norovia. I like working across product, infrastructure, and delivery, turning complex needs into useful digital experiences.</p><a className="text-link" href="https://www.linkedin.com/in/devvit-yuri/" target="_blank" rel="noreferrer">A little more about me <ArrowUpRight size={15}/></a></div><div className="about-aside"><p>CURIOUS BY NATURE.<br/>MAKER BY CHOICE.</p></div></section>
      <Experience />
      <section className="contact" id="contact"><div className="contact-top"><p className="eyebrow">HAVE SOMETHING IN MIND?</p></div><h2>Let’s make<br/>something <span className="serif">good.</span></h2><p className="contact-desc">Have a project, a question, or just want to say hi? My inbox is open.</p><button className="button button-light" type="button" onClick={() => setShowContact(true)}>Say hello <MoveUpRight size={16}/></button></section>
    </main>
    <footer className="footer"><a className="wordmark" href="#home"><span className="mark">y.</span> Yuri<span className="wordmark-muted">’s portfolio</span></a><div className="socials"><a href="https://www.linkedin.com/in/devvit-yuri/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16}/></a><a href="https://github.com/YuriDumaran" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16}/></a><a href="mailto:dumaranyuri717@gmail.com" aria-label="Email"><Mail size={16}/></a></div><span className="copyright">© 2026 YURI</span></footer>
    {showContact && <ContactModal onClose={() => setShowContact(false)} isNight={isNight} />}
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
