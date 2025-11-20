function MosaicPatternIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

      {/* Grid of tiles - building pattern */}
      <rect x="55" y="70" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="80" y="70" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="105" y="70" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="130" y="70" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />

      <rect x="55" y="95" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="80" y="95" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="105" y="95" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.35" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="130" y="95" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />

      <rect x="55" y="120" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.22" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="80" y="120" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.28" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="105" y="120" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="130" y="120" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />

      {/* Center piece glowing - the pattern emerges */}
      <rect x="92" y="102" width="16" height="16" rx="2" fill="#3b82f6" stroke="#3b82f6" strokeWidth="2" />
      <circle cx="100" cy="110" r="20" fill="#3b82f6" opacity="0.12" />

      {/* Small dots in some tiles */}
      <circle cx="65" cy="80" r="2" fill="#fff" opacity="0.5" />
      <circle cx="90" cy="80" r="2" fill="#fff" opacity="0.5" />
      <circle cx="140" cy="105" r="2" fill="#fff" opacity="0.5" />

      {/* Stars of pattern recognition */}
      <path d="M100 50 L102 55 L107 57 L102 59 L100 64 L98 59 L93 57 L98 55 Z" fill="#3b82f6" opacity="0.25" />
      <path d="M45 105 L46 108 L49 109 L46 110 L45 113 L44 110 L41 109 L44 108 Z" fill="#3b82f6" opacity="0.18" />
      <path d="M155 105 L156 108 L159 109 L156 110 L155 113 L154 110 L151 109 L154 108 Z" fill="#3b82f6" opacity="0.18" />
    </svg>
  );
}

export default MosaicPatternIllustration;



