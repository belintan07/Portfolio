/* =============================================
   ResumeAI v2.0 - Application Logic
   Author: Belintan B | github.com/belintan07
   
   Major Update:
   - Gemini 2.0 Flash API (upgraded from 1.5)
   - Dark/Light theme toggle
   - Analysis history with localStorage
   - PDF export via html2pdf.js
   - Copy results to clipboard
   - Particle background animation
   - Enhanced error handling
   - Model selector
   ============================================= */

// ---- State ----
let resumeText = '';
let jobDescText = '';
let apiKey = '';
let selectedModel = 'gemini-2.0-flash';
let lastAnalysisData = null;

// ---- DOM References ----
const DOM = {
  apiKeyInput:      () => document.getElementById('apiKeyInput'),
  saveApiBtn:       () => document.getElementById('saveApiBtn'),
  keyStatus:        () => document.getElementById('keyStatus'),
  resumeFile:       () => document.getElementById('resumeFile'),
  resumeTextarea:   () => document.getElementById('resumeTextarea'),
  jobDescTextarea:  () => document.getElementById('jobDescTextarea'),
  resumeCharCount:  () => document.getElementById('resumeCharCount'),
  jobCharCount:     () => document.getElementById('jobCharCount'),
  fileLoaded:       () => document.getElementById('fileLoaded'),
  fileLoadedName:   () => document.getElementById('fileLoadedName'),
  fileRemoveBtn:    () => document.getElementById('fileRemoveBtn'),
  analyzeBtn:       () => document.getElementById('analyzeBtn'),
  loading:          () => document.getElementById('loadingOverlay'),
  loadingProgress:  () => document.getElementById('loadingProgress'),
  results:          () => document.getElementById('resultsSection'),
  toast:            () => document.getElementById('toast'),
  toastMsg:         () => document.getElementById('toastMsg'),
  toastIcon:        () => document.getElementById('toastIcon'),
  newAnalysisBtn:   () => document.getElementById('newAnalysisBtn'),
  uploadZone:       () => document.getElementById('uploadZone'),
  themeToggleBtn:   () => document.getElementById('themeToggleBtn'),
  modelSelect:      () => document.getElementById('modelSelect'),
  modelLabel:       () => document.getElementById('modelLabel'),
  historyToggleBtn: () => document.getElementById('historyToggleBtn'),
  historyPanel:     () => document.getElementById('historyPanel'),
  historyCloseBtn:  () => document.getElementById('historyCloseBtn'),
  historyOverlay:   () => document.getElementById('historyOverlay'),
  historyList:      () => document.getElementById('historyList'),
  historyEmpty:     () => document.getElementById('historyEmpty'),
  clearHistoryBtn:  () => document.getElementById('clearHistoryBtn'),
  exportPdfBtn:     () => document.getElementById('exportPdfBtn'),
  copyResultsBtn:   () => document.getElementById('copyResultsBtn'),
  particleCanvas:   () => document.getElementById('particleCanvas'),
  analysisTimestamp:() => document.getElementById('analysisTimestamp'),
  analysisModel:    () => document.getElementById('analysisModel'),
};

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  loadStoredKey();
  loadTheme();
  loadModel();
  setupEventListeners();
  animateStepNumbers();
  initParticles();
  renderHistory();
});

// ---- Load Stored API Key ----
function loadStoredKey() {
  const stored = localStorage.getItem('resumeai_key');
  if (stored) {
    apiKey = stored;
    DOM.apiKeyInput().value = '••••••••••••••••••••' + stored.slice(-4);
    setKeyStatus(true);
  }
}

function setKeyStatus(active) {
  const el = DOM.keyStatus();
  if (active) {
    el.className = 'key-status active';
    el.innerHTML = '<span class="status-dot"></span> API key configured & ready';
  } else {
    el.className = 'key-status';
    el.innerHTML = '<span class="status-dot"></span> No API key saved';
  }
}

