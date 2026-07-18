/**
 * EduForge AI — Term Sprint Engine
 * A quick retrieval game generated from the lesson's vetted matching pairs.
 */
const EduForgeTermSprint = (() => {
  let state = { config: null, order: [], current: 0, score: 0, answered: false };

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function init(config) {
    state = { config, order: shuffle(config.pairs), current: 0, score: 0, answered: false };
    render();
  }

  function optionsFor(pair) {
    const distractors = shuffle(state.config.pairs.filter((candidate) => candidate.id !== pair.id))
      .slice(0, 3)
      .map((candidate) => candidate.definition);
    return shuffle([pair.definition, ...distractors]);
  }

  function render() {
    const app = document.getElementById('matching-app');
    if (!app || !state.config) return;
    if (state.current >= state.order.length) return renderComplete();

    const pair = state.order[state.current];
    const options = optionsFor(pair);
    state.currentOptions = options;
    const progress = (state.current / state.order.length) * 100;

    app.innerHTML =
      '<div class="match-header"><h2 class="match-title">' + escapeHtml(state.config.title) + ' — Term Sprint</h2>' +
      '<p class="match-instruction">Choose the best explanation for the highlighted term.</p>' +
      '<div class="progress-bar"><div class="progress-fill" style="width:' + progress + '%"></div></div>' +
      '<div class="progress-text">' + (state.current + 1) + ' / ' + state.order.length + ' | ' + state.score + ' correct</div></div>' +
      '<div class="question-card"><p class="question-text">' + escapeHtml(pair.term) + '</p>' +
      '<div class="options-grid">' + options.map((option, index) =>
        '<button class="option-btn" onclick="EduForgeTermSprint.answer(' + index + ')">' + escapeHtml(option) + '</button>'
      ).join('') + '</div><div id="sprint-feedback" class="feedback-box hidden"></div></div>';
  }

  function answer(index) {
    if (state.answered) return;
    state.answered = true;
    const pair = state.order[state.current];
    const chosen = state.currentOptions[index];
    const correct = chosen === pair.definition;
    document.querySelectorAll('.option-btn').forEach((button, optionIndex) => {
      button.disabled = true;
      if (state.currentOptions[optionIndex] === pair.definition) button.classList.add('correct');
      else if (optionIndex === index) button.classList.add('wrong');
    });
    if (correct) state.score += 1;

    const feedback = document.getElementById('sprint-feedback');
    feedback.className = 'feedback-box ' + (correct ? 'feedback-correct' : 'feedback-wrong');
    feedback.innerHTML = '<div class="feedback-icon">' + (correct ? '✓' : '✗') + '</div><div class="feedback-text"><strong>' +
      (correct ? 'Correct!' : 'Try again next round.') + '</strong><p>' + escapeHtml(pair.definition) +
      '</p></div><button class="next-btn" onclick="EduForgeTermSprint.next()">' +
      (state.current + 1 === state.order.length ? 'See results' : 'Next') + '</button>';
  }

  function next() {
    state.current += 1;
    state.answered = false;
    render();
  }

  function renderComplete() {
    const app = document.getElementById('matching-app');
    const total = state.order.length;
    const pct = Math.round((state.score / total) * 100);
    app.innerHTML = '<div class="results-screen"><div class="results-icon">⚡</div><h2 class="results-title">Term Sprint Complete</h2>' +
      '<div class="score-circle"><div class="score-num">' + state.score + '/' + total + '</div><div class="score-pct">' + pct + '%</div></div>' +
      '<p class="results-sub">Replay to practise the same terms in a new order.</p><button class="retry-btn" onclick="EduForgeTermSprint.restart()">Play Again</button></div>';
  }

  function restart() {
    init(state.config);
  }

  return { init, answer, next, restart };
})();