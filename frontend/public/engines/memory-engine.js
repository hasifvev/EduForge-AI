/**
 * IlmuEducator — Memory Match Engine
 * Uses the same teacher-approved term/definition pairs as the matching activity.
 */
const IlmuEducatorMemory = (() => {
  let state = { config: null, deck: [], open: [], matched: 0, moves: 0, locked: false };

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function init(config) {
    const deck = config.pairs.flatMap((pair) => [
      { key: pair.id + '-term', pairId: pair.id, text: pair.term, kind: 'term' },
      { key: pair.id + '-definition', pairId: pair.id, text: pair.definition, kind: 'definition' },
    ]);
    state = { config, deck: shuffle(deck), open: [], matched: 0, moves: 0, locked: false };
    render();
  }

  function render() {
    const app = document.getElementById('matching-app');
    if (!app || !state.config) return;
    if (state.matched === state.config.pairs.length) return renderComplete();

    const openKeys = new Set(state.open);
    const pairs = new Set(state.deck.filter((card) => card.matched).map((card) => card.pairId));
    const cards = state.deck.map((card, index) => {
      const revealed = openKeys.has(card.key) || pairs.has(card.pairId);
      const label = revealed ? escapeHtml(card.text) : '?';
      const kind = revealed ? card.kind : 'hidden';
      return '<button class="option-btn memory-card" style="min-height:92px;text-align:center;font-size:13px;line-height:1.35;' +
        (revealed ? '' : 'font-size:28px;font-weight:700;') +
        '" ' + (revealed || state.locked ? 'disabled' : '') + ' onclick="IlmuEducatorMemory.flip(' + index + ')">' +
        '<span style="display:block;color:' + (kind === 'term' ? '#4F6EF7' : kind === 'definition' ? '#0f766e' : '#64748b') + '">' + label + '</span></button>';
    }).join('');

    app.innerHTML =
      '<div class="match-header"><h2 class="match-title">' + escapeHtml(state.config.title) + ' — Memory Match</h2>' +
      '<p class="match-instruction">Reveal a term and its matching explanation. Find every pair.</p>' +
      '<div class="progress-bar"><div class="progress-fill" style="width:' + ((state.matched / state.config.pairs.length) * 100) + '%"></div></div>' +
      '<div class="progress-text">' + state.matched + ' / ' + state.config.pairs.length + ' pairs | ' + state.moves + ' moves</div></div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;width:min(900px,100%);">' + cards + '</div>';
  }

  function flip(index) {
    if (state.locked || state.open.length === 2) return;
    const card = state.deck[index];
    state.open.push(card.key);
    if (state.open.length === 2) {
      state.moves += 1;
      const selected = state.deck.filter((entry) => state.open.includes(entry.key));
      if (selected[0].pairId === selected[1].pairId && selected[0].kind !== selected[1].kind) {
        selected.forEach((entry) => { entry.matched = true; });
        state.matched += 1;
        state.open = [];
      } else {
        state.locked = true;
        render();
        setTimeout(() => {
          state.open = [];
          state.locked = false;
          render();
        }, 850);
        return;
      }
    }
    render();
  }

  function renderComplete() {
    const app = document.getElementById('matching-app');
    app.innerHTML = '<div class="results-screen"><div class="results-icon">🏆</div><h2 class="results-title">Memory Match Complete</h2>' +
      '<div class="score-circle"><div class="score-num">' + state.matched + '/' + state.config.pairs.length + '</div><div class="score-pct">' + state.moves + ' moves</div></div>' +
      '<p class="results-sub">' + escapeHtml(state.config.title) + '</p><button class="retry-btn" onclick="IlmuEducatorMemory.restart()">Play Again</button></div>';
  }

  function restart() {
    init(state.config);
  }

  return { init, flip, restart };
})();