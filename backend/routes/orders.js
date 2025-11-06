const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Default secret for development to avoid runtime crashes when .env is missing
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// In-memory orders (beginner-friendly)
const orders = []; // stores {id, userId, items: [{productId, quantity, size, color}], total}

// Middleware to check JWT from cookies
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Not logged in');

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user; // attach user info to request
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
}

// Place an order
router.post('/place', authMiddleware, (req, res) => {
  const { items, total } = req.body;

  if (!items || !total) return res.status(400).send('Items and total are required');

  const newOrder = {
    id: orders.length + 1,
    userId: req.user.id,
    items,
    total
  };

  orders.push(newOrder);
  res.send({ message: 'Order placed successfully', order: newOrder });
});

// Get all orders for logged-in user
router.get('/my-orders', authMiddleware, (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.user.id);
  res.json(userOrders);
});

module.exports = router;
