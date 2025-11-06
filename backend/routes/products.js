const express = require('express');
const router = express.Router();

// Sample in-memory products (beginner-friendly)
// Each product includes an `_id`, an `image` URL (first image), and a `stock` field
const products = [
  {
    _id: '1',
    name: 'T-Shirt',
    category: 'Women',
    size: ['S','M','L'],
    color: ['Red','Blue'],
    price: 15,
    stock: 0,
    image: 'https://tse3.mm.bing.net/th/id/OIP.AHtBUVkCT2FLong8eFCh1QHaIR?pid=Api&P=0&h=180'
  },
  {
    _id: '2',
    name: 'Dress',
    category: 'Women',
    size: ['S','M','L'],
    color: ['Black','White'],
    price: 25,
    stock: 0,
    image: 'https://tse1.mm.bing.net/th/id/OIP.IfPrKtAtJALbvrgLPc658QHaJ3?pid=Api&P=0&h=180'
  },
  {
    _id: '3',
    name: 'Jeans',
    category: 'Women',
    size: ['M','L'],
    color: ['Blue'],
    price: 30,
    stock: 0,
    image: 'https://cdn-img.prettylittlething.com/8/b/1/d/8b1d9e15dad88fa6b1b108a860a1a85668d823c4_cmn9775_2.jpg'
  }
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get single product by id
router.get('/:id', (req, res) => {
  const product = products.find(p => p._id == req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

module.exports = router;
