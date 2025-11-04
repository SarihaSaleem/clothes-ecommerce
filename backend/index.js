const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// Import route files
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
// During development allow any local origin (localhost/127.0.0.1 and local network)
// For production restrict this to your real frontend origin(s).
app.use(cors({
  origin: true,
  credentials: true
}));

// Dev helper: log incoming requests and Origin header to diagnose CORS/network issues
app.use((req, res, next) => {
  try {
    console.log(`[backend] ${req.method} ${req.originalUrl} - Origin: ${req.headers.origin || '-'} Host: ${req.headers.host}`);
  } catch (e) {
    // ignore logging errors
  }
  next();
});

// Test route
app.get('/', (req, res) => res.send('Clothes E-commerce Backend is running'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
