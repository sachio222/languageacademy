function BookTowerIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06"/>
      
      {/* Stack of tilted books */}
      <rect x="70" y="140" width="60" height="12" rx="2" fill="#3b82f6" opacity="0.25" transform="rotate(-3 100 146)"/>
      <rect x="65" y="120" width="70" height="14" rx="2" fill="#3b82f6" opacity="0.3" transform="rotate(2 100 127)"/>
      <rect x="60" y="95" width="80" height="16" rx="2" fill="#3b82f6" opacity="0.35" transform="rotate(-4 100 103)"/>
      <rect x="70" y="65" width="60" height="18" rx="2" fill="#3b82f6" opacity="0.4" transform="rotate(3 100 74)"/>
      
      {/* Top book glowing */}
      <rect x="75" y="40" width="50" height="15" rx="2" fill="#3b82f6" transform="rotate(-2 100 47.5)"/>
      <circle cx="100" cy="47" r="30" fill="#3b82f6" opacity="0.12"/>
      <circle cx="100" cy="47" r="20" fill="#3b82f6" opacity="0.15"/>
      
      {/* Floating bookmark */}
      <rect x="95" y="20" width="3" height="25" rx="1" fill="#3b82f6" opacity="0.4"/>
      <path d="M96.5 45 L94 50 L96.5 48 L99 50 Z" fill="#3b82f6" opacity="0.4"/>
      
      {/* Stars around tower */}
      <path d="M140 50 L142 55 L147 57 L142 59 L140 64 L138 59 L133 57 L138 55 Z" fill="#3b82f6" opacity="0.2"/>
      <path d="M55 75 L56 78 L59 79 L56 80 L55 83 L54 80 L51 79 L54 78 Z" fill="#3b82f6" opacity="0.15"/>
      <path d="M150 95 L151 98 L154 99 L151 100 L150 103 L149 100 L146 99 L149 98 Z" fill="#3b82f6" opacity="0.12"/>
      
      {/* Page edges */}
      <line x1="80" y1="48" x2="115" y2="46" stroke="#fff" strokeWidth="1.5" opacity="0.3"/>
      
      {/* Platform squiggle */}
      <path d="M50 160 Q75 155 100 160 Q125 165 150 160" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15"/>
    </svg>
  );
}

export default BookTowerIllustration;

