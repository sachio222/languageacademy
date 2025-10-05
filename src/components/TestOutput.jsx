function TestOutput({ results, expectedAnswer }) {
  const { lintResults, testResults, passed, failed, total } = results;

  return (
    <div className="test-output">
      <div className="output-header">
        <h4>Test Results</h4>
        <div className="test-summary">
          <span className={passed === total ? 'success' : 'error'}>
            {passed} passed
          </span>
          {failed > 0 && <span className="error">{failed} failed</span>}
          <span className="total">{total} total</span>
        </div>
      </div>

      {/* Linting Errors */}
      {lintResults && lintResults.errors.length > 0 && (
        <div className="lint-section">
          <h5>❌ Grammar Errors (Linting):</h5>
          {lintResults.errors.map((error, idx) => (
            <div key={idx} className="lint-error">
              <div className="error-type">{error.type}</div>
              <div className="error-message">{error.message}</div>
              {error.expected && (
                <div className="error-hint">
                  Expected: <code>{error.expected}</code>
                  {error.actual && <> • Got: <code>{error.actual}</code></>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Linting Warnings */}
      {lintResults && lintResults.warnings.length > 0 && (
        <div className="lint-section warnings">
          <h5>⚠️ Warnings:</h5>
          {lintResults.warnings.map((warning, idx) => (
            <div key={idx} className="lint-warning">
              <div className="warning-message">{warning.message}</div>
            </div>
          ))}
        </div>
      )}

      {/* Test Results */}
      {lintResults && lintResults.valid && (
        <div className="tests-section">
          {/* <h5>Tests:</h5> */}
          {testResults.map((test, idx) => (
            <div key={idx} className={`test-result ${test.passed ? (test.hasAccentWarning ? 'pass-warning' : 'pass') : 'fail'}`}>
              <div className="test-message">{test.message}</div>
            </div>
          ))}
        </div>
      )}

      {/* Show expected answer */}
      {lintResults && lintResults.valid && (
        <div className="expected-answer">
          <strong>Expected answer:</strong> <code>{expectedAnswer}</code>
        </div>
      )}
    </div>
  );
}

export default TestOutput;


