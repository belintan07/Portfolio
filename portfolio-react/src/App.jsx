import React, { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  Eye,
  EyeOff,
  Moon,
  RotateCcw,
  Search,
  Sun,
  Trash2,
  Upload,
  Zap
} from 'lucide-react';
import GradientText from './components/GradientText';

/* ==========================================================================
   1. Unified Styles (Capgemini Enterprise Theme + React Bits LogoLoop)
   ========================================================================== */
const APP_CSS = `
:root {
  --cg-blue: #0070ad;
  --cg-vibrant: #12abdb;
  --cg-navy: #0d2b4e;
  --cg-ink: #15011d;
  --cg-slate: #272936;
  --bg-primary: #ffffff;
  --bg-surface: #ececec;
  --bg-soft: #f5f7fa;
  --border-color: #dde3ea;
  --text-primary: #15011d;
  --text-secondary: #475569;
  --card-bg: #ffffff;
  --font-sans: 'Ubuntu', 'Plus Jakarta Sans', 'Segoe UI', system-ui, -apple-system, sans-serif;
}

[data-theme='dark'] {
  --bg-primary: #09111e;
  --bg-surface: #0d1626;
  --bg-soft: #101b2e;
  --border-color: rgba(18, 171, 219, 0.24);
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --card-bg: #101b2e;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-sans);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  scroll-behavior: smooth;
  overflow-x: clip;
}

#hero,
#about,
#tech-stack,
#services,
#insights,
#pricing,
#templates-studio,
#contact {
  scroll-margin-top: 84px;
}

@media (max-width: 960px) {
  #hero,
  #about,
  #tech-stack,
  #services,
  #insights,
  #pricing,
  #templates-studio,
  #contact {
    scroll-margin-top: 132px;
  }
}

.cg-label {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 5px;
}

.cg-loop-stage > .logoloop {
  flex: 1 1 100%;
  width: 100%;
  min-width: 0;
}

.cg-btn-primary:disabled {
  cursor: not-allowed;
  opacity: 0.55;
  transform: none !important;
  box-shadow: none !important;
}

.cg-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Navbar (No WhatsApp, IN EN, Local time, or Menu button clutter) */
.cg-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;
  border-top: 3px solid #0070ad;
  border-bottom: 1px solid #dde3ea;
  box-shadow: 0 2px 16px rgba(13, 43, 78, 0.07);
}

[data-theme='dark'] .cg-header {
  background: #09111e;
  border-top-color: #12abdb;
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.cg-nav-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 12px 24px;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.cg-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
}

.cg-brand-mark {
  width: 34px;
  height: 34px;
  border-radius: 6px;
  background: linear-gradient(135deg, #0070ad 0%, #12abdb 100%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 112, 173, 0.25);
  flex-shrink: 0;
}

.cg-brand-text {
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.cg-nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, 2vw, 28px);
}

.cg-nav-links::-webkit-scrollbar {
  display: none;
}

.cg-nav-link {
  background: transparent;
  border: none;
  color: #272936;
  font-family: var(--font-sans);
  font-size: 0.92rem;
  font-weight: 600;
  padding: 8px 2px;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

[data-theme='dark'] .cg-nav-link {
  color: #e2e8f0;
}

.cg-nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: #0070ad;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.22s ease;
}

[data-theme='dark'] .cg-nav-link::after {
  background: #12abdb;
}

.cg-nav-link:hover,
.cg-nav-link.active {
  color: #0070ad;
}

[data-theme='dark'] .cg-nav-link:hover,
[data-theme='dark'] .cg-nav-link.active {
  color: #12abdb;
}

.cg-nav-link:hover::after,
.cg-nav-link.active::after {
  transform: scaleX(1);
}

.cg-theme-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #dde3ea;
  background: transparent;
  color: #272936;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.cg-theme-btn:hover {
  background: #f0f7fc;
  border-color: #0070ad;
  color: #0070ad;
}

[data-theme='dark'] .cg-theme-btn {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}

@media (max-width: 960px) {
  .cg-nav-inner {
    flex-wrap: wrap;
    row-gap: 8px;
    padding: 10px 16px;
  }

  .cg-nav-links {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    gap: 18px;
    overflow-x: auto;
    scrollbar-width: none;
    padding-top: 8px;
    border-top: 1px solid rgba(0, 112, 173, 0.14);
  }
}

/* Badges & Headings */
.cg-badge {
  display: inline-block;
  background: #ebf5fb;
  color: #0070ad;
  border: 1px solid #c5e1f2;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  padding: 6px 14px;
}

[data-theme='dark'] .cg-badge {
  background: rgba(18, 171, 219, 0.16);
  color: #12abdb;
  border-color: rgba(18, 171, 219, 0.35);
}

.cg-section-title {
  color: var(--text-primary);
  font-size: clamp(1.8rem, 3.2vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 14px 0 24px;
  letter-spacing: -0.02em;
}

/* Hero Banner */
.cg-hero {
  background: linear-gradient(125deg, #07192e 0%, #0b3662 46%, #0070ad 100%);
  color: #ffffff;
  padding: clamp(104px, 10vw, 132px) 0 0;
  position: relative;
  overflow: hidden;
}

.cg-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(290px, 0.85fr);
  align-items: center;
  gap: clamp(28px, 4vw, 56px);
  padding-bottom: 36px;
}

@media (max-width: 960px) {
  .cg-hero-grid {
    grid-template-columns: 1fr;
  }
}

.cg-hero-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.cg-eyebrow-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #f0f9ff;
}

.cg-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #12abdb;
  box-shadow: 0 0 0 4px rgba(18, 171, 219, 0.28);
}

.cg-open-pill {
  background: #12abdb;
  color: #07192e;
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-decoration: none;
}

.cg-hero-h1 {
  font-size: clamp(2.5rem, 4.8vw, 4.1rem);
  font-weight: 700;
  line-height: 1.08;
  margin: 0 0 14px;
  letter-spacing: -0.02em;
}

.cg-hero-h1 span {
  background: linear-gradient(90deg, #ffffff 40%, #8ce2ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Interactive Flip Role Card */
.cg-role-card-wrap {
  margin: 10px 0 18px;
}

.cg-role-card {
  background: #ffffff;
  color: #15011d;
  border: 1px solid #c5e1f2;
  border-radius: 8px;
  padding: 14px 20px;
  max-width: 340px;
  cursor: pointer;
  box-shadow: 0 14px 32px rgba(7, 25, 46, 0.34);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  text-align: left;
  width: 100%;
  display: block;
}

.cg-role-card:hover {
  transform: translateY(-2px);
}

.cg-role-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #525b6b;
  margin-bottom: 6px;
}

.cg-role-title {
  font-size: 1.28rem;
  font-weight: 800;
  color: #0070ad;
}

.cg-about-box {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-left: 4px solid #12abdb;
  border-radius: 6px;
  padding: 18px 22px;
  max-width: 620px;
  margin-bottom: 22px;
}

.cg-about-kicker {
  color: #12abdb;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.cg-about-box h2 {
  color: #ffffff;
  font-size: clamp(1.25rem, 2.2vw, 1.6rem);
  margin: 0 0 8px;
}

.cg-about-box p {
  color: #e2eef7;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 8px;
}

.cg-about-box p:last-child {
  margin-bottom: 0;
}

.cg-hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.cg-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  color: #0070ad;
  border: none;
  border-radius: 999px;
  padding: 12px 24px;
  font-weight: 700;
  font-size: 0.92rem;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(7, 25, 46, 0.25);
  transition: transform 0.2s ease, background 0.2s ease;
}

.cg-btn-primary:hover {
  background: #ebf5fb;
  transform: translateY(-1px);
}

.cg-btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
  padding: 11px 22px;
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.cg-btn-outline:hover {
  background: rgba(255, 255, 255, 0.2);
}

.cg-fig-stage {
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.14) 0%, rgba(18, 171, 219, 0.16) 100%);
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 8px 8px 44px 8px;
  padding: 18px;
  max-width: 390px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 24px 56px rgba(5, 16, 30, 0.45);
  position: relative;
}

.cg-fig-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #0d2b4e;
  color: #ffffff;
  border: 1px solid rgba(18, 171, 219, 0.55);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.76rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.cg-fig-frame {
  border-radius: 6px 6px 32px 6px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.22);
  background: #0d2b4e;
  aspect-ratio: 4 / 5;
}

.cg-fig-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cg-fig-card {
  margin-top: 12px;
  background: #ffffff;
  color: #0070ad;
  border-radius: 4px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
}

.cg-hero-bar {
  background: rgba(7, 25, 46, 0.42);
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  color: #dcebf7;
  padding: 14px 0;
  font-size: 0.82rem;
  font-weight: 600;
}

.cg-hero-bar-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
}

/* Tech Stack LogoLoop Band */
.cg-tech-band {
  background: var(--bg-soft);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  padding: 54px 0;
}

.cg-tech-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.cg-tech-sub {
  color: var(--text-secondary);
  font-size: 0.95rem;
  max-width: 680px;
  margin: 0;
}

.cg-mode-switch {
  display: inline-flex;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 4px;
  gap: 4px;
}

.cg-mode-btn {
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 7px 14px;
  border-radius: 4px;
  cursor: pointer;
}

.cg-mode-btn.active {
  background: #0070ad;
  color: #ffffff;
}

[data-theme='dark'] .cg-mode-btn.active {
  background: #12abdb;
  color: #07192e;
}

.cg-tech-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  padding: 6px 14px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
  box-shadow: 0 2px 8px rgba(13, 43, 78, 0.04);
}

[data-theme='dark'] .cg-tech-indicator {
  border-color: rgba(18, 171, 219, 0.28);
  color: #cbd5e1;
}

.cg-live-dot {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  display: inline-block;
  animation: cg-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes cg-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(0.9); }
}

.cg-indicator-text {
  letter-spacing: -0.01em;
}

.cg-loop-stage {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-top: 3px solid #0070ad;
  border-radius: 8px;
  padding: 22px 8px;
  min-height: 120px;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(13, 43, 78, 0.06);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.cg-loop-stage:hover {
  box-shadow: 0 14px 36px rgba(13, 43, 78, 0.09);
}

[data-theme='dark'] .cg-loop-stage {
  border-color: rgba(18, 171, 219, 0.24);
  border-top-color: #12abdb;
}

.cg-tech-tags-summary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  margin-top: 18px;
  padding: 12px 18px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.86rem;
  color: var(--text-secondary);
}

.cg-tech-metric-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.cg-tech-metric-item strong {
  color: var(--text-primary);
}

.cg-metric-icon {
  font-size: 1rem;
}

/* Services & Capabilities */
.cg-section {
  padding: 72px 0;
  background: var(--bg-primary);
}

.cg-section-alt {
  padding: 72px 0;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.cg-svp-banner {
  background: linear-gradient(125deg, #09203f 0%, #004e82 50%, #0070ad 100%);
  color: #ffffff;
  border-radius: 6px;
  padding: clamp(24px, 4vw, 40px);
  box-shadow: 0 18px 42px rgba(0, 112, 173, 0.16);
}

.cg-svp-pill {
  display: inline-block;
  background: #12abdb;
  color: #07192e;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 5px 12px;
  border-radius: 3px;
}

.cg-svp-features {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 22px;
}

@media (max-width: 820px) {
  .cg-svp-features {
    grid-template-columns: 1fr;
  }
}

.cg-svp-feature {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 6px;
  padding: 16px;
}

.cg-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-top: 28px;
}

@media (max-width: 1100px) {
  .cg-grid-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .cg-grid-4 {
    grid-template-columns: 1fr;
  }
}

.cg-service-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-top: 4px solid #0070ad;
  border-radius: 6px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 270px;
  box-shadow: 0 6px 20px rgba(13, 43, 78, 0.05);
}

.cg-service-card.is-featured {
  background: linear-gradient(155deg, #0070ad 0%, #0d2b4e 100%);
  color: #ffffff;
  border-color: #0070ad;
  border-top-color: #12abdb;
}

.cg-num-badge {
  display: inline-block;
  background: #ebf5fb;
  color: #0070ad;
  font-weight: 800;
  font-size: 0.78rem;
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.cg-service-card.is-featured .cg-num-badge {
  background: rgba(18, 171, 219, 0.25);
  color: #ffffff;
}

.cg-tech-pill {
  background: #f4f8fb;
  color: #0070ad;
  border: 1px solid #dde3ea;
  border-radius: 4px;
  padding: 8px 10px;
  font-size: 0.78rem;
  font-weight: 600;
  margin-top: 16px;
}

[data-theme='dark'] .cg-tech-pill {
  background: rgba(18, 171, 219, 0.12);
  color: #8ce2ff;
  border-color: rgba(18, 171, 219, 0.25);
}

.cg-service-card.is-featured .cg-tech-pill {
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.24);
}

/* Insights */
.cg-featured-split {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 14px 36px rgba(13, 43, 78, 0.08);
}

@media (max-width: 880px) {
  .cg-featured-split {
    grid-template-columns: 1fr;
  }
}

.cg-featured-visual {
  background: linear-gradient(135deg, #07192e 0%, #0070ad 100%);
  color: #ffffff;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
}

.cg-metrics-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.cg-metric-box {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 12px;
}

.cg-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 820px) {
  .cg-grid-2 {
    grid-template-columns: 1fr;
  }
}

.cg-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 880px) {
  .cg-grid-2,
  .cg-grid-3 {
    grid-template-columns: 1fr;
  }
}

.cg-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
}

.cg-arrow-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  padding: 0;
  color: #0070ad;
  font-weight: 700;
  font-size: 0.92rem;
  cursor: pointer;
  text-decoration: none;
  width: fit-content;
}

[data-theme='dark'] .cg-arrow-btn {
  color: #12abdb;
}

/* Pricing Tiers (Strictly Preserving 10% Discounts) */
.cg-pricing-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-top: 4px solid #0070ad;
  border-radius: 6px;
  padding: 28px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.cg-pricing-card.featured {
  background: linear-gradient(155deg, #0070ad 0%, #0d2b4e 100%);
  color: #ffffff;
  border-color: #0070ad;
  border-top-color: #12abdb;
  box-shadow: 0 20px 44px rgba(0, 112, 173, 0.26);
}

.cg-discount-pill {
  display: inline-block;
  background: #e0f4fc;
  color: #005a8d;
  border: 1px solid #9addf5;
  border-radius: 3px;
  padding: 2px 8px;
  font-size: 0.72rem;
  font-weight: 800;
}

.cg-pricing-card.featured .cg-discount-pill {
  background: rgba(18, 171, 219, 0.25);
  color: #ffffff;
  border-color: rgba(18, 171, 219, 0.65);
}

.cg-price-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cg-price-list li {
  padding: 7px 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  font-size: 0.9rem;
}

.cg-price-list li::before {
  content: '✓ ';
  color: #0070ad;
  font-weight: 700;
}

.cg-pricing-card.featured .cg-price-list li::before {
  color: #8ce2ff;
}

.cg-price-reveal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 700;
  color: #0070ad;
  cursor: pointer;
  transition: all 0.25s ease;
  margin: 12px 0 6px;
}

.cg-price-reveal-btn:hover {
  background: #f0f7fc;
  border-color: #0070ad;
  transform: translateY(-1px);
}

.cg-pricing-card.featured .cg-price-reveal-btn {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
  color: #ffffff;
}

.cg-pricing-card.featured .cg-price-reveal-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: #ffffff;
}

[data-theme='dark'] .cg-price-reveal-btn {
  background: rgba(18, 171, 219, 0.1);
  border-color: rgba(18, 171, 219, 0.3);
  color: #12abdb;
}

[data-theme='dark'] .cg-price-reveal-btn:hover {
  background: rgba(18, 171, 219, 0.2);
  border-color: #12abdb;
}

.cg-price-reveal-btn.is-active {
  background: #0070ad;
  color: #ffffff;
  border-color: #0070ad;
  box-shadow: 0 4px 14px rgba(0, 112, 173, 0.28);
}

.cg-pricing-card.featured .cg-price-reveal-btn.is-active {
  background: #ffffff;
  color: #0070ad;
  border-color: #ffffff;
  box-shadow: 0 4px 14px rgba(255, 255, 255, 0.25);
}

[data-theme='dark'] .cg-price-reveal-btn.is-active {
  background: #12abdb;
  color: #0d2b4e;
  border-color: #12abdb;
}

.cg-price-chevron-wrap {
  display: inline-flex;
  align-items: center;
  transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1);
}

.cg-price-chevron-wrap.is-flipped {
  transform: rotate(180deg);
}

.cg-price-teaser {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 12px 14px;
  background: var(--bg-soft);
  border: 1px dashed var(--border-color);
  border-radius: 6px;
  margin: 12px 0 8px;
  transition: all 0.3s ease;
}

.cg-pricing-card.featured .cg-price-teaser {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.25);
}

.cg-price-teaser-badge {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0070ad;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.cg-pricing-card.featured .cg-price-teaser-badge {
  color: #8ce2ff;
}

.cg-price-teaser-desc {
  font-size: 0.81rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.cg-pricing-card.featured .cg-price-teaser-desc {
  color: #dcebf7;
}

.cg-pricing-card.is-expanded .cg-price-teaser {
  display: none;
}

.cg-price-details-drawer {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  visibility: hidden;
  transition: grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.32s ease,
              visibility 0.45s ease;
}

.cg-price-details-drawer.is-open {
  grid-template-rows: 1fr;
  opacity: 1;
  visibility: visible;
}

.cg-price-details-inner {
  min-height: 0;
  overflow: hidden;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateY(-10px);
}

.cg-price-details-drawer.is-open .cg-price-details-inner {
  transform: translateY(0);
}

.cg-price-details-box {
  animation: cg-fade-in 0.25s ease-out;
}

@keyframes cg-fade-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cg-price-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.cg-price-all-btn:hover {
  color: #0070ad;
  border-color: #0070ad;
  background: var(--surface);
}

[data-theme='dark'] .cg-price-all-btn:hover {
  color: #12abdb;
  border-color: #12abdb;
}

/* Contact & Footer */
.cg-contact-grid {
  display: grid;
  grid-template-columns: minmax(290px, 0.9fr) minmax(320px, 1.15fr);
  gap: 28px;
}

@media (max-width: 880px) {
  .cg-contact-grid {
    grid-template-columns: 1fr;
  }
}

.cg-input {
  width: 100%;
  background: var(--bg-soft);
  border: 1.5px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-primary);
  padding: 12px 14px;
  font-family: inherit;
  font-size: 0.92rem;
}

.cg-input:focus {
  outline: none;
  border-color: #0070ad;
  box-shadow: 0 0 0 3px rgba(0, 112, 173, 0.15);
}

.cg-footer {
  background: var(--bg-surface);
  border-top: 3px solid #0070ad;
  padding: 48px 0 0;
}

.cg-footer-bottom {
  background: #15011d;
  color: #cbd5e1;
  padding: 18px 24px;
  margin-top: 36px;
  border-radius: 6px 6px 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.85rem;
}

/* LogoLoop Component CSS */
.logoloop {
  --logoloop-gap: 32px;
  --logoloop-logoHeight: 28px;
  --logoloop-pad: 0px;
  position: relative;
  overflow: hidden;
  overflow: clip;
  padding-top: var(--logoloop-pad);
  padding-bottom: var(--logoloop-pad);
  -webkit-tap-highlight-color: transparent;
  color: #272936;
}

[data-theme='dark'] .logoloop {
  color: #e2e8f0;
}

.logoloop--vertical {
  display: inline-block;
  height: 100%;
  padding: 0 var(--logoloop-pad);
}

.logoloop[data-draggable] {
  cursor: grab;
  touch-action: pan-y pinch-zoom;
}

.logoloop--vertical[data-draggable] {
  touch-action: pan-x pinch-zoom;
}

.logoloop[data-dragging],
.logoloop[data-dragging] * {
  cursor: grabbing;
}

.logoloop__track {
  position: relative;
  z-index: 0;
  display: flex;
  width: max-content;
  will-change: transform;
  -webkit-user-select: none;
  user-select: none;
}

.logoloop--vertical .logoloop__track {
  flex-direction: column;
  width: 100%;
  height: max-content;
}

.logoloop__list {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.logoloop--vertical .logoloop__list {
  flex-direction: column;
}

.logoloop__item {
  position: relative;
  flex: 0 0 auto;
  margin-right: var(--logoloop-gap);
  font-size: var(--logoloop-logoHeight);
  line-height: 1;
}

.logoloop--vertical .logoloop__item {
  margin-right: 0;
  margin-bottom: var(--logoloop-gap);
}

.logoloop[data-intro] .logoloop__item {
  opacity: 0;
}

.logoloop__content {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--logoloop-logoHeight) * 0.34);
  padding: 8px 14px;
  border-radius: 6px;
  color: inherit;
  text-decoration: none;
  border: 1px solid transparent;
  transition:
    opacity 0.35s ease,
    filter 0.35s ease,
    color 0.35s ease,
    background-color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.logoloop__content:hover {
  background-color: rgba(0, 112, 173, 0.06);
  border-color: rgba(0, 112, 173, 0.25);
  box-shadow: 0 4px 14px rgba(0, 112, 173, 0.08);
}

[data-theme='dark'] .logoloop__content:hover {
  background-color: rgba(18, 171, 219, 0.08);
  border-color: rgba(18, 171, 219, 0.3);
  box-shadow: 0 4px 14px rgba(18, 171, 219, 0.12);
}

.logoloop[data-labels='below'] .logoloop__content {
  flex-direction: column;
  gap: calc(var(--logoloop-logoHeight) * 0.22);
}

.logoloop__content:focus-visible {
  outline: 2px solid #0070ad;
  outline-offset: 2px;
}

.logoloop__node {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.logoloop__node svg {
  width: var(--logoloop-logoHeight);
  height: var(--logoloop-logoHeight);
  display: block;
}

.logoloop__item img {
  display: block;
  width: auto;
  height: var(--logoloop-logoHeight);
  object-fit: contain;
  -webkit-user-drag: none;
  pointer-events: none;
}

.logoloop__node,
.logoloop__item img {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logoloop--scale-hover .logoloop__item:hover img,
.logoloop--scale-hover .logoloop__item:hover .logoloop__node {
  transform: scale(1.2);
}

.logoloop__label {
  font-size: max(13px, calc(var(--logoloop-logoHeight) * 0.44));
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.logoloop[data-labels='below'] .logoloop__label {
  font-size: max(11px, calc(var(--logoloop-logoHeight) * 0.28));
  font-weight: 600;
  letter-spacing: 0;
  opacity: 0.78;
}

.logoloop__tip {
  position: absolute;
  top: 100%;
  left: 50%;
  margin-top: calc(var(--logoloop-logoHeight) * 0.2);
  padding: 4px 10px;
  border-radius: 4px;
  background: #0d2b4e;
  color: #ffffff;
  font-size: max(11px, calc(var(--logoloop-logoHeight) * 0.28));
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  opacity: 0;
  translate: -50% 4px;
  pointer-events: none;
  transition:
    opacity 0.25s ease,
    translate 0.25s ease;
}

.logoloop--vertical .logoloop__tip {
  top: 50%;
  left: 100%;
  margin-top: 0;
  margin-left: calc(var(--logoloop-logoHeight) * 0.25);
  translate: 4px -50%;
}

.logoloop__item:hover .logoloop__tip,
.logoloop__item:focus-within .logoloop__tip,
.logoloop__item[data-active] .logoloop__tip {
  opacity: 0.92;
  translate: -50% 0;
}

.logoloop--vertical .logoloop__item:hover .logoloop__tip,
.logoloop--vertical .logoloop__item:focus-within .logoloop__tip,
.logoloop--vertical .logoloop__item[data-active] .logoloop__tip {
  translate: 0 -50%;
}

.logoloop[data-muted] .logoloop__content {
  filter: grayscale(var(--logoloop-gray, 1));
  opacity: var(--logoloop-dim, 0.5);
}

.logoloop[data-muted] .logoloop__item:hover .logoloop__content,
.logoloop[data-muted] .logoloop__item:focus-within .logoloop__content,
.logoloop[data-muted] .logoloop__item[data-active] .logoloop__content {
  filter: none;
  opacity: 1;
}

.logoloop__item[data-color]:hover .logoloop__content,
.logoloop__item[data-color]:focus-within .logoloop__content,
.logoloop__item[data-color][data-active] .logoloop__content {
  color: var(--logoloop-item-color);
  background-color: rgba(0, 112, 173, 0.06);
}

.logoloop:not([data-muted]) .logoloop__item:not([data-color]) a.logoloop__content:hover {
  opacity: 0.85;
}

@media (prefers-reduced-motion: reduce) {
  .logoloop__content,
  .logoloop__node,
  .logoloop__item img,
  .logoloop__tip {
    transition: none;
  }
}

/* ==========================================================================
   Universal Cursor Spotlight & Interactive Hover Effects
   ========================================================================== */
.cg-brand-mark,
.cg-brand-text,
.cg-theme-btn,
.cg-eyebrow-chip,
.cg-open-pill,
.cg-fig-badge,
.cg-fig-stage,
.cg-fig-frame img,
.cg-fig-card,
.cg-about-box,
.cg-btn-primary,
.cg-btn-outline,
.cg-btn-primary svg,
.cg-btn-outline svg,
.cg-arrow-btn,
.cg-arrow-btn svg,
.cg-badge,
.cg-mode-btn,
.cg-loop-stage,
.cg-service-card,
.cg-card,
.cg-pricing-card,
.cg-featured-split,
.cg-svp-banner,
.cg-svp-feature,
.cg-metric-box,
.cg-tech-pill,
.cg-price-list li,
.cg-discount-pill,
.cg-input,
.cg-hero-bar-inner span,
.cg-footer a {
  transition:
    transform 0.26s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.26s ease,
    border-color 0.26s ease,
    background-color 0.26s ease,
    color 0.22s ease,
    opacity 0.22s ease;
}

.cg-card,
.cg-service-card,
.cg-pricing-card,
.cg-svp-banner,
.cg-svp-feature,
.cg-featured-split,
.cg-loop-stage,
.cg-fig-stage,
.cg-about-box,
.cg-metric-box,
.cg-role-card {
  position: relative;
}

.cg-card::after,
.cg-service-card::after,
.cg-pricing-card::after,
.cg-svp-banner::after,
.cg-svp-feature::after,
.cg-featured-split::after,
.cg-loop-stage::after,
.cg-fig-stage::after,
.cg-about-box::after,
.cg-metric-box::after,
.cg-role-card::after,
.cg-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.26s ease;
  background: radial-gradient(
    280px circle at var(--mx, 50%) var(--my, 50%),
    rgba(18, 171, 219, 0.16),
    transparent 72%
  );
  z-index: 1;
}

.cg-hero::after {
  background: radial-gradient(
    480px circle at var(--mx, 50%) var(--my, 50%),
    rgba(18, 171, 219, 0.2),
    transparent 70%
  );
}

.cg-service-card.is-featured::after,
.cg-pricing-card.featured::after,
.cg-svp-banner::after,
.cg-svp-feature::after,
.cg-fig-stage::after,
.cg-about-box::after,
.cg-metric-box::after {
  background: radial-gradient(
    300px circle at var(--mx, 50%) var(--my, 50%),
    rgba(140, 226, 255, 0.22),
    transparent 70%
  );
}

[data-spotlight-active='true']::after {
  opacity: 1;
}

@media (hover: hover) {
  .cg-brand:hover .cg-brand-mark {
    transform: translateY(-1px) rotate(-6deg) scale(1.07);
    box-shadow: 0 8px 20px rgba(18, 171, 219, 0.42);
  }

  .cg-brand:hover .cg-brand-text {
    color: #0070ad;
  }

  [data-theme='dark'] .cg-brand:hover .cg-brand-text {
    color: #12abdb;
  }

  .cg-nav-link:hover {
    transform: translateY(-1px);
  }

  .cg-theme-btn:hover {
    transform: rotate(15deg) scale(1.08);
    box-shadow: 0 0 0 4px rgba(18, 171, 219, 0.18);
  }

  .cg-eyebrow-chip:hover,
  .cg-fig-badge:hover {
    transform: translateY(-2px);
    border-color: #12abdb;
    box-shadow: 0 8px 18px rgba(7, 25, 46, 0.28);
  }

  .cg-open-pill:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 8px 20px rgba(18, 171, 219, 0.45);
  }

  .cg-role-card:hover {
    transform: translateY(-4px) scale(1.015);
    border-color: #12abdb;
    box-shadow: 0 18px 40px rgba(7, 25, 46, 0.45), 0 0 0 2px rgba(18, 171, 219, 0.35);
  }

  .cg-about-box:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(140, 226, 255, 0.42);
  }

  .cg-btn-primary:hover {
    transform: translateY(-2px) scale(1.025);
    box-shadow: 0 12px 26px rgba(7, 25, 46, 0.32), 0 0 0 3px rgba(18, 171, 219, 0.25);
  }

  .cg-btn-outline:hover {
    transform: translateY(-2px) scale(1.02);
    border-color: #8ce2ff;
    box-shadow: 0 10px 22px rgba(7, 25, 46, 0.22);
  }

  .cg-btn-primary:hover svg,
  .cg-btn-outline:hover svg {
    transform: translateX(4px);
  }

  .cg-fig-stage:hover {
    transform: translateY(-5px);
    border-color: rgba(140, 226, 255, 0.65);
    box-shadow: 0 30px 64px rgba(5, 16, 30, 0.58);
  }

  .cg-fig-stage:hover .cg-fig-frame img {
    transform: scale(1.045);
  }

  .cg-fig-card:hover {
    background: #ebf5fb;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(18, 171, 219, 0.28);
  }

  .cg-hero-bar-inner span:hover {
    color: #ffffff;
    transform: translateY(-1px);
  }

  .cg-badge:hover {
    transform: translateY(-1px);
    border-color: #0070ad;
    box-shadow: 0 4px 12px rgba(0, 112, 173, 0.14);
  }

  .cg-mode-btn:not(.active):hover {
    background: rgba(0, 112, 173, 0.08);
    color: #0070ad;
    transform: translateY(-1px);
  }

  [data-theme='dark'] .cg-mode-btn:not(.active):hover {
    background: rgba(18, 171, 219, 0.14);
    color: #8ce2ff;
  }

  .cg-loop-stage:hover {
    border-top-color: #12abdb;
    box-shadow: 0 16px 36px rgba(0, 112, 173, 0.14);
  }

  .logoloop__item:hover .logoloop__content {
    box-shadow: 0 8px 20px rgba(0, 112, 173, 0.14);
  }

  .cg-svp-banner:hover {
    box-shadow: 0 22px 50px rgba(0, 112, 173, 0.24);
  }

  .cg-svp-feature:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.15);
    border-color: #12abdb;
  }

  .cg-service-card:hover,
  .cg-card:hover,
  .cg-pricing-card:hover {
    transform: translateY(-6px);
    border-color: rgba(18, 171, 219, 0.6);
    box-shadow: 0 20px 42px rgba(13, 43, 78, 0.14);
  }

  [data-theme='dark'] .cg-service-card:hover,
  [data-theme='dark'] .cg-card:hover,
  [data-theme='dark'] .cg-pricing-card:hover {
    box-shadow: 0 20px 44px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(18, 171, 219, 0.45);
  }

  .cg-service-card:hover .cg-tech-pill {
    border-color: #12abdb;
    transform: translateY(-2px);
  }

  .cg-featured-split:hover {
    transform: translateY(-4px);
    border-color: #12abdb;
    box-shadow: 0 22px 48px rgba(0, 112, 173, 0.18);
  }

  .cg-metric-box:hover {
    transform: translateY(-3px) scale(1.03);
    background: rgba(255, 255, 255, 0.18);
    border-color: #8ce2ff;
  }

  .cg-arrow-btn:hover {
    color: #12abdb;
    transform: translateX(2px);
  }

  .cg-arrow-btn:hover svg {
    transform: translateX(4px);
  }

  .cg-pricing-card:hover .cg-discount-pill {
    transform: scale(1.05);
  }

  .cg-price-list li:hover {
    transform: translateX(4px);
    color: #0070ad;
  }

  .cg-pricing-card.featured .cg-price-list li:hover {
    color: #ffffff;
  }

  .cg-input:hover {
    border-color: #12abdb;
    background: var(--card-bg);
  }

  .cg-footer a {
    display: inline-block;
  }

  .cg-footer a:hover {
    color: #0070ad !important;
    transform: translateX(3px);
  }

  [data-theme='dark'] .cg-footer a:hover {
    color: #12abdb !important;
  }
}

/* Interactive Trailing Cursor Ring & Ambient Glow */
.cg-cursor-aura,
.cg-cursor-ring,
.cg-cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  will-change: transform, opacity;
}

.cg-cursor-aura {
  width: 240px;
  height: 240px;
  z-index: 9996;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(18, 171, 219, 0.15) 0%, rgba(0, 112, 173, 0.05) 46%, transparent 72%);
}

.cg-cursor-ring {
  width: 34px;
  height: 34px;
  z-index: 9998;
}

.cg-cursor-ring::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1.5px solid rgba(18, 171, 219, 0.75);
  background: rgba(18, 171, 219, 0.04);
  box-shadow: 0 0 18px rgba(18, 171, 219, 0.25);
  transition:
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.cg-cursor-ring[data-state='action']::after {
  transform: scale(1.55);
  border-color: #12abdb;
  background: rgba(18, 171, 219, 0.13);
  box-shadow: 0 0 26px rgba(18, 171, 219, 0.42);
}

.cg-cursor-ring[data-state='card']::after {
  transform: scale(1.85);
  border-color: rgba(0, 112, 173, 0.52);
  background: rgba(0, 112, 173, 0.05);
}

.cg-cursor-ring[data-state='input']::after {
  transform: scale(0.65);
  border-color: #0070ad;
}

.cg-cursor-ring[data-pressed='true']::after {
  transform: scale(0.85);
}

.cg-cursor-dot {
  width: 6px;
  height: 6px;
  z-index: 9999;
}

.cg-cursor-dot::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #12abdb;
  box-shadow: 0 0 8px rgba(18, 171, 219, 0.85);
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.cg-cursor-dot[data-state='input']::after {
  opacity: 0;
}

.cg-cursor-dot[data-pressed='true']::after {
  transform: scale(1.7);
}

.cg-cursor-aura[data-visible='true'],
.cg-cursor-ring[data-visible='true'],
.cg-cursor-dot[data-visible='true'] {
  opacity: 1;
}

/* React Bits StarBorder Component CSS */
.star-border {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0.78rem 1.5rem;
  border: 0;
  border-radius: var(--star-border-radius);
  background: var(--star-border-surface);
  color: var(--star-border-text);
  font: inherit;
  font-weight: 700;
  font-size: 0.92rem;
  line-height: 1.25;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 8px 22px rgba(7, 25, 46, 0.2);
  transition:
    transform 0.24s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.24s ease,
    opacity 0.22s ease;
}

.star-border::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  box-shadow: inset 0 0 0 var(--star-border-thickness) var(--star-border-track);
  pointer-events: none;
}

.star-border__light {
  position: absolute;
  top: -48px;
  left: -48px;
  z-index: -1;
  width: calc(100% + 96px);
  height: calc(100% + 96px);
  pointer-events: none;
}

button.star-border,
a.star-border {
  cursor: pointer;
}

.star-border svg {
  transition: transform 0.22s ease;
}

@media (hover: hover) {
  .star-border:hover {
    transform: translateY(-2px) scale(1.025);
    box-shadow: 0 12px 28px rgba(0, 112, 173, 0.28), 0 0 0 2px rgba(18, 171, 219, 0.26);
  }

  .star-border:hover svg {
    transform: translateX(4px);
  }
}

.star-border:focus-visible {
  outline: 2px solid var(--star-border-track);
  outline-offset: 3px;
}

.star-border:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

a,
button,
[role='tab'] {
  cursor: pointer;
}

@media (hover: none), (pointer: coarse) {
  .cg-cursor-aura,
  .cg-cursor-ring,
  .cg-cursor-dot,
  .cg-card::after,
  .cg-service-card::after,
  .cg-pricing-card::after,
  .cg-svp-banner::after,
  .cg-svp-feature::after,
  .cg-featured-split::after,
  .cg-loop-stage::after,
  .cg-fig-stage::after,
  .cg-about-box::after,
  .cg-metric-box::after,
  .cg-role-card::after,
  .cg-hero::after {
    display: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  html,
  body {
    scroll-behavior: auto;
  }

  .cg-cursor-aura,
  .cg-cursor-ring,
  .cg-cursor-dot,
  .cg-card::after,
  .cg-service-card::after,
  .cg-pricing-card::after,
  .cg-svp-banner::after,
  .cg-svp-feature::after,
  .cg-featured-split::after,
  .cg-loop-stage::after,
  .cg-fig-stage::after,
  .cg-about-box::after,
  .cg-metric-box::after,
  .cg-role-card::after,
  .cg-hero::after {
    display: none !important;
  }

  * {
    transition: none !important;
  }
}
`;