// ---- Theme ----
function loadTheme() {
  const stored = localStorage.getItem('resumeai_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', stored);
  updateThemeIcon(stored);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('resumeai_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = DOM.themeToggleBtn();
  if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// ---- Model ----
function loadModel() {
  const stored = localStorage.getItem('resumeai_model');
  if (stored) {
    selectedModel = stored;
    const select = DOM.modelSelect();
    if (select) select.value = stored;
  }
  updateModelLabel();
}

function updateModelLabel() {
  const label = DOM.modelLabel();
  if (label) {
    const modelNames = {
      'gemini-2.0-flash': 'Google Gemini 2.0 Flash',
      'gemini-2.0-flash-lite': 'Google Gemini 2.0 Flash Lite',
      'gemini-1.5-flash': 'Google Gemini 1.5 Flash',
      'gemini-1.5-pro': 'Google Gemini 1.5 Pro',
    };
    label.textContent = modelNames[selectedModel] || selectedModel;
  }
}

// ---- Setup Event Listeners ----
function setupEventListeners() {
  // Save API Key
  DOM.saveApiBtn().addEventListener('click', saveApiKey);
  DOM.apiKeyInput().addEventListener('keydown', e => e.key === 'Enter' && saveApiKey());

  // Model select
  DOM.modelSelect()?.addEventListener('change', function () {
    selectedModel = this.value;
    localStorage.setItem('resumeai_model', selectedModel);
    updateModelLabel();
    showToast(`Model switched to ${this.options[this.selectedIndex].text}`, 'success');
  });

  // Theme toggle
  DOM.themeToggleBtn()?.addEventListener('click', toggleTheme);

  // File Upload
  DOM.resumeFile().addEventListener('change', handleFileUpload);

  // File Remove
  DOM.fileRemoveBtn()?.addEventListener('click', removeFile);

  // Drag & Drop
  const zone = DOM.uploadZone();
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  });

  // Textarea character counts
  DOM.resumeTextarea().addEventListener('input', function () {
    resumeText = this.value;
    updateCharCount(DOM.resumeCharCount(), resumeText.length);
  });

  DOM.jobDescTextarea().addEventListener('input', function () {
    jobDescText = this.value;
    updateCharCount(DOM.jobCharCount(), jobDescText.length);
  });

  // Analyze
  DOM.analyzeBtn().addEventListener('click', runAnalysis);

  // New Analysis
  DOM.newAnalysisBtn()?.addEventListener('click', resetApp);

  // Export PDF
  DOM.exportPdfBtn()?.addEventListener('click', exportPDF);

  // Copy Results
  DOM.copyResultsBtn()?.addEventListener('click', copyResults);

  // History
  DOM.historyToggleBtn()?.addEventListener('click', openHistory);
  DOM.historyCloseBtn()?.addEventListener('click', closeHistory);
  DOM.historyOverlay()?.addEventListener('click', closeHistory);
  DOM.clearHistoryBtn()?.addEventListener('click', clearHistory);
}

function updateCharCount(el, count) {
  if (el) el.textContent = count > 0 ? `${count.toLocaleString()} characters` : '';
}

// ---- Save API Key ----
function saveApiKey() {
  const val = DOM.apiKeyInput().value.trim();
  if (!val || val.includes('•')) {
    if (apiKey) return; // already set, no change
    showToast('Please enter a valid Gemini API key.', 'error');
    return;
  }
  apiKey = val;
  localStorage.setItem('resumeai_key', apiKey);
  DOM.apiKeyInput().value = '••••••••••••••••••••' + apiKey.slice(-4);
  setKeyStatus(true);
  showToast('API key saved successfully! ✓', 'success');
}

// ---- File Upload ----
function handleFileUpload(e) {
  const file = e.target.files[0];
  if (file) processFile(file);
}

