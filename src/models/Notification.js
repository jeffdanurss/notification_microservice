const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  message: String,
  email: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', NotificationSchema);
