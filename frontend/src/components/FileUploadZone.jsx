import { useState, useRef } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

export default function FileUploadZone({ onFileSelect, selectedFile }) {
  const { t } = useLang();
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && isValid(file)) onFileSelect(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && isValid(file)) onFileSelect(file);
  };

  const isValid = (file) => {
    const allowed = ['application/pdf', 'text/plain'];
    return allowed.includes(file.type) || file.name.endsWith('.txt') || file.name.endsWith('.pdf');
  };

  return (
    <div
      className={`upload-zone ${dragging ? 'upload-dragging' : ''} ${selectedFile ? 'upload-has-file' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      {selectedFile ? (
        <div className="upload-selected">
          <span className="upload-file-icon">📄</span>
          <div>
            <div className="upload-filename">{selectedFile.name}</div>
            <div className="upload-filesize">{(selectedFile.size / 1024).toFixed(1)} KB</div>
          </div>
          <button className="upload-remove" onClick={(e) => { e.stopPropagation(); onFileSelect(null); }}>✕</button>
        </div>
      ) : (
        <div className="upload-prompt">
          <span className="upload-icon">⬆</span>
          <div className="upload-label">{t.upload_label}</div>
          <div className="upload-hint">{t.upload_hint}</div>
        </div>
      )}
    </div>
  );
}
