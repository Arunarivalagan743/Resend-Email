import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaFlask, FaEnvelope, FaRocket, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const EmailForm = ({ apiStatus }) => {
  const [activeTab, setActiveTab] = useState('test');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const isDevelopmentMode = import.meta.env.DEV || process.env.NODE_ENV === 'development';

  // Admin test accounts for development
  const adminTestAccounts = [
    'admin@test.com',
    'test@admin.com',
    'developer@test.com',
    'demo@test.com'
  ];

  // Common hosted domains that need verification
  const hostedDomains = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'icloud.com',
    'protonmail.com',
    'aol.com'
  ];

  useEffect(() => {
    // Show development mode toast on component mount
    if (isDevelopmentMode) {
      toast((t) => (
        <div className="toast-content">
          <FaInfoCircle className="toast-icon info" />
          <div>
            <strong>Development Mode Active</strong>
            <br />
            <small>Using test environment for email sending</small>
          </div>
        </div>
      ), {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#e3f2fd',
          color: '#1976d2',
          border: '1px solid #bbdefb'
        }
      });
    }
  }, [isDevelopmentMode]);

  // Helper function to check if email is admin test account
  const isAdminTestAccount = (email) => {
    return adminTestAccounts.some(admin => email.toLowerCase().includes(admin.toLowerCase()));
  };

  // Helper function to check if email uses hosted domain
  const isHostedDomain = (email) => {
    const domain = email.split('@')[1]?.toLowerCase();
    return hostedDomains.includes(domain);
  };

  // Enhanced toast notifications based on email type
  const showEmailTypeToast = (email, emailType = 'test') => {
    if (isAdminTestAccount(email)) {
      toast((t) => (
        <div className="toast-content">
          <FaCheckCircle className="toast-icon success" />
          <div>
            <strong>Admin Test Account Detected</strong>
            <br />
            <small>Email will be sent to testing account: {email}</small>
          </div>
        </div>
      ), {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#e8f5e8',
          color: '#2e7d32',
          border: '1px solid #c8e6c9'
        }
      });
    } else if (isHostedDomain(email)) {
      toast((t) => (
        <div className="toast-content">
          <FaExclamationTriangle className="toast-icon warning" />
          <div>
            <strong>Hosted Domain Detected</strong>
            <br />
            <small>Please verify domain ownership for: {email.split('@')[1]}</small>
          </div>
        </div>
      ), {
        duration: 5000,
        position: 'top-right',
        style: {
          background: '#fff3e0',
          color: '#f57c00',
          border: '1px solid #ffcc02'
        }
      });
    } else {
      toast((t) => (
        <div className="toast-content">
          <FaEnvelope className="toast-icon info" />
          <div>
            <strong>Custom Email Domain</strong>
            <br />
            <small>Sending to custom domain: {email.split('@')[1]}</small>
          </div>
        </div>
      ), {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#f3e5f5',
          color: '#7b1fa2',
          border: '1px solid #ce93d8'
        }
      });
    }
  };

  // Form states
  const [testForm, setTestForm] = useState({
    to: '',
    from: '',
    message: ''
  });

  const [customForm, setCustomForm] = useState({
    to: '',
    subject: '',
    message: '',
    from: ''
  });

  const handleTestFormChange = (e) => {
    setTestForm({
      ...testForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCustomFormChange = (e) => {
    setCustomForm({
      ...customForm,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendTestEmail = async (e) => {
    e.preventDefault();
    
    if (!testForm.to) {
      toast.error('Please enter recipient email address');
      return;
    }

    if (!validateEmail(testForm.to)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (apiStatus !== 'online') {
      toast.error('API is not available. Please check if the backend is running.');
      return;
    }

    // Show email type toast
    showEmailTypeToast(testForm.to, 'test');

    setIsLoading(true);
    setResponse(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/email/send-test`, {
        to: testForm.to,
        from: testForm.from,
        message: testForm.message
      }, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setResponse({ type: 'success', data: response.data });
      toast.success('Test email sent successfully!');
      
      // Reset form
      setTestForm({ to: '', from: '', message: '' });

    } catch (error) {
      console.error('Error sending test email:', error);
      
      const errorMessage = error.response?.data?.error || error.message || 'Failed to send email';
      const errorDetails = error.response?.data?.details || 'Please check your configuration';
      
      setResponse({ 
        type: 'error', 
        data: { 
          error: errorMessage,
          details: errorDetails,
          status: error.response?.status
        }
      });
      
      toast.error(`Failed to send email: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const sendCustomEmail = async (e) => {
    e.preventDefault();
    
    if (!customForm.to || !customForm.subject || !customForm.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!validateEmail(customForm.to)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (apiStatus !== 'online') {
      toast.error('API is not available. Please check if the backend is running.');
      return;
    }

    // Show email type toast
    showEmailTypeToast(customForm.to, 'custom');

    setIsLoading(true);
    setResponse(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/email/send-custom`, {
        to: customForm.to,
        subject: customForm.subject,
        message: customForm.message,
        from: customForm.from
      }, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setResponse({ type: 'success', data: response.data });
      toast.success('Custom email sent successfully!');
      
      // Reset form
      setCustomForm({ to: '', subject: '', message: '', from: '' });

    } catch (error) {
      console.error('Error sending custom email:', error);
      
      const errorMessage = error.response?.data?.error || error.message || 'Failed to send email';
      const errorDetails = error.response?.data?.details || 'Please check your configuration';
      
      setResponse({ 
        type: 'error', 
        data: { 
          error: errorMessage,
          details: errorDetails,
          status: error.response?.status
        }
      });
      
      toast.error(`Failed to send email: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="form-tabs">
        <button
          type="button"
          className={`tab-button ${activeTab === 'test' ? 'active' : ''}`}
          onClick={() => setActiveTab('test')}
        >
          <FaFlask /> Test Email
        </button>
        <button
          type="button"
          className={`tab-button ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          <FaEnvelope /> Custom Email
        </button>
      </div>

      {activeTab === 'test' && (
        <form onSubmit={sendTestEmail} className="email-form">
          <div className="form-group required">
            <label htmlFor="test-to">Recipient Email</label>
            <input
              type="email"
              id="test-to"
              name="to"
              value={testForm.to}
              onChange={handleTestFormChange}
              placeholder="Enter recipient email address"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="test-from">From Name (Optional)</label>
            <input
              type="text"
              id="test-from"
              name="from"
              value={testForm.from}
              onChange={handleTestFormChange}
              placeholder="Your name or organization"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="test-message">Custom Message (Optional)</label>
            <textarea
              id="test-message"
              name="message"
              value={testForm.message}
              onChange={handleTestFormChange}
              placeholder="Add a custom message to the test email..."
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary ${isLoading ? 'btn-loading' : ''}`}
            disabled={isLoading || apiStatus !== 'online'}
          >
            {isLoading ? 'Sending...' : <><FaRocket /> Send Test Email</>}
          </button>
        </form>
      )}

      {activeTab === 'custom' && (
        <form onSubmit={sendCustomEmail} className="email-form">
          <div className="form-group required">
            <label htmlFor="custom-to">Recipient Email</label>
            <input
              type="email"
              id="custom-to"
              name="to"
              value={customForm.to}
              onChange={handleCustomFormChange}
              placeholder="Enter recipient email address"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group required">
            <label htmlFor="custom-subject">Subject</label>
            <input
              type="text"
              id="custom-subject"
              name="subject"
              value={customForm.subject}
              onChange={handleCustomFormChange}
              placeholder="Enter email subject"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="custom-from">From Name (Optional)</label>
            <input
              type="text"
              id="custom-from"
              name="from"
              value={customForm.from}
              onChange={handleCustomFormChange}
              placeholder="Your name or organization"
              disabled={isLoading}
            />
          </div>

          <div className="form-group required">
            <label htmlFor="custom-message">Message</label>
            <textarea
              id="custom-message"
              name="message"
              value={customForm.message}
              onChange={handleCustomFormChange}
              placeholder="Enter your email message..."
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary ${isLoading ? 'btn-loading' : ''}`}
            disabled={isLoading || apiStatus !== 'online'}
          >
            {isLoading ? 'Sending...' : <><FaEnvelope /> Send Custom Email</>}
          </button>
        </form>
      )}

      {response && (
        <div className={`response-display ${response.type}`}>
          <h4>
            {response.type === 'success' ? <><FaCheckCircle /> Success!</> : <><FaTimesCircle /> Error</>}
          </h4>
          <p>
            {response.type === 'success' 
              ? response.data.message 
              : `${response.data.error}`
            }
          </p>
          {response.data.details && (
            <p><small>{response.data.details}</small></p>
          )}
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EmailForm;