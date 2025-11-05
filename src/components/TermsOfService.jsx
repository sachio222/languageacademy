import '../styles/LegalPages.css'

function TermsOfService({ onClose }) {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <button className="legal-close" onClick={onClose} aria-label="Close">×</button>
        
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last updated: November 5, 2025</p>

        <section>
          <h2>Agreement to Terms</h2>
          <p>
            By accessing Language Academy, you agree to these Terms of Service. 
            If you disagree with any part of these terms, please do not use our service.
          </p>
        </section>

        <section>
          <h2>Service Description</h2>
          <p>
            Language Academy provides online French language learning through a structured, 
            cognitive science-based curriculum. We offer lessons, exercises, and progress tracking.
          </p>
        </section>

        <section>
          <h2>Early Access</h2>
          <p>
            Our platform is currently in early access. Features may change, and we cannot 
            guarantee uninterrupted availability. We appreciate your patience and feedback 
            as we improve the platform.
          </p>
        </section>

        <section>
          <h2>User Accounts</h2>
          
          <h3>Account Creation</h3>
          <p>You must provide accurate information when creating an account. You are responsible for:</p>
          <ul>
            <li>Maintaining the security of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us of any unauthorized access</li>
          </ul>

          <h3>Age Requirement</h3>
          <p>You must be at least 13 years old to use Language Academy.</p>
        </section>

        <section>
          <h2>Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Share your account with others</li>
            <li>Attempt to access other users' data</li>
            <li>Reverse engineer or copy our curriculum</li>
            <li>Use automated tools to scrape content</li>
            <li>Violate any applicable laws or regulations</li>
          </ul>
        </section>

        <section>
          <h2>Intellectual Property</h2>
          <p>
            All content, including lessons, exercises, audio, and methodology, is owned by 
            Language Academy or our licensors. You may not reproduce, distribute, or create 
            derivative works without permission.
          </p>
        </section>

        <section>
          <h2>Free Trial and Pricing</h2>
          <p>
            We currently offer early access at no cost. When we introduce paid plans, 
            we will notify you in advance. Pricing and payment terms will be clearly 
            communicated before any charges apply.
          </p>
        </section>

        <section>
          <h2>User Content</h2>
          <p>
            When you submit feedback or other content to us, you grant us a license to use 
            that content to improve our services. We will not share your feedback publicly 
            without your permission.
          </p>
        </section>

        <section>
          <h2>Termination</h2>
          <p>
            You may delete your account at any time. We reserve the right to suspend or 
            terminate accounts that violate these terms or for legal reasons.
          </p>
        </section>

        <section>
          <h2>Disclaimers</h2>
          <p>
            Language Academy is provided "as is" without warranties of any kind. We do not 
            guarantee:
          </p>
          <ul>
            <li>Specific learning outcomes or fluency levels</li>
            <li>Uninterrupted or error-free service</li>
            <li>Accuracy or completeness of all content</li>
          </ul>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Language Academy shall not be liable 
            for any indirect, incidental, or consequential damages arising from your use 
            of our service.
          </p>
        </section>

        <section>
          <h2>Changes to Terms</h2>
          <p>
            We may modify these terms at any time. We will notify you of significant changes. 
            Continued use of our service after changes constitutes acceptance of new terms.
          </p>
        </section>

        <section>
          <h2>Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with applicable laws, 
            without regard to conflict of law provisions.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about these Terms of Service? Contact us at{' '}
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

export default TermsOfService

