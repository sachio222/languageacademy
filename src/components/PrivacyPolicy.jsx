import '../styles/LegalPages.css'

function PrivacyPolicy({ onClose }) {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <button className="legal-close" onClick={onClose} aria-label="Close">×</button>
        
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: November 5, 2025</p>

        <section>
          <h2>Overview</h2>
          <p>
            Language Academy ("we," "our," or "us") is committed to protecting your privacy. 
            This policy explains how we collect, use, and safeguard your information.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          
          <h3>Account Information</h3>
          <p>When you create an account, we collect:</p>
          <ul>
            <li>Email address</li>
            <li>Name (if provided)</li>
            <li>Authentication credentials</li>
          </ul>

          <h3>Learning Data</h3>
          <p>To provide our services, we collect and store:</p>
          <ul>
            <li>Lesson progress and completion status</li>
            <li>Exercise performance and scores</li>
            <li>Vocabulary learning history</li>
            <li>Study patterns and preferences</li>
          </ul>

          <h3>Usage Information</h3>
          <p>We automatically collect:</p>
          <ul>
            <li>Device and browser information</li>
            <li>Log data (IP address, access times)</li>
            <li>Cookie data (with your consent)</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and improve our language learning services</li>
            <li>Track your progress and personalize your experience</li>
            <li>Send important updates about your account or our services</li>
            <li>Analyze usage patterns to enhance our platform</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2>Data Sharing</h2>
          <p>We do not sell your personal information. We may share data with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party services that help us operate (authentication, hosting, analytics)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your information. 
            However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request corrections to your data</li>
            <li>Delete your account and associated data</li>
            <li>Opt out of marketing communications</li>
            <li>Export your learning data</li>
          </ul>
        </section>

        <section>
          <h2>GDPR Compliance</h2>
          <p>
            For users in the European Economic Area (EEA), we comply with the General Data 
            Protection Regulation (GDPR).
          </p>
          
          <h3>Legal Basis for Processing</h3>
          <p>We process your data based on:</p>
          <ul>
            <li><strong>Contract performance:</strong> To provide our language learning services</li>
            <li><strong>Legitimate interest:</strong> To improve and secure our platform</li>
            <li><strong>Consent:</strong> For optional features like analytics cookies</li>
          </ul>

          <h3>Data Retention</h3>
          <p>
            We retain your personal data only as long as necessary to provide our services 
            or as required by law. Account data is deleted within 30 days of account deletion.
          </p>

          <h3>International Data Transfers</h3>
          <p>
            Your data may be processed outside the EEA. We ensure appropriate safeguards 
            are in place through standard contractual clauses or other approved mechanisms.
          </p>

          <h3>EU User Rights</h3>
          <p>Under GDPR, you have the right to:</p>
          <ul>
            <li>Withdraw consent at any time</li>
            <li>Object to processing based on legitimate interests</li>
            <li>Request data portability</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            We use cookies and similar technologies to maintain your session, remember your 
            preferences, and analyze usage. You can manage cookie settings through our cookie banner.
          </p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            Our service is not intended for children under 13. We do not knowingly collect 
            information from children under 13.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. We will notify you of significant 
            changes by email or through our platform.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{' '}
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

export default PrivacyPolicy

