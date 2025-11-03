import { Check } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import './UnderstoodButton.css';

/**
 * Reusable Understood button component with sound effect
 * Handles the sound playback when marking as understood
 */
function UnderstoodButton({ isUnderstood, onClick, className = '', fullWidth = false }) {
  const { playPop } = useSoundEffects();

  const handleClick = (e) => {
    e.stopPropagation();
    
    // Play sound when marking as understood (not when unmarking)
    if (!isUnderstood) {
      playPop();
    }
    
    onClick?.(e);
  };

  return (
    <button
      className={`understood-btn ${isUnderstood ? 'understood' : ''} ${fullWidth ? 'full-width' : ''} ${className}`.trim()}
      onClick={handleClick}
    >
      {isUnderstood && <Check size={16} />}
      Understood
    </button>
  );
}

export default UnderstoodButton;

