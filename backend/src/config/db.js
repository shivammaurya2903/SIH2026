const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is missing.');
  }

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected.');
  });

  try {
    const connection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`MongoDB connected successfully: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error(`MongoDB connection failed (${error.name}): ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;