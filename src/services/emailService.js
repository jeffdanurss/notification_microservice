//Mail Delivery Service
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendEmail = async (message, email) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Payment Notification',
      text: message,
    });
    console.log('Email sent to', email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
module.exports = { sendEmail };
