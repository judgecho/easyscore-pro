import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Database } from './database/database';
import { errorHandler } from './middleware/errorHandler';
import { authRouter } from './routes/auth';
import { examRouter } from './routes/exam';
import { questionRouter } from './routes/question';
import { studentRouter } from './routes/student';
import { categoryRouter } from './routes/category';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Initialize database
Database.initialize();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/exams', examRouter);
app.use('/api/questions', questionRouter);
app.use('/api/students', studentRouter);
app.use('/api/categories', categoryRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 EasyScore Pro API Server`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app; 