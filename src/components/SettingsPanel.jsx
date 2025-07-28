import './SettingsPanel.css';

const SettingsPanel = ({ 
  isOpen, 
  onClose, 
  difficulty, 
  onDifficultyChange, 
  soundEnabled, 
  onSoundToggle,
  volume = 0.7,
  onVolumeChange,
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

          {soundEnabled && (
            <div className="setting-group">
              <label htmlFor="volume-slider">Volume</label>
              <div className="volume-control">
                <input
                  id="volume-slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="volume-slider"
                />
                <span className="volume-display">{Math.round(volume * 100)}%</span>
              </div>
              <p className="setting-description">
                Adjust the volume of sound effects
              </p>
            </div>
          )}
          
          <div className="setting-group">
            <h3>How to Play</h3>
            <ul className="instructions">
              <li>Watch the new color that lights up each round</li>
              <li>Repeat the entire sequence from the beginning</li>
              <li>Each level adds one more color to remember</li>
              <li>Get higher scores with harder difficulties</li>
            </ul>
          </div>

          <div className="setting-group">
            <h3>Keyboard Controls</h3>
            <ul className="keyboard-controls">
              <li><kbd>Enter</kbd> - Start game or restart after game over</li>
              <li><kbd>Space</kbd> - Pause/Resume during game</li>
              <li><kbd>R</kbd> - Reset game at any time</li>
              <li><kbd>Esc</kbd> - Reset game (during active game)</li>
              <li><kbd>Any key</kbd> - Start game (when not started)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
