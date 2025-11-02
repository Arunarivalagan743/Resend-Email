const express = require('express');
const { Resend } = require('resend');
const router = express.Router();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation helper
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Email templates
const getEmailTemplate = (templateType, data) => {
  const templates = {
    test: {
      subject: 'Test Email from Resend Demo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">🚀 Test Email Successful!</h2>
          <p style="color: #666; line-height: 1.6;">
            This is a test email sent from your Resend Email Demo application.
          </p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Email Details:</h3>
            <ul style="color: #666; line-height: 1.6;">
              <li><strong>From:</strong> ${data.from || 'Demo Application'}</li>
              <li><strong>Sent at:</strong> ${new Date().toLocaleString()}</li>
              <li><strong>Message:</strong> ${data.message || 'Default test message'}</li>
            </ul>
          </div>
          <p style="color: #666; line-height: 1.6;">
            If you received this email, your Resend integration is working correctly! 🎉
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            This email was sent via Resend Email Demo Application
          </p>
        </div>
      `
    },
    custom: {
      subject: data.subject || 'Message from Resend Demo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">📧 New Message</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${data.message || 'No message provided'}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            Sent via Resend Email Demo Application on ${new Date().toLocaleString()}
          </p>
        </div>
      `
    }
  };

  return templates[templateType] || templates.test;
};

// Send test email endpoint
router.post('/send-test', async (req, res) => {
  try {
    const { to, from, message } = req.body;

    // Validation
    if (!to) {
      return res.status(400).json({ 
        error: 'Recipient email is required',
        field: 'to'
      });
    }

    if (!validateEmail(to)) {
      return res.status(400).json({ 
        error: 'Invalid recipient email format',
        field: 'to'
      });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ 
        error: 'Resend API key not configured. Please set RESEND_API_KEY environment variable.'
      });
    }

    // Get email template
    const template = getEmailTemplate('test', { from, message });

    // Send email
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'demo@resend.dev',
      to: [to],
      subject: template.subject,
      html: template.html,
    });

    console.log('✅ Email sent successfully:', data);

    res.status(200).json({
      success: true,
      message: 'Test email sent successfully!',
      emailId: data.id,
      to: to,
      sentAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    // Handle specific Resend errors
    if (error.message?.includes('API key')) {
      return res.status(401).json({ 
        error: 'Invalid or missing Resend API key',
        details: 'Please check your RESEND_API_KEY environment variable'
      });
    }

    if (error.message?.includes('domain')) {
      return res.status(400).json({ 
        error: 'Domain verification required',
        details: 'Please verify your sending domain in Resend dashboard'
      });
    }

    res.status(500).json({ 
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Send custom email endpoint
router.post('/send-custom', async (req, res) => {
  try {
    const { to, subject, message, from } = req.body;

    // Validation
    if (!to || !subject || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['to', 'subject', 'message']
      });
    }

    if (!validateEmail(to)) {
      return res.status(400).json({ 
        error: 'Invalid recipient email format',
        field: 'to'
      });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ 
        error: 'Resend API key not configured'
      });
    }

    // Get email template
    const template = getEmailTemplate('custom', { subject, message, from });

    // Send email
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'demo@resend.dev',
      to: [to],
      subject: template.subject,
      html: template.html,
    });

    console.log('✅ Custom email sent successfully:', data);

    res.status(200).json({
      success: true,
      message: 'Custom email sent successfully!',
      emailId: data.id,
      to: to,
      subject: subject,
      sentAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error sending custom email:', error);
    
    res.status(500).json({ 
      error: 'Failed to send custom email',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get email status endpoint (for future use)
router.get('/status/:emailId', async (req, res) => {
  try {
    const { emailId } = req.params;
    
    // Note: Resend doesn't provide a direct status check API yet
    // This is a placeholder for future functionality
    res.status(200).json({
      message: 'Email status check not yet available in Resend API',
      emailId: emailId,
      note: 'Check your Resend dashboard for delivery status'
    });

  } catch (error) {
    console.error('❌ Error checking email status:', error);
    res.status(500).json({ 
      error: 'Failed to check email status',
      details: error.message
    });
  }
});

module.exports = router;