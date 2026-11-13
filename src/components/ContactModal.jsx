import { useEffect, useRef } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, X } from 'lucide-react';

const contacts = [
  { label: 'Email', detail: 'dumaranyuri717@gmail.com', href: 'mailto:dumaranyuri717@gmail.com', icon: Mail },
  { label: 'LinkedIn', detail: 'Connect professionally', href: 'https://www.linkedin.com/in/devvit-yuri/', icon: Linkedin, external: true },
  { label: 'GitHub', detail: 'YuriDumaran', href: 'https://github.com/YuriDumaran', icon: Github, external: true },
];

export default function ContactModal({ onClose, isNight }) {
  const closeButton = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div className={`contact-modal-backdrop ${isNight ? 'is-night' : ''}`} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <button className="contact-modal-close" type="button" onClick={onClose} aria-label="Close contact dialog" ref={closeButton}>
          <X size={17} />
        </button>
        <p className="eyebrow">GET IN TOUCH</p>
        <h2 id="contact-modal-title">Let’s connect<span className="serif">.</span></h2>
        <p className="contact-modal-copy">Pick whichever works best for you.</p>
        <div className="contact-modal-links">
          {contacts.map(({ label, detail, href, icon: Icon, external }) => (
            <a className="contact-modal-link" href={href} key={label} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
              <span className="contact-modal-icon"><Icon size={17} /></span>
              <span className="contact-modal-label"><strong>{label}</strong><small>{detail}</small></span>
              <ArrowUpRight className="contact-modal-arrow" size={16} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
