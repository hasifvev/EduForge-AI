import { useState, useRef } from 'react';

export default function ClozePassage({ data }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const inputRefs = useRef({});

  if (!data || !data.blanks?.length) return null;

  const handleChange = (id, value) => {
    setChecked(false);
    setAnswers(a => ({ ...a, [id]: value }));
  };

  const checkAnswers = () => setChecked(true);

  const reset = () => {
    setAnswers({});
    setChecked(false);
    // Focus first blank
    const firstRef = inputRefs.current[data.blanks[0]?.id];
    if (firstRef) firstRef.focus();
  };

  const score = data.blanks.filter(b => {
    const ans = (answers[b.id] || '').trim().toLowerCase();
    return ans === b.word.toLowerCase();
  }).length;

  // Render passage with inline inputs
  const renderPassage = () => {
    let text = data.passage;
    const parts = [];
    let lastIndex = 0;
    const blankRegex = /___\((\d+)\)___/g;
    let match;

    while ((match = blankRegex.exec(text)) !== null) {
      const id = parseInt(match[1]);
      const blank = data.blanks.find(b => b.id === id);

      // Text before this blank
      if (match.index > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, match.index)}</span>);
      }

      // The blank input
      const userAns = (answers[id] || '').trim().toLowerCase();
      const correctAns = blank?.word.toLowerCase();
      const isCorrect = userAns === correctAns;
      const isAttempted = userAns.length > 0;

      parts.push(
        <span key={`blank-${id}`} className="cloze-blank-wrapper">
          <input
            ref={el => (inputRefs.current[id] = el)}
            type="text"
            value={answers[id] || ''}
            onChange={e => handleChange(id, e.target.value)}
            className={`cloze-input ${checked
              ? isCorrect ? 'cloze-input--correct' : isAttempted ? 'cloze-input--wrong' : 'cloze-input--missed'
              : ''}`}
            style={{ width: `${Math.max(blank?.word.length * 10 + 20, 80)}px` }}
            placeholder={`(${id})`}
            aria-label={`Blank ${id}${showHints && blank?.hint ? ': hint: ' + blank.hint : ''}`}
            readOnly={checked && isCorrect}
          />
          {showHints && blank?.hint && !isCorrect && (
            <span className="cloze-hint">💡 {blank.hint}</span>
          )}
          {checked && !isCorrect && isAttempted && (
            <span className="cloze-reveal">✓ {blank?.word}</span>
          )}
          <span className="cloze-blank-num">({id})</span>
        </span>
      );

      lastIndex = match.index + match[0].length;
    }

    // Remaining text
    if (lastIndex < text.length) {
      parts.push(<span key={`text-end`}>{text.slice(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <div className="cloze-wrapper">
      <div className="cloze-header">
        <h3 className="cloze-title">{data.title}</h3>
        <div className="cloze-toolbar">
          <button
            onClick={() => setShowHints(h => !h)}
            className={`cloze-btn ${showHints ? 'cloze-btn--active' : ''}`}
          >
            {showHints ? '🙈 Hide Hints' : '💡 Show Hints'}
          </button>
          <button onClick={checkAnswers} className="cloze-btn cloze-btn--check" disabled={checked && score === data.blanks.length}>
            ✔ Check Answers
          </button>
          <button onClick={reset} className="cloze-btn cloze-btn--reset">↺ Reset</button>
        </div>
      </div>

      <div className="cloze-passage">
        <p className="cloze-text">{renderPassage()}</p>
      </div>

      {checked && (
        <div className={`cloze-score ${score === data.blanks.length ? 'cloze-score--perfect' : score >= data.blanks.length / 2 ? 'cloze-score--good' : 'cloze-score--retry'}`}>
          {score === data.blanks.length ? '🎉' : score >= data.blanks.length / 2 ? '👍' : '💪'}
          {' '}<strong>{score} / {data.blanks.length}</strong> correct
          {score === data.blanks.length && ' — Perfect!'}
          {score < data.blanks.length && ` — Incorrect blanks are highlighted. ${showHints ? '' : 'Try enabling hints!'}`}
        </div>
      )}

      <div className="cloze-word-bank">
        <span className="cloze-bank-label">Word Bank:</span>
        {data.blanks.map(b => (
          <span key={b.id} className={`cloze-word ${checked && Object.values(answers).map(v => v.toLowerCase()).includes(b.word.toLowerCase()) ? 'cloze-word--used' : ''}`}>
            {b.word}
          </span>
        ))}
      </div>
    </div>
  );
}
