import { useState, useEffect } from 'react';
import { useSupabaseClient } from '../hooks/useSupabaseClient';
import { useAuth } from '../hooks/useAuth';
import { logger } from '../utils/logger';
import './CommunicationAdmin.css';

const CommunicationAdmin = () => {
  const supabaseClient = useSupabaseClient();
  const { supabaseUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // Overview stats
  const [stats, setStats] = useState({
    sentToday: 0,
    sentWeek: 0,
    pendingCount: 0,
    failedCount: 0,
  });

  // Email logs
  const [logs, setLogs] = useState([]);
  const [logFilters, setLogFilters] = useState({
    email_type: '',
    status: '',
    search: '',
  });

  // Email queue
  const [queue, setQueue] = useState([]);

  // Templates
  const [templates, setTemplates] = useState([]);
  const [editingTemplate, setEditingTemplate] = useState(null);

  // Manual send
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [sendLoading, setSendLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    if (!supabaseClient) return;
    loadData();
  }, [supabaseClient, activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'overview') {
        await loadStats();
      } else if (activeTab === 'logs') {
        await loadLogs();
      } else if (activeTab === 'templates') {
        await loadTemplates();
      } else if (activeTab === 'send') {
        await loadManualSendData();
      }
    } catch (error) {
      logger.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Get sent today
    const { count: sentToday } = await supabaseClient
      .from('email_logs')
      .select('*', { count: 'exact', head: true })
      .gte('sent_at', today.toISOString());

    // Get sent this week
    const { count: sentWeek } = await supabaseClient
      .from('email_logs')
      .select('*', { count: 'exact', head: true })
      .gte('sent_at', weekAgo.toISOString());

    // Get pending emails
    const { count: pendingCount } = await supabaseClient
      .from('email_queue')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get failed emails (last 24h)
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const { count: failedCount } = await supabaseClient
      .from('email_queue')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'failed')
      .gte('created_at', oneDayAgo.toISOString());

    setStats({
      sentToday: sentToday || 0,
      sentWeek: sentWeek || 0,
      pendingCount: pendingCount || 0,
      failedCount: failedCount || 0,
    });

    // Load recent activity
    const { data: recentLogs } = await supabaseClient
      .from('email_logs')
      .select('*, user_profiles(email, first_name, last_name)')
      .order('sent_at', { ascending: false })
      .limit(10);

    setLogs(recentLogs || []);
  };

  const loadLogs = async () => {
    let query = supabaseClient
      .from('email_logs')
      .select('*, user_profiles(email, first_name, last_name)')
      .order('sent_at', { ascending: false })
      .limit(100);

    if (logFilters.email_type) {
      query = query.eq('email_type', logFilters.email_type);
    }
    if (logFilters.status) {
      query = query.eq('status', logFilters.status);
    }

    const { data } = await query;
    setLogs(data || []);
  };

  const loadTemplates = async () => {
    const { data } = await supabaseClient
      .from('email_templates')
      .select('*')
      .order('template_type');

    setTemplates(data || []);
  };

  const loadManualSendData = async () => {
    // Load templates
    const { data: templatesData } = await supabaseClient
      .from('email_templates')
      .select('*')
      .eq('active', true)
      .order('template_type');

    setTemplates(templatesData || []);

    // Load all users
    const { data: usersData } = await supabaseClient
      .from('user_profiles')
      .select('id, email, first_name, last_name, preferred_name')
      .order('email');

    setAllUsers(usersData || []);
  };

  const handleSendManualEmail = async () => {
    if (!selectedTemplate || selectedUsers.length === 0) {
      alert('Please select a template and at least one user');
      return;
    }

    setSendLoading(true);
    try {
      const template = templates.find(t => t.template_type === selectedTemplate);
      if (!template) throw new Error('Template not found');

      // Queue emails for selected users
      const queueItems = selectedUsers.map(userId => ({
        user_id: userId,
        email_type: selectedTemplate,
        scheduled_for: new Date().toISOString(),
        metadata: {},
      }));

      const { error } = await supabaseClient
        .from('email_queue')
        .insert(queueItems);

      if (error) throw error;

      alert(`Successfully queued ${selectedUsers.length} email(s)!`);
      setSelectedUsers([]);
      setSelectedTemplate('');
    } catch (error) {
      logger.error('Error queuing emails:', error);
      alert('Error queuing emails: ' + error.message);
    } finally {
      setSendLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'delivered': return 'status-delivered';
      case 'sent': return 'status-delivered';
      case 'pending': return 'status-pending';
      case 'failed': return 'status-failed';
      case 'bounced': return 'status-failed';
      default: return 'status-pending';
    }
  };

  return (
    <div className="communication-admin">
      <div className="communication-admin-header">
        <h1>Communication Admin</h1>
        <p>Manage email communications and templates</p>
      </div>

      <div className="communication-admin-tabs">
        <button
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={activeTab === 'send' ? 'active' : ''}
          onClick={() => setActiveTab('send')}
        >
          Manual Send
        </button>
        <button
          className={activeTab === 'logs' ? 'active' : ''}
          onClick={() => setActiveTab('logs')}
        >
          Email Logs
        </button>
        <button
          className={activeTab === 'templates' ? 'active' : ''}
          onClick={() => setActiveTab('templates')}
        >
          Templates
        </button>
      </div>

      <div className="communication-admin-content">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>Sent Today</h3>
                    <p className="stat-number">{stats.sentToday}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Sent This Week</h3>
                    <p className="stat-number">{stats.sentWeek}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Pending</h3>
                    <p className="stat-number">{stats.pendingCount}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Failed (24h)</h3>
                    <p className="stat-number">{stats.failedCount}</p>
                  </div>
                </div>

                <div className="recent-activity">
                  <h2>Recent Activity</h2>
                  <table className="email-logs-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Recipient</th>
                        <th>Status</th>
                        <th>Sent At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map(log => (
                        <tr key={log.id}>
                          <td>{log.email_type}</td>
                          <td>{log.user_profiles?.email || log.recipient_email}</td>
                          <td>
                            <span className={`status-badge ${getStatusBadgeClass(log.status)}`}>
                              {log.status}
                            </span>
                          </td>
                          <td>{formatDate(log.sent_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Manual Send Tab */}
            {activeTab === 'send' && (
              <div className="manual-send-tab">
                <h2>Send Manual Email</h2>
                
                <div className="manual-send-form">
                  <div className="form-group">
                    <label>Select Email Template</label>
                    <select
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="form-select"
                    >
                      <option value="">Choose a template...</option>
                      {templates.map(template => (
                        <option key={template.id} value={template.template_type}>
                          {template.template_name} ({template.template_type})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Select Recipients</label>
                    <div className="user-selection">
                      <select
                        multiple
                        value={selectedUsers}
                        onChange={(e) => {
                          const options = Array.from(e.target.selectedOptions);
                          setSelectedUsers(options.map(o => o.value));
                        }}
                        className="form-select user-select-multiple"
                        size={10}
                      >
                        {allUsers.map(user => (
                          <option key={user.id} value={user.id}>
                            {user.email} - {user.preferred_name || user.first_name || 'No name'}
                          </option>
                        ))}
                      </select>
                      <p className="help-text">
                        Hold Ctrl (Windows) or Cmd (Mac) to select multiple users.
                        {selectedUsers.length > 0 && ` Selected: ${selectedUsers.length}`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSendManualEmail}
                    disabled={!selectedTemplate || selectedUsers.length === 0 || sendLoading}
                    className="send-btn"
                  >
                    {sendLoading ? 'Sending...' : `Send to ${selectedUsers.length} User(s)`}
                  </button>
                </div>
              </div>
            )}

            {/* Email Logs Tab */}
            {activeTab === 'logs' && (
              <div className="logs-tab">
                <h2>Email Logs</h2>

                <div className="log-filters">
                  <select
                    value={logFilters.email_type}
                    onChange={(e) => {
                      setLogFilters({ ...logFilters, email_type: e.target.value });
                      setTimeout(loadLogs, 100);
                    }}
                    className="filter-select"
                  >
                    <option value="">All Types</option>
                    <option value="welcome">Welcome</option>
                    <option value="review_reminder">Review Reminder</option>
                    <option value="module_nudge">Module Nudge</option>
                  </select>

                  <select
                    value={logFilters.status}
                    onChange={(e) => {
                      setLogFilters({ ...logFilters, status: e.target.value });
                      setTimeout(loadLogs, 100);
                    }}
                    className="filter-select"
                  >
                    <option value="">All Statuses</option>
                    <option value="delivered">Delivered</option>
                    <option value="failed">Failed</option>
                    <option value="bounced">Bounced</option>
                  </select>

                  <button onClick={loadLogs} className="refresh-btn">
                    Refresh
                  </button>
                </div>

                <table className="email-logs-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Recipient</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Sent At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map(log => (
                      <tr key={log.id}>
                        <td>{log.email_type}</td>
                        <td>{log.user_profiles?.email || log.recipient_email}</td>
                        <td className="subject-cell">{log.subject}</td>
                        <td>
                          <span className={`status-badge ${getStatusBadgeClass(log.status)}`}>
                            {log.status}
                          </span>
                        </td>
                        <td>{formatDate(log.sent_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {logs.length === 0 && (
                  <div className="empty-state">No email logs found</div>
                )}
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="templates-tab">
                <h2>Email Templates</h2>
                
                <div className="templates-list">
                  {templates.map(template => (
                    <div key={template.id} className="template-card">
                      <div className="template-header">
                        <h3>{template.template_name}</h3>
                        <span className={`template-badge ${template.active ? 'active' : 'inactive'}`}>
                          {template.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="template-meta">
                        <span className="template-type">{template.template_type}</span>
                        <span className="template-trigger">{template.trigger_type}</span>
                      </div>
                      <div className="template-subject">
                        <strong>Subject:</strong> {template.subject}
                      </div>
                      <div className="template-variables">
                        <strong>Variables:</strong> {template.available_variables?.join(', ') || 'None'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="templates-note">
                  <p>
                    <strong>Note:</strong> Template editing requires database access. 
                    To modify templates, update them directly in the email_templates table or use Edge Functions.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommunicationAdmin;

