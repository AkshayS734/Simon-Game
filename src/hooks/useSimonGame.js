import { useState, useCallback, useEffect, useRef } from 'react';

const COLORS = ['red', 'blue', 'green', 'yellow'];

// Difficulty settings
const DIFFICULTIES = {
  easy: { baseDelay: 800, speedIncrease: 0.95, name: 'Easy' },
  normal: { baseDelay: 600, speedIncrease: 0.93, name: 'Normal' },
  hard: { baseDelay: 400, speedIncrease: 0.90, name: 'Hard' }
};

const useSimonGame = () => {
  const [gamePattern, setGamePattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [level, setLevel] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showingSequence, setShowingSequence] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  const [difficulty, setDifficulty] = useState('normal');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [audioError, setAudioError] = useState(false);
  
  // Audio refs for preloaded sounds
  const audioRefs = useRef({});

  // Preload all sounds
  useEffect(() => {
    const preloadAudio = () => {
      try {
        COLORS.forEach(color => {
          const audio = new Audio(`/sounds/${color}.mp3`);
          audio.preload = 'auto';
          audio.volume = volume;
          
          // Handle audio loading errors
          audio.addEventListener('error', () => {
            console.warn(`Failed to load audio: ${color}.mp3`);
            setAudioError(true);
          });
          
          audioRefs.current[color] = audio;
        });
        
        const wrongAudio = new Audio('/sounds/wrong.mp3');
        wrongAudio.preload = 'auto';
        wrongAudio.volume = volume * 1.1; // Wrong sound slightly louder
        
        wrongAudio.addEventListener('error', () => {
          console.warn('Failed to load audio: wrong.mp3');
          setAudioError(true);
        });
        
        audioRefs.current.wrong = wrongAudio;
      } catch (error) {
        console.warn('Audio initialization failed:', error);
        setAudioError(true);
      }
    };

    preloadAudio();
  }, [volume]);

  const playSound = useCallback((color) => {
    if (!soundEnabled) return;
    
    try {
      const audio = audioRefs.current[color];
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.warn(`Audio playback failed for ${color}:`, error);
        });
      }
    } catch (error) {
      console.warn(`Audio error for ${color}:`, error);
    }
  }, [soundEnabled]);

  const playWrongSound = useCallback(() => {
    if (!soundEnabled) return;
    
    try {
      const audio = audioRefs.current.wrong;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.warn('Wrong sound playback failed:', error);
        });
      }
    } catch (error) {
      console.warn('Wrong sound error:', error);
    }
  }, [soundEnabled]);

  const calculateDelay = useCallback((level) => {
    const difficultySettings = DIFFICULTIES[difficulty];
    const delay = difficultySettings.baseDelay * Math.pow(difficultySettings.speedIncrease, Math.floor(level / 5));
    return Math.max(delay, 200); // Minimum delay of 200ms
  }, [difficulty]);

  const calculateScore = useCallback((currentLevel, currentStreak) => {
    const baseScore = currentLevel * 10;
    const streakBonus = currentStreak * 5;
    const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'normal' ? 1.5 : 2;
    return Math.floor((baseScore + streakBonus) * difficultyMultiplier);
  }, [difficulty]);

  const generateNextSequence = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * 4);
    const randomColor = COLORS[randomIndex];
    
    setGamePattern(prev => {
      const newPattern = [...prev, randomColor];
      setLevel(newPattern.length);
      // Don't update score here - it should only update when user successfully completes a sequence
      return newPattern;
    });
    
    setUserPattern([]);
    setCurrentStep(0);
  }, []);

  const startGame = useCallback(() => {
    setIsStarted(true);
    setIsGameOver(false);
    setLevel(0);
    setScore(0);
    setStreak(0);
    setGamePattern([]);
    setUserPattern([]);
    setCurrentStep(0);
    setIsPaused(false);
    generateNextSequence();
  }, [generateNextSequence]);

  const pauseGame = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const handleUserClick = useCallback((color) => {
    if (isGameOver || isPlaying || showingSequence || isPaused) return;

    const newUserPattern = [...userPattern, color];
    setUserPattern(newUserPattern);
    playSound(color);

    // Visual feedback for user click
    setActiveButton(color);
    setTimeout(() => setActiveButton(null), 150);

    // Check if the current step matches the game pattern
    if (gamePattern[currentStep] === color) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);

      // If user completed the sequence
      if (newStep === gamePattern.length) {
        setStreak(prev => {
          const newStreak = prev + 1;
          // Update score only when user successfully completes a sequence
          setScore(calculateScore(gamePattern.length, newStreak));
          return newStreak;
        });
        setTimeout(() => {
          generateNextSequence();
        }, 1000);
      }
    } else {
      // Wrong answer
      setWrongAnswer(true);
      playWrongSound();
      setTimeout(() => {
        setWrongAnswer(false);
        setIsGameOver(true);
        setIsStarted(false);
        setStreak(0);
      }, 500); // Show wrong feedback for 500ms before game over
    }
  }, [
    userPattern, 
    currentStep, 
    gamePattern, 
    isGameOver, 
    isPlaying, 
    showingSequence,
    isPaused,
    playSound, 
    playWrongSound, 
    generateNextSequence,
    calculateScore
  ]);

  const resetGame = useCallback(() => {
    setLevel(0);
    setScore(0);
    setStreak(0);
    setIsStarted(false);
    setIsGameOver(false);
    setGamePattern([]);
    setUserPattern([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setShowingSequence(false);
    setActiveButton(null);
    setIsPaused(false);
    setWrongAnswer(false);
  }, []);

  const playSequence = useCallback(async () => {
    if (gamePattern.length === 0 || isPaused) return;
    
    setIsPlaying(true);
    setShowingSequence(true);
    
    const delay = calculateDelay(level);
    const highlightDuration = Math.max(400, delay * 0.6); // Minimum 400ms highlight
    const pauseBetween = Math.max(200, delay * 0.3); // Pause between highlights
    
    for (let i = 0; i < gamePattern.length; i++) {
      if (isPaused) break;
      
      // Show the button highlight
      setActiveButton(gamePattern[i]);
      playSound(gamePattern[i]);
      
      // Keep highlight visible for longer duration
      await new Promise(resolve => {
        setTimeout(() => {
          setActiveButton(null);
          resolve();
        }, highlightDuration);
      });
      
      // Pause between highlights for better visibility
      if (i < gamePattern.length - 1) {
        await new Promise(resolve => {
          setTimeout(resolve, pauseBetween);
        });
      }
    }
    
    // Wait a bit before allowing user input
    setTimeout(() => {
      setIsPlaying(false);
      setShowingSequence(false);
    }, 300);
  }, [gamePattern, calculateDelay, level, playSound, isPaused]);

  const changeDifficulty = useCallback((newDifficulty) => {
    if (!isStarted) {
      setDifficulty(newDifficulty);
    }
  }, [isStarted]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  const changeVolume = useCallback((newVolume) => {
    setVolume(newVolume);
  }, []);

  const getHighScore = useCallback(() => {
    const saved = localStorage.getItem(`simon-high-score-${difficulty}`);
    return saved ? parseInt(saved, 10) : 0;
  }, [difficulty]);

  const saveHighScore = useCallback(() => {
    const currentHigh = getHighScore();
    if (score > currentHigh) {
      localStorage.setItem(`simon-high-score-${difficulty}`, score.toString());
      return true; // New high score
    }
    return false;
  }, [score, getHighScore, difficulty]);



  return {
    // Game state
    level,
    score,
    streak,
    isStarted,
    isGameOver,
    isPlaying,
    showingSequence,
    isPaused,
    gamePattern,
    activeButton,
    wrongAnswer,
    audioError,
    
    // Settings
    difficulty,
    soundEnabled,
    volume,
    
    // Actions
    startGame,
    handleUserClick,
    resetGame,
    playSequence,
    pauseGame,
    changeDifficulty,
    toggleSound,
    changeVolume,
    getHighScore,
    saveHighScore,
    
    // Utils
    difficultyName: DIFFICULTIES[difficulty].name
  };
};

export default useSimonGame;
