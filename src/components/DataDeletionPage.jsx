import '../styles/LegalPages.css'

function DataDeletionPage({ onClose }) {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <button className="legal-close" onClick={onClose} aria-label="Close">×</button>
        
        <h1>Data Deletion Instructions</h1>
        <p className="legal-updated">Last updated: November 5, 2025</p>

        <section>
          <h2>How to Request Data Deletion</h2>
          <p>
            If you signed in to Language Academy using Facebook, you can request deletion of your data 
            in two ways:
          </p>
        </section>

        <section>
          <h2>Method 1: Remove App Access via Facebook</h2>
          <p>You can remove Language Academy's access to your Facebook account:</p>
          <ol>
            <li>Go to your <strong>Facebook Settings</strong></li>
            <li>Click on <strong>"Apps and Websites"</strong> (or "Apps" on mobile)</li>
            <li>Find <strong>"Language Academy"</strong> in the list</li>
            <li>Click <strong>"Remove"</strong> or <strong>"Delete"</strong></li>
            <li>Confirm the removal</li>
          </ol>
          <p>
            This will revoke Language Academy's access to your Facebook account. However, your account 
            and data will remain in our system until you also request deletion (see Method 2).
          </p>
        </section>

        <section>
          <h2>Method 2: Request Complete Data Deletion</h2>
          <p>
            To completely delete your account and all associated data from Language Academy, please 
            contact us directly:
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:support@languageacademy.io?subject=Data%20Deletion%20Request">
              support@languageacademy.io
            </a>
          </p>
          <p>
            Please include the following information in your email:
          </p>
          <ul>
            <li>Subject line: <strong>"Data Deletion Request"</strong></li>
            <li>Your email address associated with your account</li>
            <li>Your Facebook user ID (if you signed in with Facebook)</li>
            <li>Confirmation that you want all data permanently deleted</li>
          </ul>
        </section>

        <section>
          <h2>What Data Will Be Deleted</h2>
          <p>When you request data deletion, we will permanently remove:</p>
          <ul>
            <li>Your user profile and account information</li>
            <li>All learning progress and module completions</li>
            <li>Exercise attempt history and scores</li>
            <li>Vocabulary learning history</li>
            <li>Concept understanding records</li>
            <li>Exam attempts and results</li>
            <li>Session analytics data</li>
            <li>Email notification preferences</li>
            <li>Any other personal data associated with your account</li>
          </ul>
          <p>
            <strong>Note:</strong> This action cannot be undone. Once your data is deleted, you will 
            need to create a new account if you wish to use Language Academy again.
          </p>
        </section>

        <section>
          <h2>Processing Time</h2>
          <p>
            We will process your data deletion request within <strong>7 business days</strong> of 
            receiving your email. You will receive a confirmation email once your data has been 
            permanently deleted.
          </p>
        </section>

        <section>
          <h2>Questions?</h2>
          <p>
            If you have questions about data deletion or need assistance, please contact us at{' '}
            <a href="mailto:support@languageacademy.io">support@languageacademy.io</a>
          </p>
        </section>

        <div className="legal-footer">
          <button className="legal-btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default DataDeletionPage

