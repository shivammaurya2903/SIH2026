require('./config/env');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const challengeRoutes = require('./routes/challenge.routes');
const universityRoutes = require('./routes/university.routes');
const industryRoutes = require('./routes/industry.routes');
const projectRoutes = require('./routes/project.routes');
const proposalRoutes = require('./routes/proposal.routes');
const collaborationRoutes = require('./routes/collaboration.routes');
const notificationRoutes = require('./routes/notification.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const impactRoutes = require('./routes/impact.routes');

const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(helmet());

const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === clientUrl || process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.'
  }
});

app.use('/api', apiLimiter);

app.use('/uploads', express.static('uploads'));

app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  const isDbConnected = dbState === 1;

  return res.status(isDbConnected ? 200 : 503).json({
    success: isDbConnected,
    message: isDbConnected ? 'API is healthy' : 'Database service unavailable',
    data: {
      status: isDbConnected ? 'ok' : 'degraded',
      database: dbStatusMap[dbState] || 'unknown',
      environment: process.env.NODE_ENV || 'development',
      aiModel: process.env.AI_MODEL || 'llama-3.3-70b-versatile',
      timestamp: new Date().toISOString()
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/industries', industryRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/collaborations', collaborationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/impact', impactRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;