function removeFile() {
  resumeText = '';
  DOM.resumeTextarea().value = '';
  DOM.fileLoaded().style.display = 'none';
  DOM.resumeFile().value = '';
  updateCharCount(DOM.resumeCharCount(), 0);
  showToast('File removed.', 'success');
}

async function processFile(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (file.size > maxSize) {
    showToast('File too large. Maximum size is 10MB.', 'error');
    return;
  }

  try {
    if (ext === 'txt') {
      const text = await file.text();
      loadResumeText(text, file.name);
    } else if (ext === 'pdf') {
      showToast('Reading PDF...', 'success');
      const text = await extractPdfText(file);
      if (text.trim().length < 20) {
        showToast('PDF appears to be image-based. Try pasting text instead.', 'error');
        return;
      }
      loadResumeText(text, file.name);
    } else if (ext === 'doc' || ext === 'docx') {
      showToast('DOC/DOCX parsing requires server-side support. Please paste text instead.', 'error');
    } else {
      showToast('Unsupported file type. Please upload a .pdf or .txt file.', 'error');
    }
  } catch (err) {
    console.error('File processing error:', err);
    showToast('Could not read file. Try pasting text instead.', 'error');
  }
}

async function extractPdfText(file) {
  // Using PDF.js (loaded via CDN)
  const pdfjsLib = window['pdfjs-dist/build/pdf'];
  if (!pdfjsLib) {
    // Fallback: try reading as text
    return await file.text();
  }
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    fullText += content.items.map(item => item.str).join(' ') + '\n';
  }
  return fullText;
}

function loadResumeText(text, filename) {
  resumeText = text;
  DOM.resumeTextarea().value = text;
  updateCharCount(DOM.resumeCharCount(), text.length);
  DOM.fileLoaded().style.display = 'flex';
  DOM.fileLoadedName().textContent = filename;
  showToast(`"${filename}" loaded successfully! ✓`, 'success');
}

// ---- Analyze ----
async function runAnalysis() {
  // Collect text
  const resume = DOM.resumeTextarea().value.trim() || resumeText;
  const jobDesc = DOM.jobDescTextarea().value.trim();

  // Validate
  if (!apiKey) {
    showToast('Please enter and save your Gemini API key first.', 'error');
    DOM.apiKeyInput().focus();
    return;
  }
  if (!resume) {
    showToast('Please upload or paste your resume text.', 'error');
    return;
  }
  if (!jobDesc) {
    showToast('Please paste the job description.', 'error');
    return;
  }
  if (resume.length < 80) {
    showToast('Resume seems too short. Please add more content.', 'error');
    return;
  }

  // Show loading
  DOM.analyzeBtn().disabled = true;
  DOM.results().classList.remove('active');
  DOM.loading().classList.add('active');

  animateLoadingSteps();
  animateProgressBar();

  const startTime = Date.now();

  try {
    const data = await callGeminiAPI(resume, jobDesc);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    data._timestamp = new Date().toISOString();
    data._model = selectedModel;
    data._elapsed = elapsed;
    lastAnalysisData = data;
    displayResults(data);
    saveToHistory(data, resume, jobDesc);
    showToast(`Analysis complete in ${elapsed}s! ✓`, 'success');
  } catch (err) {
    console.error('Analysis error:', err);
    showToast(
      err.message.includes('API key') ? 'Invalid API key. Check your Gemini key.' :
      err.message.includes('quota') ? 'API quota exceeded. Try again later.' :
      err.message.includes('not found') ? `Model "${selectedModel}" not available. Try another model.` :
      'Analysis failed. Please check your API key and try again.',
      'error'
    );
  } finally {
    DOM.loading().classList.remove('active');
    DOM.analyzeBtn().disabled = false;
    const progress = DOM.loadingProgress();
    if (progress) progress.style.width = '0%';
  }
}

