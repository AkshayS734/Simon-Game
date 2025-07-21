import './SettingsPanel.css';

const SettingsPanel = ({ 
  isOpen, 
  onClose, 
  difficulty, 
  onDifficultyChange, 
  soundEnabled, 
  onSoundToggle,
  difficultyName,
  isGameActive = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Game Settings</h2>
          <button className="close-button" onClick={onClose} aria-label="Close settings">
            ×
          </button>
        </div>
        
        <div className="settings-content">
          <div className="setting-group">
            <label htmlFor="difficulty-select">Difficulty</label>
            <select 
              id="difficulty-select"
              value={difficulty} 
              onChange={(e) => onDifficultyChange(e.target.value)}
              className="difficulty-select"
              disabled={isGameActive}
            >
              <option value="easy">Easy - Slow & Forgiving</option>
              <option value="normal">Normal - Balanced</option>
              <option value="hard">Hard - Fast & Challenging</option>
            </select>
            <p className="setting-description">
              Current: {difficultyName} mode
              {isGameActive && <span style={{color: '#f59e0b'}}> (Cannot change during game)</span>}
            </p>
          </div>
          
          <div className="setting-group">
            <label className="sound-toggle">
              <input 
                type="checkbox" 
                checked={soundEnabled} 
                onChange={onSoundToggle}
              />
              <span className="toggle-slider"></span>
              Sound Effects
            </label>
            <p className="setting-description">
              {soundEnabled ? 'Sound effects enabled' : 'Sound effects disabled'}
            </p>
          </div>
          
          <div className="setting-group">
            <h3>How to Play</h3>
            <ul className="instructions">
              <li>Watch the sequence of colored buttons</li>
              <li>Repeat the sequence by clicking the buttons</li>
              <li>Each level adds one more color</li>
              <li>Get higher scores with harder difficulties</li>
              <li>Use keyboard: Any key to start, Space to pause</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
