import { useState, useEffect } from 'react';
import { useSupabaseClient } from '../hooks/useSupabaseClient';
import { logger } from '../utils/logger';
import './CommunicationAdmin.css';

const CommunicationAdmin = () => {
  const supabaseClient = useSupabaseClient();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, today: 0, thisWeek: 0 });

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