/* ==========================================================================
   2. Tech Stack Logos
   ========================================================================== */
const TECH_LOGOS = [
  {
    title: 'HTML5',
    href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    hoverColor: '#E34F26',
    node: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 3l1.5 16.5L12 21.5l6.5-2L20 3H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M16.5 7.5H8l.4 4h7.3l-.5 4.8-3.2 1-3.2-1-.2-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'CSS3',
    href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    hoverColor: '#1572B6',
    node: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 3l1.5 16.5L12 21.5l6.5-2L20 3H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M7.8 8h8.4l-.6 4.5-3.6 1.2-3.6-1.2M8.2 14.5l.2 1.8 3.6 1.1 3.6-1.1.3-2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'JavaScript',
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    hoverColor: '#D97706',
    node: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10.5 11v4.5a2 2 0 0 1-2 2h-.8M16.8 11.4c-.6-.4-2.2-.5-2.2.8 0 1.4 2.4 1.3 2.4 3.1 0 1.5-2.1 1.7-3 .9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: 'React',
    href: 'https://react.dev',
    hoverColor: '#0097C7',
    node: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="2.1" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4.1" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4.1" stroke="currentColor" strokeWidth="1.6" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.1" stroke="currentColor" strokeWidth="1.6" transform="rotate(120 12 12)" />
      </svg>
    )
  },
  {
    title: 'Vue.js',
    href: 'https://vuejs.org',
    hoverColor: '#10B981',
    node: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2.5 4.5h4.2L12 13.7l5.3-9.2h4.2L12 21 2.5 4.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M6.8 4.5L12 13.5l5.2-9" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'Java',
    href: 'https://www.java.com',
    hoverColor: '#EA580C',
    node: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 12h9v4.5a4.5 4.5 0 0 1-9 0V12z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M15 13h2a2 2 0 0 1 0 4h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 4.5c0 1.4 1.5 1.8 1.5 3.2S9 9.5 9 9.5M12.5 4c0 1.4 1.5 1.8 1.5 3.2s-1.5 1.8-1.5 1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: 'Spring Boot',
    href: 'https://spring.io/projects/spring-boot',
    hoverColor: '#6DB33F',
    node: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2.5l8.2 4.7v9.6L12 21.5l-8.2-4.7V7.2L12 2.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 8.2v4M8.8 10a4 4 0 1 0 6.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: 'Supabase',
    href: 'https://supabase.com',
    hoverColor: '#16A34A',
    node: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13.2 2.5L4.5 13.8h6.7l-.4 7.7 8.7-11.3h-6.7l.4-7.7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'SQL',
    href: 'https://www.postgresql.org',
    hoverColor: '#2563EB',
    node: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7.5" ry="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.5 6v12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
    hoverColor: '#0EA5E9',
    node: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.12 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.48 6 12 6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7 12.5c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.12 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35-.98-1-2.12-2.15-4.6-2.15z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'Node.js',
    href: 'https://nodejs.org',
    hoverColor: '#16A34A',
    node: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2.5l8.2 4.7v9.6L12 21.5l-8.2-4.7V7.2L12 2.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 14.8V9.2l6 5.6V9.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'VS Code',
    href: 'https://code.visualstudio.com',
    hoverColor: '#007ACC',
    node: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17.5 3L7 12.6 3.5 9.8 2 10.6v2.8l1.5.8L7 11.4 17.5 21l4.5-2.1V5.1L17.5 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M17.5 8.5v7L12.5 12l5-3.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'GitHub',
    href: 'https://github.com/belintan07',
    hoverColor: '#0070AD',
    node: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.86 8.38 6.84 9.74.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.9-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.34 1.11 2.91.85.1-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.4-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.9-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.82-4.57 5.07.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.48A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"
          fill="currentColor"
        />
      </svg>
    )
  }
];

/* ==========================================================================
   3. React Bits <LogoLoop /> Engine & Component
   ========================================================================== */
const getScrollBehavior = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

const parseViewFromLocation = () => {
  if (typeof window === 'undefined') return 'home';
  const params = new URLSearchParams(window.location.search);
  const v = params.get('view');
  if (v === 'pricing' || v === 'templates') return v;
  return 'home';
};

const buildViewUrl = (page) => {
  if (typeof window === 'undefined') return page === 'home' ? '/' : `/?view=${page}`;
  const url = new URL(window.location.href);
  url.hash = '';
  if (page === 'pricing' || page === 'templates') {
    url.searchParams.set('view', page);
  } else {
    url.searchParams.delete('view');
  }
  return url.pathname + url.search;
};

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const SMOOTH_TAU = 0.25;
const GLIDE_TAU = 0.8;
const DRAG_THRESHOLD = 6;
const MAX_FLING = 4000;
const INTRO_TIME = 0.7;
const INTRO_STAGGER = 0.45;
const HALF_SQRT_PI = Math.sqrt(Math.PI) / 2;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const toCssLength = (value) => (typeof value === 'number' ? `${value}px` : value ?? undefined);

const erf = (x) => {
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
    t *
    Math.exp(-a * a);
  return x < 0 ? -y : y;
};

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const smootherstep = (t) => t * t * t * (t * (t * 6 - 15) + 10);

const fadeMask = (size, vertical) => {
  const span = clamp(size, 0, 0.5) * 100;
  if (span <= 0) return undefined;
  const stops = [];
  for (let i = 0; i <= 12; i++) {
    stops.push(`rgba(0,0,0,${smootherstep(i / 12).toFixed(4)}) ${((span * i) / 12).toFixed(3)}%`);
  }
  for (let i = 12; i >= 0; i--) {
    stops.push(`rgba(0,0,0,${smootherstep(i / 12).toFixed(4)}) ${(100 - (span * i) / 12).toFixed(3)}%`);
  }
  return `linear-gradient(${vertical ? 'to bottom' : 'to right'}, ${stops.join(', ')})`;
};

