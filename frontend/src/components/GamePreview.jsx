import { useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

const GAME_STYLES = `
  body{margin:0;font-family:'Segoe UI',Arial,sans-serif;background:#f8faff;color:#1e293b;}
  #quiz-app,#matching-app{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;}
  .quiz-header,.match-header{width:100%;max-width:700px;margin-bottom:24px;}
  .quiz-title,.match-title{font-size:22px;font-weight:700;color:#4F6EF7;margin-bottom:8px;}
  .match-instruction{font-size:14px;color:#64748b;margin-bottom:12px;}
  .progress-bar{height:8px;background:#e2e8f0;border-radius:99px;overflow:hidden;margin-bottom:6px;}
  .progress-fill{height:100%;background:linear-gradient(90deg,#4F6EF7,#22C55E);border-radius:99px;transition:width .4s;}
  .progress-text{font-size:13px;color:#64748b;text-align:right;}
  .question-card{background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(79,110,247,.1);padding:32px;width:100%;max-width:700px;}
  .question-text{font-size:18px;font-weight:600;margin-bottom:20px;line-height:1.5;}
  .options-grid{display:grid;gap:12px;}
  .option-btn{text-align:left;padding:14px 18px;border:2px solid #e2e8f0;border-radius:12px;background:#fff;font-size:15px;cursor:pointer;transition:all .2s;font-family:inherit;}
  .option-btn:hover:not(:disabled){border-color:#4F6EF7;background:#f0f4ff;}
  .option-btn.correct{border-color:#22C55E;background:#f0fdf4;color:#166534;}
  .option-btn.wrong{border-color:#ef4444;background:#fef2f2;color:#991b1b;}
  .feedback-box{margin-top:16px;padding:16px;border-radius:12px;display:flex;align-items:flex-start;gap:12px;}
  .feedback-box.hidden{display:none;}
  .feedback-correct{background:#f0fdf4;border:1px solid #86efac;}
  .feedback-wrong{background:#fef2f2;border:1px solid #fca5a5;}
  .feedback-icon{font-size:22px;min-width:28px;}
  .feedback-text strong{display:block;margin-bottom:4px;}
  .feedback-text p{font-size:14px;color:#475569;}
  .next-btn{margin-top:12px;background:#4F6EF7;color:#fff;border:none;padding:10px 20px;border-radius:8px;font-size:14px;cursor:pointer;font-family:inherit;}
  .next-btn:hover{background:#3d5ce8;}
  .results-screen{text-align:center;padding:40px 20px;max-width:500px;}
  .results-icon{font-size:56px;margin-bottom:12px;}
  .results-title{font-size:26px;font-weight:700;color:#1e293b;margin-bottom:20px;}
  .score-circle{background:linear-gradient(135deg,#4F6EF7,#22C55E);border-radius:50%;width:120px;height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 16px;color:#fff;}
  .score-num{font-size:24px;font-weight:700;}
  .score-pct{font-size:14px;opacity:.85;}
  .results-bar{height:12px;background:#e2e8f0;border-radius:99px;overflow:hidden;margin:16px 0;width:100%;max-width:300px;margin-left:auto;margin-right:auto;}
  .results-fill{height:100%;background:linear-gradient(90deg,#4F6EF7,#22C55E);border-radius:99px;transition:width 1s ease;}
  .results-sub{color:#64748b;font-size:14px;margin-bottom:20px;}
  .retry-btn{background:#4F6EF7;color:#fff;border:none;padding:12px 28px;border-radius:10px;font-size:15px;cursor:pointer;font-family:inherit;}
  .retry-btn:hover{background:#3d5ce8;}
  .match-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;width:100%;max-width:800px;}
  .col-label{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#64748b;margin-bottom:10px;}
  .term-item{padding:12px 16px;background:#fff;border:2px solid #e2e8f0;border-radius:10px;margin-bottom:8px;font-size:15px;transition:.2s;min-height:48px;display:flex;align-items:center;justify-content:space-between;}
  .term-matched{border-color:#22C55E;background:#f0fdf4;color:#166534;}
  .def-item{padding:12px 16px;background:#fff;border:2px dashed #cbd5e1;border-radius:10px;margin-bottom:8px;font-size:15px;cursor:grab;transition:.2s;min-height:48px;display:flex;align-items:center;justify-content:space-between;}
  .def-item.draggable:hover{border-color:#4F6EF7;background:#f0f4ff;}
  .def-matched{border-color:#22C55E;background:#f0fdf4;color:#166534;cursor:default;}
  .tap-selected{border-color:#4F6EF7!important;background:#eef2ff!important;}
  .match-tick{color:#22C55E;font-weight:700;margin-left:8px;}
  .flash-feedback{position:fixed;top:20px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:10px;font-weight:600;z-index:1000;animation:fadeIn .2s ease;}
  .flash-correct{background:#f0fdf4;border:2px solid #22C55E;color:#166534;}
  .flash-wrong{background:#fef2f2;border:2px solid #ef4444;color:#991b1b;}
  @keyframes fadeIn{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
`;

function buildQuizHTML(engineConfig) {
  const configJson = JSON.stringify(engineConfig);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${engineConfig.title}</title>
  <style>${GAME_STYLES}</style>
</head>
<body>
  <div id="quiz-app"></div>
  <script src="${window.location.origin}/engines/quiz-engine.js"><\/script>
  <script>EduForgeQuiz.init(${configJson});<\/script>
</body>
</html>`;
}

function buildMemoryHTML(engineConfig) {
  const configJson = JSON.stringify(engineConfig);
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' +
    engineConfig.title +
    '</title><style>' + GAME_STYLES +
    '</style></head><body><div id="matching-app"></div><script src="' + window.location.origin +
    '/engines/memory-engine.js"></script><script>EduForgeMemory.init(' + configJson +
    ');</script></body></html>';
}
function buildTermSprintHTML(engineConfig) {
  const configJson = JSON.stringify(engineConfig);
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' +
    engineConfig.title +
    '</title><style>' + GAME_STYLES +
    '</style></head><body><div id="matching-app"></div><script src="' + window.location.origin +
    '/engines/term-sprint-engine.js"></script><script>EduForgeTermSprint.init(' + configJson +
    ');</script></body></html>';
}
function buildMatchingHTML(engineConfig) {
  const configJson = JSON.stringify(engineConfig);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${engineConfig.title}</title>
  <style>${GAME_STYLES}</style>
</head>
<body>
  <div id="matching-app"></div>
  <script src="${window.location.origin}/engines/matching-engine.js"><\/script>
  <script>EduForgeMatching.init(${configJson});<\/script>
</body>
</html>`;
}

export default function GamePreview({ type, engineConfig, onClose }) {
  const { t } = useLang();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const html = type === 'quiz'
    ? buildQuizHTML(engineConfig)
    : type === 'memory'
      ? buildMemoryHTML(engineConfig)
      : type === 'term_sprint'
        ? buildTermSprintHTML(engineConfig)
        : buildMatchingHTML(engineConfig);

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  return (
    <div className={`preview-overlay ${isFullscreen ? 'preview-fullscreen' : ''}`}>
      <div className="preview-modal">
        <div className="preview-toolbar">
          <span className="preview-label">
            {type === 'quiz' ? '🎯' : type === 'memory' ? '🧠' : type === 'term_sprint' ? '⚡' : '🧩'} {engineConfig.title}
          </span>
          <div className="preview-actions">
            <button className="preview-btn" onClick={() => setIsFullscreen(f => !f)}>
              {isFullscreen ? '⊡' : '⊞'} {t.fullscreen}
            </button>
            <button className="preview-btn preview-close" onClick={onClose}>
              ✕ {t.close_preview}
            </button>
          </div>
        </div>
        <iframe
          src={url}
          className="preview-frame"
          title={engineConfig.title}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
