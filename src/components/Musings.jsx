import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Moon, Sun } from 'lucide-react';
import { musings } from '../data/musings.js';

function formatDate(date) {
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' })
    .format(new Date(`${date}T12:00:00`));
}

export default function Musings({ isNight, isThemeTransitioning, onToggleTheme }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMusing = musings[activeIndex];

  return (
    <main className={`musings-page ${isNight ? 'theme-night' : 'theme-day'} ${isThemeTransitioning ? 'theme-transitioning' : ''}`}>
      <aside className="musings-sidebar">
        <div className="musings-sidebar-top">
          <a className="musings-back-link" href="#home"><span className="mark">y.</span> Yuri<span>’s portfolio</span></a>
          <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${isNight ? 'day' : 'night'} mode`} title={`Switch to ${isNight ? 'day' : 'night'} mode`}><span className="theme-toggle-icon">{isNight ? <Sun size={14}/> : <Moon size={14}/>}</span><span>{isNight ? 'Day' : 'Night'}</span></button>
        </div>
        <div className="musings-sidebar-heading">
          <p className="eyebrow">NOTES & IDEAS</p>
          <h1>Musings<span className="serif">.</span></h1>
        </div>
        <nav className="musing-navigation" aria-label="Musing entries">
          {musings.length ? musings.map((entry, index) => (
            <button
              className={`musing-nav-item ${index === activeIndex ? 'is-active' : ''}`}
              key={`${entry.date}-${entry.title}`}
              onClick={() => setActiveIndex(index)}
              type="button"
              aria-current={index === activeIndex ? 'page' : undefined}
            >
              <span className="musing-nav-topic">{entry.topic || 'MUSING'}</span>
              <span className="musing-nav-title">{entry.title}</span>
              <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            </button>
          )) : <p className="musing-nav-empty">Your entries will show up here.</p>}
        </nav>
        <a className="musings-home-link" href="#home">Back to portfolio <ArrowUpRight size={14} /></a>
      </aside>

      <section className="musing-reader" aria-live="polite">
        {activeMusing ? (
          <article className="musing-article">
            <div className="musing-article-meta">
              <span>{activeMusing.topic || 'MUSING'}</span>
              <time dateTime={activeMusing.date}>{formatDate(activeMusing.date)}</time>
            </div>
            <h2>{activeMusing.title}</h2>
            {activeMusing.excerpt && <p className="musing-article-excerpt">{activeMusing.excerpt}</p>}
            <div className="musing-article-content">{activeMusing.content}</div>
            <div className="musing-page-controls">
              <button type="button" onClick={() => setActiveIndex(index => index + 1)} disabled={activeIndex >= musings.length - 1}>
                <ArrowLeft size={15} /> Previous
              </button>
              <span>{activeIndex + 1} / {musings.length}</span>
              <button type="button" onClick={() => setActiveIndex(index => index - 1)} disabled={activeIndex === 0}>
                Next <ArrowRight size={15} />
              </button>
            </div>
          </article>
        ) : (
          <div className="musing-empty-reader">
            <span className="musings-empty-mark">m.</span>
            <p className="eyebrow">A SPACE FOR WHATEVER’S ON MY MIND</p>
            <h2>The first musing is on its way.</h2>
            <p>Add an entry in <code>src/data/musings.js</code> and it will appear in this sidebar.</p>
            <div className="musing-page-controls">
              <button type="button" disabled><ArrowLeft size={15} /> Previous</button>
              <span>0 / 0</span>
              <button type="button" disabled>Next <ArrowRight size={15} /></button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
