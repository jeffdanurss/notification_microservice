//Mongo  conections
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};
console.log('MONGO_URI:', process.env.MONGO_URI);

module.exports = connectDB;
