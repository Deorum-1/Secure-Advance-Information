const nodemailer = require('nodemailer');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, course, message } = req.body || {};
  if (!name || !email || !course || !message) {
    return res.status(400).json({ error: 'Please complete every field.' });
  }

  if (String(name).length > 100 || String(email).length > 254 ||
      String(course).length > 100 || String(message).length > 5000) {
    return res.status(400).json({ error: 'One or more fields are too long.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const requiredConfig = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
  const missingConfig = requiredConfig.filter((key) => !process.env[key]);
  if (missingConfig.length) {
    return res.status(503).json({
      error: 'Email service is not configured. Please contact us by phone or email.',
    });
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const recipient = process.env.CONTACT_TO_EMAIL || 'info@sai.com.ng';
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCourse = escapeHtml(course);
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br>');

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `Secure Advance Information <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: { name: String(name).slice(0, 100), address: String(email) },
      subject: `Course enquiry: ${String(course).slice(0, 100)}`,
      text: `Course enquiry\n\nName: ${name}\nEmail: ${email}\nCourse: ${course}\n\n${message}`,
      html: `
        <h2>Course enquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Course:</strong> ${safeCourse}</p>
        <p><strong>Message:</strong><br>${safeMessage}</p>
      `,
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact email send failed:', error);
    return res.status(502).json({
      error: 'Your message could not be sent. Please try again or contact us by phone.',
    });
  }
};