const rotationMatrix = (degX, degY) => {
  const a = (degX * Math.PI) / 180;
  const b = (degY * Math.PI) / 180;
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  const cb = Math.cos(b);
  const sb = Math.sin(b);
  return [cb, 0, sb, sa * sb, ca, -sa * cb, -ca * sb, sa, ca * cb];
};

const unproject = (m, depth, sx, sy) => {
  const den = m[8] * depth - m[2] * sx - m[5] * sy;
  if (den <= 1e-6) return null;
  const t = (m[8] * depth) / den;
  if (t <= 0) return null;
  const qx = t * sx;
  const qy = t * sy;
  const qz = depth * (1 - t);
  return [m[0] * qx + m[3] * qy + m[6] * qz, m[1] * qx + m[4] * qy + m[7] * qz];
};

const project = (m, depth, px, py) => {
  const k = depth / (depth - (m[6] * px + m[7] * py));
  return [(m[0] * px + m[1] * py) * k, (m[3] * px + m[4] * py) * k];
};

const createEngine = (root, track, config, setLayout) => {
  const query = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  const st = {
    offset: 0,
    velocity: 0,
    period: 0,
    length: 0,
    box: [0, 0],
    items: [],
    snaps: [],
    pitch: 0,
    crossMax: 0,
    sizeMax: 0,
    tipMax: 0,
    geo: null,
    layout: { copies: 2, primary: 0 },
    hovered: false,
    focused: false,
    pointer: null,
    pointerInside: false,
    mag: 0,
    magU: 0,
    magReady: false,
    drag: null,
    glide: false,
    suppressUntil: 0,
    pressedAt: -1e9,
    move: null,
    hold: 0,
    seek: null,
    scrollVel: 0,
    scrollY: window.scrollY,
    scrollT: 0,
    visible: typeof IntersectionObserver === 'undefined',
    introStart: -1,
    introDone: !config.current.intro,
    itemMode: false,
    active: null,
    raf: 0,
    last: 0,
    reduced: !!query?.matches,
    destroyed: false
  };

  const collect = () => {
    const items = [];
    Array.from(track.children).forEach((list, copy) => {
      Array.from(list.children).forEach((el, index) => {
        items.push({
          el,
          copy,
          index,
          content: el.children[0] || null,
          tip: el.children[1] || null,
          center: 0,
          size: 0,
          cross: 0,
          t: '',
          o: '',
          v: '',
          pe: '',
          z: '',
          s: '',
          p: ''
        });
      });
    });
    st.items = items;
    st.active = null;
  };

  const clearItems = () => {
    for (const it of st.items) {
      it.el.style.transform = '';
      it.el.style.opacity = '';
      it.el.style.visibility = '';
      it.el.style.pointerEvents = '';
      it.el.style.zIndex = '';
      if (it.content) it.content.style.transform = '';
      if (it.tip) it.tip.style.transform = '';
      it.t = it.o = it.v = it.pe = it.z = it.s = it.p = '';
    }
  };

  const geometry = () => {
    const cfg = config.current;
    const L = st.length;
    const P = st.period;
    const hc = st.crossMax;
    const w = st.sizeMax;
    const bend = clamp(cfg.bend, -1, 1);
    const geo = {
      mode: cfg.layout,
      shift: 0,
      uMin: -L / 2 - w,
      uMax: L / 2 + w,
      lead: 0,
      focus: clamp(cfg.focus, 0, 1) * 0.9,
      focusSigma: Math.max(40, L * 0.18),
      magnify: clamp(cfg.magnify, 0, 1),
      magSigma: Math.max(hc * 1.4, st.pitch * 1.1),
      amp: 0,
      k: 0,
      R: 0,
      sign: 1,
      limit: 0,
      C: 0,
      alpha: 0,
      depth: 0,
      pf: 1,
      tilted: false,
      tiltX: 0,
      tiltY: 0,
      m: [1, 0, 0, 0, 1, 0, 0, 0, 1],
      persp: 0
    };
    let pad = cfg.scaleOnHover ? hc * 0.1 : 0;
    const lens = (1 + geo.focus) * (1 + geo.magnify) - 1;
    if (geo.mode === 'wave') {
      geo.amp = bend * (hc * 0.5 + L * 0.025);
      geo.k = (2 * Math.PI) / Math.max(1, L / 1.25);
      pad += Math.abs(geo.amp) + (lens * hc) / 2 + hc * 0.08;
    } else if (geo.mode === 'arc' && Math.abs(bend) > 0.005) {
      const edge = Math.abs(bend) * (Math.PI / 4);
      const R = L / 2 / Math.sin(edge);
      const sag = R * (1 - Math.cos(edge));
      geo.R = R;
      geo.sign = Math.sign(bend);
      geo.shift = sag / 2;
      geo.limit = Math.PI * 0.6;
      const reach = R * Math.min(Math.PI / 2, Math.asin(Math.min(1, (L / 2 + w) / R))) + w;
      geo.uMin = -reach;
      geo.uMax = reach;
      pad += sag / 2 + (w / 2) * Math.sin(edge) + (lens * hc) / 2;
    } else if (geo.mode === 'orbit') {
      const R = Math.max(40, L * 0.43 - w * 0.2);
      const k = Math.max(1, Math.round((2 * Math.PI * R) / P));
      const alpha = Math.sign(bend) * Math.atan2(Math.abs(bend) * Math.max(hc * 2, R * 0.36), R);
      const depth = R * 5;
      const pf = depth / (depth - R * Math.cos(alpha));
      const pb = depth / (depth + R * Math.cos(alpha));
      const yf = R * Math.sin(alpha) * pf;
      const yb = -R * Math.sin(alpha) * pb;
      const grow = (1 + lens) * (cfg.scaleOnHover ? 1.2 : 1);
      const lo = Math.min(yf - (hc * pf * grow) / 2, yb - (hc * pb) / 2);
      const hi = Math.max(yf + (hc * pf * grow) / 2, yb + (hc * pb) / 2);
      geo.R = R;
      geo.C = k * P;
      geo.alpha = alpha;
      geo.depth = depth;
      geo.pf = pf;
      geo.shift = (lo + hi) / 2;
      geo.uMin = -geo.C / 2;
      geo.uMax = geo.C / 2;
      pad = Math.max(0, (hi - lo) / 2 - hc / 2);
    } else {
      pad += (lens * hc) / 2;
    }
    if (cfg.labels === 'hover') pad += cfg.vertical ? st.tipMax : hc * 0.2 + Math.max(11, hc * 0.26) * 1.3;
    const tx = clamp(cfg.tiltX, -60, 60);
    const ty = clamp(cfg.tiltY, -60, 60);
    if (Math.abs(tx) > 0.01 || Math.abs(ty) > 0.01) {
      geo.tilted = true;
      geo.tiltX = tx;
      geo.tiltY = ty;
      geo.m = rotationMatrix(tx, ty);
      geo.persp = Math.max(L, 480) * 1.3;
      const edge = L / 2 + w;
      const along = (s) => {
        const p = cfg.vertical ? unproject(geo.m, geo.persp, 0, s) : unproject(geo.m, geo.persp, s, 0);
        if (!p) return Math.sign(s) * L * 4;
        return clamp(cfg.vertical ? p[1] : p[0], -L * 4, L * 4);
      };
      const a = along(-edge);
      const b = along(edge);
      geo.uMin = Math.min(geo.uMin, a, b) - w;
      geo.uMax = Math.max(geo.uMax, a, b) + w;
      const band = hc / 2 + pad;
      let reach = band;
      for (const u of [a, b, 0]) {
        for (const v of [-band, band]) {
          const q = cfg.vertical ? project(geo.m, geo.persp, v, u) : project(geo.m, geo.persp, u, v);
          reach = Math.max(reach, Math.abs(cfg.vertical ? q[0] : q[1]));
        }
      }
      pad = reach - hc / 2;
    }
    const extra = cfg.links ? 2 : 0;
    geo.lead = (Math.max(0, Math.ceil((-geo.uMin - L / 2) / P)) + extra) * P;
    const copies = Math.max(2, Math.ceil((geo.uMax + L / 2 + geo.lead) / P) + 2 + (extra ? 1 : 0));
    const primary = Math.min(copies - 1, Math.floor((geo.lead + L / 2) / P));
    st.geo = geo;
    root.style.setProperty('--logoloop-pad', `${Math.ceil(pad)}px`);
    root.style.perspective = geo.tilted ? `${geo.persp}px` : '';
    track.style.transformOrigin = geo.tilted ? (cfg.vertical ? `50% ${L / 2}px` : `${L / 2}px 50%`) : '';
    if (copies !== st.layout.copies || primary !== st.layout.primary) {
      st.layout = { copies, primary };
      setLayout(st.layout);
    }
  };

  const measure = () => {
    const cfg = config.current;
    const lists = track.children;
    if (!lists.length || !st.items.length) {
      st.period = 0;
      return;
    }
    if (cfg.vertical) {
      const parentHeight = root.parentElement?.clientHeight ?? 0;
      if (parentHeight > 0 && root.style.height !== `${Math.ceil(parentHeight)}px`) {
        root.style.height = `${Math.ceil(parentHeight)}px`;
      }
    } else if (root.style.height) {
      root.style.height = '';
    }
    track.style.transform = 'none';
    clearItems();
    const rootRect = root.getBoundingClientRect();
    const k = root.offsetWidth ? rootRect.width / root.offsetWidth || 1 : 1;
    const trackRect = track.getBoundingClientRect();
    const origin = cfg.vertical ? trackRect.top : trackRect.left;
    let crossMax = 0;
    let sizeMax = 0;
    let tipMax = 0;
    for (const it of st.items) {
      const r = it.el.getBoundingClientRect();
      it.center = ((cfg.vertical ? r.top + r.height / 2 : r.left + r.width / 2) - origin) / k;
      it.size = (cfg.vertical ? r.height : r.width) / k;
      it.cross = (cfg.vertical ? r.width : r.height) / k;
      crossMax = Math.max(crossMax, it.cross);
      sizeMax = Math.max(sizeMax, it.size);
      if (it.tip && it.copy === 0) tipMax = Math.max(tipMax, it.tip.offsetWidth);
    }
    const a = lists[0].getBoundingClientRect();
    const b = lists[1] ? lists[1].getBoundingClientRect() : null;
    st.period = (b ? (cfg.vertical ? b.top - a.top : b.left - a.left) : cfg.vertical ? a.height : a.width) / k;
    const cs = getComputedStyle(root);
    st.box = [root.offsetWidth, root.offsetHeight];
    st.length = cfg.vertical
      ? root.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
      : root.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    st.crossMax = crossMax;
    st.sizeMax = sizeMax;
    st.tipMax = tipMax + crossMax * 0.25;
    const first = st.items.filter((it) => it.copy === 0);
    st.pitch = first.length ? st.period / first.length : st.period;
    st.snaps = first.map((it) => it.center);
    st.itemMode = false;
    if (st.period <= 0) return;
    geometry();
  };

  const pointerU = () => {
    const geo = st.geo;
    if (!st.pointer || !geo) return null;
    const cfg = config.current;
    let sx = st.pointer[0] - st.box[0] / 2;
    let sy = st.pointer[1] - st.box[1] / 2;
    if (geo.tilted) {
      const p = unproject(geo.m, geo.persp, sx, sy);
      if (!p) return null;
      sx = p[0];
      sy = p[1];
    }
    const s = cfg.vertical ? sy : sx;
    if (geo.mode === 'arc' && geo.R) return geo.R * Math.asin(clamp(s / geo.R, -1, 1));
    if (geo.mode === 'orbit') return Math.asin(clamp(s / (geo.R * geo.pf), -1, 1));
    return s;
  };

  const snapTarget = (from, dir) => {
    const P = st.period;
    const base = st.length / 2 + (st.geo?.lead ?? 0);
    let best = null;
    for (const c of st.snaps) {
      const s = c - base;
      const candidate = dir > 0 ? s + P * Math.ceil((from + 0.5 - s) / P) : s + P * Math.floor((from - 0.5 - s) / P);
      if (best === null || (dir > 0 ? candidate < best : candidate > best)) best = candidate;
    }
    return best ?? from;
  };

  const nearestSnap = (value) => {
    const P = st.period;
    const base = st.length / 2 + (st.geo?.lead ?? 0);
    let best = value;
    let dist = Infinity;
    for (const c of st.snaps) {
      const s = c - base;
      const candidate = s + P * Math.round((value - s) / P);
      if (Math.abs(candidate - value) < dist) {
        dist = Math.abs(candidate - value);
        best = candidate;
      }
    }
    return best;
  };

  const startMove = (target, duration) => {
    st.move = { from: st.offset, delta: target - st.offset, t: 0, dur: duration };
  };

  const stepTiming = (speed) => {
    const cycle = st.pitch / Math.max(1, Math.abs(speed));
    const move = clamp(cycle * 0.55, 0.35, 0.9);
    return { move, hold: Math.max(0.35, cycle - move) };
  };

  const write = (it, key, prop, value, target) => {
    if (it[key] !== value) {
      it[key] = value;
      target.style[prop] = value;
    }
  };

  const render = (now) => {
    const cfg = config.current;
    const geo = st.geo;
    const L = st.length;
    const half = L / 2;
    const T = -st.offset - geo.lead;
    const lineT = cfg.vertical
      ? `translate3d(0px, ${T.toFixed(2)}px, 0px)`
      : `translate3d(${T.toFixed(2)}px, 0px, 0px)`;
    track.style.transform = geo.tilted ? `rotateX(${geo.tiltX}deg) rotateY(${geo.tiltY}deg) ${lineT}` : lineT;
    const introRunning = st.introStart >= 0;
    const elapsed = introRunning ? (now - st.introStart) / 1000 : 0;
    const lensFocus = geo.mode === 'orbit' ? clamp(cfg.focus, 0, 1) * 0.9 : geo.focus;
    const lensMag = geo.magnify * st.mag;
    const cursorActive = lensMag > 0 && st.mag > 0.5 && geo.mode !== 'orbit';
    const wantsActive = cfg.focus > 0 || cfg.step || cursorActive;
    const needItems = geo.mode !== 'line' || lensFocus > 0 || lensMag > 0.0005 || introRunning;
    if (!needItems && st.itemMode) clearItems();
    st.itemMode = needItems;
    if (!needItems && !wantsActive) {
      if (st.active) {
        st.active.el.removeAttribute('data-active');
        st.active = null;
      }
      return;
    }
    let best = null;
    let bestDist = Infinity;
    for (const it of st.items) {
      const u = T + it.center - half;
      let x = u;
      let y = 0;
      let rot = 0;
      let scale = 1;
      let opacity = 1;
      let z = '';
      let hidden = false;
      let dist = Math.abs(u);
      if (geo.mode === 'orbit') {
        if (u < -geo.C / 2 || u >= geo.C / 2) {
          hidden = true;
        } else {
          const th = (2 * Math.PI * u) / geo.C;
          const Z = geo.R * Math.cos(th);
          const p = geo.depth / (geo.depth - Z * Math.cos(geo.alpha));
          x = geo.R * Math.sin(th) * p;
          y = Z * Math.sin(geo.alpha) * p - geo.shift;
          scale = p;
          if (lensFocus > 0) scale *= 1 + lensFocus * Math.exp(-((th / 0.55) ** 2));
          if (lensMag > 0) {
            const span = (geo.magSigma * 2 * Math.PI) / geo.C;
            scale *= 1 + lensMag * Math.max(0, Math.cos(th)) * Math.exp(-(((th - st.magU) / span) ** 2));
          }
          const facing = (Math.cos(th) + 1) / 2;
          opacity = 0.25 + 0.75 * facing * facing;
          z = String(Math.round(facing * 1000));
          dist = Math.cos(th) > 0 ? Math.abs(th) * geo.R : Infinity;
        }
      } else {
        let w = u;
        if (lensFocus > 0) {
          const kf = w / geo.focusSigma;
          scale *= 1 + lensFocus * Math.exp(-kf * kf);
          opacity *= 1 - 0.45 * lensFocus * (1 - Math.exp(-((u / (geo.focusSigma * 1.8)) ** 2)));
          w += lensFocus * geo.focusSigma * HALF_SQRT_PI * erf(kf);
        }
        const near = Math.abs(w - st.magU);
        if (lensMag > 0) {
          const km = (w - st.magU) / geo.magSigma;
          scale *= 1 + lensMag * Math.exp(-km * km);
          w += lensMag * geo.magSigma * HALF_SQRT_PI * erf(km);
        }
        x = w;
        if (geo.mode === 'wave') {
          y = geo.amp * Math.sin(geo.k * w);
          rot = (Math.atan(geo.amp * geo.k * Math.cos(geo.k * w)) * 90) / Math.PI;
        } else if (geo.mode === 'arc' && geo.R) {
          const phi = w / geo.R;
          if (Math.abs(phi) > geo.limit) hidden = true;
          x = geo.R * Math.sin(phi);
          y = geo.sign * (geo.R * (1 - Math.cos(phi)) - geo.shift);
          rot = (geo.sign * phi * 180) / Math.PI;
        }
        dist = cursorActive ? near : Math.abs(x);
      }
      if (introRunning && !hidden) {
        const pos = clamp((x + half) / Math.max(1, L), 0, 1);
        const e = easeOut(clamp((elapsed - pos * INTRO_STAGGER) / INTRO_TIME, 0, 1));
        opacity *= e;
        y += (1 - e) * 14;
      }
      if (wantsActive && !hidden && dist < bestDist) {
        bestDist = dist;
        best = it;
      }
      if (!needItems) continue;
      const along = x - u;
      const t = hidden
        ? ''
        : `${cfg.vertical ? `translate3d(${y.toFixed(2)}px, ${along.toFixed(2)}px, 0px)` : `translate3d(${along.toFixed(2)}px, ${y.toFixed(2)}px, 0px)`}${rot ? ` rotate(${(cfg.vertical ? -rot : rot).toFixed(2)}deg)` : ''
        }`;
      write(it, 't', 'transform', t, it.el);
      write(it, 'o', 'opacity', hidden ? '0' : opacity > 0.999 ? '' : opacity.toFixed(3), it.el);
      const keepFocusable = it.copy === st.layout.primary;
      write(it, 'v', 'visibility', hidden && !keepFocusable ? 'hidden' : '', it.el);
      write(it, 'pe', 'pointerEvents', hidden ? 'none' : '', it.el);
      write(it, 'z', 'zIndex', z, it.el);
      if (it.content) {
        write(it, 's', 'transform', Math.abs(scale - 1) < 0.0005 ? '' : `scale(${scale.toFixed(4)})`, it.content);
      }
      if (it.tip) {
        const lift = ((scale - 1) * it.cross) / 2;
        write(
          it,
          'p',
          'transform',
          Math.abs(lift) < 0.05
            ? ''
            : cfg.vertical
              ? `translateX(${lift.toFixed(2)}px)`
              : `translateY(${lift.toFixed(2)}px)`,
          it.tip
        );
      }
    }
    const active = best && bestDist < Math.max(best.size, st.pitch) / 2 + 1 ? best : null;
    if (active !== st.active) {
      st.active?.el.removeAttribute('data-active');
      active?.el.setAttribute('data-active', '');
      st.active = active;
    }
  };

  const frame = (now) => {
    st.raf = 0;
    if (st.destroyed || !st.geo || st.period <= 0) return;
    const cfg = config.current;
    const dt = st.last ? clamp((now - st.last) / 1000, 0, 0.1) : 0;
    st.last = now;
    const P = st.period;
    let busy = false;
    if (st.introStart === -1 && !st.introDone && st.visible) {
      if (cfg.intro && !st.reduced) {
        st.introStart = now;
      } else {
        st.introDone = true;
      }
      root.removeAttribute('data-intro');
    }
    if (st.introStart >= 0) {
      if ((now - st.introStart) / 1000 >= INTRO_TIME + INTRO_STAGGER) {
        st.introStart = -2;
        st.introDone = true;
      } else {
        busy = true;
      }
    }
    const travel = Math.sign(cfg.speed) || 1;
    const paused = st.focused || (st.hovered && cfg.hoverValue !== undefined);
    const pausedSpeed = st.focused ? 0 : cfg.hoverValue ?? 0;
    let target = st.reduced ? 0 : paused ? pausedSpeed * travel * cfg.dirSign : cfg.speed * cfg.dirSign;
    if (cfg.scrollBoost > 0 && !st.reduced) {
      st.scrollVel *= Math.exp(-dt / 0.18);
      if (!st.focused) {
        if (Math.abs(st.scrollVel) > 1) busy = true;
        target += clamp(st.scrollVel * cfg.scrollBoost, -3000, 3000) * travel * cfg.dirSign;
      }
    }
    if (st.drag?.active) {
      busy = true;
    } else if (st.seek) {
      st.seek.t = Math.min(1, st.seek.t + dt / st.seek.dur);
      st.offset = st.seek.from + st.seek.delta * easeInOut(st.seek.t);
      st.velocity = 0;
      if (st.seek.t >= 1) st.seek = null;
      busy = true;
    } else if (st.move) {
      st.move.t = Math.min(1, st.move.t + dt / st.move.dur);
      st.offset = st.move.from + st.move.delta * easeInOut(st.move.t);
      st.velocity = 0;
      busy = true;
      if (st.move.t >= 1) {
        st.move = null;
        st.hold = stepTiming(paused ? pausedSpeed : cfg.speed).hold;
      }
    } else if (cfg.step && !st.reduced) {
      const speed = paused ? pausedSpeed : cfg.speed;
      st.velocity = 0;
      if (speed) {
        busy = true;
        st.hold -= dt;
        if (st.hold <= 0) {
          const dir = Math.sign(speed) * cfg.dirSign;
          startMove(snapTarget(st.offset, dir), stepTiming(speed).move);
        }
      }
    } else {
      const tau = st.glide ? GLIDE_TAU : SMOOTH_TAU;
      st.velocity += (target - st.velocity) * (1 - Math.exp(-dt / tau));
      if (st.glide && Math.abs(st.velocity - target) < 2) st.glide = false;
      if (Math.abs(st.velocity - target) < 0.01) st.velocity = target;
      st.offset += st.velocity * dt;
      if (st.velocity !== 0 || target !== 0) busy = true;
    }
    if (!st.focused && !st.seek && !st.drag?.active) {
      const wrapped = ((st.offset % P) + P) % P;
      if (st.move) st.move.from += wrapped - st.offset;
      st.offset = wrapped;
    }
    const wantMag = cfg.magnify > 0 && st.pointerInside && !st.reduced ? 1 : 0;
    if (st.mag !== wantMag) {
      st.mag += (wantMag - st.mag) * (1 - Math.exp(-dt / (wantMag ? 0.12 : 0.25)));
      if (Math.abs(wantMag - st.mag) < 0.002) st.mag = wantMag;
      busy = true;
    }
    const pu = st.mag > 0 ? pointerU() : null;
    if (pu !== null) {
      if (!st.magReady) {
        st.magU = pu;
        st.magReady = true;
      }
      const next = st.magU + (pu - st.magU) * (1 - Math.exp(-dt / 0.06));
      if (Math.abs(next - pu) > 0.05) busy = true;
      st.magU = Math.abs(next - pu) > 0.05 ? next : pu;
    } else if (st.mag === 0) {
      st.magReady = false;
    }
    render(now);
    if (busy && st.visible && !st.destroyed) st.raf = requestAnimationFrame(frame);
  };

  const wake = () => {
    if (st.raf || st.destroyed || !st.visible) return;
    st.last = 0;
    st.raf = requestAnimationFrame(frame);
  };

  const local = (e) => {
    const r = root.getBoundingClientRect();
    const k = root.offsetWidth ? r.width / root.offsetWidth || 1 : 1;
    return [(e.clientX - r.left) / k, (e.clientY - r.top) / k];
  };

  const dragScale = () => {
    const geo = st.geo;
    if (!geo) return 1;
    if (geo.mode === 'orbit') return geo.C / (2 * Math.PI * geo.R * geo.pf);
    const pu = pointerU();
    if (pu === null || geo.focus <= 0) return 1;
    const kf = pu / geo.focusSigma;
    return 1 / (1 + geo.focus * Math.exp(-kf * kf));
  };

  const onEnter = (e) => {
    st.hovered = true;
    if (e.pointerType !== 'touch') {
      st.pointerInside = true;
      st.pointer = local(e);
    }
    wake();
  };

  const onLeave = () => {
    st.hovered = false;
    st.pointerInside = false;
    wake();
  };

  const onDown = (e) => {
    if (st.drag || !config.current.draggable || (e.pointerType === 'mouse' && e.button !== 0)) return;
    st.pressedAt = performance.now();
    const [x, y] = local(e);
    if (e.pointerType !== 'touch') st.pointer = [x, y];
    st.drag = { id: e.pointerId, x, y, active: false, samples: [], scale: dragScale(), anchor: 0, offset: 0 };
  };

  const onMove = (e) => {
    const cfg = config.current;
    if (e.pointerType !== 'touch') {
      st.pointer = local(e);
      st.pointerInside = true;
    }
    const d = st.drag;
    if (d && e.pointerId === d.id) {
      const [x, y] = local(e);
      const along = cfg.vertical ? y - d.y : x - d.x;
      const across = cfg.vertical ? x - d.x : y - d.y;
      if (!d.active) {
        if (Math.abs(along) < DRAG_THRESHOLD) return wake();
        if (Math.abs(across) > Math.abs(along)) {
          st.drag = null;
          return wake();
        }
        d.active = true;
        d.anchor = along;
        d.offset = st.offset;
        st.move = null;
        st.seek = null;
        st.glide = false;
        st.velocity = 0;
        try {
          root.setPointerCapture(e.pointerId);
        } catch { }
        root.setAttribute('data-dragging', '');
      }
      const next = d.offset - (along - d.anchor) * d.scale;
      const P = st.period || 1;
      st.offset = ((next % P) + P) % P;
      d.offset += st.offset - next;
      const now = performance.now();
      d.samples.push([now, along]);
      while (d.samples.length > 2 && now - d.samples[0][0] > 100) d.samples.shift();
    }
    wake();
  };

  const endDrag = (e, cancelled) => {
    const d = st.drag;
    if (!d || e.pointerId !== d.id) return;
    st.drag = null;
    if (!d.active) return;
    root.removeAttribute('data-dragging');
    try {
      root.releasePointerCapture(e.pointerId);
    } catch { }
    const cfg = config.current;
    const now = performance.now();
    st.suppressUntil = now + 400;
    let v = 0;
    const s = d.samples;
    if (!cancelled && s.length > 1) {
      const [t0, a0] = s[0];
      const [t1, a1] = s[s.length - 1];
      if (t1 > t0 && now - t1 < 80) v = clamp((-(a1 - a0) / (t1 - t0)) * 1000 * d.scale, -MAX_FLING, MAX_FLING);
    }
    if (st.reduced) {
      st.velocity = 0;
      st.glide = false;
    } else if (cfg.step) {
      const target = nearestSnap(st.offset + v * 0.35);
      startMove(target, clamp(0.3 + Math.abs(target - st.offset) / 1800, 0.3, 0.8));
      st.velocity = 0;
    } else {
      st.velocity = v;
      st.glide = Math.abs(v) > 30;
    }
    wake();
  };

  const onUp = (e) => endDrag(e, false);
  const onCancel = (e) => endDrag(e, true);

  const onClick = (e) => {
    if (performance.now() < st.suppressUntil) {
      e.preventDefault();
      e.stopPropagation();
      st.suppressUntil = 0;
    }
  };

  const onDragStart = (e) => {
    if (config.current.draggable) e.preventDefault();
  };

  const onFocusIn = (e) => {
    const target = e.target;
    if (performance.now() - st.pressedAt < 800) return;
    st.focused = true;
    st.seek = null;
    st.move = null;
    const it = st.items.find((item) => item.el.contains(target));
    if (it && st.geo) {
      const u = -st.offset - st.geo.lead + it.center - st.length / 2;
      const comfortable = st.geo.mode === 'orbit' ? 1 : Math.max(0, st.length / 2 - it.size);
      if (Math.abs(u) > comfortable) {
        if (st.reduced) {
          const P = st.period || 1;
          st.offset = (((st.offset + u) % P) + P) % P;
          st.velocity = 0;
          st.glide = false;
        } else {
          st.seek = { from: st.offset, delta: u, t: 0, dur: clamp(0.35 + Math.abs(u) / 2000, 0.35, 0.8) };
        }
      }
    }
    wake();
  };

  const onFocusOut = (e) => {
    if (root.contains(e.relatedTarget)) return;
    st.focused = false;
    wake();
  };

  const onRootScroll = () => {
    if (root.scrollLeft || root.scrollTop) {
      root.scrollLeft = 0;
      root.scrollTop = 0;
    }
  };

  const onScroll = () => {
    const now = performance.now();
    const y = window.scrollY;
    if (st.scrollT && now > st.scrollT) {
      const v = ((y - st.scrollY) / (now - st.scrollT)) * 1000;
      st.scrollVel += (clamp(v, -6000, 6000) - st.scrollVel) * 0.5;
    }
    st.scrollY = y;
    st.scrollT = now;
    if (config.current.scrollBoost > 0) wake();
  };

  const onMotion = () => {
    st.reduced = !!query?.matches;
    if (st.reduced) {
      st.velocity = 0;
      st.glide = false;
      st.seek = null;
      st.move = null;
      st.scrollVel = 0;
      st.introStart = -2;
      st.introDone = true;
      st.mag = 0;
      root.removeAttribute('data-intro');
    }
    wake();
  };

  root.addEventListener('pointerenter', onEnter);
  root.addEventListener('pointerleave', onLeave);
  root.addEventListener('pointerdown', onDown);
  root.addEventListener('pointermove', onMove);
  root.addEventListener('pointerup', onUp);
  root.addEventListener('pointercancel', onCancel);
  root.addEventListener('lostpointercapture', onCancel);
  root.addEventListener('click', onClick, true);
  root.addEventListener('dragstart', onDragStart);
  root.addEventListener('focusin', onFocusIn);
  root.addEventListener('focusout', onFocusOut);
  root.addEventListener('scroll', onRootScroll);
  window.addEventListener('scroll', onScroll, { passive: true });
  query?.addEventListener?.('change', onMotion);

  let resizeObserver = null;
  const observed = new Set();
  const refresh = () => {
    collect();
    measure();
    if (resizeObserver) {
      const first = track.children[0];
      for (const el of [root, first]) {
        if (el && !observed.has(el)) {
          resizeObserver.observe(el);
          observed.add(el);
        }
      }
    }
    st.last = 0;
    if (st.raf) cancelAnimationFrame(st.raf);
    st.raf = 0;
    if (st.geo && st.period > 0) frame(performance.now());
  };

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      measure();
      if (st.geo && st.period > 0) render(performance.now());
      wake();
    });
  } else {
    window.addEventListener('resize', refresh);
  }

  let intersection = null;
  if (typeof IntersectionObserver !== 'undefined') {
    intersection = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        st.visible = entry.isIntersecting;
        if (st.visible) wake();
      },
      { threshold: 0.1 }
    );
    intersection.observe(root);
  }

  const onVisibility = () => {
    if (!document.hidden) wake();
  };
  document.addEventListener('visibilitychange', onVisibility);

  const destroy = () => {
    st.destroyed = true;
    if (st.raf) cancelAnimationFrame(st.raf);
    root.removeEventListener('pointerenter', onEnter);
    root.removeEventListener('pointerleave', onLeave);
    root.removeEventListener('pointerdown', onDown);
    root.removeEventListener('pointermove', onMove);
    root.removeEventListener('pointerup', onUp);
    root.removeEventListener('pointercancel', onCancel);
    root.removeEventListener('lostpointercapture', onCancel);
    root.removeEventListener('click', onClick, true);
    root.removeEventListener('dragstart', onDragStart);
    root.removeEventListener('focusin', onFocusIn);
    root.removeEventListener('focusout', onFocusOut);
    root.removeEventListener('scroll', onRootScroll);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', refresh);
    document.removeEventListener('visibilitychange', onVisibility);
    query?.removeEventListener?.('change', onMotion);
    resizeObserver?.disconnect();
    intersection?.disconnect();
  };

  return { refresh, wake, destroy, state: st };
};

