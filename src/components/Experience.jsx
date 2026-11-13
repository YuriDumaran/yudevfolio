import { experience } from '../data/experience.js';

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-heading">
        <p className="eyebrow">WHERE I’VE BEEN</p>
        <h2>Experience<span className="serif">.</span></h2>
      </div>
      <div className="experience-list">
        {experience.map((item) => (
          <article className="experience-item" key={`${item.role}-${item.period}`}>
            <p className="experience-period">{item.period}</p>
            <div className="experience-details">
              <h3>{item.role}</h3>
              {(item.company || item.employment) && (
                <p className="experience-company">{[item.company, item.employment].filter(Boolean).join(' · ')}</p>
              )}
              <p className="experience-location">{item.location}</p>
              {item.description && <p className="experience-description">{item.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
