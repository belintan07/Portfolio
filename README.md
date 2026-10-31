# 🎯 ResumeAI v2.0 — AI-Powered Resume Analyzer

> Built by **[Belintan B](https://github.com/belintan07)** | MBA Graduate · Certified Frontend Developer · AI-Powered Web Solutions

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20App-8b5cf6?style=for-the-badge&logo=vercel)](https://belintan07.github.io/resume-ai)
[![Google Gemini](https://img.shields.io/badge/Powered%20by-Gemini%202.0%20Flash-06b6d4?style=for-the-badge&logo=google)](https://ai.google.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

---

## 🆕 What's New in v2.0

| Feature | Description |
|---|---|
| 🤖 **Gemini 2.0 Flash** | Upgraded from 1.5 to the latest Gemini 2.0 Flash model |
| 🌓 **Dark/Light Theme** | Toggle between dark and light themes with smooth transitions |
| 📋 **Analysis History** | All past analyses saved locally, viewable in a slide-out panel |
| 📄 **PDF Export** | Export your analysis report as a professional PDF document |
| 📋 **Copy Results** | One-click copy of formatted results to clipboard |
| 🎨 **Model Selector** | Choose between Gemini 2.0 Flash, Flash Lite, 1.5 Flash, or 1.5 Pro |
| ✍️ **Tailored Summary** | AI-generated resume summary tailored to the specific job |
| ✨ **Particle Background** | Animated particle network with connected nodes |
| 📊 **Progress Bar** | Real-time loading progress bar during analysis |
| 🐛 **Bug Fixes** | Better error handling, PDF validation, file remove, and more |

---

## 🚀 What is ResumeAI?

**ResumeAI** is a browser-based AI tool that analyzes your resume against any job description in seconds.  
It gives you **honest, actionable feedback** so you can tailor your resume, beat ATS filters, and land more interviews.

### ✨ Key Features

| Feature | Description |
|---|---|
| 📊 **Match Score** | Overall, ATS, Skills & Experience scores (0–100) |
| 🔍 **Keyword Analysis** | Matched vs. Missing keywords from the JD |
| 💪 **Strengths** | What you're doing right |
| 🚀 **Improvements** | Specific, actionable improvement tips |
| ⚠️ **ATS Issues** | Flags formatting issues that hurt ATS ranking |
| 📚 **Skill Gaps** | Recommends skills to add for the target role |
| ✍️ **Tailored Summary** | AI-written resume summary for your target job |
| 📄 **PDF Support** | Upload PDF or TXT resumes, or paste text |
| 📄 **PDF Export** | Download your analysis as a PDF report |
| 📋 **History** | View and restore past analyses |
| 🌓 **Theme Toggle** | Dark and light mode with smooth transitions |
| 🔒 **100% Private** | API key stored locally — nothing sent to any server |

---

## 🛠️ Tech Stack

```
Frontend  → HTML5, Vanilla CSS (Glassmorphism + Particle Animations), JavaScript (ES6+)
AI Engine → Google Gemini 2.0 Flash API (with model selector)
PDF Parse → PDF.js (Mozilla, CDN)
PDF Export→ html2pdf.js (CDN)
Storage   → localStorage (API key, history, theme, model preference)
Deploy    → GitHub Pages / Vercel / Netlify
```

---

## 📸 Screenshots

> *Upload your resume → Paste job description → Click Analyze → Get instant insights!*

---

## 🏁 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- A **free** [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/belintan07/resume-ai.git

# 2. Open index.html in your browser
# No build step needed — pure HTML/CSS/JS!
open index.html
```

### Deploy to GitHub Pages

```bash
# 1. Push to GitHub
git add .
git commit -m "feat: ResumeAI v2.0 — Gemini 2.0, themes, history, PDF export"
git push origin main

# 2. Go to Settings → Pages → Source: main branch → / (root)
# 3. Your app is live at: https://belintan07.github.io/resume-ai
```

---

## 🔑 API Key Setup

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"** (it's free!)
4. Paste the key in the app's settings panel
5. Choose your preferred model (Gemini 2.0 Flash recommended)
6. Click **Save** — key is stored in your browser only

> **Note**: The Gemini free tier offers generous usage limits. No credit card required.

---

## 📁 Project Structure

```
resume-ai/
├── index.html       # Main application (structure + semantics)
├── styles.css       # Premium dark/light theme CSS (glassmorphism + particles)
├── app.js           # Application logic (API, file parsing, history, themes, export)
└── README.md        # This file
```

---

## 💡 How It Works

```
1. User uploads/pastes resume → PDF.js extracts text if PDF
2. User pastes job description
3. User selects Gemini model (default: 2.0 Flash)
4. On "Analyze" click → sends structured prompt to Gemini API
5. Gemini returns JSON with scores, keywords, strengths, improvements, tailored summary
6. App animates and displays results with circular progress rings
7. Results are saved to history for future reference
8. User can export PDF, copy results, or start a new analysis
```

**Gemini Prompt Strategy:**
The app sends a highly structured prompt asking Gemini to return pure JSON with:
- Numeric scores (0–100) for 4 dimensions
- Keyword arrays (matched & missing)
- Actionable improvement objects
- ATS-specific formatting issues
- A tailored resume summary for the specific job

---

## 🎨 Design Highlights

- **Dark/Light theme** with smooth CSS variable transitions
- **Glassmorphism** cards with blur, transparency, and saturation
- **Animated gradient orbs** + particle network background
- **Circular SVG progress rings** with drop-shadow glow
- **Shimmer button effect** on the analyze button
- **Slide-out history panel** with backdrop blur
- **Responsive** — works on mobile, tablet, desktop
- **Google Fonts** — Inter + Outfit + JetBrains Mono
- **Micro-animations** — hover effects, tag pop-ins, counter animations, progress bar
- **Print-optimized** layout for clean reports

---

## 🔮 Future Roadmap

- [ ] Multiple resume comparison side-by-side
- [ ] Resume builder with AI suggestions applied
- [ ] Job description scraper (paste URL)
- [ ] Skill roadmap generator
- [ ] Spring Boot backend for analytics
- [ ] Chrome extension for LinkedIn job matching
- [x] ~~Export results as PDF report~~ ✅ Done in v2.0
- [x] ~~Dark/Light theme~~ ✅ Done in v2.0
- [x] ~~Analysis history~~ ✅ Done in v2.0

---

## 👨‍💻 About the Author

**Belintan B**  
MBA Graduate · Certified Frontend Developer · AI-Powered Web Solutions  
Network Technical Support (Backend) | Java · Spring Boot · React · PostgreSQL

- 🌐 GitHub: [github.com/belintan07](https://github.com/belintan07)
- 💼 LinkedIn: [linkedin.com/in/belintanben](https://linkedin.com/in/belintanben)
- 📧 Email: belintan07@gmail.com

---

## 📄 License

MIT License — feel free to use, modify, and share with attribution.

---

<div align="center">
  <b>⭐ If this helped you, please star the repository! ⭐</b><br/>
  Made with ❤️ in Tuticorin, Tamil Nadu, India 🇮🇳
</div>
