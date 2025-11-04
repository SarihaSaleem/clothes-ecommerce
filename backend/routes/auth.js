const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Simple in-memory users (for beginners)
const users = []; // start empty, will store {id, username, email, passwordHash}

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).send('All fields are required');

  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).send('Email already registered');

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, email, passwordHash };
  users.push(newUser);

  res.send('User registered successfully');
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).send('User not found');

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return res.status(400).send('Incorrect password');

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'Strict' });
  res.send('Login successful');
});

module.exports = router;
