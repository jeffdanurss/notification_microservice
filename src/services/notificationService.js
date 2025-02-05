//Servicio para guardar notificaciones
const mongoose = require('mongoose');
const Notification = require('../models/Notification');

const saveNotification = async (data) => {
  try {
    const newNotification = new Notification(data);
    await newNotification.save();
    console.log('Notification saved to MongoDB');
  } catch (error) {
    console.error('Error saving notification:', error);
    throw error; // Propaga el error para manejarlo en el controlador
  }
};

module.exports = { saveNotification };