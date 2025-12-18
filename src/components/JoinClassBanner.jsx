/**
 * JoinClassBanner - Dismissible banner for students not in a class
 * Minimal, clean design following DESIGN_PRINCIPLES.md
 */

import { useState, useEffect } from 'react';
import { Users, X } from 'lucide-react';
import '../styles/JoinClassBanner.css';

function JoinClassBanner({ onJoinClass }) {
  // Check if in preview mode
  const isPreview = new URLSearchParams(window.location.search).get('preview-banner') === 'true';

  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem('join_class_banner_dismissed') === 'true';
  });

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('join_class_banner_dismissed', 'true');
  };

  // Don't hide if in preview mode
  if (isDismissed && !isPreview) return null;

  return (
    <div className="join-class-banner">
      <div className="banner-icon">
        <Users size={20} />
      </div>
      <div className="banner-content">
        <p className="banner-text">
          Do you have a class code?
        </p>
        <p className="banner-hint">
          Learning solo? Just dismiss this.
        </p>
      </div>
      <button
        className="banner-action"
        onClick={onJoinClass}
      >
        Enter Code
      </button>
      <button
        className="banner-dismiss"
        onClick={handleDismiss}
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default JoinClassBanner;
