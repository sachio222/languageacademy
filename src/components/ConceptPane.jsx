function ConceptPane({ concepts }) {
  return (
    <div className="concept-pane">
      <h3>📚 Concepts</h3>
      <div className="concepts-list">
        {concepts.map((concept, idx) => (
          <div key={idx} className="concept-item">
            <h4>{concept.term}</h4>
            <p className="concept-definition">{concept.definition}</p>
            <div className="concept-example">
              <strong>Example:</strong> <code>{concept.example}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConceptPane;


