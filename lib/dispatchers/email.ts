import nodemailer from 'nodemailer';

export async function sendPhishingEmail(to: string, subject: string, bodyText: string, htmlContent: string) {
  const port = parseInt(process.env.SMTP_PORT || '587');
  const secure = port === 465; // Use SSL/TLS for 465, STARTTLS for others
  
  console.log(`Creating transport: ${process.env.SMTP_HOST || 'smtp.ethereal.email'}:${port} (secure: ${secure})`);
  console.log(`User: ${process.env.SMTP_USER || 'none'}`);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Adding some timeouts for better diagnostics
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });

  const info = await transporter.sendMail({
    from: `"IT Security" <${process.env.SMTP_FROM || 'security@internal.local'}>`, // Sender address
    to, // list of receivers
    subject, // Subject line
    text: bodyText, // plain text body
    html: htmlContent, // html body (the actual phishing payload link)
  });

  console.log(`Email dispatched to ${to}. Message ID: ${info.messageId}`);
  return info;
}
