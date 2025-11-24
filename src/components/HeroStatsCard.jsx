/**
 * HeroStatsCard - Individual hero stat card
 * Clean, minimal design with icon and value
 */

import React from 'react';
import '../styles/HeroStatsCard.css';

const HeroStatsCard = ({ icon: Icon, value, label, color }) => {
  return (
    <div className="hero-stats-card">
      <div className="hero-stats-card-icon" style={{ color: color || '#665665' }}>
        <Icon size={24} />
      </div>
      <div className="hero-stats-card-content">
        <span className="hero-stats-card-value">{value}</span>
        <span className="hero-stats-card-label">{label}</span>
      </div>
    </div>
  );
};

export default HeroStatsCard;

