require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const mqttClient = require('./src/config/mqtt');
const connectRabbitMQ = require('./src/config/rabbitmq');
const notificationRoutes = require('./src/routes/notificationRoutes');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
// rabbit mq conection
connectRabbitMQ().then(({ channel }) => {
  if (channel) {
    console.log('Listening for messages on the "notifications" queue...');
    channel.consume('notifications', async (msg) => {
      if (msg) {
        const data = JSON.parse(msg.content.toString());
        console.log('Received message from RabbitMQ:', data);

        // notification processing
        try {
          const { message, email } = data;
          //const { sendEmail, saveNotification } = require('./src/services');
          await sendEmail(message, email);
          await saveNotification({ message, email, status: 'Sent' });
          console.log('Notification processed successfully.');
        } catch (error) {
          console.error('Error processing notification:', error.message);
        } finally {
          channel.ack(msg); // process check
        }
      }
    });
  }
});
const { sendEmail } = require('./src/services/emailService');
const { saveNotification } = require('./src/services/notificationService');

// MQTT listener
mqttClient.on('message', async (topic, message) => {
  console.log('Received MQTT message:', message.toString());

  // MQTT message processing
  try {
    const data = JSON.parse(message.toString());
    const { message: msgContent, email } = data;
    await sendEmail(msgContent, email);
    await saveNotification({ message: msgContent, email, status: 'Sent' });
    console.log('MQTT Notification processed successfully.');
  } catch (error) {
    console.error('Error processing MQTT notification:', error.message);
  }
});
app.use('/notifications', notificationRoutes);

app.listen(3001, () => console.log('Notifications service running on port 3001'));
