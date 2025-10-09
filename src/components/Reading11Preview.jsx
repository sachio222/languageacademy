import '../styles/Reading11Preview.css'

function Reading11Preview() {
  return (
    <div className="reading-preview-container">
      <div className="preview-header">
        <div className="preview-badge">Your goal</div>
        <h3>You'll be able to read this by the end of the initial program</h3>
        <p>
          Authentic French text about modern France. Hover over any word for instant translations,
          and learn about places like the Eiffel Tower with rich Wikipedia cards.
        </p>
      </div>

      <div className="reading-sample">
        <div className="reading-title">La France d'Aujourd'hui</div>
        <div className="reading-subtitle">Modern France: A Nation in Motion</div>

        <div className="reading-content-wrapper">
          <div className="reading-text-container">
            <div className="reading-text">
              <p>
                La France d'aujourd'hui est un pays qui continue à{' '}
                <span className="tooltip-word">évoluer</span>{' '}
                <span className="tooltip-word">rapidement</span>
                . Avec ses soixante-huit millions d'
                <span className="tooltip-word">habitants</span>
                , elle reste une nation importante en Europe et dans le monde.
              </p>

              <p>
                Paris, sa capitale, compte plus de deux millions de personnes. Cette ville{' '}
                <span className="tooltip-word">magnifique</span>{' '}
                <span className="tooltip-word">attire</span>{' '}
                des millions de{' '}
                <span className="tooltip-word">visiteurs</span>{' '}
                chaque année. Ils viennent admirer ses{' '}
                <span className="tooltip-word">monuments</span>{' '}
                <span className="tooltip-word">célèbres</span>{' '}
                comme la{' '}
                <span className="tooltip-word">Tour Eiffel</span>
                ,{' '}
                <span className="tooltip-word">Notre-Dame</span>
                , le{' '}
                <span className="tooltip-word">Louvre</span>
                , et l'Arc de Triomphe sur les Champs-Élysées.
              </p>

              <p>
                Beaucoup visitent aussi le{' '}
                <span className="tooltip-word">château</span>{' '}
                de{' '}
                <span className="tooltip-word">Versailles</span>
                . Les touristes cherchent souvent des directions pour trouver ces lieux{' '}
                <span className="tooltip-word">historiques</span>
                .
              </p>

              <div className="fade-overlay"></div>
            </div>
          </div>

          {/* Tooltip Examples Stack - Static showcase */}
          <div className="tooltip-examples">
            {/* Wikipedia Tooltip Example 1 - Most visible */}
            <div className="tooltip-example-card wiki front" style={{ top: '3rem', right: '0' }}>
              <div className="wiki-tooltip-demo">
                <div className="wiki-tooltip-image">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paris_-_Eiffelturm_und_Marsfeld2.jpg/300px-Paris_-_Eiffelturm_und_Marsfeld2.jpg" alt="Tour Eiffel" />
                </div>
                <div className="wiki-tooltip-content">
                  <div className="wiki-tooltip-title">Tour Eiffel</div>
                  <div className="wiki-tooltip-description">
                    Iron lattice tower, 330m tall, built 1887-1889. Symbol of Paris, 7 million visitors per year.
                  </div>
                  <div className="wiki-tooltip-link">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M10.5 0h-9A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 0zM6 9.75a.75.75 0 110-1.5.75.75 0 010 1.5zm.75-3a.75.75 0 01-1.5 0v-3a.75.75 0 011.5 0v3z" />
                    </svg>
                    Wikipedia
                  </div>
                </div>
              </div>
            </div>

            {/* Wikipedia Tooltip Example 2 - Partially behind */}
            <div className="tooltip-example-card wiki back" style={{ top: '2rem', right: '2.5rem' }}>
              <div className="wiki-tooltip-demo partial">
                <div className="wiki-tooltip-image">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/300px-Louvre_Museum_Wikimedia_Commons.jpg" alt="Louvre Museum" />
                </div>
                <div className="wiki-tooltip-content">
                  <div className="wiki-tooltip-title">Louvre Museum</div>
                  <div className="wiki-tooltip-description">
                    World's largest art museum, houses the Mona Lisa...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reading-stats">
          <div className="stat-group">
            <div className="stat-value">~400</div>
            <div className="stat-label">words</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-group">
            <div className="stat-value">12</div>
            <div className="stat-label">paragraphs</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-group">
            <div className="stat-value">B1</div>
            <div className="stat-label">level text</div>
          </div>
        </div>

        <div className="reading-caption">
          <strong>Topics covered:</strong> Modern France, Paris monuments, education system,
          French culture, cuisine (coq au vin, ratatouille), economy, transportation,
          technology, environment, international relations.
        </div>
      </div>

      <div className="preview-note">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" fill="#3b82f6" />
        </svg>
        <div>
          All vocabulary from Units 1-11. Every word has an instant translation tooltip.
          Places and proper nouns include rich Wikipedia cards with images and context.
        </div>
      </div>
    </div>
  )
}

export default Reading11Preview
