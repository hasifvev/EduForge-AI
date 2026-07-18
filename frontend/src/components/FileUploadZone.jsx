import { useState, useRef } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export default function FileUploadZone({ onFileSelect, onFileTooLarge, selectedFile }) {
  const { t } = useLang();
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const selectFile = (file) => {
    if (!file || !isValid(file)) return;
    if (file.size > MAX_UPLOAD_BYTES) {
      onFileTooLarge?.(file);
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    selectFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => selectFile(e.target.files[0]);

  const isValid = (file) => {
    const allowed = ['application/pdf', 'text/plain', 'image/png', 'image/jpeg', 'image/webp'];
    return allowed.includes(file.type) || file.name.endsWith('.txt') || file.name.endsWith('.pdf') || file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.webp');
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
        accept=".pdf,.txt,.png,.jpg,.jpeg,.webp"
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
