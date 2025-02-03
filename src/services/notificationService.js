const Notification = require('../models/Notification');

const saveNotification = async (data) => {
  return await Notification.create(data);
};

module.exports = { saveNotification };
