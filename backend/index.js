// index.js
const express = require('express');
const mongoose = require('mongoose');
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

// CORS: allow your Netlify frontend URL
app.use(cors({
  origin: "https://eclectic-hamster-d72bf4.netlify.app", // <-- replace if your frontend URL changes
  credentials: true
}));

// Optional: log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[backend] ${req.method} ${req.originalUrl} - Origin: ${req.headers.origin || '-'}`);
  next();
});

// Test route
app.get('/', (req, res) => res.send('Clothes E-commerce Backend is running'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});
