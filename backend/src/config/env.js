const dotenv = require('dotenv');

dotenv.config();

const requiredEnv = [
  'MONGODB_URI',
  'JWT_SECRET'
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`${key} is not configured`);
  }
});

const config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  groqApiKey: process.env.GROQ_API_KEY || '',
  aiModel: process.env.AI_MODEL || 'llama-3.3-70b-versatile',
  maxFileSize: Number(process.env.MAX_FILE_SIZE) || 10485760
};

module.exports = config;