const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = true,
    fadeOutWidth = 0.12,
    scaleOnHover = false,
    layout = 'line',
    bend = 0.5,
    focus = 0,
    magnify = 0,
    tiltX = 0,
    tiltY = 0,
    step = false,
    muted = 0,
    labels = 'none',
    draggable = true,
    scrollBoost = 0,
    intro = true,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style
  }) => {
    const rootRef = useRef(null);
    const trackRef = useRef(null);
    const engineRef = useRef(null);
    const [{ copies, primary }, setLayout] = useState({ copies: 3, primary: 1 });
    const [introPending] = useState(intro);

    const vertical = direction === 'up' || direction === 'down';
    const config = useRef(null);
    config.current = {
      speed,
      dirSign: (vertical ? direction === 'up' : direction !== 'right') ? 1 : -1,
      hoverValue: hoverSpeed !== undefined ? hoverSpeed : pauseOnHover === false ? undefined : 0,
      vertical,
      layout,
      bend,
      focus,
      magnify,
      tiltX,
      tiltY,
      step,
      draggable,
      scrollBoost,
      intro,
      scaleOnHover,
      labels,
      links: logos.some((item) => item.href)
    };

    useIsomorphicLayoutEffect(() => {
      const engine = createEngine(rootRef.current, trackRef.current, config, setLayout);
      engineRef.current = engine;
      return () => {
        engine.destroy();
        engineRef.current = null;
      };
    }, []);

    useIsomorphicLayoutEffect(() => {
      engineRef.current?.refresh();
    }, [copies, primary, logos, vertical, logoHeight, gap, labels, layout, bend, focus, magnify, tiltX, tiltY, scaleOnHover]);

    useEffect(() => {
      engineRef.current?.wake();
    });

    const lists = useMemo(
      () =>
        Array.from({ length: copies }, (_, copyIndex) => {
          const isPrimary = copyIndex === primary;
          return (
            <ul className="logoloop__list" key={copyIndex} role="list" aria-hidden={isPrimary ? undefined : true}>
              {logos.map((item, itemIndex) => {
                const key = `${copyIndex}-${itemIndex}`;
                const isNode = 'node' in item;
                const visual = renderItem ? (
                  renderItem(item, key)
                ) : isNode ? (
                  <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
                    {item.node}
                  </span>
                ) : (
                  <img
                    src={item.src}
                    srcSet={item.srcSet}
                    sizes={item.sizes}
                    width={item.width}
                    height={item.height}
                    alt={item.alt ?? ''}
                    title={item.title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                );
                const text = (labels === 'inline' || labels === 'below') && item.title ? item.title : null;
                const inner = (
                  <>
                    {visual}
                    {text && (
                      <span className="logoloop__label" aria-hidden={!isNode && !!item.alt}>
                        {text}
                      </span>
                    )}
                  </>
                );
                const name = isNode ? item.ariaLabel ?? item.title : item.alt ?? item.title;
                return (
                  <li
                    className="logoloop__item"
                    key={key}
                    role="listitem"
                    data-color={item.hoverColor ? '' : undefined}
                    style={item.hoverColor ? { '--logoloop-item-color': item.hoverColor } : undefined}
                  >
                    {item.href ? (
                      <a
                        className="logoloop__content"
                        href={item.href}
                        aria-label={name || 'logo link'}
                        target="_blank"
                        rel="noreferrer noopener"
                        draggable={false}
                        tabIndex={isPrimary ? undefined : -1}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="logoloop__content">{inner}</div>
                    )}
                    {labels === 'hover' && item.title && (
                      <span className="logoloop__tip" aria-hidden="true">
                        {item.title}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          );
        }),
      [copies, primary, logos, renderItem, labels]
    );

    const mask = fadeOut ? fadeMask(fadeOutWidth, vertical) : undefined;
    const amount = clamp(muted, 0, 1);

    const containerStyle = {
      width: vertical
        ? toCssLength(width) === '100%'
          ? undefined
          : toCssLength(width)
        : toCssLength(width) ?? '100%',
      '--logoloop-gap': `${gap}px`,
      '--logoloop-logoHeight': `${logoHeight}px`,
      ...(amount > 0 && {
        '--logoloop-gray': Math.min(1, amount * 2).toFixed(3),
        '--logoloop-dim': (1 - amount * 0.6).toFixed(3)
      }),
      ...(mask && { WebkitMaskImage: mask, maskImage: mask }),
      ...style
    };

    const rootClassName = [
      'logoloop',
      vertical ? 'logoloop--vertical' : 'logoloop--horizontal',
      scaleOnHover && 'logoloop--scale-hover',
      className
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={rootRef}
        className={rootClassName}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        data-intro={introPending ? '' : undefined}
        data-draggable={draggable ? '' : undefined}
        data-muted={amount > 0 ? '' : undefined}
        data-labels={labels !== 'none' ? labels : undefined}
      >
        <div className="logoloop__track" ref={trackRef}>
          {lists}
        </div>
      </div>
    );
  }
);
LogoLoop.displayName = 'LogoLoop';

/* ==========================================================================
   3b. React Bits <StarBorder /> Component
   ========================================================================== */
const SB_THEMES = {
  dark: {
    surface: '#0c0c0f',
    text: '#fafafa',
    track: 'rgba(255, 255, 255, 0.1)',
    light: '#ffffff'
  },
  light: {
    surface: '#ffffff',
    text: '#18181b',
    track: 'rgba(24, 24, 27, 0.12)',
    light: '#18181b'
  }
};

const SB_HOVERS = ['lap', 'brighten', 'reveal', 'none'];
const SB_BLEED = 48;
const SB_LAP = 0.9;
const SB_TAU = Math.PI * 2;
const SB_WHITE = [255, 255, 255];

const sbWrap = (value, total) => ((value % total) + total) % total;
const sbEase = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (2 - 2 * t) ** 3 / 2);
const sbMix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const sbRgba = (rgb, alpha) =>
  `rgba(${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])}, ${clamp(alpha, 0, 1).toFixed(3)})`;

let sbColorContext = null;

const sbToRgb = (color) => {
  sbColorContext = sbColorContext ?? document.createElement('canvas').getContext('2d');
  if (!sbColorContext) return SB_WHITE;
  sbColorContext.fillStyle = '#000000';
  sbColorContext.fillStyle = color;
  const value = String(sbColorContext.fillStyle);
  if (value.startsWith('#')) {
    const hex = parseInt(value.slice(1, 7), 16);
    return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
  }
  const parts = value.match(/[\d.]+/g)?.map(Number) ?? SB_WHITE;
  return [parts[0], parts[1], parts[2]];
};

const sbOutline = (width, height, radius) => {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  const arc = (Math.PI * r) / 2;
  const across = Math.max(0, width - 2 * r);
  const down = Math.max(0, height - 2 * r);
  const segments = [
    { length: across, x: r, y: 0, dx: 1, dy: 0, angle: null },
    { length: arc, x: width - r, y: r, dx: 0, dy: 0, angle: -Math.PI / 2 },
    { length: down, x: width, y: r, dx: 0, dy: 1, angle: null },
    { length: arc, x: width - r, y: height - r, dx: 0, dy: 0, angle: 0 },
    { length: across, x: width - r, y: height, dx: -1, dy: 0, angle: null },
    { length: arc, x: r, y: height - r, dx: 0, dy: 0, angle: Math.PI / 2 },
    { length: down, x: 0, y: height - r, dx: 0, dy: -1, angle: null },
    { length: arc, x: r, y: r, dx: 0, dy: 0, angle: Math.PI }
  ];
  return {
    r,
    segments,
    total: Math.max(
      1,
      segments.reduce((sum, segment) => sum + segment.length, 0)
    )
  };
};

const sbPointAt = (shape, distance, point) => {
  let s = sbWrap(distance, shape.total);
  for (const segment of shape.segments) {
    if (segment.length > 0 && s <= segment.length) {
      if (segment.angle === null) {
        point.x = segment.x + segment.dx * s;
        point.y = segment.y + segment.dy * s;
        point.nx = segment.dy;
        point.ny = -segment.dx;
      } else {
        const angle = segment.angle + s / shape.r;
        point.nx = Math.cos(angle);
        point.ny = Math.sin(angle);
        point.x = segment.x + point.nx * shape.r;
        point.y = segment.y + point.ny * shape.r;
      }
      return point;
    }
    s -= segment.length;
  }
  return point;
};

const sbProject = (shape, px, py) => {
  let best = Infinity;
  let found = 0;
  let offset = 0;
  shape.segments.forEach((segment) => {
    if (segment.length > 0) {
      let s = 0;
      let x = 0;
      let y = 0;
      if (segment.angle === null) {
        s = clamp((px - segment.x) * segment.dx + (py - segment.y) * segment.dy, 0, segment.length);
        x = segment.x + segment.dx * s;
        y = segment.y + segment.dy * s;
      } else {
        let angle = sbWrap(Math.atan2(py - segment.y, px - segment.x) - segment.angle, SB_TAU);
        if (angle > Math.PI / 2) angle = angle > Math.PI * 1.25 ? 0 : Math.PI / 2;
        s = angle * shape.r;
        x = segment.x + Math.cos(segment.angle + angle) * shape.r;
        y = segment.y + Math.sin(segment.angle + angle) * shape.r;
      }
      const distance = (px - x) ** 2 + (py - y) ** 2;
      if (distance < best) {
        best = distance;
        found = offset + s;
      }
    }
    offset += segment.length;
  });
  return found;
};

const StarBorder = ({
  as: Component = 'button',
  children,
  className = '',
  style,
  color,
  trailColor,
  duration = 4,
  thickness = 1,
  radius = 12,
  trailLength = 0.3,
  stars = 1,
  glow = 0.6,
  sparkle = false,
  direction = 'clockwise',
  hover = 'lap',
  clickPulse = true,
  theme = 'dark',
  backgroundColor,
  textColor,
  borderColor,
  ...rest
}) => {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const wakeRef = useRef(null);
  const palette = SB_THEMES[theme] ?? SB_THEMES.dark;
  const light = color ?? palette.light;
  const settings = {
    light: theme === 'light',
    color: light,
    trailColor: trailColor ?? light,
    duration: Math.max(0.3, duration),
    thickness: Math.max(0.5, thickness),
    radius: Math.max(0, radius),
    trailLength: clamp(trailLength, 0, 1),
    stars: clamp(Math.round(stars), 1, 6),
    glow: clamp(glow, 0, 1),
    sparkle,
    direction: direction === 'counterclockwise' ? -1 : 1,
    hover: SB_HOVERS.includes(hover) ? hover : 'lap',
    clickPulse
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!root || !canvas || !ctx) return undefined;

    const reduceQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    let reduce = !!reduceQuery?.matches;
    const point = { x: 0, y: 0, nx: 0, ny: -1 };
    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      phase: 0,
      velocity: 0,
      motion: 0,
      lap: -1,
      time: 0,
      reveal: 0,
      boost: 0,
      flash: 0,
      emit: 0,
      hovered: false,
      focused: false,
      pointerX: 0,
      pointerY: 0,
      visible: true
    };
    const pulses = [];
    const dust = [];
    const colors = { key: '', head: SB_WHITE, tail: SB_WHITE };
    let raf = 0;
    let last = performance.now();
    let alive = true;

    let resizePending = false;
    const applyMeasure = () => {
      state.width = root.offsetWidth;
      state.height = root.offsetHeight;
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round((state.width + SB_BLEED * 2) * state.dpr));
      canvas.height = Math.max(1, Math.round((state.height + SB_BLEED * 2) * state.dpr));
    };

    const measure = () => {
      resizePending = true;
      wake();
    };

    const local = (event) => {
      const rect = root.getBoundingClientRect();
      const scaleX = rect.width ? state.width / rect.width : 1;
      const scaleY = rect.height ? state.height / rect.height : 1;
      return [(event.clientX - rect.left) * scaleX, (event.clientY - rect.top) * scaleY];
    };

    const shapeFor = (s) =>
      sbOutline(
        Math.max(1, state.width - s.thickness),
        Math.max(1, state.height - s.thickness),
        s.radius - s.thickness / 2
      );

    const stroke = (x1, y1, x2, y2, width, strokeStyle) => {
      ctx.lineWidth = width;
      ctx.strokeStyle = strokeStyle;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const drawTrail = (s, shape, head, length, sign, intensity, tip = true) => {
      if (length < 0.5 || intensity <= 0) return;
      const steps = clamp(Math.ceil(length / 2), 2, 90);
      sbPointAt(shape, head, point);
      let px = point.x;
      let py = point.y;
      for (let i = 1; i <= steps; i++) {
        sbPointAt(shape, head - sign * length * (i / steps), point);
        const u = 1 - (i - 0.5) / steps;
        const fade = u * u * intensity;
        let tone = sbMix(colors.tail, colors.head, u);
        if (!s.light) tone = sbMix(tone, SB_WHITE, u ** 6 * 0.65);
        ctx.lineCap = tip && i === 1 ? 'round' : 'butt';
        stroke(px, py, point.x, point.y, 2 + 6 * s.glow, sbRgba(tone, fade * (s.light ? 0.1 : 0.2) * s.glow));
        stroke(px, py, point.x, point.y, s.thickness, sbRgba(tone, fade));
        px = point.x;
        py = point.y;
      }
    };

    const drawHead = (s, x, y, intensity, twinkle) => {
      if (intensity <= 0) return;
      const tone = colors.head;
      const reach = (12 + 40 * s.glow) * (s.light ? 0.6 : 1);
      const bloom = ctx.createRadialGradient(x, y, 0, x, y, reach);
      const strength = (s.light ? 0.08 : 0.4) * s.glow * intensity;
      bloom.addColorStop(0, sbRgba(tone, strength));
      bloom.addColorStop(0.2, sbRgba(tone, strength * 0.4));
      bloom.addColorStop(0.5, sbRgba(tone, strength * 0.1));
      bloom.addColorStop(1, sbRgba(tone, 0));
      ctx.fillStyle = bloom;
      ctx.fillRect(x - reach, y - reach, reach * 2, reach * 2);
      if (!s.sparkle) return;

      const size = (1 + s.thickness * 0.6) * (s.light ? 0.85 : 1);
      const core = ctx.createRadialGradient(x, y, 0, x, y, size * 2.2);
      core.addColorStop(0, sbRgba(s.light ? tone : SB_WHITE, intensity));
      core.addColorStop(s.light ? 0.3 : 0.4, sbRgba(s.light ? tone : sbMix(tone, SB_WHITE, 0.5), intensity * 0.9));
      core.addColorStop(s.light ? 0.55 : 1, sbRgba(tone, s.light ? intensity * 0.12 : 0));
      core.addColorStop(1, sbRgba(tone, 0));
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(x, y, size * 2.2, 0, SB_TAU);
      ctx.fill();

      const spike = (3 + 4 * s.glow + s.thickness * 1.5) * twinkle;
      const center = s.light ? tone : SB_WHITE;
      const horizontal = ctx.createLinearGradient(x - spike, y, x + spike, y);
      horizontal.addColorStop(0, sbRgba(tone, 0));
      horizontal.addColorStop(0.5, sbRgba(center, intensity * 0.95));
      horizontal.addColorStop(1, sbRgba(tone, 0));
      stroke(x - spike, y, x + spike, y, s.light ? 0.75 : 1, horizontal);
      const vertical = ctx.createLinearGradient(x, y - spike, x, y + spike);
      vertical.addColorStop(0, sbRgba(tone, 0));
      vertical.addColorStop(0.5, sbRgba(center, intensity * 0.95));
      vertical.addColorStop(1, sbRgba(tone, 0));
      stroke(x, y - spike, x, y + spike, s.light ? 0.75 : 1, vertical);
    };

    const spawnDust = (x, y, nx, ny, speed) => {
      if (dust.length > 48) return;
      const push = 3 + Math.random() * 10;
      const drift = (Math.random() - 0.5) * 8;
      dust.push({
        x: x + nx * (Math.random() * 3 - 1),
        y: y + ny * (Math.random() * 3 - 1),
        vx: nx * push - ny * drift - speed * -ny * 0.04,
        vy: ny * push + nx * drift - speed * nx * 0.04,
        age: 0,
        life: 0.35 + Math.random() * 0.5,
        size: 0.45 + Math.random() * 0.7,
        seed: Math.random() * SB_TAU
      });
    };

    const draw = (base, shape) => {
      const s = state.boost > 0.001 ? { ...base, glow: Math.min(1.5, base.glow + 0.4 * state.boost) } : base;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (state.width < 2 || state.height < 2) return;
      const offset = (SB_BLEED + s.thickness / 2) * state.dpr;
      ctx.setTransform(state.dpr, 0, 0, state.dpr, offset, offset);
      ctx.globalCompositeOperation = s.light ? 'source-over' : 'lighter';
      ctx.lineCap = 'butt';

      const total = shape.total;
      const spacing = total / s.stars;
      const speed = Math.abs(state.motion);
      const sign = state.motion >= 0 ? 1 : -1;
      const span = s.trailLength * s.duration;
      const length = Math.min(speed * span, spacing * 0.92, total * 0.6);
      const intensity = state.reveal * (1 + 0.4 * state.boost + 0.6 * state.flash);

      const ring = state.flash * (s.light ? 0.18 : 0.32) + state.boost * state.reveal * (s.light ? 0.07 : 0.12);
      if (ring > 0.005) {
        ctx.lineWidth = s.thickness + 2 * s.glow;
        ctx.strokeStyle = sbRgba(colors.head, ring);
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(
            0,
            0,
            Math.max(1, state.width - s.thickness),
            Math.max(1, state.height - s.thickness),
            Math.max(0, shape.r)
          );
        } else {
          ctx.rect(0, 0, Math.max(1, state.width - s.thickness), Math.max(1, state.height - s.thickness));
        }
        ctx.stroke();
      }

      const still = clamp(1 - speed / Math.max(1, (total / s.duration) * 0.6), 0, 1) * Math.min(1, intensity);
      const rest = (10 + 14 * s.glow + s.thickness * 2) * still;
      for (let i = 0; i < s.stars; i++) {
        const head = state.phase + i * spacing;
        drawTrail(s, shape, head, length, sign, Math.min(1, intensity));
        if (still > 0.01) {
          drawTrail(s, shape, head, rest, 1, still, false);
          drawTrail(s, shape, head, rest, -1, still, false);
        }
      }

      pulses.forEach((pulseItem) => {
        const progress = pulseItem.age / 0.65;
        const fade = (1 - progress) ** 2;
        const travel = (total / 2) * (1 - (1 - Math.min(1, pulseItem.age / 0.5)) ** 2);
        const tail = Math.min(travel, total * 0.16);
        [1, -1].forEach((way) => {
          const front = pulseItem.origin + way * travel;
          drawTrail(s, shape, front, tail, way, fade);
          sbPointAt(shape, front, point);
          drawHead(s, point.x, point.y, fade * 0.8, 0.8);
        });
      });

      for (let i = 0; i < s.stars; i++) {
        sbPointAt(shape, state.phase + i * spacing, point);
        const twinkle = 0.82 + 0.18 * Math.sin(state.time * 6.1 + i * 2.3) * Math.sin(state.time * 2.7 + i);
        drawHead(s, point.x, point.y, Math.min(1.3, intensity), twinkle);
      }

      dust.forEach((mote) => {
        const left = 1 - mote.age / mote.life;
        const shimmer = 0.45 + 0.55 * Math.sin(state.time * 20 + mote.seed);
        const alpha = left * shimmer * state.reveal * (s.light ? 0.35 : 0.9);
        if (alpha <= 0.01) return;
        ctx.fillStyle = sbRgba(s.light ? colors.head : sbMix(colors.tail, SB_WHITE, 0.6), alpha);
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.size * (0.6 + 0.4 * left), 0, SB_TAU);
        ctx.fill();
      });
    };

    const frame = (now) => {
      raf = 0;
      if (resizePending) {
        resizePending = false;
        applyMeasure();
      }
      if (!alive) return;
      const s = settingsRef.current;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      state.time += dt;

      const key = `${s.color}|${s.trailColor}`;
      if (key !== colors.key) {
        colors.key = key;
        colors.head = sbToRgb(s.color);
        colors.tail = sbToRgb(s.trailColor);
      }

      const shape = shapeFor(s);
      const total = shape.total;
      const spacing = total / s.stars;
      const engaged = state.hovered || state.focused;
      const cruise = reduce ? 0 : (s.direction * total) / s.duration;

      const revealTarget = s.hover === 'reveal' && !engaged ? 0 : 1;
      state.reveal += (revealTarget - state.reveal) * (1 - Math.exp(-dt / (revealTarget > state.reveal ? 0.16 : 0.45)));
      const boostTarget = s.hover === 'brighten' && engaged ? 1 : 0;
      state.boost += (boostTarget - state.boost) * (1 - Math.exp(-dt / (boostTarget > state.boost ? 0.18 : 0.5)));
      state.flash *= Math.exp(-dt / 0.22);

      state.velocity += (cruise - state.velocity) * (1 - Math.exp(-dt / 0.45));
      let extra = 0;
      if (state.lap >= 0) {
        const before = sbEase(Math.min(1, state.lap / SB_LAP));
        state.lap += dt;
        extra = (sbEase(Math.min(1, state.lap / SB_LAP)) - before) * total * s.direction;
        if (state.lap >= SB_LAP) state.lap = -1;
      }
      state.motion = state.velocity + extra / dt;
      state.phase = sbWrap(state.phase + state.velocity * dt + extra, total);

      const pace = Math.abs(state.motion) / Math.max(1, Math.abs(total / s.duration));
      if (s.sparkle && !reduce && state.reveal > 0.05) {
        state.emit += dt * (2 + 6 * Math.min(2, pace)) * s.stars;
        while (state.emit > 1) {
          state.emit -= 1;
          sbPointAt(shape, state.phase + Math.floor(Math.random() * s.stars) * spacing, point);
          spawnDust(point.x, point.y, point.nx, point.ny, state.motion);
        }
      }
      for (let i = dust.length - 1; i >= 0; i--) {
        const mote = dust[i];
        mote.age += dt;
        mote.x += mote.vx * dt;
        mote.y += mote.vy * dt;
        mote.vx *= Math.exp(-dt * 2.2);
        mote.vy *= Math.exp(-dt * 2.2);
        if (mote.age >= mote.life) dust.splice(i, 1);
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].age += dt;
        if (pulses[i].age >= 0.65) pulses.splice(i, 1);
      }

      draw(s, shape);

      const settling =
        Math.abs(revealTarget - state.reveal) > 0.002 ||
        Math.abs(boostTarget - state.boost) > 0.002 ||
        state.flash > 0.01 ||
        pulses.length > 0 ||
        dust.length > 0;
      const moving = Math.abs(state.motion) > 0.05 || cruise !== 0 || state.lap >= 0;
      const showing = state.reveal > 0.002 || revealTarget > 0;
      if (state.visible && (settling || (moving && showing) || state.hovered)) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf || !alive || !state.visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    wakeRef.current = wake;

    const onEnter = (event) => {
      const s = settingsRef.current;
      [state.pointerX, state.pointerY] = local(event);
      state.hovered = true;
      if (s.hover === 'reveal' && state.reveal < 0.15) {
        state.phase = sbProject(shapeFor(s), state.pointerX - s.thickness / 2, state.pointerY - s.thickness / 2);
        state.velocity = 0;
      }
      if (s.hover === 'lap' && state.lap < 0 && !reduce) state.lap = 0;
      wake();
    };
    const onLeave = () => {
      state.hovered = false;
      wake();
    };
    const pulse = (origin) => {
      if (!settingsRef.current.clickPulse || reduce) return;
      pulses.push({ origin, age: 0 });
      if (pulses.length > 4) pulses.shift();
      state.flash = 1;
      wake();
    };
    const onDown = (event) => {
      if (event.button !== 0 && event.pointerType === 'mouse') return;
      const s = settingsRef.current;
      const [x, y] = local(event);
      pulse(sbProject(shapeFor(s), x - s.thickness / 2, y - s.thickness / 2));
    };
    const onClick = (event) => {
      if (event.detail === 0) pulse(state.phase);
    };
    const onFocus = () => {
      state.focused = root.matches(':focus-visible');
      if (state.focused && settingsRef.current.hover === 'lap' && state.lap < 0 && !reduce) state.lap = 0;
      wake();
    };
    const onBlur = () => {
      state.focused = false;
      wake();
    };

    const onReduceChange = () => {
      reduce = !!reduceQuery?.matches;
      if (reduce) {
        state.velocity = 0;
        state.motion = 0;
        state.lap = -1;
        state.flash = 0;
        state.emit = 0;
        pulses.length = 0;
        dust.length = 0;
        cancelAnimationFrame(raf);
        raf = 0;
        const s = settingsRef.current;
        if (state.width >= 2 && state.height >= 2) draw(s, shapeFor(s));
      } else {
        wake();
      }
    };
    reduceQuery?.addEventListener?.('change', onReduceChange);

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    resizeObserver?.observe(root);
    const visibility =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver((entries) => {
          state.visible = entries.some((entry) => entry.isIntersecting);
          if (state.visible) wake();
        })
        : null;
    visibility?.observe(root);
    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('click', onClick);
    root.addEventListener('focus', onFocus);
    root.addEventListener('blur', onBlur);
    measure();

    return () => {
      alive = false;
      wakeRef.current = null;
      cancelAnimationFrame(raf);
      reduceQuery?.removeEventListener?.('change', onReduceChange);
      resizeObserver?.disconnect();
      visibility?.disconnect();
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('click', onClick);
      root.removeEventListener('focus', onFocus);
      root.removeEventListener('blur', onBlur);
    };
  }, []);

  useEffect(() => {
    wakeRef.current?.();
  });

  return (
    <Component
      ref={rootRef}
      className={`star-border${className ? ` ${className}` : ''}`}
      style={{
        '--star-border-radius': `${settings.radius}px`,
        '--star-border-thickness': `${settings.thickness}px`,
        '--star-border-surface': backgroundColor ?? palette.surface,
        '--star-border-text': textColor ?? palette.text,
        '--star-border-track': borderColor ?? palette.track,
        ...style
      }}
      {...(Component === 'button' && rest.type === undefined ? { type: 'button' } : null)}
      {...rest}
    >
      <canvas ref={canvasRef} className="star-border__light" aria-hidden="true" />
      {children}
    </Component>
  );
};

