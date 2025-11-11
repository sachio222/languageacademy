import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { logger } from '../utils/logger';
import { emailTemplates } from '../utils/emailTemplates';
import './CommunicationAdmin.css';

const CommunicationAdmin = () => {
  const { supabaseClient } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, today: 0, thisWeek: 0 });
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    if (!supabaseClient) return;
    loadLogs();
  }, [supabaseClient]);

  const loadLogs = async () => {
    try {
      setLoading(true);

      // Get all logs
      const { data: allLogs } = await supabaseClient
        .from('email_logs')
        .select('*, user_profiles(email, first_name)')
        .order('sent_at', { ascending: false })
        .limit(100);

      setLogs(allLogs || []);

      // Calculate stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);

      setStats({
        total: allLogs?.length || 0,
        today: allLogs?.filter(l => new Date(l.sent_at) >= today).length || 0,
        thisWeek: allLogs?.filter(l => new Date(l.sent_at) >= weekAgo).length || 0
      });
    } catch (error) {
      logger.error('Error loading email logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleTestResend = async () => {
    setTestLoading(true);
    
    // Debug: Check if client exists
    if (!supabaseClient) {
      alert('❌ No Supabase client - not authenticated?');
      setTestLoading(false);
      return;
    }
    
    try {
      console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('VITE_SUPABASE_ANON_KEY exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-resend-email`;
      console.log('Full URL:', url);
      
      const requestBody = {
        to: 'brainpowerux@gmail.com',
        subject: 'Test Email from Language Academy', 
        html: '<h1>Hello from Resend!</h1><p>This is a test email to verify Resend integration is working.</p><p>If you received this, everything is connected properly!</p>',
        email_type: 'test',
        metadata: { test: true }
      };
      
      const bodyString = JSON.stringify(requestBody);
      console.log('Request body object:', requestBody);
      console.log('Request body JSON:', bodyString);
      console.log('Body length:', bodyString.length);
      
      // Call directly using same env vars as rest of app
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: bodyString
      });

      const result = await response.json();

      if (result.success) {
        alert('✅ Test email sent via Resend! Check brainpowerux@gmail.com');
        loadLogs(); // Refresh logs to show the send
      } else {
        alert('❌ ' + (result.reason || result.error || 'Unknown error'));
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
    } finally {
      setTestLoading(false);
    }
  };

  const handleTestWOTD = async () => {
    setTestLoading(true);
    
    if (!supabaseClient) {
      alert('❌ No Supabase client - not authenticated?');
      setTestLoading(false);
      return;
    }
    
    try {
      // Stub data for WOTD test
      const testData = {
        word: 'aller',
        pronunciation: 'a.le',
        optionA: 'to go',      // correct answer
        optionB: 'to have',
        optionC: 'to want',
        optionD: 'to make',
        wordId: 'aller-fr',
        partOfSpeech: 'verb',
        difficultyLabel: 'A2 Level'
      };

      // Generate the email HTML using our template
      const { subject, html } = emailTemplates.wordOfTheDay(
        testData.word,
        testData.pronunciation,
        testData.optionA,
        testData.optionB,
        testData.optionC,
        testData.optionD,
        testData.wordId,
        testData.partOfSpeech,
        testData.difficultyLabel
      );

      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-resend-email`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: 'brainpowerux@gmail.com',
          subject: subject,
          html: html,
          email_type: 'word_of_day',
          metadata: { 
            word: testData.word,
            word_id: testData.wordId,
            test: true 
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        alert('✅ WOTD email sent! Check brainpowerux@gmail.com');
        loadLogs();
      } else {
        alert('❌ ' + (result.reason || result.error || 'Unknown error'));
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="communication-admin">
      <div className="communication-admin-header">
        <h1>Email Activity</h1>
        <p>Track automated emails sent by the system</p>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Sent</h3>
              <p className="stat-number">{stats.total}</p>
            </div>
            <div className="stat-card">
              <h3>Sent Today</h3>
              <p className="stat-number">{stats.today}</p>
            </div>
            <div className="stat-card">
              <h3>This Week</h3>
              <p className="stat-number">{stats.thisWeek}</p>
            </div>
          </div>

          <div className="test-section">
            <button 
              onClick={handleTestResend}
              disabled={testLoading}
              className="test-email-btn"
            >
              {testLoading ? 'Sending...' : 'Test Simple Email'}
            </button>
            <button 
              onClick={handleTestWOTD}
              disabled={testLoading}
              className="test-email-btn wotd-btn"
            >
              {testLoading ? 'Sending...' : 'Test Word of the Day Email'}
            </button>
          </div>

          <div className="email-logs-section">
            <h2>Recent Emails</h2>
            <table className="email-logs-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Recipient</th>
                  <th>Subject</th>
                  <th>Provider</th>
                  <th>Sent</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id}>
                    <td>{log.email_type}</td>
                    <td>{log.user_profiles?.email || log.recipient_email}</td>
                    <td>{log.subject}</td>
                    <td>{log.provider || 'resend'}</td>
                    <td>{formatDate(log.sent_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {logs.length === 0 && (
              <div className="empty-state">No emails sent yet</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CommunicationAdmin;

