require('./config/env');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const path = require('path');

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
const teamRoutes = require('./routes/team.routes');
const milestoneRoutes = require('./routes/milestone.routes');

const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(helmet());

const clientUrl = process.env.CLIENT_URL || '';
const frontendUrl = process.env.FRONTEND_URL || '';
const frontendUrlsEnv = process.env.FRONTEND_URLS || '';
const envOrigins = [clientUrl, frontendUrl, ...frontendUrlsEnv.split(',')].map(u => u.trim()).filter(Boolean);

const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:5500',
  'http://localhost:8080',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:8080',
  'https://smadhansetu.netlify.app',
  ...envOrigins
];

const allowedOrigins = [...new Set(defaultAllowedOrigins)];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (
        allowedOrigins.includes(origin) ||
        origin === 'https://smadhansetu.netlify.app' ||
        (process.env.NODE_ENV === 'development' && (
          origin.startsWith('http://localhost:') ||
          origin.startsWith('http://127.0.0.1:') ||
          origin.startsWith('http://192.168.') ||
          origin.startsWith('http://10.') ||
          origin.startsWith('http://172.')
        ))
      ) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
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
app.use('/api/teams', teamRoutes);
app.use('/api/milestones', milestoneRoutes);

// Serve Frontend React Vite Build Static Files
const distPath = path.join(__dirname, '../../frontend/dist');
const frontendPath = path.join(__dirname, '../../frontend');
const staticPath = require('fs').existsSync(distPath) ? distPath : frontendPath;

app.use(express.static(staticPath));

app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }
  const indexPath = path.join(staticPath, 'index.html');
  if (require('fs').existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;