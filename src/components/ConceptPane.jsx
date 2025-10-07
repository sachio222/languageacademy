import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

function ConceptPane({ concepts }) {
  const [understoodConcepts, setUnderstoodConcepts] = useState(new Set());

  // Reset understood state when concepts change (new lesson/module)
  useEffect(() => {
    setUnderstoodConcepts(new Set());
  }, [concepts]);

  const toggleUnderstood = (conceptIndex) => {
    setUnderstoodConcepts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(conceptIndex)) {
        newSet.delete(conceptIndex);
      } else {
        newSet.add(conceptIndex);
      }
      return newSet;
    });
  };

  const getProgressStats = () => {
    if (!concepts || concepts.length === 0) return { understood: 0, total: 0, percentage: 0 };
    const total = concepts.length;
    const understood = understoodConcepts.size;
    const percentage = Math.round((understood / total) * 100);
    return { understood, total, percentage };
  };

  return (
    <div className="concept-pane">
      <div className="concept-pane-header">
        <h3>📚 Concepts</h3>
        <div className="concepts-progress">
          {getProgressStats().understood}/{getProgressStats().total} understood ({getProgressStats().percentage}%)
        </div>
      </div>
      <div className="concepts-list">
        {concepts.map((concept, idx) => {
          const isUnderstood = understoodConcepts.has(idx);
          return (
            <div key={idx} className={`concept-item ${isUnderstood ? 'understood' : ''}`}>
              <div className="concept-item-header">
                <h4>{concept.term}</h4>
                {isUnderstood && (
                  <div className="concept-check">
                    <Check size={16} />
                  </div>
                )}
              </div>
              <p className="concept-definition">{concept.definition}</p>
              <div className="concept-example">
                <strong>Example</strong>
                <code>{concept.example}</code>
              </div>
              <button
                className={`understood-btn ${isUnderstood ? 'understood' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleUnderstood(idx);
                }}
              >
                Understood
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConceptPane;


