import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useSupabaseProgress } from '../hooks/useSupabaseProgress';
import { extractModuleId } from '../utils/progressSync';

function ConceptPane({ concepts, moduleId }) {
  const [understoodConcepts, setUnderstoodConcepts] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const { updateConceptUnderstanding, isAuthenticated, supabaseClient, supabaseUser } = useSupabaseProgress();

  // Load understood concepts from database when module loads
  useEffect(() => {
    const loadUnderstoodConcepts = async () => {
      if (!isAuthenticated || !supabaseUser || !moduleId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabaseClient
          .from('concept_understanding')
          .select('concept_index')
          .eq('user_id', supabaseUser.id)
          .eq('module_id', moduleId);

        if (error) throw error;

        const understoodSet = new Set(data.map(c => c.concept_index));
        setUnderstoodConcepts(understoodSet);
        console.log('Loaded understood concepts:', understoodSet);
      } catch (error) {
        console.error('Error loading understood concepts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUnderstoodConcepts();
  }, [moduleId, isAuthenticated, supabaseUser, supabaseClient]);

  const toggleUnderstood = async (conceptIndex) => {
    console.log('===== TOGGLE UNDERSTOOD CALLED =====', conceptIndex);
    const isCurrentlyUnderstood = understoodConcepts.has(conceptIndex);
    const newUnderstood = !isCurrentlyUnderstood;
    console.log('Currently understood?', isCurrentlyUnderstood, '→ New:', newUnderstood);

    // Optimistic update
    setUnderstoodConcepts(prev => {
      const newSet = new Set(prev);
      if (newUnderstood) {
        newSet.add(conceptIndex);
      } else {
        newSet.delete(conceptIndex);
      }
      return newSet;
    });

    // Sync with Supabase if authenticated
    console.log('Auth check:', { isAuthenticated, hasModuleId: !!moduleId, hasConcept: !!concepts[conceptIndex] });

    if (isAuthenticated && moduleId && concepts[conceptIndex]) {
      try {
        console.log('Saving concept understanding:', {
          moduleId,
          conceptIndex,
          term: concepts[conceptIndex].term,
          understood: newUnderstood
        });

        await updateConceptUnderstanding(
          moduleId,
          conceptIndex,
          concepts[conceptIndex].term,
          newUnderstood
        );

        console.log('Concept understanding saved successfully');
      } catch (error) {
        console.error('Error updating concept understanding:', error);
        // Revert optimistic update on error
        setUnderstoodConcepts(prev => {
          const newSet = new Set(prev);
          if (isCurrentlyUnderstood) {
            newSet.add(conceptIndex);
          } else {
            newSet.delete(conceptIndex);
          }
          return newSet;
        });
      }
    }
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


