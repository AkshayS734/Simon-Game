import { useState, useEffect } from 'react';
import './GameButton.css';

const GameButton = ({ 
  color, 
  onClick, 
  disabled, 
  isActive, 
  isShowingSequence,
  size = 'normal' 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    if (isActive) {
      setIsPressed(true);
      const timer = setTimeout(() => setIsPressed(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleClick = (event) => {
    if (disabled || isShowingSequence) return;
    
    createRipple(event);
    setIsPressed(true);
    onClick(color);
    
    setTimeout(() => {
      setIsPressed(false);
    }, 150);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };

  return (
    <button
      className={`
        game-button 
        ${color} 
        ${isPressed || isActive ? 'pressed' : ''} 
        ${disabled ? 'disabled' : ''}
        ${isShowingSequence ? 'sequence-mode' : ''}
        ${size}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={`${color} button`}
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      <div className="button-content">
        <div className="button-glow"></div>
        <div className="button-shine"></div>
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </div>
    </button>
  );
};

export default GameButton;
