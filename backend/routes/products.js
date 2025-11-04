const express = require('express');
const router = express.Router();

// Sample in-memory products (beginner-friendly)
const products = [
  { id: 1, name: 'T-Shirt', category: 'Men', size: ['S','M','L'], color: ['Red','Blue'], price: 15 },
  { id: 2, name: 'Dress', category: 'Women', size: ['S','M','L'], color: ['Black','White'], price: 25 },
  { id: 3, name: 'Jeans', category: 'Men', size: ['M','L'], color: ['Blue'], price: 30 }
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get single product by id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

module.exports = router;
