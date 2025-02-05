//mqtt conection
const mqtt = require('mqtt');

const client = mqtt.connect(process.env.MQTT_BROKER);

client.on('connect', () => {
  console.log('Connected to MQTT Broker');
  client.subscribe('payments/notifications');
});

module.exports = client;
