/**
 * IlmuEducator — Drag-and-Drop Matching Engine
 * Built by Codex as part of IlmuEducator game infrastructure.
 *
 * Usage:
 *   IlmuEducatorMatching.init(config);
 *
 * Config shape:
 *   { title: string, instruction: string, pairs: [{ id, term, definition }] }
 */

const IlmuEducatorMatching = (() => {
  let state = { config: null, matched: {}, dragging: null, complete: false };
  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function init(config) {
    // Shuffle definitions
    const shuffled = [...config.pairs].sort(() => Math.random() - 0.5);
    state = { config: { ...config, shuffledPairs: shuffled }, matched: {}, dragging: null, complete: false };
    render();
  }

  function render() {
    const app = document.getElementById('matching-app');
    if (!app || !state.config) return;

    const { title, instruction, pairs, shuffledPairs } = state.config;
    const matchedCount = Object.keys(state.matched).length;
    const progress = (matchedCount / pairs.length) * 100;

    if (state.complete) { renderComplete(); return; }

    app.innerHTML = `
      <div class="match-header">
        <h2 class="match-title">${escapeHtml(title)}</h2>
        <p class="match-instruction">${escapeHtml(instruction)}</p>
        <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
        <div class="progress-text">${matchedCount} / ${pairs.length} dipadankan / matched</div>
      </div>
      <div class="match-grid">
        <div class="terms-col">
          <h3 class="col-label">Istilah / Terms</h3>
          ${pairs.map(p => `
            <div class="term-item ${state.matched[p.id] ? 'term-matched' : ''}" 
                 id="term-${p.id}">
              ${escapeHtml(p.term)}
              ${state.matched[p.id] ? '<span class="match-tick">✓</span>' : ''}
            </div>`).join('')}
        </div>
        <div class="definitions-col">
          <h3 class="col-label">Definisi / Definitions</h3>
          ${shuffledPairs.map(p => {
            const isMatched = Object.values(state.matched).includes(p.id);
            return `
            <div class="def-item ${isMatched ? 'def-matched' : 'draggable'}"
                 id="def-${p.id}"
                 draggable="${!isMatched}"
                 ${!isMatched ? `
                   ondragstart="IlmuEducatorMatching.dragStart(${p.id})"
                   ondragend="IlmuEducatorMatching.dragEnd()"
                   onclick="IlmuEducatorMatching.tapSelect(${p.id})"
                 ` : ''}>
              ${escapeHtml(p.definition)}
              ${isMatched ? '<span class="match-tick">✓</span>' : ''}
            </div>`;
          }).join('')}
        </div>
      </div>
    `;

    // Set up drop targets on terms
    pairs.forEach(p => {
      const termEl = document.getElementById(`term-${p.id}`);
      if (termEl && !state.matched[p.id]) {
        termEl.setAttribute('ondragover', 'IlmuEducatorMatching.dragOver(event)');
        termEl.setAttribute('ondrop', `IlmuEducatorMatching.drop(event, ${p.id})`);
        termEl.setAttribute('onclick', `IlmuEducatorMatching.tapTarget(${p.id})`);
      }
    });
  }

  let tapSelected = null;

  function tapSelect(defId) {
    // Mobile fallback: tap term then tap definition
    tapSelected = defId;
    document.querySelectorAll('.def-item').forEach(el => el.classList.remove('tap-selected'));
    const el = document.getElementById(`def-${defId}`);
    if (el) el.classList.add('tap-selected');
  }

  function tapTarget(termId) {
    if (tapSelected === null) return;
    attemptMatch(termId, tapSelected);
    tapSelected = null;
    document.querySelectorAll('.def-item').forEach(el => el.classList.remove('tap-selected'));
  }

  function dragStart(defId) { state.dragging = defId; }
  function dragEnd() { state.dragging = null; }
  function dragOver(e) { e.preventDefault(); }

  function drop(e, termId) {
    e.preventDefault();
    if (state.dragging === null) return;
    attemptMatch(termId, state.dragging);
    state.dragging = null;
  }

  function attemptMatch(termId, defId) {
    if (termId === defId) {
      // Correct!
      state.matched[termId] = defId;
      flashFeedback('correct');
      if (Object.keys(state.matched).length === state.config.pairs.length) {
        setTimeout(() => { state.complete = true; render(); }, 600);
      } else {
        render();
      }
    } else {
      // Wrong
      flashFeedback('wrong');
    }
  }

  function flashFeedback(type) {
    const app = document.getElementById('matching-app');
    const flash = document.createElement('div');
    flash.className = `flash-feedback flash-${type}`;
    flash.textContent = type === 'correct' ? '✓ Betul! / Correct!' : '✗ Cuba lagi! / Try again!';
    app.appendChild(flash);
    setTimeout(() => flash.remove(), 1000);
  }

  function renderComplete() {
    const app = document.getElementById('matching-app');
    const total = state.config.pairs.length;
    app.innerHTML = `
      <div class="results-screen">
        <div class="results-icon">🎉</div>
        <h2 class="results-title">Tahniah! / Congratulations!</h2>
        <div class="score-circle">
          <div class="score-num">${total}/${total}</div>
          <div class="score-pct">100%</div>
        </div>
        <p class="results-sub">${escapeHtml(state.config.title)}</p>
        <button class="retry-btn" onclick="IlmuEducatorMatching.restart()">Cuba Semula / Try Again</button>
      </div>
    `;

    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'MATCHING_COMPLETE',
        results: { total, title: state.config.title }
      }, '*');
    }
  }

  function restart() {
    const config = state.config;
    init({ title: config.title, instruction: config.instruction, pairs: config.pairs });
  }

  return { init, dragStart, dragEnd, dragOver, drop, tapSelect, tapTarget, restart };
})();
