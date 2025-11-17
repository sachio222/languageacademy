function CompoundGrowthIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none">
      {/* Background atmosphere */}
      <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06"/>
      
      {/* Axes */}
      <line x1="30" y1="150" x2="170" y2="150" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="30" y1="150" x2="30" y2="50" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
      
      {/* Exponential curve */}
      <path d="M35 145 Q50 140 65 130 Q80 115 95 90 Q110 60 130 40 Q145 25 165 20" 
            stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      
      {/* Fill under curve */}
      <path d="M35 145 Q50 140 65 130 Q80 115 95 90 Q110 60 130 40 Q145 25 165 20 L165 150 L35 150 Z" 
            fill="#3b82f6" opacity="0.08"/>
      
      {/* Milestone dots on curve */}
      <circle cx="50" cy="138" r="4" fill="#3b82f6" opacity="0.35"/>
      <circle cx="75" cy="120" r="4" fill="#3b82f6" opacity="0.4"/>
      <circle cx="100" cy="85" r="5" fill="#3b82f6" opacity="0.45"/>
      <circle cx="130" cy="40" r="6" fill="#3b82f6"/>
      <circle cx="130" cy="40" r="3" fill="#fff" opacity="0.5"/>
      
      {/* Growth rings around endpoint */}
      <circle cx="165" cy="20" r="12" fill="#3b82f6" opacity="0.2"/>
      <circle cx="165" cy="20" r="18" fill="#3b82f6" opacity="0.12"/>
      <circle cx="165" cy="20" r="8" fill="#3b82f6"/>
      
      {/* Stars of compounding */}
      <path d="M165 10 L167 15 L172 17 L167 19 L165 24 L163 19 L158 17 L163 15 Z" fill="#3b82f6" opacity="0.28"/>
      <path d="M145 35 L146 38 L149 39 L146 40 L145 43 L144 40 L141 39 L144 38 Z" fill="#3b82f6" opacity="0.22"/>
      <path d="M110 65 L111 68 L114 69 L111 70 L110 73 L109 70 L106 69 L109 68 Z" fill="#3b82f6" opacity="0.2"/>
      
      {/* Axis labels (abstract) */}
      <circle cx="25" cy="150" r="3" fill="#3b82f6" opacity="0.25"/>
      <circle cx="170" cy="155" r="3" fill="#3b82f6" opacity="0.25"/>
    </svg>
  );
}

export default CompoundGrowthIllustration;

