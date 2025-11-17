function NeuralNetworkIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06"/>
      
      {/* Input layer - 3 nodes */}
      <circle cx="40" cy="70" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="40" cy="70" r="4" fill="#3b82f6"/>
      
      <circle cx="40" cy="100" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="40" cy="100" r="4" fill="#3b82f6"/>
      
      <circle cx="40" cy="130" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="40" cy="130" r="4" fill="#3b82f6"/>
      
      {/* Hidden layer - 4 nodes */}
      <circle cx="100" cy="60" r="10" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="100" cy="60" r="5" fill="#3b82f6"/>
      
      <circle cx="100" cy="90" r="10" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="100" cy="90" r="5" fill="#3b82f6"/>
      
      <circle cx="100" cy="110" r="10" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="100" cy="110" r="5" fill="#3b82f6"/>
      
      <circle cx="100" cy="140" r="10" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="100" cy="140" r="5" fill="#3b82f6"/>
      
      {/* Output layer - 2 nodes */}
      <circle cx="160" cy="85" r="12" fill="#3b82f6" opacity="0.35" stroke="#3b82f6" strokeWidth="2.5"/>
      <circle cx="160" cy="85" r="6" fill="#3b82f6"/>
      <circle cx="160" cy="85" r="3" fill="#fff" opacity="0.5"/>
      
      <circle cx="160" cy="115" r="12" fill="#3b82f6" opacity="0.35" stroke="#3b82f6" strokeWidth="2.5"/>
      <circle cx="160" cy="115" r="6" fill="#3b82f6"/>
      <circle cx="160" cy="115" r="3" fill="#fff" opacity="0.5"/>
      
      {/* Connections - selective to avoid clutter */}
      <line x1="48" y1="70" x2="92" y2="60" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15"/>
      <line x1="48" y1="100" x2="92" y2="90" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15"/>
      <line x1="48" y1="100" x2="92" y2="110" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15"/>
      <line x1="48" y1="130" x2="92" y2="140" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15"/>
      
      <line x1="108" y1="60" x2="152" y2="85" stroke="#3b82f6" strokeWidth="2" opacity="0.2"/>
      <line x1="108" y1="90" x2="152" y2="85" stroke="#3b82f6" strokeWidth="2" opacity="0.2"/>
      <line x1="108" y1="110" x2="152" y2="115" stroke="#3b82f6" strokeWidth="2" opacity="0.2"/>
      <line x1="108" y1="140" x2="152" y2="115" stroke="#3b82f6" strokeWidth="2" opacity="0.2"/>
      
      {/* Stars */}
      <path d="M100 30 L102 35 L107 37 L102 39 L100 44 L98 39 L93 37 L98 35 Z" fill="#3b82f6" opacity="0.25"/>
      <path d="M175 100 L176 103 L179 104 L176 105 L175 108 L174 105 L171 104 L174 103 Z" fill="#3b82f6" opacity="0.2"/>
    </svg>
  );
}

export default NeuralNetworkIllustration;

