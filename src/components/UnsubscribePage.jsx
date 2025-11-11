import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSupabaseClient } from '../hooks/useSupabaseClient';
import '../styles/UnsubscribePage.css';

function UnsubscribePage() {
  const { user, supabaseUser } = useAuth();
  const supabase = useSupabaseClient();
  const [emailType, setEmailType] = useState('wotd');
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [email, setEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') || 'wotd';
    setEmailType(type);
  }, []);

  const handleUnsubscribe = async () => {
    setStatus('loading');

    try {
      if (!user || !supabaseUser) {
        // For non-auth users, just show success
        setStatus('success');
        return;
      }

      // Update notification preferences
      const { data: existingPrefs } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .single();

      const updateData = {
        user_id: supabaseUser.id,
        word_of_day: emailType === 'wotd' ? false : (existingPrefs?.word_of_day ?? true),
        weekly_summary: emailType === 'weekly' ? false : (existingPrefs?.weekly_summary ?? true),
        lesson_complete: emailType === 'lesson' ? false : (existingPrefs?.lesson_complete ?? true),
        email_enabled: existingPrefs?.email_enabled ?? true,
      };

      if (existingPrefs) {
        await supabase
          .from('notification_preferences')
          .update(updateData)
          .eq('user_id', supabaseUser.id);
      } else {
        await supabase
          .from('notification_preferences')
          .insert(updateData);
      }

      setStatus('success');
    } catch (error) {
      console.error('Error unsubscribing:', error);
      setStatus('error');
    }
  };

  const getEmailTypeName = () => {
    switch (emailType) {
      case 'wotd': return 'Word of the Day';
      case 'weekly': return 'Weekly Summary';
      case 'lesson': return 'Lesson Completion';
      default: return 'Email';
    }
  };

  if (status === 'success') {
    return (
      <div className="unsubscribe-page">
        <div className="unsubscribe-container">
          <img src="/img/logov2.png" alt="Language Academy" className="unsubscribe-logo" />
          <div className="unsubscribe-success">
            <h1>You're unsubscribed</h1>
            <p>You won't receive {getEmailTypeName()} emails anymore.</p>
            <p className="unsubscribe-note">
              You can update your email preferences anytime in your account settings.
            </p>
            <div className="unsubscribe-actions">
              <a href="/" className="unsubscribe-btn-primary">
                Go to App
              </a>
              {user && (
                <a href="/settings?section=notifications" className="unsubscribe-btn-secondary">
                  Manage Preferences
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="unsubscribe-page">
      <div className="unsubscribe-container">
        <img src="/img/logov2.png" alt="Language Academy" className="unsubscribe-logo" />
        <div className="unsubscribe-content">
          <h1>Unsubscribe from {getEmailTypeName()}</h1>
          <p>We're sorry to see you go. You can unsubscribe from these emails below.</p>
          
          {!user && (
            <div className="unsubscribe-email-input">
              <label>Email address (optional)</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
          )}

          <button 
            className="unsubscribe-btn-primary"
            onClick={handleUnsubscribe}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Unsubscribing...' : `Unsubscribe from ${getEmailTypeName()}`}
          </button>

          <a href="/" className="unsubscribe-link">
            Never mind, take me back
          </a>
        </div>
      </div>
    </div>
  );
}

export default UnsubscribePage;

