const mongoose = require('mongoose');
const dns = require('dns');

try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore if unsupported
}

let isDnsFallbackSet = true;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is missing.');
  }

  if (mongoose.connection.listenerCount('error') === 0) {
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected.');
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection established.');
    });
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    const connection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000
    });

    console.log(`MongoDB connected successfully: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    if (
      !isDnsFallbackSet &&
      (error.code === 'ECONNREFUSED' ||
        (error.message && error.message.includes('querySrv')) ||
        error.name === 'MongoServerSelectionError')
    ) {
      console.warn(`MongoDB SRV DNS resolution warning (${error.message}). Applying fallback DNS resolvers (8.8.8.8, 1.1.1.1)...`);
      try {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
        isDnsFallbackSet = true;
        const connection = await mongoose.connect(uri, {
          serverSelectionTimeoutMS: 5000
        });

        console.log(`MongoDB connected successfully via fallback DNS: ${connection.connection.host}`);
        return connection;
      } catch (retryErr) {
        console.error(`MongoDB connection failed after DNS fallback (${retryErr.name}): ${retryErr.message}`);
        throw retryErr;
      }
    }

    console.error(`MongoDB connection failed (${error.name}): ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;