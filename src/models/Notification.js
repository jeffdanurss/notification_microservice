//Mongo model
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  orderId: String,
  amount: String,
  currency: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', NotificationSchema);