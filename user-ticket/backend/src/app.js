// smn/user-ticket/backend/src/app.js


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import ticketRoutes from '../routes/ticketRoute.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/tickets', ticketRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`======= user-ticket Server is running on http://localhost:${PORT} =======`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
