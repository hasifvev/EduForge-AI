import { useState } from 'react';

export default function Flashcards({ data }) {
  const [current, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [cards, setCards] = useState(data?.cards || []);
  const [mastered, setMastered] = useState(new Set());

  if (!data || !data.cards?.length) return null;

  const card = cards[current];
  const total = cards.length;

  const next = () => { setFlipped(false); setTimeout(() => setCurrentIdx(i => Math.min(i + 1, total - 1)), 150); };
  const prev = () => { setFlipped(false); setTimeout(() => setCurrentIdx(i => Math.max(i - 1, 0)), 150); };

  const toggleShuffle = () => {
    if (!shuffled) {
      const s = [...cards].sort(() => Math.random() - 0.5);
      setCards(s);
      setCurrentIdx(0); setFlipped(false);
    } else {
      setCards(data.cards);
      setCurrentIdx(0); setFlipped(false);
    }
    setShuffled(s => !s);
  };

  const toggleMastered = () => {
    setMastered(m => {
      const next = new Set(m);
      if (next.has(card.id)) next.delete(card.id); else next.add(card.id);
      return next;
    });
  };

  const progress = ((current + 1) / total) * 100;

  return (
    <div className="flashcard-wrapper">
      <div className="flashcard-header">
        <h3 className="flashcard-title">{data.title}</h3>
        <div className="flashcard-controls">
          <button onClick={toggleShuffle} className={`fc-btn ${shuffled ? 'fc-btn--active' : ''}`}>
            🔀 {shuffled ? 'Unshuffle' : 'Shuffle'}
          </button>
          <span className="fc-counter">{current + 1} / {total}</span>
          <span className="fc-mastered">{mastered.size} mastered 🎯</span>
        </div>
      </div>

      <div className="fc-progress-bar">
        <div className="fc-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="fc-scene" onClick={() => setFlipped(f => !f)} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setFlipped(f => !f)}
        aria-label={`Card ${current + 1}: ${flipped ? 'showing back' : 'showing front'}. Click to flip.`}>
        <div className={`fc-card ${flipped ? 'fc-card--flipped' : ''} ${mastered.has(card.id) ? 'fc-card--mastered' : ''}`}>
          <div className="fc-face fc-face--front">
            {card.emoji && <span className="fc-emoji">{card.emoji}</span>}
            <p className="fc-term">{card.front}</p>
            {card.curriculum_code && <span className="fc-code">{card.curriculum_code}</span>}
            <span className="fc-hint">Tap to reveal →</span>
          </div>
          <div className="fc-face fc-face--back">
            {card.emoji && <span className="fc-emoji">{card.emoji}</span>}
            <p className="fc-definition">{card.back}</p>
            {card.curriculum_code && <span className="fc-code">{card.curriculum_code}</span>}
          </div>
        </div>
      </div>

      <div className="fc-nav">
        <button onClick={prev} disabled={current === 0} className="fc-nav-btn" aria-label="Previous card">← Prev</button>
        <button onClick={toggleMastered} className={`fc-nav-btn fc-nav-btn--master ${mastered.has(card.id) ? 'fc-nav-btn--mastered' : ''}`}>
          {mastered.has(card.id) ? '✅ Mastered' : '⭕ Mark Mastered'}
        </button>
        <button onClick={next} disabled={current === total - 1} className="fc-nav-btn" aria-label="Next card">Next →</button>
      </div>
    </div>
  );
}
