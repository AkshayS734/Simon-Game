import { useEffect, useState } from 'react';
import GameButton from './GameButton';
import SettingsPanel from './SettingsPanel';
import useSimonGame from '../hooks/useSimonGame';
import './SimonGame.css';

const SimonGame = () => {
  const {
    level,
    score,
    streak,
    isStarted,
    isGameOver,
    isPlaying,
    showingSequence,
    isPaused,
    activeButton,
    difficulty,
    soundEnabled,
    difficultyName,
    startGame,
    handleUserClick,
    resetGame,
    playSequence,
    pauseGame,
    changeDifficulty,
    toggleSound,
    getHighScore,
    saveHighScore
  } = useSimonGame();

  const [showSettings, setShowSettings] = useState(false);
  const [newHighScore, setNewHighScore] = useState(false);

  // Play sequence when game pattern changes
  useEffect(() => {
    if (level > 0 && isStarted && !isPaused) {
      const timer = setTimeout(() => {
        playSequence();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [level, isStarted, isPaused, playSequence]);

  // Handle game over and high score
  useEffect(() => {
    if (isGameOver) {
      const isNewHighScore = saveHighScore();
      setNewHighScore(isNewHighScore);
    }
  }, [isGameOver, saveHighScore]);

    // Handle game over and high score
  useEffect(() => {
    if (isGameOver) {
      const isNewHighScore = saveHighScore();
      setNewHighScore(isNewHighScore);
    }
  }, [isGameOver, saveHighScore]);

  const getTitle = () => {
    if (isGameOver) {
      return newHighScore ? '🎉 NEW HIGH SCORE! 🎉' : 'Game Over!';
    } else if (isPaused) {
      return 'Game Paused';
    } else if (!isStarted) {
      return 'Simon Says...';
    } else if (showingSequence) {
      return 'Watch Carefully...';
    } else {
      return `Level ${level}`;
    }
  };

  const getSubtitle = () => {
    if (isGameOver) {
      return 'Game Over';
    } else if (isPaused) {
      return 'Game Paused';
    } else if (!isStarted) {
      return 'Ready to Play';
    } else if (showingSequence) {
      return 'Watch the sequence...';
    } else {
      return 'Repeat the sequence';
    }
  };

  return (
    <div className={`simon-game ${isGameOver ? 'game-over' : ''} ${isPaused ? 'paused' : ''} ${showingSequence ? 'showing-sequence' : ''}`}>
      <header className="game-header">
        <div className="header-top">
          <h1 className="game-title">{getTitle()}</h1>
          <button 
            className="settings-button"
            onClick={() => setShowSettings(true)}
            aria-label="Open settings"
          >
            ⚙️
          </button>
        </div>
        
        <p className="game-subtitle">{getSubtitle()}</p>
        
        {isStarted && (
          <div className="game-stats">
            <div className="stat-item">
              <span className="stat-label">Score</span>
              <span className="stat-value">{score.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Level</span>
              <span className="stat-value">{level}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Streak</span>
              <span className="stat-value">{streak}</span>
            </div>
          </div>
        )}

        {!isStarted && !isGameOver && (
          <div className="pre-game-info">
            <div className="difficulty-display">
              Difficulty
              <span className="difficulty-name">{difficultyName}</span>
            </div>
            <div className="high-score">
              High Score
              <span className="high-score-value">{getHighScore().toLocaleString()}</span>
            </div>
          </div>
        )}

        {isGameOver && (
          <div className="game-over-stats">
            <div className="final-stats">
              <div className="final-score">
                <span className="label">Final Score</span>
                <span className="value">{score.toLocaleString()}</span>
              </div>
              <div className="high-score-display">
                <span className="label">High Score</span>
                <span className="value">{Math.max(score, getHighScore()).toLocaleString()}</span>
              </div>
            </div>
            {newHighScore && (
              <div className="achievement">
                <span className="achievement-text">🏆 New Personal Best! 🏆</span>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="game-container">
        <div className="button-grid">
          <div className="button-row">
            <GameButton 
              color="red" 
              onClick={handleUserClick} 
              disabled={!isStarted || isPlaying || isPaused}
              isActive={activeButton === 'red'}
              isShowingSequence={showingSequence}
            />
            <GameButton 
              color="green" 
              onClick={handleUserClick} 
              disabled={!isStarted || isPlaying || isPaused}
              isActive={activeButton === 'green'}
              isShowingSequence={showingSequence}
            />
          </div>
          <div className="button-row">
            <GameButton 
              color="blue" 
              onClick={handleUserClick} 
              disabled={!isStarted || isPlaying || isPaused}
              isActive={activeButton === 'blue'}
              isShowingSequence={showingSequence}
            />
            <GameButton 
              color="yellow" 
              onClick={handleUserClick} 
              disabled={!isStarted || isPlaying || isPaused}
              isActive={activeButton === 'yellow'}
              isShowingSequence={showingSequence}
            />
          </div>
        </div>

        {!isStarted && !isGameOver && (
          <div className="game-controls">
            <button 
              className="control-button start-button"
              onClick={startGame}
            >
              Start Game
            </button>
          </div>
        )}

        {(!isStarted && !isGameOver) && (
          <p className="game-instructions">Click "Start Game" to begin!</p>
        )}

        {isGameOver && (
          <div className="game-controls">
            <button 
              className="control-button start-button"
              onClick={resetGame}
            >
              Start Game
            </button>
          </div>
        )}

        {isStarted && !isGameOver && (
          <div className="game-controls">
            <button 
              className="control-button pause-button"
              onClick={pauseGame}
              disabled={showingSequence}
            >
              {isPaused ? '▶️ Resume' : '⏸️ Pause'}
            </button>
            <button 
              className="control-button reset-button"
              onClick={resetGame}
            >
              🔄 Reset
            </button>
          </div>
        )}
      </main>

      <footer className="game-footer">
        <div className="footer-content">
          <p className="footer-text">©2025 Akshay Shukla</p>
        </div>
      </footer>

      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        difficulty={difficulty}
        onDifficultyChange={changeDifficulty}
        soundEnabled={soundEnabled}
        onSoundToggle={toggleSound}
        difficultyName={difficultyName}
        isGameActive={isStarted && !isGameOver}
      />
    </div>
  );
};

export default SimonGame;
