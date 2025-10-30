import { useState } from 'react';
import { supabase } from '../lib/supabase';
import './FeedbackForm.css';
import { logger } from "../utils/logger";

const FeedbackForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      // Submit feedback to Supabase
      const { error } = await supabase
        .from('feedback')
        .insert({
          name: formData.name || null,
          email: formData.email || null,
          category: formData.category,
          feedback: formData.feedback,
          user_id: user?.id || null
        });

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', feedback: '', category: 'general' });

      // Close modal after a short delay
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      logger.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="feedback-modal-backdrop" onClick={handleBackdropClick}>
      <div className="feedback-modal">
        <div className="feedback-modal-header">
          <h2>Give Early Feedback</h2>
          <button
            className="feedback-close-btn"
            onClick={onClose}
            aria-label="Close feedback form"
          >
            ×
          </button>
        </div>

        <div className="feedback-modal-content">
          <p className="feedback-intro">
            We're in early development and would love your feedback!
            Help us improve Language Academy by sharing your thoughts.
          </p>

          {submitStatus === 'success' && (
            <div className="feedback-success">
              <div className="feedback-success-icon">✓</div>
              <p>Thank you for your feedback! We'll review it and use it to improve the app.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="feedback-error">
              <div className="feedback-error-icon">⚠</div>
              <p>Sorry, there was an error submitting your feedback. Please try again.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="feedback-form-group">
              <label htmlFor="name">Name (optional)</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                disabled={isSubmitting}
              />
            </div>

            <div className="feedback-form-group">
              <label htmlFor="email">Email (optional)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
            </div>

            <div className="feedback-form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                disabled={isSubmitting}
              >
                <option value="general">General Feedback</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="ui">UI/UX Feedback</option>
                <option value="content">Content Feedback</option>
              </select>
            </div>

            <div className="feedback-form-group">
              <label htmlFor="feedback">Your Feedback *</label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleInputChange}
                placeholder="Tell us what you think! What's working well? What could be improved? Any specific issues or suggestions?"
                rows="6"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="feedback-form-actions">
              <button
                type="button"
                onClick={onClose}
                className="feedback-btn feedback-btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="feedback-btn feedback-btn-primary"
                disabled={isSubmitting || !formData.feedback.trim()}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
