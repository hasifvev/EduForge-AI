/**
 * EduHelp AI — MCQ Quiz Engine
 * Built by Codex as part of EduHelp AI game infrastructure.
 *
 * Usage:
 *   EduHelpQuiz.init(config);
 *
 * Config shape:
 *   { title: string, questions: [{ id, question, options, correct, explanation }] }
 */

const EduHelpQuiz = (() => {
  let state = { config: null, current: 0, score: 0, answers: [], started: false };
  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function init(config) {
    state = { config, current: 0, score: 0, answers: [], started: true };
    render();
  }

  function render() {
    const app = document.getElementById('quiz-app');
    if (!app) return;

    if (!state.started || !state.config) { app.innerHTML = '<p>Loading...</p>'; return; }

    const q = state.config.questions;
    if (state.current >= q.length) { renderResults(); return; }

    const question = q[state.current];
    const progress = ((state.current) / q.length) * 100;

    app.innerHTML = `
      <div class="quiz-header">
        <h2 class="quiz-title">${escapeHtml(state.config.title)}</h2>
        <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
        <div class="progress-text">${state.current + 1} / ${q.length}</div>
      </div>
      <div class="question-card">
        <p class="question-text">${escapeHtml(question.question)}</p>
        <div class="options-grid">
          ${question.options.map((opt, i) => `
            <button class="option-btn" id="opt-${i}" onclick="EduHelpQuiz.select(${i})">
              ${opt}
            </button>`).join('')}
        </div>
        <div id="feedback-box" class="feedback-box hidden"></div>
      </div>
    `;
  }

  function select(index) {
    const question = state.config.questions[state.current];
    const chosen = question.options[index];
    const isCorrect = chosen === question.correct;

    // Disable all buttons
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
      btn.disabled = true;
      if (question.options[i] === question.correct) btn.classList.add('correct');
      else if (i === index && !isCorrect) btn.classList.add('wrong');
    });

    // Show feedback
    const fb = document.getElementById('feedback-box');
    fb.classList.remove('hidden');
    fb.className = `feedback-box ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`;
    fb.innerHTML = `
      <div class="feedback-icon">${isCorrect ? '✓' : '✗'}</div>
      <div class="feedback-text">
        <strong>${isCorrect ? 'Betul! / Correct!' : 'Salah. / Incorrect.'}</strong>
        <p>${escapeHtml(question.explanation)}</p>
      </div>
      <button class="next-btn" onclick="EduHelpQuiz.next()">
        ${state.current + 1 < state.config.questions.length ? 'Seterusnya / Next →' : 'Lihat Keputusan / See Results'}
      </button>
    `;

    if (isCorrect) state.score++;
    state.answers.push({ id: question.id, chosen, correct: question.correct, isCorrect });
  }

  function next() {
    state.current++;
    render();
  }

  function renderResults() {
    const app = document.getElementById('quiz-app');
    const total = state.config.questions.length;
    const pct = Math.round((state.score / total) * 100);
    const grade = pct >= 80 ? '🌟 Cemerlang!' : pct >= 60 ? '👍 Baik!' : '💪 Cuba Lagi!';

    app.innerHTML = `
      <div class="results-screen">
        <div class="results-icon">${grade}</div>
        <h2 class="results-title">Keputusan / Results</h2>
        <div class="score-circle">
          <div class="score-num">${state.score}/${total}</div>
          <div class="score-pct">${pct}%</div>
        </div>
        <div class="results-bar">
          <div class="results-fill" style="width:0%" id="res-fill"></div>
        </div>
        <p class="results-sub">${escapeHtml(state.config.title)}</p>
        <button class="retry-btn" onclick="EduHelpQuiz.restart()">Cuba Semula / Try Again</button>
      </div>
    `;

    setTimeout(() => {
      const fill = document.getElementById('res-fill');
      if (fill) fill.style.width = pct + '%';
    }, 100);

    if (pct >= 80) launchConfetti();

    // Post results to parent window for performance analysis
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'QUIZ_COMPLETE',
        results: { score: state.score, total, pct, answers: state.answers, title: state.config.title }
      }, '*');
    }
  }

  function restart() {
    state = { ...state, current: 0, score: 0, answers: [], started: true };
    render();
  }

  function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 8 + 4,
      d: Math.random() * 120,
      color: ['#4F6EF7','#22C55E','#FBBF24','#F97316','#EC4899'][Math.floor(Math.random()*5)],
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltAngleIncrement: (Math.random() * 0.07) + 0.05,
    }));

    let angle = 0;
    let frame = 0;
    const maxFrames = 200;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.01;
      frame++;
      pieces.forEach(p => {
        p.tiltAngle += p.tiltAngleIncrement;
        p.y += (Math.cos(angle + p.d) + 1 + p.r / 2) * 2;
        p.tilt = Math.sin(p.tiltAngle - p.d / 3) * 15;
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
      });
      if (frame < maxFrames) requestAnimationFrame(draw);
      else canvas.remove();
    }
    draw();
  }

  return { init, select, next, restart };
})();
