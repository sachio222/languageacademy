function DecisionTreeIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06"/>
      
      {/* Root node */}
      <circle cx="100" cy="40" r="12" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2.5"/>
      <circle cx="100" cy="40" r="8" fill="#3b82f6"/>
      <circle cx="100" cy="40" r="4" fill="#fff" opacity="0.5"/>
      
      {/* First split */}
      <path d="M95 50 L70 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M105 50 L130 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
      
      {/* Second level nodes */}
      <circle cx="70" cy="75" r="10" fill="#3b82f6" opacity="0.28" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="70" cy="75" r="6" fill="#3b82f6"/>
      
      <circle cx="130" cy="75" r="10" fill="#3b82f6" opacity="0.28" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="130" cy="75" r="6" fill="#3b82f6"/>
      
      {/* Second split */}
      <path d="M65 83 L50 105" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M75 83 L90 105" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M125 83 L110 105" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
      <path d="M135 83 L150 105" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
      
      {/* Third level nodes */}
      <circle cx="50" cy="105" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="50" cy="105" r="5" fill="#3b82f6"/>
      
      <circle cx="90" cy="105" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="90" cy="105" r="5" fill="#3b82f6"/>
      
      <circle cx="110" cy="105" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="110" cy="105" r="5" fill="#3b82f6"/>
      
      <circle cx="150" cy="105" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="150" cy="105" r="5" fill="#3b82f6"/>
      
      {/* Final level - leaf nodes with checkmarks */}
      <path d="M47 112 L40 130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="40" cy="130" r="6" fill="#3b82f6" opacity="0.35"/>
      <path d="M37 128 L39 131 L44 125" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      
      <path d="M93 112 L100 130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="100" cy="130" r="6" fill="#3b82f6" opacity="0.35"/>
      <path d="M97 128 L99 131 L104 125" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      
      <path d="M153 112 L160 130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="160" cy="130" r="6" fill="#3b82f6" opacity="0.35"/>
      <path d="M157 128 L159 131 L164 125" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Stars of logic */}
      <path d="M100 22 L102 27 L107 29 L102 31 L100 36 L98 31 L93 29 L98 27 Z" fill="#3b82f6" opacity="0.25"/>
      <path d="M60 80 L61 83 L64 84 L61 85 L60 88 L59 85 L56 84 L59 83 Z" fill="#3b82f6" opacity="0.18"/>
      <path d="M140 80 L141 83 L144 84 L141 85 L140 88 L139 85 L136 84 L139 83 Z" fill="#3b82f6" opacity="0.18"/>
    </svg>
  );
}

export default DecisionTreeIllustration;

