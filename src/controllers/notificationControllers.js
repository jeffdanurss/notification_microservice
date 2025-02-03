const { saveNotification } = require('../services/notificationService');
const { sendEmail } = require('../services/emailService');
const processNotification = async (req, res) => {
  const { message, email } = req.body;
  try {
    await sendEmail(message, email);
    await saveNotification({ message, email, status: 'Sent' });
    res.status(200).json({ success: true, message: 'Notification sent' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = { processNotification };