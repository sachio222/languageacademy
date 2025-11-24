/**
 * IncompleteWarning - Shared warning component for help modules
 * Shows when user tries to continue without marking all sections understood
 */

import React from 'react';
import './IncompleteWarning.css';

const IncompleteWarning = ({ message, show }) => {
  if (!show) return null;
  
  return (
    <div className="incomplete-warning">
      {message}
    </div>
  );
};

export default IncompleteWarning;