// ---- Gemini API Call ----
async function callGeminiAPI(resume, jobDesc) {
  const prompt = `You are an expert ATS (Applicant Tracking System) specialist and senior HR professional with 15+ years of experience in tech recruitment. Analyze the resume against the job description with extreme precision and provide brutally honest, actionable feedback.

RESUME:
${resume}

JOB DESCRIPTION:
${jobDesc}

Provide a comprehensive, detailed analysis. Return ONLY valid JSON (no markdown, no code blocks, no extra text):

{
  "overallScore": <integer 0-100, honest assessment of how well this resume matches the JD>,
  "atsScore": <integer 0-100, ATS compatibility based on formatting, keywords, structure>,
  "skillsMatchScore": <integer 0-100, technical and soft skills match>,
  "experienceMatchScore": <integer 0-100, experience relevance and depth>,
  "recommendation": "<exactly one of: Strong Match|Good Match|Fair Match|Weak Match>",
  "summary": "<3-4 concise sentences summarizing the overall match, key strengths, and critical gaps>",
  "matchedKeywords": [<array of strings, keywords/skills found in both resume and JD, max 18>],
  "missingKeywords": [<array of strings, important keywords from JD missing in resume, max 15>],
  "strengths": [<array of 5-7 specific strength strings, be detailed>],
  "improvements": [
    {"title": "<short title>", "description": "<2-3 sentence actionable advice with specific examples>"}
  ],
  "atsIssues": [<array of 4-6 specific ATS formatting/content issues>],
  "recommendedSkills": [<array of 8-10 skills to learn/add for this role>],
  "tailoredSummary": "<A 3-4 sentence professionally written resume summary/objective tailored specifically for this job description that the candidate can directly use>"
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.15,
          topK: 40,
          topP: 0.92,
          maxOutputTokens: 4096,
        }
      })
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const msg = errData?.error?.message || `HTTP ${response.status}`;
    if (response.status === 400) throw new Error('API key invalid: ' + msg);
    if (response.status === 404) throw new Error('Model not found: ' + msg);
    if (response.status === 429) throw new Error('quota exceeded');
    throw new Error(msg);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('No response from API');

  // Strip any markdown code fences if present
  const cleaned = rawText
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    // Try to extract JSON object
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Invalid JSON response from AI');
  }
}

// ---- Display Results ----
function displayResults(data) {
  // Recommendation badge
  const recEl = document.getElementById('recommendationBadge');
  const recMap = {
    'Strong Match': 'rec-strong',
    'Good Match': 'rec-good',
    'Fair Match': 'rec-fair',
    'Weak Match': 'rec-weak'
  };
  recEl.textContent = data.recommendation || 'Analyzed';
  recEl.className = 'recommendation-badge ' + (recMap[data.recommendation] || 'rec-fair');

  // Timestamp & model
  const tsEl = DOM.analysisTimestamp();
  const modelEl = DOM.analysisModel();
  if (tsEl) tsEl.textContent = `🕐 ${formatDate(data._timestamp || new Date().toISOString())}`;
  if (modelEl) {
    const modelNames = {
      'gemini-2.0-flash': 'Gemini 2.0 Flash',
      'gemini-2.0-flash-lite': 'Gemini 2.0 Flash Lite',
      'gemini-1.5-flash': 'Gemini 1.5 Flash',
      'gemini-1.5-pro': 'Gemini 1.5 Pro',
    };
    modelEl.textContent = `🤖 ${modelNames[data._model] || data._model || selectedModel}` +
      (data._elapsed ? ` · ${data._elapsed}s` : '');
  }

  // Summary
  document.getElementById('summaryText').textContent = data.summary || '';

  // Scores
  animateScore('overallScore', data.overallScore || 0, 'fill-overall');
  animateScore('atsScore', data.atsScore || 0, 'fill-ats');
  animateScore('skillsScore', data.skillsMatchScore || 0, 'fill-skills');
  animateScore('expScore', data.experienceMatchScore || 0, 'fill-exp');

  // Keywords
  renderTags('matchedTags', data.matchedKeywords || [], 'matched');
  renderTags('missingTags', data.missingKeywords || [], 'missing');
  document.getElementById('matchedCount').textContent = (data.matchedKeywords || []).length;
  document.getElementById('missingCount').textContent = (data.missingKeywords || []).length;

  // Strengths
  const strengthList = document.getElementById('strengthList');
  strengthList.innerHTML = (data.strengths || []).map((s, i) =>
    `<li class="strength-item" style="animation-delay:${i * 0.08}s">
      <span class="s-dot"></span><span>${escapeHtml(s)}</span>
    </li>`
  ).join('');

  // Improvements
  const improveList = document.getElementById('improveList');
  improveList.innerHTML = (data.improvements || []).map((imp, i) =>
    `<li class="improve-item" style="animation-delay:${i * 0.08}s">
      <div class="improve-title">💡 ${escapeHtml(imp.title || '')}</div>
      <div class="improve-desc">${escapeHtml(imp.description || '')}</div>
    </li>`
  ).join('');

  // ATS Issues
  const atsList = document.getElementById('atsList');
  atsList.innerHTML = (data.atsIssues || []).map(issue =>
    `<li class="ats-item">
      <span class="warn-icon">⚠️</span>
      <span>${escapeHtml(issue)}</span>
    </li>`
  ).join('');

  // Recommended Skills
  const recSkills = document.getElementById('recSkills');
  recSkills.innerHTML = (data.recommendedSkills || []).map(skill =>
    `<span class="rec-skill-tag">${escapeHtml(skill)}</span>`
  ).join('');

  // Tailored Summary
  const tailoredEl = document.getElementById('tailoredText');
  if (tailoredEl) {
    tailoredEl.textContent = data.tailoredSummary || 'No tailored summary generated.';
  }

  // Show results
  DOM.results().classList.add('active');

  // Scroll to results
  setTimeout(() => {
    DOM.results().scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 300);
}

// ---- Animate Score Ring ----
function animateScore(elemId, score, fillClass) {
  const container = document.getElementById(elemId);
  if (!container) return;

  const valueEl = container.querySelector('.score-value');
  const fill = container.querySelector('.fill');

  const circumference = 251.2;
  const clampedScore = Math.max(0, Math.min(100, score));
  const offset = circumference - (clampedScore / 100) * circumference;

  // Animate number count
  let current = 0;
  const duration = 1800;
  const step = clampedScore / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, clampedScore);
    if (valueEl) valueEl.textContent = Math.round(current);
    if (current >= clampedScore) clearInterval(timer);
  }, 16);

  // Animate ring
  setTimeout(() => {
    if (fill) fill.style.strokeDashoffset = offset;
  }, 100);
}

// ---- Render Keyword Tags ----
function renderTags(containerId, keywords, type) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = keywords.map((kw, i) =>
    `<span class="kw-tag ${type}" style="animation-delay:${i * 0.04}s">${escapeHtml(kw)}</span>`
  ).join('');
}

// ---- Animate Loading Steps ----
function animateLoadingSteps() {
  const steps = document.querySelectorAll('.loading-step');
  let i = 0;
  steps.forEach(s => { s.className = 'loading-step'; });

  const interval = setInterval(() => {
    if (i > 0) steps[i - 1]?.classList.replace('active', 'done');
    if (i < steps.length) {
      steps[i]?.classList.add('active');
      i++;
    } else {
      clearInterval(interval);
    }
  }, 700);
}

function animateProgressBar() {
  const el = DOM.loadingProgress();
  if (!el) return;
  el.style.width = '0%';
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 8 + 2;
    if (progress >= 90) {
      clearInterval(interval);
      progress = 90;
    }
    el.style.width = progress + '%';
  }, 400);

  // Store interval so we can complete it
  el._interval = interval;
}

// ---- Reset App ----
function resetApp() {
  resumeText = '';
  jobDescText = '';
  DOM.resumeTextarea().value = '';
  DOM.jobDescTextarea().value = '';
  DOM.fileLoaded().style.display = 'none';
  DOM.resumeFile().value = '';
  updateCharCount(DOM.resumeCharCount(), 0);
  updateCharCount(DOM.jobCharCount(), 0);
  DOM.results().classList.remove('active');
  lastAnalysisData = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Animate Step Numbers (hero counter) ----
function animateStepNumbers() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.round(current) + (el.dataset.suffix || '');
          if (current >= target) clearInterval(timer);
        }, 16);
        observer.unobserve(el);
      }
    });
  });
  counters.forEach(el => observer.observe(el));
}

// ---- Particle Background ----
function initParticles() {
  const canvas = DOM.particleCanvas();
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(50, Math.floor(window.innerWidth / 25));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const theme = document.documentElement.getAttribute('data-theme');
    const color = theme === 'light' ? '139, 92, 246' : '139, 92, 246';

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
      ctx.fill();

      // Draw lines between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${color}, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    animFrame = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

// ---- History ----
function getHistory() {
  try {
    return JSON.parse(localStorage.getItem('resumeai_history') || '[]');
  } catch {
    return [];
  }
}

function saveToHistory(data, resume, jobDesc) {
  const history = getHistory();
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    timestamp: data._timestamp || new Date().toISOString(),
    model: data._model || selectedModel,
    overallScore: data.overallScore || 0,
    recommendation: data.recommendation || 'N/A',
    summary: data.summary || '',
    data: data,
    resumeSnippet: (resume || '').slice(0, 100),
    jobSnippet: (jobDesc || '').slice(0, 100),
  };
  history.unshift(entry);
  // Keep only latest 20
  if (history.length > 20) history.length = 20;
  localStorage.setItem('resumeai_history', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const list = DOM.historyList();
  const empty = DOM.historyEmpty();
  const history = getHistory();

  if (!list) return;

  if (history.length === 0) {
    if (empty) empty.style.display = 'block';
    // Remove all history items but keep the empty message
    list.querySelectorAll('.history-item').forEach(el => el.remove());
    return;
  }

  if (empty) empty.style.display = 'none';

  // Clear existing items
  list.querySelectorAll('.history-item').forEach(el => el.remove());

  history.forEach(entry => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.setAttribute('data-id', entry.id);

    const recMap = {
      'Strong Match': 'rec-strong',
      'Good Match': 'rec-good',
      'Fair Match': 'rec-fair',
      'Weak Match': 'rec-weak'
    };

    item.innerHTML = `
      <div class="history-item-header">
        <span class="history-item-score">${entry.overallScore}/100</span>
        <span class="history-item-badge ${recMap[entry.recommendation] || 'rec-fair'}">${escapeHtml(entry.recommendation)}</span>
        <button class="history-item-delete" data-id="${entry.id}" aria-label="Delete this entry" title="Delete">🗑️</button>
      </div>
      <div class="history-item-date">${formatDate(entry.timestamp)} · ${entry.model || 'unknown'}</div>
      <div class="history-item-summary">${escapeHtml(entry.summary)}</div>
    `;

    // Click to restore
    item.addEventListener('click', (e) => {
      if (e.target.closest('.history-item-delete')) return;
      displayResults(entry.data);
      closeHistory();
      DOM.results().classList.add('active');
      setTimeout(() => {
        DOM.results().scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    });

    // Delete button
    const delBtn = item.querySelector('.history-item-delete');
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteHistoryEntry(entry.id);
    });

    list.appendChild(item);
  });
}

function deleteHistoryEntry(id) {
  let history = getHistory();
  history = history.filter(e => e.id !== id);
  localStorage.setItem('resumeai_history', JSON.stringify(history));
  renderHistory();
  showToast('Entry deleted.', 'success');
}

function clearHistory() {
  localStorage.removeItem('resumeai_history');
  renderHistory();
  showToast('History cleared.', 'success');
}

function openHistory() {
  DOM.historyPanel()?.classList.add('open');
  DOM.historyOverlay()?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeHistory() {
  DOM.historyPanel()?.classList.remove('open');
  DOM.historyOverlay()?.classList.remove('active');
  document.body.style.overflow = '';
}

// ---- Export PDF ----
function exportPDF() {
  const section = DOM.results();
  if (!section || !section.classList.contains('active')) {
    showToast('No analysis results to export.', 'error');
    return;
  }

  showToast('Generating PDF...', 'success');

  const opt = {
    margin: [10, 10, 10, 10],
    filename: `ResumeAI_Report_${new Date().toISOString().slice(0, 10)}.pdf`,
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: '#0f0f24' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  // Clone and style for PDF
  const clone = section.cloneNode(true);
  clone.style.display = 'block';
  clone.style.padding = '20px';
  clone.style.background = '#0f0f24';
  clone.style.color = '#f1f5f9';

  // Remove action bar from clone
  const actionBar = clone.querySelector('.action-bar');
  if (actionBar) actionBar.remove();

  html2pdf().set(opt).from(clone).save().then(() => {
    showToast('PDF exported successfully! ✓', 'success');
  }).catch(err => {
    console.error('PDF export error:', err);
    showToast('PDF export failed.', 'error');
  });
}

// ---- Copy Results ----
function copyResults() {
  if (!lastAnalysisData) {
    showToast('No analysis results to copy.', 'error');
    return;
  }

  const d = lastAnalysisData;
  const text = `
═══════════════════════════════════════
  ResumeAI Analysis Report
  Generated: ${formatDate(d._timestamp || new Date().toISOString())}
  Model: ${d._model || selectedModel}
═══════════════════════════════════════

📊 SCORES
  Overall Match: ${d.overallScore}/100
  ATS Score: ${d.atsScore}/100
  Skills Match: ${d.skillsMatchScore}/100
  Experience: ${d.experienceMatchScore}/100
  Verdict: ${d.recommendation}

📝 SUMMARY
${d.summary}

✅ MATCHED KEYWORDS (${(d.matchedKeywords||[]).length})
${(d.matchedKeywords||[]).join(', ')}

❌ MISSING KEYWORDS (${(d.missingKeywords||[]).length})
${(d.missingKeywords||[]).join(', ')}

💪 STRENGTHS
${(d.strengths||[]).map((s,i) => `  ${i+1}. ${s}`).join('\n')}

🚀 IMPROVEMENTS
${(d.improvements||[]).map((imp,i) => `  ${i+1}. ${imp.title}: ${imp.description}`).join('\n')}

⚠️ ATS ISSUES
${(d.atsIssues||[]).map((a,i) => `  ${i+1}. ${a}`).join('\n')}

📚 RECOMMENDED SKILLS
${(d.recommendedSkills||[]).join(', ')}

✍️ TAILORED SUMMARY
${d.tailoredSummary || 'N/A'}

───────────────────────────────────────
Powered by ResumeAI | github.com/belintan07
`.trim();

  navigator.clipboard.writeText(text).then(() => {
    showToast('Results copied to clipboard! ✓', 'success');
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Results copied to clipboard! ✓', 'success');
  });
}

// ---- Toast ----
function showToast(message, type = 'error') {
  const toast = DOM.toast();
  const msg = DOM.toastMsg();
  const icon = DOM.toastIcon();
  toast.className = 'toast show' + (type === 'success' ? ' success' : '');
  msg.textContent = message;
  if (icon) icon.textContent = type === 'success' ? '✅' : '⚠️';
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 4000);
}

// ---- Utility ----
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(isoString) {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  } catch {
    return isoString;
  }
}