/* ==========================================================================
   4. Clean Enterprise Navigation Bar
   ========================================================================== */
function Navbar({ activePage, onNavigatePage, theme, toggleTheme }) {
  const goSection = (id) => {
    const scrollTarget = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto' });
    };
    if (activePage !== 'home') {
      onNavigatePage('home', { revealHeading: false });
      setTimeout(scrollTarget, 40);
    } else {
      scrollTarget();
    }
  };

  const handleViewLinkClick = (e, page) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigatePage(page);
  };

  return (
    <header className="cg-header" role="banner">
      <div className="cg-nav-inner">
        <a
          href="#hero"
          className="cg-brand"
          aria-label="Belintan B. — Corporate Websites, Digital Marketing &amp; Business Portals"
          onClick={(e) => {
            e.preventDefault();
            goSection('hero');
          }}
        >
          <span className="cg-brand-mark" aria-hidden="true">
            <svg width="22" height="16" viewBox="0 0 40 26" fill="none">
              <g transform="skewX(-10) translate(2, 0)">
                <path
                  d="M10 4C5.6 4 2 7.8 2 13C2 18.2 5.6 22 10 22C12.2 22 14.1 21.1 15.3 19.7L13.2 16.8C12.4 17.6 11.3 18.2 10 18.2C7.7 18.2 5.8 15.9 5.8 13C5.8 10.1 7.7 7.8 10 7.8C11.3 7.8 12.4 8.4 13.2 9.2L15.3 6.3C14.1 4.9 12.2 4 10 4Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M17 4H22.8C25.7 4 27.8 5.9 27.8 8.8C27.8 11 26.3 12.8 24.3 13.4L28 22H24.1L21 14.2H20.7V22H17V4ZM20.7 7.5V11H22.6C23.7 11 24.3 10.2 24.3 9.3C24.3 8.3 23.7 7.5 22.6 7.5H20.7Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M28.8 4H37.5V7.5L32.8 22H29L33.4 7.5H28.8V4Z"
                  fill="#FFFFFF"
                />
              </g>
            </svg>
          </span>
          <span className="cg-brand-text">
            <GradientText
              colors={['#5227FF', '#FF9FFC', '#B497CF']}
              animationSpeed={8}
              variant="flow"
              glow={0.4}
            >
              Belintan B.
            </GradientText>
          </span>
        </a>

        <nav className="cg-nav-links" aria-label="Primary Navigation">
          <button
            type="button"
            className={`cg-nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => goSection('hero')}
          >
            Home
          </button>
          <button type="button" className="cg-nav-link" onClick={() => goSection('services')}>
            Services
          </button>
          <button type="button" className="cg-nav-link" onClick={() => goSection('tech-stack')}>
            Tech Stack
          </button>
          <button type="button" className="cg-nav-link" onClick={() => goSection('insights')}>
            Insights
          </button>
          <a
            href="?view=pricing"
            className={`cg-nav-link ${activePage === 'pricing' ? 'active' : ''}`}
            aria-current={activePage === 'pricing' ? 'page' : undefined}
            onClick={(e) => handleViewLinkClick(e, 'pricing')}
          >
            Pricing
          </a>
          <a
            href="?view=templates"
            className={`cg-nav-link ${activePage === 'templates' ? 'active' : ''}`}
            aria-current={activePage === 'templates' ? 'page' : undefined}
            onClick={(e) => handleViewLinkClick(e, 'templates')}
          >
            Templates
          </a>
          <button type="button" className="cg-nav-link" onClick={() => goSection('contact')}>
            Contact
          </button>
        </nav>

        <button
          type="button"
          className="cg-theme-btn"
          id="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle Dark / Light Mode"
          title="Toggle dark / light theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
}

/* ==========================================================================
   5. Hero Section
   ========================================================================== */
const ROLES = [
  'Frontend Developer',
  'Digital Marketing',
  'UI/UX Architect',
  'Full-Stack Java & React',
  'Supabase & SQL Engineer',
  'AI Solutions Builder'
];

function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  const cycleRole = () => {
    setRoleIndex((prev) => (prev + 1) % ROLES.length);
  };

  return (
    <section id="hero" className="cg-hero" aria-label="Introduction">
      <div className="cg-container">
        <div className="cg-hero-grid">
          <div>
            <div className="cg-hero-pills">
              <a href="#contact" className="cg-open-pill">
                OPEN FOR PROJECTS
              </a>
            </div>

            <h1 className="cg-hero-h1">
              Hi, I&apos;m{' '}
              <GradientText
                colors={['#5227FF', '#FF9FFC', '#B497CF']}
                animationSpeed={8}
                variant="flow"
                glow={0.4}
              >
                Belintan.
              </GradientText>
            </h1>

            <div className="cg-role-card-wrap">
              <button
                type="button"
                className="cg-role-card"
                onClick={cycleRole}
                aria-label={`Interactive role badge: ${ROLES[roleIndex]}. Click to cycle roles.`}
                title="Click to cycle engineering specializations"
              >
                <div className="cg-role-top">
                  <span>Click to flip role</span>
                  <span>
                    {String(roleIndex + 1).padStart(2, '0')} / {String(ROLES.length).padStart(2, '0')}
                  </span>
                </div>
                <div className="cg-role-title">{ROLES[roleIndex]}</div>
              </button>
            </div>

            <div className="cg-about-box" id="about">
              <div className="cg-about-kicker">( GET THE FUTURE YOU WANT &middot; ABOUT )</div>
              <h2>Brands with a pulse, engineered for measurable outcomes.</h2>
              <p>
                Hi, I&apos;m Belintan &mdash; an MBA graduate, certified frontend developer, and backend Java engineer.
                I architect enterprise-grade applications using HTML5, CSS3, JavaScript, React, Vue.js, Java, Supabase,
                and SQL.
              </p>
              <p>
                Partner with a full-stack consultant from strategy and database design through deployment and
                measurable growth.
              </p>
            </div>

            <div className="cg-hero-ctas">
              <StarBorder
                as="a"
                href="#contact"
                color="#12ABDB"
                trailColor="#FFFFFF"
                duration={3.5}
                stars={2}
                trailLength={0.35}
                thickness={1.5}
                radius={999}
                glow={0.75}
                sparkle
                hover="lap"
                clickPulse
                theme="light"
                backgroundColor="#FFFFFF"
                textColor="#0070AD"
                borderColor="rgba(18, 171, 219, 0.45)"
              >
                <span>Start a project</span>
                <ArrowRight size={16} />
              </StarBorder>
              <a href="#services" className="cg-btn-outline">
                <span>Explore capabilities</span>
              </a>
              <a
                href="/Belintan_B_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Belintan_B_Resume.pdf"
                className="cg-btn-outline"
              >
                <span>Resume PDF</span>
                <Zap size={15} />
              </a>
            </div>
          </div>

          <div>
            <div className="cg-fig-stage">
              <div className="cg-fig-badge">
                <span className="cg-dot" aria-hidden="true" />
                <span>100% Incident Resolution</span>
              </div>
              <div className="cg-fig-frame">
                <img src="/belintan-hero.jpg" alt="Belintan B. — Software Developer & UI/UX Engineer" />
              </div>
              <a href="#contact" className="cg-fig-card">
                <Zap size={16} />
                <span>Frontend &amp; Full-Stack Consultant &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="cg-hero-bar">
        <div className="cg-container cg-hero-bar-inner">
          <span>Chennai, Tamil Nadu, India</span>
          <span>Scroll to explore &darr;</span>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   6. Core Technologies Section (React Bits <LogoLoop />)
   ========================================================================== */
const STREAM_CONFIG = {
  layout: 'line',
  speed: 80,
  logoHeight: 36,
  gap: 46,
  magnify: 0.28,
  labels: 'inline',
  muted: 0.2,
  fadeOut: true,
  fadeOutWidth: 0.12,
  scrollBoost: 0.25
};

function TechStackSection() {
  return (
    <section className="cg-tech-band" id="tech-stack" aria-labelledby="tech-stack-heading">
      <div className="cg-container">
        <div className="cg-tech-head">
          <div>
            <span className="cg-badge">[ CORE STACK &middot; REACT BITS LOGOLOOP ]</span>
            <h2 className="cg-section-title" id="tech-stack-heading" style={{ marginBottom: 8 }}>
              Core Technologies &amp; Delivery Toolchain
            </h2>
            <p className="cg-tech-sub">
              Full-stack production engineering across modern frontend frameworks, scalable Java backends, Supabase real-time databases, and automated Git workflows &mdash; interactive linear showcase with smooth drag, hover magnification, and keyboard navigation.
            </p>
          </div>

          <div className="cg-tech-indicator" aria-label="Live Technology Pipeline">
            <span className="cg-live-dot" aria-hidden="true" />
            <span className="cg-indicator-text">Continuous Production Pipeline &bull; 14 Modern Technologies</span>
          </div>
        </div>

        <div className="cg-loop-stage">
          <LogoLoop
            logos={TECH_LOGOS}
            speed={STREAM_CONFIG.speed}
            direction="left"
            logoHeight={STREAM_CONFIG.logoHeight}
            gap={STREAM_CONFIG.gap}
            hoverSpeed={0}
            scaleOnHover
            layout={STREAM_CONFIG.layout}
            magnify={STREAM_CONFIG.magnify}
            muted={STREAM_CONFIG.muted}
            labels={STREAM_CONFIG.labels}
            scrollBoost={STREAM_CONFIG.scrollBoost}
            fadeOut={STREAM_CONFIG.fadeOut}
            fadeOutWidth={STREAM_CONFIG.fadeOutWidth}
            ariaLabel="Belintan Tech Stack Logos"
          />
        </div>

        <div className="cg-tech-tags-summary">
          <div className="cg-tech-metric-item">
            <span className="cg-metric-icon" aria-hidden="true">&#x26A1;</span>
            <span><strong>Sub-100ms</strong> Edge &amp; API Response</span>
          </div>
          <div className="cg-tech-metric-item">
            <span className="cg-metric-icon" aria-hidden="true">&#x1F6E1;&#xFE0F;</span>
            <span><strong>100% Code Ownership</strong> &amp; Zero Lock-in</span>
          </div>
          <div className="cg-tech-metric-item">
            <span className="cg-metric-icon" aria-hidden="true">&#x1F527;</span>
            <span><strong>Production-Ready</strong> CI/CD &amp; Testing</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   7. Services & Insights Section
   ========================================================================== */
function ServicesInsightsSection({ onNavigatePage }) {
  return (
    <>
      <section className="cg-section" id="services" aria-labelledby="services-heading">
        <div className="cg-container">
          <span className="cg-badge">[ 01 &middot; CAPABILITIES &amp; SERVICES ]</span>
          <h2 className="cg-section-title" id="services-heading">
            Corporate Websites, Digital Growth &amp; Business Solutions
          </h2>

          <div className="cg-svp-banner">
            <span className="cg-svp-pill">HIGH-CONVERTING DIGITAL PRESENCE</span>
            <h3 style={{ fontSize: 'clamp(1.3rem, 2.4vw, 1.85rem)', margin: '14px 0 8px' }}>
              We build premium, high-converting websites and web applications for businesses that want to grow.
            </h3>
            <p style={{ color: '#DCEBF7', margin: 0, maxWidth: '760px', lineHeight: 1.6 }}>
              Without a modern web presence, businesses lose trust. Get enterprise UI quality and clear market
              positioning from launch.
            </p>

            <div className="cg-svp-features">
              <div className="cg-svp-feature">
                <strong>Enterprise Bespoke UI/UX</strong>
                <p style={{ margin: '6px 0 0', fontSize: '0.88rem', color: '#DCEBF7' }}>
                  Custom modern business interfaces designed for brand authority and customer conversion.
                </p>
              </div>
              <div className="cg-svp-feature">
                <strong>Direct Lead Conversion</strong>
                <p style={{ margin: '6px 0 0', fontSize: '0.88rem', color: '#DCEBF7' }}>
                  Structured contact funnels, direct WhatsApp triggers, and seamless client inquiry workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cg-section-alt" id="insights" aria-label="Business Portals and Packages">
        <div className="cg-container">
          <div className="cg-featured-split">
            <div className="cg-featured-visual">
              <span className="cg-svp-pill" style={{ width: 'fit-content' }}>
                INTERACTIVE ACCELERATOR STUDIO
              </span>
              <div>
                <h3 style={{ fontSize: '1.5rem', margin: '0 0 8px' }}>
                  Enterprise CRM &middot; OfficePortal HRMS &middot; Healthray HMS
                </h3>
              </div>
              <div className="cg-metric-box">
                <strong style={{ display: 'block', fontSize: '1.2rem' }}>100%</strong>
                <span style={{ fontSize: '0.75rem', color: '#DCEBF7' }}>Business Ownership</span>
              </div>
            </div>

            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '18px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.1em', color: '#0070AD', textTransform: 'uppercase' }}>
                  Business Portals &middot; Live Studio
                </span>
                <h3 style={{ fontSize: '1.45rem', margin: '8px 0 10px' }}>
                  Generate, Duplicate &amp; Ship Production Web Portals at Enterprise Speed
                </h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Explore live CRM, HRMS, and Healthcare business portals, upload reference layouts to preview with
                  custom brand colors, and prepare standalone client deliverables.
                </p>
              </div>
              <StarBorder
                as="a"
                href="?view=templates"
                color="#FFFFFF"
                trailColor="#12ABDB"
                duration={4}
                stars={1}
                trailLength={0.32}
                thickness={1.25}
                radius={999}
                glow={0.65}
                sparkle
                hover="lap"
                clickPulse
                theme="dark"
                backgroundColor="#0070AD"
                textColor="#FFFFFF"
                borderColor="rgba(18, 171, 219, 0.5)"
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  onNavigatePage('templates');
                }}
              >
                <span>Launch Software Studio</span>
                <ArrowRight size={16} />
              </StarBorder>
            </div>
          </div>

          <div className="cg-grid-2">
            <article className="cg-card">
              <div>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.09em', color: '#0070AD', textTransform: 'uppercase' }}>
                  Commercial Transparency
                </span>
                <h3 style={{ margin: '8px 0', fontSize: '1.15rem' }}>Fixed-Scope Packages &mdash; 10% Less Active</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.58 }}>
                  Clear delivery packages starting from &#8377;4,499 with responsive business websites, SEO setup, and
                  ongoing digital marketing growth options.
                </p>
              </div>
              <a
                href="?view=pricing"
                className="cg-arrow-btn"
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  onNavigatePage('pricing');
                }}
              >
                <span>View Pricing &amp; Packages</span>
                <ArrowRight size={15} />
              </a>
            </article>

            <article className="cg-card">
              <div>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.09em', color: '#0070AD', textTransform: 'uppercase' }}>
                  Templates &amp; Business Portals
                </span>
                <h3 style={{ margin: '8px 0', fontSize: '1.15rem' }}>Interactive Templates &amp; Portal Studio</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.58 }}>
                  Switch straight to the built-in Templates Studio view with industry filters and live business previews.
                </p>
              </div>
              <a
                href="?view=templates"
                className="cg-arrow-btn"
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  onNavigatePage('templates');
                }}
              >
                <span>Explore Templates Gallery</span>
                <ArrowRight size={15} />
              </a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

/* ==========================================================================
   8. Pricing Section
   ========================================================================== */
const TIERS = [
  {
    tagline: 'Fast Launch',
    name: 'Starter Landing Page',
    summary: 'Single high-converting page engineered for fast turnaround and direct client WhatsApp inquiries.',
    price: '₹4,499',
    oldPrice: '₹4,999',
    sub: '(~$54 USD)',
    features: [
      '1 High-Converting Page',
      'WhatsApp Lead Triggers',
      'Mobile Responsive',
      '3–5 Days Turnaround'
    ],
    cta: 'Book Starter Page',
    waText: "Hi Belintan, I'd like to book the Starter Landing Page package (₹4,499)"
  },
  {
    tagline: 'Multi-Page',
    name: 'Business Website',
    summary: 'Multi-page corporate website with structured on-page SEO, custom quote forms, and brand credibility.',
    price: '₹8,999',
    oldPrice: '₹9,999',
    sub: '(~$108 USD)',
    features: [
      'Up to 6 Custom Pages',
      'Complete On-Page SEO',
      'Contact & Quote Forms',
      '7–10 Days Turnaround'
    ],
    cta: 'Book Business Site',
    waText: "Hi Belintan, I'd like to book the Business Website package (₹8,999)"
  },
  {
    tagline: 'Complete Promotion',
    badge: 'GROWTH BUNDLE',
    featured: true,
    name: 'Marketing & SEO Bundle',
    summary: 'Comprehensive growth marketing accelerator with ad creatives, social reels, and active SEO ranking.',
    price: '₹13,499',
    oldPrice: '₹14,999',
    sub: '(~$162 USD · 1 Month)',
    features: [
      '10 Advertising Posters',
      '10 Video Reels (9:16)',
      '2 Meta Ad Campaigns',
      '1 Month Off-Site SEO',
      'Weekly Rank Reports'
    ],
    cta: 'Book Growth Bundle',
    waText: "Hi Belintan, I'd like to book the Marketing & SEO Bundle (₹13,499)"
  }
];

function PricingSection({ onBackHome, headingRef }) {
  const HeadingTag = onBackHome ? 'h1' : 'h2';
  const [expandedTiers, setExpandedTiers] = useState({});

  const toggleTier = (name) => {
    setExpandedTiers((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const allExpanded = TIERS.every((t) => expandedTiers[t.name]);
  const toggleAll = () => {
    if (allExpanded) {
      setExpandedTiers({});
    } else {
      const next = {};
      TIERS.forEach((t) => {
        next[t.name] = true;
      });
      setExpandedTiers(next);
    }
  };

  return (
    <section
      className="cg-section"
      id="pricing"
      style={onBackHome ? { paddingTop: '108px' } : undefined}
      aria-labelledby="pricing-heading"
    >
      <div className="cg-container">
        {onBackHome && (
          <a
            href="?"
            className="cg-arrow-btn"
            style={{ marginBottom: '18px' }}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              onBackHome();
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to Home Portfolio</span>
          </a>
        )}

        {/* 50% OFF Promotional Banner */}
        <div className="cg-svp-banner" style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            <span className="cg-svp-pill">50% OFF</span>
            <span className="cg-svp-pill" style={{ background: '#FFFFFF', color: '#0070AD' }}>
              GUARANTEED*
            </span>
            <span
              className="cg-svp-pill"
              style={{ background: 'rgba(18, 171, 219, 0.22)', color: '#FFFFFF', border: '1px solid #12ABDB' }}
            >
              EXCLUSIVE WEB PACKAGE
            </span>
          </div>
          <HeadingTag
            id="pricing-heading"
            ref={headingRef}
            tabIndex={-1}
            style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.9rem)', margin: '0 0 8px' }}
          >
            50% OFF on your website <span style={{ color: '#8CE2FF' }}>GUARANTEED*</span>
          </HeadingTag>
          <p style={{ color: '#DCEBF7', margin: '0 0 18px', maxWidth: '760px', lineHeight: 1.6 }}>
            Turnkey website launch bundle including custom responsive UI, domain &amp; hosting guidance, database setup,
            and 1 year of maintenance support.
          </p>
          <StarBorder
            as="a"
            href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'd%20like%20to%20claim%20the%2050%25%20OFF%20Website%20Package!"
            target="_blank"
            rel="noopener noreferrer"
            color="#12ABDB"
            trailColor="#FFFFFF"
            duration={3.8}
            stars={2}
            trailLength={0.35}
            thickness={1.5}
            radius={999}
            glow={0.75}
            sparkle
            hover="lap"
            clickPulse
            theme="light"
            backgroundColor="#FFFFFF"
            textColor="#0070AD"
            borderColor="rgba(18, 171, 219, 0.5)"
          >
            <span>Claim 50% Off Website on WhatsApp</span>
            <ArrowRight size={15} />
          </StarBorder>
        </div>

        {/* Section Header Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
          <div>
            <span className="cg-badge">[ PACKAGES &amp; COMMERCIAL TIERS ]</span>
            <h3 style={{ margin: '6px 0 0', fontSize: '1.45rem', fontWeight: 800 }}>
              Transparent Development Plans
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Prices and deliverables are hidden by default &mdash; click any package to reveal commercial details.
            </p>
          </div>
          <button
            type="button"
            className="cg-price-all-btn"
            onClick={toggleAll}
            aria-expanded={allExpanded}
          >
            {allExpanded ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{allExpanded ? 'Hide All Price Details' : 'Show All Price Details'}</span>
          </button>
        </div>

        {/* 3 Tier Grid */}
        <div className="cg-grid-3">
          {TIERS.map((tier) => {
            const isExpanded = Boolean(expandedTiers[tier.name]);
            const detailsId = `tier-details-${tier.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            return (
              <article
                key={tier.name}
                className={`cg-pricing-card ${tier.featured ? 'featured' : ''} ${isExpanded ? 'is-expanded' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  if (e.target.closest('a, button')) return;
                  toggleTier(tier.name);
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: tier.featured ? '#CFE9F7' : '#0070AD'
                      }}
                    >
                      {tier.tagline}
                    </span>
                    {tier.badge && (
                      <span className="cg-svp-pill" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <h3 style={{ margin: '0 0 10px', fontSize: '1.26rem' }}>{tier.name}</h3>

                  <p
                    style={{
                      fontSize: '0.86rem',
                      margin: '0 0 14px',
                      lineHeight: 1.5,
                      color: tier.featured ? '#DCEBF7' : 'var(--text-secondary)'
                    }}
                  >
                    {tier.summary}
                  </p>

                  <div className={`cg-price-teaser ${isExpanded ? 'is-hidden' : ''}`}>
                    <span className="cg-price-teaser-badge">
                      <Zap size={12} />
                      Commercial Breakdown Hidden
                    </span>
                    <span className="cg-price-teaser-desc">
                      Tap below to slide open pricing, milestones &amp; technical deliverables.
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`cg-price-reveal-btn ${isExpanded ? 'is-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTier(tier.name);
                    }}
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                  >
                    {isExpanded ? <EyeOff size={15} /> : <Eye size={15} />}
                    <span>{isExpanded ? 'Slide To Hide Price & Scope' : 'Slide To Reveal Price & Scope'}</span>
                    <span className={`cg-price-chevron-wrap ${isExpanded ? 'is-flipped' : ''}`}>
                      <ChevronDown size={15} />
                    </span>
                  </button>

                  <div
                    id={detailsId}
                    className={`cg-price-details-drawer ${isExpanded ? 'is-open' : ''}`}
                    aria-hidden={!isExpanded}
                    inert={!isExpanded ? '' : undefined}
                  >
                    <div className="cg-price-details-inner">
                      <div className="cg-price-details-box" style={{ paddingTop: '16px' }}>
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.1 }}>{tier.price}</span>
                            {!tier.subPrefix && (
                              <del aria-label={`Original price ${tier.oldPrice}`} style={{ opacity: 0.65, fontSize: '0.95rem' }}>
                                {tier.oldPrice}
                              </del>
                            )}
                            <span className="cg-discount-pill">10% LESS</span>
                          </div>
                          <div
                            style={{
                              fontSize: '0.84rem',
                              marginTop: '6px',
                              color: tier.featured ? '#DCEBF7' : 'var(--text-secondary)'
                            }}
                          >
                            {tier.subPrefix ? (
                              <>
                                {tier.subPrefix}
                                <del aria-label={`Original base price ${tier.oldPrice}`}>{tier.oldPrice}</del>
                                {tier.subSuffix}
                              </>
                            ) : (
                              tier.sub
                            )}
                          </div>
                        </div>

                        <ul className="cg-price-list" style={{ marginBottom: '20px' }}>
                          {tier.features.map((feat) => (
                            <li key={feat}>{feat}</li>
                          ))}
                        </ul>

                        <StarBorder
                          as="a"
                          href={`https://wa.me/918610662871?text=${encodeURIComponent(tier.waText)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={isExpanded ? 0 : -1}
                          color={tier.featured ? '#12ABDB' : '#0070AD'}
                          trailColor={tier.featured ? '#FFFFFF' : '#12ABDB'}
                          duration={4}
                          stars={tier.featured ? 2 : 1}
                          trailLength={0.3}
                          thickness={tier.featured ? 1.5 : 1.25}
                          radius={999}
                          glow={tier.featured ? 0.75 : 0.45}
                          sparkle={!!tier.featured}
                          hover="lap"
                          clickPulse
                          theme="light"
                          backgroundColor={tier.featured ? '#FFFFFF' : '#F0F7FC'}
                          textColor="#0070AD"
                          borderColor={tier.featured ? 'rgba(18, 171, 219, 0.45)' : '#0070AD'}
                          style={{ width: '100%' }}
                        >
                          <span>{tier.cta}</span>
                          <ArrowRight size={15} />
                        </StarBorder>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   9. Templates & Software Studio Section
   ========================================================================== */
const BLUEPRINTS = {
  'enterprise-crm': {
    id: 'enterprise-crm',
    name: '1. Enterprise CRM Suite',
    desc: 'All-in-one Lead Management, Call Sync, Top Performers, Analytics & WhatsApp/Meta integrations.',
    defaultBrand: 'clientflow.io',
    defaultTagline: 'All-in-One CRM Software — Lead Management & Automation',
    defaultColor: '#0070AD',
    specs: [
      'Automated Lead Distribution & Round-Robin Rep Assignment',
      'Live Call Dashboard: Total Calls (27), Connected (18), Unique Clients (15)',
      'Top Performers Leaderboard & Sales Forecasting',
      'WhatsApp API, Call Sync, Mobile App & Meta CAP Integrations'
    ]
  },
  'officeportal-hrms': {
    id: 'officeportal-hrms',
    name: '2. OfficePortal HRMS & Payroll',
    desc: 'Indian Business HR (10–10,000 staff): PF/ESI/PT Payroll, Biometric, Geo-Fencing & Mobile Check-Out.',
    defaultBrand: 'OfficePortal HRMS',
    defaultTagline: 'Built for Indian Businesses — 10 to 10,000 Employees',
    defaultColor: '#0D9488',
    specs: [
      'Payroll Engine with Statutory PF, ESI & PT Compliance',
      'Biometric Attendance & Leave / Shift Rota Management',
      'Geo-Fencing & Live Location Check-In/Check-Out',
      'Employee Monitoring, Assets & Team Call Reports'
    ]
  },
  'healthray-hms': {
    id: 'healthray-hms',
    name: '3. Healthray Healthcare OS',
    desc: '40+ Healthcare Modules: Hospital OPD/IPD, Lab, Pharmacy, AI Enabled + ABDM & Bed Occupancy.',
    defaultBrand: 'Healthray OS',
    defaultTagline: '40+ Healthcare Modules — Hospital, Lab & Pharmacy Suite',
    defaultColor: '#2563EB',
    specs: [
      'New OPD (125), Admitted (32), Discharged (18) & Revenue Telemetry',
      'Real-time Bed Occupancy Gauge (70%) & Ward Tracking',
      'AI Enabled Clinical Workflows + ABDM Integration',
      'Unified Hospital, Diagnostics Lab & Pharmacy Billing'
    ]
  }
};
Object.defineProperty(BLUEPRINTS, 'flowzo-crm', {
  value: BLUEPRINTS['enterprise-crm'],
  enumerable: false,
  writable: true,
  configurable: true
});

const TEMPLATES_CATALOG = [
  { id: 'enterprise-crm', title: 'Enterprise CRM Suite', category: 'software', price: 'Included', tag: 'CRM Suite', desc: 'Lead distribution, call sync & unique client tracking SaaS.' },
  { id: 'officeportal-hrms', title: 'OfficePortal HRMS', category: 'software', price: 'Included', tag: 'HRMS & Payroll', desc: 'Attendance, PF/ESI payroll, and live geo-fencing portal.' },
  { id: 'healthray-hms', title: 'Healthray Healthcare OS', category: 'software', price: 'Included', tag: 'Healthcare OS', desc: 'OPD/IPD dashboard, bed occupancy & ABDM integration.' },
  { id: 'agentframe', title: 'Agentframe AI', category: 'ai', price: '$49', tag: 'AI & Agents', desc: 'Autonomous AI agent console with telemetry & prompt simulator.' },
  { id: 'cloudlight', title: 'Cloudlight Storage', category: 'saas', price: '$49', tag: 'SaaS & Tech', desc: 'Decentralized storage vault & interactive capacity estimator.' },
  { id: 'imageworks', title: 'Imageworks Studio', category: 'ai', price: '$49', tag: 'AI & Agents', desc: '3D carousel gallery & prompt-to-image studio.' },
  { id: 'sparkdesign', title: 'Sparkdesign Collab', category: 'studio', price: '$49', tag: 'Design & Studio', desc: 'Multiplayer sticky canvas & live cursor workspace.' },
  { id: 'saasflow', title: 'SaaS Operations', category: 'saas', price: '$49', tag: 'SaaS & Tech', desc: 'ARR charts, trial toggle & authentication portal.' },
  { id: 'minimal', title: 'Swiss Minimal', category: 'studio', price: '$49', tag: 'Design & Studio', desc: 'Clean editorial layout built for speed and typography.' },
  { id: 'agency', title: 'Creative Agency', category: 'studio', price: '$49', tag: 'Design & Studio', desc: 'Smooth scrolling consultancy & case study showcase.' },
  { id: 'finance', title: 'FinTech Treasury', category: 'finance', price: '$49', tag: 'Finance & B2B', desc: 'Cross-border settlement feeds & virtual cards UI.' },
  { id: 'ai-saas', title: 'AI Creator Suite', category: 'ai', price: '$49', tag: 'AI & Agents', desc: 'Dark velvet studio workspace with prompt box.' },
  { id: 'build-what-matters', title: 'Developer API Docs', category: 'saas', price: '$49', tag: 'SaaS & Tech', desc: 'Split hero with live REST & SDK snippet viewer.' },
  { id: 'hyperflow', title: 'Hyperflow System', category: 'studio', price: '$49', tag: 'Design & Studio', desc: 'Kinetic grid UI & custom scope estimator.' },
  { id: 'minimalist-commerce', title: 'Minimalist Commerce', category: 'free', price: '$0', tag: 'Free', desc: 'Open-source storefront with slide-out cart & WhatsApp order.' }
];

const escHtml = (val) =>
  String(val || '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

function safeImageDataUrl(url) {
  return typeof url === 'string' && /^data:image\/(?:png|jpe?g|gif|webp);base64,[A-Za-z0-9+/=]+$/i.test(url)
    ? url
    : '';
}

function buildSampleAppHTML(bpId, cfg) {
  const brand = escHtml(cfg.brand || BLUEPRINTS[bpId]?.defaultBrand || 'Studio App');
  const tagline = escHtml(cfg.tagline || BLUEPRINTS[bpId]?.defaultTagline || 'Enterprise Sample Application');
  const accent = /^#[0-9a-fA-F]{6}$/.test(cfg.accent) ? cfg.accent : '#0070AD';
  const refImg = safeImageDataUrl(cfg.refImage);
  const refBanner = refImg
    ? `<div style="margin-bottom:14px;padding:10px;border-radius:8px;background:#F8FAFC;border:1px solid #DDE3EA;display:flex;align-items:center;gap:12px;"><img src="${refImg}" alt="Duplicated reference" style="width:68px;height:44px;object-fit:cover;border-radius:4px;" /><div><strong style="font-size:12px;color:#0F172A;display:block;">Reference Image Attached</strong><span style="font-size:11px;color:#475569;">Synced from duplicator preview</span></div></div>`
    : '';

  if (bpId === 'enterprise-crm' || bpId === 'flowzo-crm') {
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${brand} — CRM</title><style>body{margin:0;font-family:'Segoe UI',system-ui,sans-serif;background:#F1F5F9;color:#0F172A;padding:16px}.card{background:#fff;border:1px solid #DDE3EA;border-radius:8px;padding:16px;max-width:780px;margin:0 auto}.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:14px 0}.kpi{background:${accent};color:#fff;padding:12px;border-radius:6px}.kpi span{font-size:11px;opacity:.88;display:block}.kpi strong{font-size:20px}.row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}input,select{padding:8px 10px;border:1px solid #CBD5E1;border-radius:4px;font:inherit}button{background:${accent};color:#fff;border:none;border-radius:6px;padding:8px 14px;font-weight:700;cursor:pointer}.log{margin-top:12px;font-size:12px;color:#334155}</style></head><body><div class="card"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><div><strong style="font-size:17px;">${brand}</strong><div style="font-size:12px;color:#475569;">${tagline}</div></div><span style="background:#E0F2FE;color:#0369A1;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700;">LIVE CRM</span></div>${refBanner}<div class="kpis"><div class="kpi"><span>TOTAL CALLS</span><strong id="k-calls">27</strong></div><div class="kpi"><span>DURATION</span><strong id="k-dur">00:09:51</strong></div><div class="kpi"><span>CONNECTED</span><strong id="k-conn">18</strong></div><div class="kpi"><span>UNIQUE CLIENTS</span><strong id="k-clients">15</strong></div></div><div class="row"><input id="lead-name" placeholder="Client name (e.g. Acme Corp)" /><select id="lead-status"><option value="connected">Connected</option><option value="follow-up">Follow-Up</option></select><button type="button" onclick="logNewCall()">+ Log &amp; Auto-Assign</button></div><div id="call-log" class="log">Pre-seeded 15 unique client accounts tracked.</div></div><script>let calls=27,conn=18,clients=15,secs=591;const seenClients=new Set(['nova retail','skyline infra','metro clinic','zenith logistics','aurora textiles','crestview homes','pulse diagnostics','verve studio','kaveri foods','atlas mobility','brightpath edu','harbor fintech','lotus pharma','peak saas','orion global']);function logNewCall(){const nameEl=document.getElementById('lead-name');const stEl=document.getElementById('lead-status');const raw=(nameEl.value||'').trim()||('New Client #'+(calls+1));const key=raw.toLowerCase();calls++;if(stEl.value==='connected')conn++;if(!seenClients.has(key)){seenClients.add(key);clients++;}secs+=45;const mm=String(Math.floor(secs/60)).padStart(2,'0'),ss=String(secs%60).padStart(2,'0');document.getElementById('k-calls').textContent=calls;document.getElementById('k-conn').textContent=conn;document.getElementById('k-clients').textContent=clients;document.getElementById('k-dur').textContent='00:'+mm+':'+ss;document.getElementById('call-log').textContent='Logged call for '+raw+' ('+stEl.value+') — '+clients+' unique clients';nameEl.value='';}</script></body></html>`;
  }

  if (bpId === 'officeportal-hrms') {
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${brand}</title><style>body{margin:0;font-family:'Segoe UI',system-ui,sans-serif;background:#F1F5F9;color:#0F172A;padding:16px}.card{background:#fff;border:1px solid #DDE3EA;border-radius:8px;padding:16px;max-width:780px;margin:0 auto}.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:14px 0}.kpi{background:#F8FAFC;border:1px solid #E2E8F0;border-top:3px solid ${accent};padding:12px;border-radius:6px}button{background:${accent};color:#fff;border:none;border-radius:6px;padding:8px 14px;font-weight:700;cursor:pointer}</style></head><body><div class="card"><strong style="font-size:17px;">${brand}</strong><div style="font-size:12px;color:#475569;">${tagline}</div>${refBanner}<div class="kpis"><div class="kpi"><span style="font-size:11px;color:#64748B;">ACTIVE STAFF</span><strong id="hr-staff" style="display:block;font-size:20px;">1,248</strong></div><div class="kpi"><span style="font-size:11px;color:#64748B;">PRESENT TODAY</span><strong id="hr-present" style="display:block;font-size:20px;">1,032</strong></div><div class="kpi"><span style="font-size:11px;color:#64748B;">ON LEAVE</span><strong style="display:block;font-size:20px;">142</strong></div></div><button type="button" onclick="checkInBiometricPunch()">+ Check-In Biometric Punch</button></div><script>let presentCount=1032;function checkInBiometricPunch(){presentCount++;const el=document.getElementById('hr-present');if(el)el.textContent=presentCount.toLocaleString('en-US');}</script></body></html>`;
  }

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${brand}</title><style>body{margin:0;font-family:'Segoe UI',system-ui,sans-serif;background:#EFF6FF;color:#0F172A;padding:16px}.card{background:#fff;border:1px solid #BFDBFE;border-radius:8px;padding:16px;max-width:780px;margin:0 auto}.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:14px 0}.kpi{background:${accent};color:#fff;padding:12px;border-radius:6px}button{background:${accent};color:#fff;border:none;border-radius:6px;padding:8px 14px;font-weight:700;cursor:pointer}</style></head><body><div class="card"><strong style="font-size:17px;">${brand}</strong><div style="font-size:12px;color:#475569;">${tagline}</div>${refBanner}<div class="kpis"><div class="kpi"><span style="font-size:11px;opacity:.9;">NEW OPD</span><strong id="opd-val" style="display:block;font-size:20px;">125</strong></div><div class="kpi"><span style="font-size:11px;opacity:.9;">BED OCCUPANCY</span><strong style="display:block;font-size:20px;">70%</strong></div><div class="kpi"><span style="font-size:11px;opacity:.9;">MODULES</span><strong style="display:block;font-size:20px;">40+</strong></div></div><button type="button" onclick="let e=document.getElementById('opd-val');e.textContent=Number(e.textContent)+1;">+ Register OPD Patient</button></div></body></html>`;
}

const DUPLICATES_STORAGE_KEY = 'belintan_studio_duplicates_v1';

function readStoredDuplicates() {
  try {
    const raw = localStorage.getItem(DUPLICATES_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function TemplatesStudioSection({ onBackHome, headingRef }) {
  const [activeBp, setActiveBp] = useState('enterprise-crm');
  const [brand, setBrand] = useState(BLUEPRINTS['enterprise-crm'].defaultBrand);
  const [tagline, setTagline] = useState(BLUEPRINTS['enterprise-crm'].defaultTagline);
  const [accent, setAccent] = useState(BLUEPRINTS['enterprise-crm'].defaultColor);
  const [uploadedImg, setUploadedImg] = useState('');
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [savedDuplicates, setSavedDuplicates] = useState(() => {
    try {
      const raw = localStorage.getItem('belintan_studio_duplicates_v1');
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [filterCat, setFilterCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const readTokenRef = useRef(0);
  const activeReaderRef = useRef(null);
  const fileInputRef = useRef(null);
  const workbenchHeadingRef = useRef(null);
  const bpTabRefs = useRef({});
  const uploadedImgRef = useRef(uploadedImg);
  uploadedImgRef.current = uploadedImg;

  const invalidatePendingUpload = () => {
    readTokenRef.current += 1;
    try {
      activeReaderRef.current?.abort?.();
    } catch { }
    activeReaderRef.current = null;
    setIsLoadingImg(false);
  };

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === DUPLICATES_STORAGE_KEY) {
        setSavedDuplicates(readStoredDuplicates());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      readTokenRef.current += 1;
      try {
        activeReaderRef.current?.abort?.();
      } catch { }
    };
  }, []);

  const currentBlueprint = BLUEPRINTS[activeBp] || BLUEPRINTS['enterprise-crm'];

  const selectBlueprint = (bpId, opts = {}) => {
    const bp = BLUEPRINTS[bpId];
    if (!bp) return;
    invalidatePendingUpload();
    setActiveBp(bp.id);
    setBrand(bp.defaultBrand);
    setTagline(bp.defaultTagline);
    setAccent(bp.defaultColor);
    setUploadedImg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setStatusMsg('');
    if (opts.focusWorkbench) {
      requestAnimationFrame(() => {
        workbenchHeadingRef.current?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
        workbenchHeadingRef.current?.focus({ preventScroll: true });
      });
    }
  };

  const handleUploadImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const hadPrevImg = Boolean(uploadedImgRef.current);
    invalidatePendingUpload();
    const myToken = readTokenRef.current;
    setIsLoadingImg(true);
    setStatusMsg('Verifying reference image...');

    const reader = new FileReader();
    activeReaderRef.current = reader;
    reader.onerror = () => {
      if (myToken !== readTokenRef.current) return;
      activeReaderRef.current = null;
      setIsLoadingImg(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setStatusMsg(
        hadPrevImg
          ? 'Could not read replacement image. The previously displayed image remains selected.'
          : 'Could not read selected image file.'
      );
    };
    reader.onload = (ev) => {
      if (myToken !== readTokenRef.current) return;
      activeReaderRef.current = null;
      const safe = safeImageDataUrl(ev.target?.result);
      if (!safe) {
        setIsLoadingImg(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setStatusMsg(
          hadPrevImg
            ? 'Invalid image format. The previously displayed image remains selected.'
            : 'Please choose a valid PNG, JPG, GIF, or WebP image.'
        );
        return;
      }

      const failDecode = () => {
        if (myToken !== readTokenRef.current) return;
        setIsLoadingImg(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setStatusMsg(
          hadPrevImg
            ? 'Replacement image data could not be decoded. The previously displayed image remains selected.'
            : 'Selected image data is invalid or truncated.'
        );
      };

      const commitDecoded = () => {
        if (myToken !== readTokenRef.current) return;
        setUploadedImg(safe);
        setIsLoadingImg(false);
        setStatusMsg('Reference image loaded into preview & sample generator.');
      };

      const probe = new Image();
      probe.onload = () => {
        if (myToken !== readTokenRef.current) return;
        if (typeof probe.decode === 'function') {
          probe.decode().then(commitDecoded, failDecode);
        } else {
          commitDecoded();
        }
      };
      probe.onerror = failDecode;
      probe.src = safe;
    };
    reader.readAsDataURL(file);
  };

  const resetReference = () => {
    invalidatePendingUpload();
    setUploadedImg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const sampleDoc = useMemo(
    () => buildSampleAppHTML(activeBp, { brand, tagline, accent, refImage: uploadedImg }),
    [activeBp, brand, tagline, accent, uploadedImg]
  );

  const mutateShelf = (updater) => {
    try {
      const committed = readStoredDuplicates();
      const nextItems = updater(committed);
      localStorage.setItem(DUPLICATES_STORAGE_KEY, JSON.stringify(nextItems));
      const verified = readStoredDuplicates();
      setSavedDuplicates(verified);
      return true;
    } catch {
      return false;
    }
  };

  const duplicateBlueprint = () => {
    if (isLoadingImg) return;
    const entry = {
      id: 'dup-' + Date.now(),
      bpId: activeBp,
      brand,
      tagline,
      accent,
      refImage: uploadedImg,
      createdAt: new Date().toLocaleTimeString()
    };
    if (mutateShelf((committed) => [entry, ...committed.slice(0, 11)])) {
      setStatusMsg(`Saved duplicated blueprint for "${brand}".`);
    } else {
      setStatusMsg('Could not save to localStorage (storage quota or permissions error).');
    }
  };

  const clearShelf = () => {
    if (mutateShelf(() => [])) {
      setStatusMsg('Cleared duplicated blueprints shelf.');
    } else {
      setStatusMsg('Could not update localStorage.');
    }
  };

  const downloadSampleHtml = () => {
    if (isLoadingImg) return;
    const slug = (brand || 'sample-software').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const blob = new Blob([sampleDoc], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}-sample.html`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const blueprintIds = Object.keys(BLUEPRINTS);

  const handleBlueprintKeyDown = (e, currentIndex) => {
    let targetIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      targetIndex = (currentIndex + 1) % blueprintIds.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      targetIndex = (currentIndex - 1 + blueprintIds.length) % blueprintIds.length;
    } else if (e.key === 'Home') {
      targetIndex = 0;
    } else if (e.key === 'End') {
      targetIndex = blueprintIds.length - 1;
    }
    if (targetIndex < 0) return;
    e.preventDefault();
    const nextId = blueprintIds[targetIndex];
    selectBlueprint(nextId);
    bpTabRefs.current[nextId]?.focus();
  };

  const filteredTemplates = TEMPLATES_CATALOG.filter((tpl) => {
    const catMatch = filterCat === 'all' || tpl.category === filterCat;
    const q = searchTerm.trim().toLowerCase();
    const searchMatch = !q || tpl.title.toLowerCase().includes(q) || tpl.desc.toLowerCase().includes(q);
    return catMatch && searchMatch;
  });

  return (
    <section className="cg-section" id="templates-studio" style={{ paddingTop: '108px' }}>
      <div className="cg-container">
        {onBackHome && (
          <a
            href="?"
            className="cg-arrow-btn"
            style={{ marginBottom: '18px' }}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              onBackHome();
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to Home Portfolio</span>
          </a>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginBottom: '26px' }}>
          <div>
            <span className="cg-badge">[ SOFTWARE STUDIO &amp; TEMPLATES ]</span>
            <h1 className="cg-section-title" id="templates-studio-heading" ref={headingRef} tabIndex={-1} style={{ marginBottom: '8px' }}>
              Enterprise Software Blueprint Studio &amp; Templates
            </h1>
            <p style={{ margin: 0, color: 'var(--text-secondary)', maxWidth: '720px' }}>
              Switch between Enterprise CRM, OfficePortal HRMS, and Healthray OS, upload a reference screenshot to
              duplicate with your branding, and download standalone deliverables.
            </p>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleUploadImage}
            />
            <button
              type="button"
              className="cg-btn-primary"
              style={{ background: '#0070AD', color: '#FFFFFF' }}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={15} />
              <span>Upload Reference Image</span>
            </button>
          </div>
        </div>

        {statusMsg && (
          <div
            role="status"
            style={{
              marginBottom: '16px',
              padding: '10px 14px',
              borderRadius: '6px',
              background: '#EBF5FB',
              border: '1px solid #C5E1F2',
              color: '#005A8D',
              fontWeight: 600,
              fontSize: '0.88rem'
            }}
          >
            {statusMsg}
          </div>
        )}

        {/* Blueprint Selector Tabs */}
        <div className="cg-grid-3" role="tablist" aria-label="Software Blueprints" style={{ marginBottom: '20px' }}>
          {Object.values(BLUEPRINTS).map((bp, idx) => {
            const isSelected = bp.id === activeBp;
            return (
              <button
                key={bp.id}
                ref={(el) => {
                  bpTabRefs.current[bp.id] = el;
                }}
                id={`bp-tab-${bp.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="studio-workbench-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => selectBlueprint(bp.id)}
                onKeyDown={(e) => handleBlueprintKeyDown(e, idx)}
                className="cg-card"
                style={{
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderTop: `4px solid ${isSelected ? '#12ABDB' : '#0070AD'}`,
                  background: isSelected ? 'linear-gradient(135deg, #07192E 0%, #0070AD 100%)' : 'var(--card-bg)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)'
                }}
              >
                <strong style={{ fontSize: '1rem' }}>{bp.name}</strong>
                <span style={{ fontSize: '0.84rem', color: isSelected ? '#DCEBF7' : 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {bp.desc}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dual Workbench: Left Reference + Specs, Right Customizer + Live Preview */}
        <div
          id="studio-workbench-panel"
          role="tabpanel"
          aria-labelledby={`bp-tab-${activeBp}`}
          className="cg-contact-grid"
          style={{ marginBottom: '36px' }}
        >
          <div className="cg-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
              <strong
                id="studio-workbench-heading"
                ref={workbenchHeadingRef}
                tabIndex={-1}
                style={{ fontSize: '0.82rem', color: '#0070AD', letterSpacing: '0.06em' }}
              >
                REFERENCE VISUAL &amp; MODULES
              </strong>
              <button type="button" className="cg-arrow-btn" style={{ fontSize: '0.78rem' }} onClick={resetReference}>
                <RotateCcw size={13} />
                <span>Use Blueprint Visual</span>
              </button>
            </div>

            {uploadedImg ? (
              <img
                src={uploadedImg}
                alt="Uploaded reference preview"
                style={{ width: '100%', maxHeight: '260px', objectFit: 'contain', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              />
            ) : (
              <div style={{ padding: '18px', borderRadius: '6px', background: 'var(--bg-soft)', border: '1px solid var(--border-color)' }}>
                <strong style={{ display: 'block', marginBottom: '8px', color: '#0070AD' }}>{brand}</strong>
                <p style={{ margin: '0 0 10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{tagline}</p>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: 1.65 }}>
                  {currentBlueprint.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="cg-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '0.82rem', color: '#0070AD', letterSpacing: '0.06em' }}>
                LIVE SAMPLE SOFTWARE GENERATOR
              </strong>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#047857' }}>● Interactive Ready</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '8px' }}>
              <input
                type="text"
                className="cg-input"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                aria-label="Custom Brand Name"
                placeholder="Brand Name"
              />
              <input
                type="text"
                className="cg-input"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                aria-label="Custom Tagline"
                placeholder="Tagline"
              />
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                aria-label="Primary Brand Color"
                style={{ width: '48px', height: '44px', padding: '4px', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}
              />
            </div>

            <iframe
              title="Live Generated Sample Software Preview"
              srcDoc={sampleDoc}
              sandbox="allow-scripts"
              style={{ width: '100%', height: '270px', border: '1px solid var(--border-color)', borderRadius: '6px', background: '#FFFFFF' }}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <StarBorder
                color="#12ABDB"
                trailColor="#FFFFFF"
                duration={3.8}
                stars={1}
                trailLength={0.3}
                thickness={1.25}
                radius={999}
                glow={0.6}
                sparkle
                hover="lap"
                clickPulse
                theme="dark"
                backgroundColor="#0070AD"
                textColor="#FFFFFF"
                borderColor="rgba(18, 171, 219, 0.5)"
                style={{ padding: '10px 18px', fontSize: '0.85rem' }}
                disabled={isLoadingImg}
                onClick={duplicateBlueprint}
              >
                <Copy size={14} />
                <span>Duplicate Blueprint</span>
              </StarBorder>
              <button
                type="button"
                className="cg-btn-primary"
                style={{ background: '#047857', color: '#FFFFFF', padding: '10px 18px', fontSize: '0.85rem' }}
                disabled={isLoadingImg}
                onClick={downloadSampleHtml}
              >
                <Download size={14} />
                <span>Download Sample (.html)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Duplicated Shelf */}
        {savedDuplicates.length > 0 && (
          <div className="cg-card" style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Saved Duplicated Blueprints ({savedDuplicates.length})</strong>
              <button type="button" className="cg-arrow-btn" onClick={clearShelf}>
                <Trash2 size={14} />
                <span>Clear All</span>
              </button>
            </div>
            <div className="cg-grid-3">
              {savedDuplicates.map((dup) => (
                <div key={dup.id} style={{ padding: '14px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-soft)' }}>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>{dup.brand}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>
                    {dup.tagline} ({dup.createdAt})
                  </span>
                  <button
                    type="button"
                    className="cg-arrow-btn"
                    onClick={() => {
                      invalidatePendingUpload();
                      if (fileInputRef.current) fileInputRef.current.value = '';
                      const resolvedBp = BLUEPRINTS[dup?.bpId] || BLUEPRINTS['enterprise-crm'];
                      const nextBpId = resolvedBp.id;
                      setActiveBp(nextBpId);
                      setBrand(dup.brand || resolvedBp.defaultBrand);
                      setTagline(dup.tagline || resolvedBp.defaultTagline);
                      setAccent(dup.accent || resolvedBp.defaultColor);
                      setUploadedImg(safeImageDataUrl(dup.refImage));
                      setStatusMsg('');
                    }}
                  >
                    <span>Load into Workbench</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filterable 15-Template Catalog */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }} role="group" aria-label="Template Categories">
            {[
              { id: 'all', label: 'All Templates (15)' },
              { id: 'software', label: 'Software Systems' },
              { id: 'ai', label: 'AI & Agents' },
              { id: 'saas', label: 'SaaS & Tech' },
              { id: 'studio', label: 'Design & Studio' },
              { id: 'finance', label: 'Finance' },
              { id: 'free', label: 'Free' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                aria-pressed={filterCat === tab.id}
                onClick={() => setFilterCat(tab.id)}
                className={`cg-mode-btn ${filterCat === tab.id ? 'active' : ''}`}
                style={{ border: '1px solid var(--border-color)' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-secondary)' }} />
            <input
              type="text"
              className="cg-input"
              style={{ paddingLeft: '36px' }}
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search templates"
            />
          </div>
        </div>

        <div className="cg-grid-3">
          {filteredTemplates.map((tpl) => (
            <article key={tpl.id} className="cg-card" style={{ borderTop: '3px solid #0070AD' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.75rem', fontWeight: 700, color: '#0070AD' }}>
                  <span>{tpl.tag}</span>
                  <span>{tpl.price}</span>
                </div>
                <h3 style={{ margin: '0 0 6px', fontSize: '1.12rem' }}>{tpl.title}</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{tpl.desc}</p>
              </div>
              {BLUEPRINTS[tpl.id] ? (
                <button
                  type="button"
                  className="cg-arrow-btn"
                  onClick={() => selectBlueprint(tpl.id, { focusWorkbench: true })}
                >
                  <span>Load in Software Studio</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <a
                  href={`https://wa.me/918610662871?text=${encodeURIComponent(`Hi Belintan, I'd like to license the ${tpl.title} template`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cg-arrow-btn"
                >
                  <span>Request Live Preview &rarr;</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   10. Contact & Footer Section
   ========================================================================== */
const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactFooter({ onNavigatePage }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    timeline: '',
    city: '',
    scope: '',
    message: ''
  });
  const [toast, setToast] = useState('');
  const emailInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailEl = emailInputRef.current;
    const isNativeEmailValid = emailEl ? emailEl.checkValidity() : true;
    const isEmailValid = isNativeEmailValid && EMAIL_VALIDATION_REGEX.test(form.email.trim());
    if (form.name.trim().length < 2 || !isEmailValid || !form.scope) {
      setToast('Please enter your name, valid email, and select a project scope.');
      if (!isEmailValid && emailEl) emailEl.focus();
      return;
    }
    setToast('Thank you! Opening direct inquiry draft and WhatsApp option.');
    const subject = encodeURIComponent(`Project Inquiry: ${form.scope} — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nTimeline: ${form.timeline}\nCity/Budget: ${form.city}\nScope: ${form.scope}\nMessage: ${form.message}`
    );
    window.open(`mailto:belintan07@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const openWhatsApp = () => {
    const text = `Hi Belintan! Name: ${form.name || 'Client'}, Scope: ${form.scope || 'Web / Full-Stack Project'}, Timeline: ${form.timeline || 'Flexible'}`;
    window.open(`https://wa.me/918610662871?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleFooterViewClick = (e, page) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigatePage(page);
  };

  return (
    <>
      <section className="cg-section" id="contact" aria-labelledby="contact-heading">
        <div className="cg-container">
          <span className="cg-badge">[ 03 &middot; INQUIRIES &amp; ENGAGEMENTS ]</span>
          <h2 className="cg-section-title" id="contact-heading">
            Partner With Belintan &mdash; Let&apos;s Build Something Measurable
          </h2>

          <div className="cg-contact-grid">
            <div
              style={{
                background: 'linear-gradient(155deg, #07192E 0%, #0D2B4E 55%, #0070AD 100%)',
                color: '#FFFFFF',
                borderRadius: '6px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '22px'
              }}
            >
              <div>
                <span className="cg-svp-pill">CHENNAI, INDIA &middot; GLOBAL DELIVERY</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderLeft: '3px solid #12ABDB', padding: '12px 14px', borderRadius: '4px' }}>
                  <strong style={{ display: 'block', fontSize: '0.9rem' }}>Corporate Websites &amp; Growth Marketing</strong>
                  <span style={{ fontSize: '0.8rem', color: '#CFE4F5' }}>High-converting business sites, SEO, and campaigns.</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderLeft: '3px solid #12ABDB', padding: '12px 14px', borderRadius: '4px' }}>
                  <strong style={{ display: 'block', fontSize: '0.9rem' }}>Tailored Business Portals</strong>
                  <span style={{ fontSize: '0.8rem', color: '#CFE4F5' }}>CRM, HRMS, and Healthcare clinic management portals.</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderLeft: '3px solid #12ABDB', padding: '12px 14px', borderRadius: '4px' }}>
                  <strong style={{ display: 'block', fontSize: '0.9rem' }}>Direct Business Consultation</strong>
                  <span style={{ fontSize: '0.8rem', color: '#CFE4F5' }}>+91 8610662871 &middot; belintan07@gmail.com</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a
                  href="?view=pricing"
                  className="cg-btn-outline"
                  style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                  onClick={(e) => handleFooterViewClick(e, 'pricing')}
                >
                  <span>View Pricing Tiers &rarr;</span>
                </a>
                <a
                  href="?view=templates"
                  className="cg-btn-outline"
                  style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                  onClick={(e) => handleFooterViewClick(e, 'templates')}
                >
                  <span>Open Software Studio &rarr;</span>
                </a>
              </div>
            </div>

            <div className="cg-card" style={{ borderTop: '4px solid #0070AD' }}>
              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: '1.35rem' }}>Start Your Project</h3>
                <p style={{ margin: '0 0 16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Direct inquiry for corporate websites, digital marketing campaigns, or business portals.
                </p>
              </div>

              {toast && (
                <div
                  role="status"
                  style={{
                    marginBottom: '12px',
                    padding: '10px 14px',
                    borderRadius: '4px',
                    background: '#EBF5FB',
                    border: '1px solid #C5E1F2',
                    color: '#005A8D',
                    fontSize: '0.86rem',
                    fontWeight: 600
                  }}
                >
                  {toast}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  className="cg-input"
                  placeholder="Full Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  ref={emailInputRef}
                  type="email"
                  className="cg-input"
                  placeholder="Work / Personal Email *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  className="cg-input"
                  placeholder="WhatsApp / Phone Number (Optional)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label htmlFor="contact-timeline" className="cg-label">
                      Target Timeline
                    </label>
                    <input
                      id="contact-timeline"
                      type="text"
                      className="cg-input"
                      placeholder="e.g. 2–4 weeks"
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-city" className="cg-label">
                      Estimated Budget / City
                    </label>
                    <input
                      id="contact-city"
                      type="text"
                      className="cg-input"
                      placeholder="e.g. ₹15,000 / Chennai"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                  </div>
                </div>
                <select
                  className="cg-input"
                  value={form.scope}
                  onChange={(e) => setForm({ ...form, scope: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Select Business Scope / Service *
                  </option>
                  <option value="Starter Landing Page">Starter Landing Page (&#8377;4,499)</option>
                  <option value="Corporate Business Website">Corporate Business Website (&#8377;8,999)</option>
                  <option value="Digital Marketing & SEO Bundle">Digital Marketing &amp; SEO Bundle (&#8377;13,499)</option>
                  <option value="CRM / HRMS / Clinic Business Portal">Business Portal (CRM / HRMS / Clinic System)</option>
                </select>
                <textarea
                  className="cg-input"
                  rows={3}
                  placeholder="Briefly describe your business goals, service requirements, or timeline..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <StarBorder
                  type="submit"
                  color="#FFFFFF"
                  trailColor="#8CE2FF"
                  duration={3.6}
                  stars={2}
                  trailLength={0.35}
                  thickness={1.5}
                  radius={999}
                  glow={0.7}
                  sparkle
                  hover="brighten"
                  clickPulse
                  theme="dark"
                  backgroundColor="#0070AD"
                  textColor="#FFFFFF"
                  borderColor="rgba(18, 171, 219, 0.55)"
                  style={{ width: '100%' }}
                >
                  <span>Send Project Request</span>
                  <ArrowRight size={15} />
                </StarBorder>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="cg-btn-outline"
                  style={{
                    justifyContent: 'center',
                    background: '#F0F7FC',
                    color: '#0070AD',
                    borderColor: '#B5DAF0'
                  }}
                >
                  <span>Prefer WhatsApp? Chat Instantly &rarr;</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="cg-footer" role="contentinfo">
        <div className="cg-container">
          <div className="cg-grid-4" style={{ marginTop: 0 }}>
            <div>
              <h4 style={{ textTransform: 'uppercase', fontSize: '0.88rem', letterSpacing: '0.06em', margin: '0 0 12px' }}>
                Solutions
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 1.9, fontSize: '0.9rem' }}>
                <li>
                  <a
                    href="?view=templates"
                    className="cg-arrow-btn"
                    onClick={(e) => handleFooterViewClick(e, 'templates')}
                  >
                    Templates &amp; Studio
                  </a>
                </li>
                <li>
                  <a href="#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    Corporate Websites
                  </a>
                </li>
                <li>
                  <a href="#insights" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    Business Portals
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ textTransform: 'uppercase', fontSize: '0.88rem', letterSpacing: '0.06em', margin: '0 0 12px' }}>
                Business Focus
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 1.9, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <li>Corporate Brand Presence</li>
                <li>Digital Marketing &amp; SEO</li>
                <li>CRM &middot; HRMS &middot; Clinic Systems</li>
              </ul>
            </div>

            <div>
              <h4 style={{ textTransform: 'uppercase', fontSize: '0.88rem', letterSpacing: '0.06em', margin: '0 0 12px' }}>
                Connect
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 1.9, fontSize: '0.9rem' }}>
                <li>
                  <a href="https://wa.me/918610662871" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    Chat on WhatsApp
                  </a>
                </li>
                <li>
                  <a href="mailto:belintan07@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    belintan07@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+918610662871" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    +91 8610662871
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ textTransform: 'uppercase', fontSize: '0.88rem', letterSpacing: '0.06em', margin: '0 0 12px' }}>
                Profile
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 1.9, fontSize: '0.9rem' }}>
                <li>
                  <a
                    href="?view=pricing"
                    className="cg-arrow-btn"
                    onClick={(e) => handleFooterViewClick(e, 'pricing')}
                  >
                    Packages &amp; Pricing
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/belintanben" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    LinkedIn Profile ↗
                  </a>
                </li>
                <li>
                  <a href="#contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    Request Business Quote
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="cg-footer-bottom">
            <div>&copy; 2026 BELINTAN B. All rights reserved. Crafted in Chennai, Tamil Nadu, India.</div>
            <div style={{ color: '#8CE2FF', fontWeight: 600 }}>● Available for Corporate Websites, Marketing &amp; Business Portals</div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ==========================================================================
   11. Universal Cursor Spotlight & Follower Overlay
   ========================================================================== */
function CursorEffects() {
  const auraRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return undefined;

    const auraEl = auraRef.current;
    const ringEl = ringRef.current;
    const dotEl = dotRef.current;
    if (!auraEl || !ringEl || !dotEl) return undefined;

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let auraX = -200;
    let auraY = -200;
    let visible = false;
    let pressed = false;
    let raf = 0;
    let currentCard = null;

    const INTERACTIVE_SEL =
      'a, button, [role="tab"], [role="button"], .star-border, .cg-nav-link, .cg-arrow-btn, .cg-mode-btn, .cg-role-card, .logoloop__content';
    const CARD_SEL =
      '.cg-card, .cg-service-card, .cg-pricing-card, .cg-svp-banner, .cg-svp-feature, .cg-featured-split, .cg-loop-stage, .cg-fig-stage, .cg-about-box, .cg-metric-box, .cg-hero';
    const INPUT_SEL = 'input, select, textarea';

    const syncState = (target) => {
      let state = 'default';
      if (target instanceof Element) {
        if (target.closest(INPUT_SEL)) {
          state = 'input';
        } else if (target.closest(INTERACTIVE_SEL)) {
          state = 'action';
        } else if (target.closest(CARD_SEL)) {
          state = 'card';
        }
      }
      ringEl.setAttribute('data-state', state);
      dotEl.setAttribute('data-state', state);
    };

    const tick = () => {
      raf = 0;
      if (!visible) return;
      ringX += (mouseX - ringX) * 0.24;
      ringY += (mouseY - ringY) * 0.24;
      auraX += (mouseX - auraX) * 0.14;
      auraY += (mouseY - auraY) * 0.14;

      dotEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ringEl.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;
      auraEl.style.transform = `translate3d(${auraX.toFixed(2)}px, ${auraY.toFixed(2)}px, 0) translate(-50%, -50%)`;

      if (Math.abs(mouseX - auraX) > 0.25 || Math.abs(mouseY - auraY) > 0.25) {
        raf = requestAnimationFrame(tick);
      }
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      visible = false;
      auraEl.removeAttribute('data-visible');
      ringEl.removeAttribute('data-visible');
      dotEl.removeAttribute('data-visible');
      if (currentCard) {
        currentCard.removeAttribute('data-spotlight-active');
        currentCard = null;
      }
    };

    const onMove = (e) => {
      if (e.target instanceof Element && e.target.closest('iframe')) {
        onLeave();
        return;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        ringX = mouseX;
        ringY = mouseY;
        auraX = mouseX;
        auraY = mouseY;
        visible = true;
        auraEl.setAttribute('data-visible', 'true');
        ringEl.setAttribute('data-visible', 'true');
        dotEl.setAttribute('data-visible', 'true');
      }
      syncState(e.target);

      const card = e.target instanceof Element ? e.target.closest(CARD_SEL) : null;
      if (currentCard && currentCard !== card) {
        currentCard.removeAttribute('data-spotlight-active');
      }
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${(e.clientX - rect.left).toFixed(1)}px`);
        card.style.setProperty('--my', `${(e.clientY - rect.top).toFixed(1)}px`);
        card.setAttribute('data-spotlight-active', 'true');
      }
      currentCard = card;
      wake();
    };

    const onDown = () => {
      pressed = true;
      ringEl.setAttribute('data-pressed', 'true');
      dotEl.setAttribute('data-pressed', 'true');
    };

    const onUp = () => {
      if (!pressed) return;
      pressed = false;
      ringEl.removeAttribute('data-pressed');
      dotEl.removeAttribute('data-pressed');
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      if (currentCard) currentCard.removeAttribute('data-spotlight-active');
    };
  }, []);

  return (
    <>
      <div ref={auraRef} className="cg-cursor-aura" aria-hidden="true" />
      <div ref={ringRef} className="cg-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cg-cursor-dot" aria-hidden="true" />
    </>
  );
}

/* ==========================================================================
   12. Unified Root Application
   ========================================================================== */
export default function App() {
  const [activePage, setActivePage] = useState(() => parseViewFromLocation());
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('belintan_theme') || 'light';
    } catch {
      return 'light';
    }
  });
  const pricingHeadingRef = useRef(null);
  const templatesHeadingRef = useRef(null);
  const pendingRevealRef = useRef(null);

  useEffect(() => {
    const onPopState = () => {
      const next = parseViewFromLocation();
      pendingRevealRef.current = next === 'pricing' || next === 'templates' ? next : null;
      setActivePage(next);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (pendingRevealRef.current !== activePage) return;
    pendingRevealRef.current = null;
    const targetHeading =
      activePage === 'pricing'
        ? pricingHeadingRef.current
        : activePage === 'templates'
          ? templatesHeadingRef.current
          : null;
    if (targetHeading) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        targetHeading.scrollIntoView({ behavior: 'auto', block: 'start' });
        targetHeading.focus({ preventScroll: true });
      });
    } else if (activePage === 'home') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [activePage]);

  const navigateToPage = (nextPage, options = {}) => {
    const { revealHeading = true } = options;
    const targetUrl = buildViewUrl(nextPage);
    if (typeof window !== 'undefined' && window.location.pathname + window.location.search !== targetUrl) {
      window.history.pushState({ view: nextPage }, '', targetUrl);
    }
    pendingRevealRef.current = revealHeading ? nextPage : null;
    setActivePage(nextPage);
    if (revealHeading && nextPage === activePage) {
      const targetHeading =
        nextPage === 'pricing'
          ? pricingHeadingRef.current
          : nextPage === 'templates'
            ? templatesHeadingRef.current
            : null;
      if (targetHeading) {
        pendingRevealRef.current = null;
        window.scrollTo({ top: 0, behavior: 'auto' });
        targetHeading.scrollIntoView({ behavior: 'auto', block: 'start' });
        targetHeading.focus({ preventScroll: true });
      }
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('belintan_theme', theme);
    } catch { }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div>
      <style id="portfolio-unified-css">{APP_CSS}</style>
      <CursorEffects />
      <Navbar activePage={activePage} onNavigatePage={navigateToPage} theme={theme} toggleTheme={toggleTheme} />

      <main id="main-content">
        {activePage === 'pricing' && (
          <PricingSection headingRef={pricingHeadingRef} onBackHome={() => navigateToPage('home')} />
        )}

        {activePage === 'templates' && (
          <TemplatesStudioSection headingRef={templatesHeadingRef} onBackHome={() => navigateToPage('home')} />
        )}

        {activePage === 'home' && (
          <>
            <HeroSection />
            <TechStackSection />
            <ServicesInsightsSection onNavigatePage={navigateToPage} />
            <PricingSection />
          </>
        )}

        <ContactFooter onNavigatePage={navigateToPage} />
      </main>
    </div>
  );
}
