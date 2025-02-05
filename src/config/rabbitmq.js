//RabbitMQ Conection
const amqp = require('amqplib');

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('notifications');
    console.log('Connected to RabbitMQ');
    return { connection, channel };
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
  }
};

module.exports = connectRabbitMQ;
