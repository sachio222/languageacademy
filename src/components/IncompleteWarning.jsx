/**
 * IncompleteWarning - Shared warning component
 * Shows when user tries to continue without completing required actions
 */

import React from 'react';
import './IncompleteWarning.css';

const IncompleteWarning = ({ message, show }) => {
  return (
    <div className={`incomplete-warning ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default IncompleteWarning;

