require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const mqttClient = require('./src/config/mqtt');
const connectRabbitMQ = require('./src/config/rabbitmq');
const notificationRoutes = require('./src/routes/notificationRoutes');
//const notificationController = require('./src/controllers/notificationControllers');
//const mqtt = require('mqtt');
const app = express();
app.use(express.json());
app.use(cors());

connectDB();
connectRabbitMQ();

app.use('/notifications', notificationRoutes);

mqttClient.on('message', async (topic, message) => {
  console.log('Received MQTT message:', message.toString());
});

app.listen(3001, () => console.log('Notifications service running on port 3001'));
