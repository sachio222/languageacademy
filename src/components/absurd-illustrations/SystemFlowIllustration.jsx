function SystemFlowIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

      {/* Flow nodes */}
      <circle cx="100" cy="45" r="18" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
      <circle cx="100" cy="45" r="10" fill="#3b82f6" opacity="0.2" />
      <circle cx="100" cy="45" r="5" fill="#3b82f6" />
      
      {/* Arrow down */}
      <line x1="100" y1="65" x2="100" y2="85" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M95 80 L100 90 L105 80" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Processing box */}
      <rect x="70" y="90" width="60" height="40" rx="6" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
      <rect x="75" y="95" width="50" height="30" rx="4" fill="#3b82f6" opacity="0.1" />
      <circle cx="90" cy="110" r="3" fill="#3b82f6" opacity="0.4" />
      <circle cx="100" cy="110" r="3" fill="#3b82f6" opacity="0.5" />
      <circle cx="110" cy="110" r="3" fill="#3b82f6" opacity="0.4" />
      
      {/* Split arrows */}
      <line x1="100" y1="132" x2="70" y2="155" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M75 150 L65 160 L73 158" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      <line x1="100" y1="132" x2="130" y2="155" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M125 150 L135 160 L127 158" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* End nodes */}
      <circle cx="65" cy="165" r="12" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
      <circle cx="65" cy="165" r="6" fill="#3b82f6" opacity="0.3" />
      <path d="M62 164 L64 167 L69 161" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      <circle cx="135" cy="165" r="12" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
      <circle cx="135" cy="165" r="6" fill="#3b82f6" opacity="0.3" />
      <path d="M132 164 L134 167 L139 161" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Logic sparkles */}
      <path d="M140 40 L142 45 L147 47 L142 49 L140 54 L138 49 L133 47 L138 45 Z" fill="#3b82f6" opacity="0.25" />
      <path d="M50 110 L51 113 L54 114 L51 115 L50 118 L49 115 L46 114 L49 113 Z" fill="#3b82f6" opacity="0.18" />
      <path d="M155 115 L156 118 L159 119 L156 120 L155 123 L154 120 L151 119 L154 118 Z" fill="#3b82f6" opacity="0.18" />
    </svg>
  );
}

export default SystemFlowIllustration;

