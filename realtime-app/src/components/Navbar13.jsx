import React, { useState, useEffect } from 'react';
import './Navbar13.css';

/**
 * Navbar 13 Block from React Bits Pro
 * Centered logo navbar with full-screen overlay menu
 *
 * @param {Object} props
 * @param {string} [props.logoText="Belintan B."]
 * @param {string} [props.logoLetter="B"]
 * @param {Array<{label: string, href: string, sub?: string}>} [props.leftLinks]
 * @param {Array<{label: string, href: string, sub?: string}>} [props.rightLinks]
 * @param {string} [props.whatsappNumber="918610662871"]
 * @param {string} [props.theme="dark"]
 * @param {Function} [props.onToggleTheme]
 */
export default function Navbar13({
  logoText = 'Belintan B.',
  logoLetter = 'B',
  leftLinks = [
    { label: 'Profile', href: '#hero', sub: 'Identity, MBA Background & Engineering Stack' },
    { label: 'Services', href: '#services', sub: 'Web Apps, Node APIs, Python AI & Growth' }
  ],
  rightLinks = [
    { label: 'Projects', href: '#projects', sub: 'Real-Time Telemetry & Live PWAs' },
    { label: 'Contact', href: '#contact', sub: 'Direct WhatsApp & Proposal Inquiries' }
  ],
  whatsappNumber = '918610662871',
  theme = 'dark',
  onToggleTheme
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key closes overlay
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <header className={`navbar-13-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-13-inner">
        
        {/* Left Navigation Links */}
        <nav className="navbar-13-left" aria-label="Left Primary Navigation">
          {leftLinks.map((item) => (
            <a key={item.label} href={item.href} className="nav-13-link">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Centered Brand Logo */}
        <div className="navbar-13-center">
          <a href="#hero" className="brand-logo-biz" aria-label={logoText}>
            <span className="brand-icon-box">{logoLetter}</span>
            <span className="brand-name">{logoText}</span>
          </a>
        </div>

        {/* Right Navigation & Controls */}
        <div className="navbar-13-right">
          <nav className="navbar-13-links-right" aria-label="Right Primary Navigation">
            {rightLinks.map((item) => (
              <a key={item.label} href={item.href} className="nav-13-link">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Theme Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="apple-theme-toggle"
              aria-label="Toggle Dark / Light Theme"
              title="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}

          {/* WhatsApp CTA Button */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hi%20Belintan,%20I'd%20like%20to%20discuss%20a%20project`}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-13-whatsapp-btn"
            title="Chat on WhatsApp"
          >
            WhatsApp &rarr;
          </a>

          {/* Overlay Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`navbar-13-menu-toggle ${isOpen ? 'open' : ''}`}
            aria-expanded={isOpen}
            aria-label="Toggle Overlay Menu"
          >
            <span className="menu-toggle-label">{isOpen ? 'Close' : 'Menu'}</span>
            <div className="menu-burger-icon" aria-hidden="true">
              <span className="burger-bar bar-top"></span>
              <span className="burger-bar bar-bot"></span>
            </div>
          </button>
        </div>

      </div>

      {/* Full-Screen Overlay Menu */}
      <div
        className={`navbar-13-overlay ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Main Navigation Overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen(false);
        }}
      >
        <div className="navbar-13-overlay-inner">
          
          {/* Overlay Top Bar */}
          <div className="overlay-top-bar">
            <span className="overlay-meta-brand">
              <span className="brand-icon-box">{logoLetter}</span>
              <span>{logoText} &middot; Full-Stack &amp; AI Studio</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="overlay-close-btn"
              aria-label="Close Overlay"
            >
              ✕
            </button>
          </div>

          {/* Staggered Grand Navigation Links */}
          <nav className="overlay-nav-list" role="navigation">
            {allLinks.map((item, index) => {
              const num = String(index + 1).padStart(2, '0');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="overlay-nav-item"
                >
                  <span className="overlay-item-num">{num}</span>
                  <span className="overlay-item-text">{item.label}</span>
                  {item.sub && <span className="overlay-item-sub">{item.sub}</span>}
                </a>
              );
            })}
          </nav>

          {/* Overlay Footer Info */}
          <div className="overlay-footer">
            <div className="overlay-contact-brief">
              <div>📞 <a href="tel:+918610662871">+91 8610662871</a></div>
              <div>✉️ <a href="mailto:belintan07@gmail.com">belintan07@gmail.com</a></div>
              <div>📍 Tuticorin, Tamil Nadu, India</div>
            </div>
            <div className="overlay-social-links">
              <a href="https://linkedin.com/in/belintanben" target="_blank" rel="noopener">LinkedIn &rarr;</a>
              <a href="https://github.com/belintan07" target="_blank" rel="noopener">GitHub &rarr;</a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener">WhatsApp &rarr;</a>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
