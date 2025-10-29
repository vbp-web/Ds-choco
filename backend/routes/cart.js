const express = require('express');
const { auth } = require('../middleware/auth');
const Product = require('../models/Product');

const router = express.Router();

// In-memory cart storage (in production, use Redis or database)
let carts = {};

// Get cart with populated product data
router.get('/', auth, async (req, res) => {
  try {
    const cart = carts[req.user._id] || [];

    // Populate product data for each cart item
    const populatedCart = await Promise.all(
      cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          ...item,
          product: product
        };
      })
    );

    res.json(populatedCart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

// Add to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;
    const userId = req.user._id;

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!carts[userId]) {
      carts[userId] = [];
    }

    const existingItem = carts[userId].find(
      item => item.productId === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      carts[userId].push({ productId, quantity, size });
    }

    // Return populated cart
    const populatedCart = await Promise.all(
      carts[userId].map(async (item) => {
        const prod = await Product.findById(item.productId);
        return {
          ...item,
          product: prod
        };
      })
    );

    res.json(populatedCart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
});

// Update cart item
router.put('/update', auth, async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;
    const userId = req.user._id;

    if (!carts[userId]) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = carts[userId].find(
      item => item.productId === productId && item.size === size
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;

    // Return populated cart
    const populatedCart = await Promise.all(
      carts[userId].map(async (item) => {
        const prod = await Product.findById(item.productId);
        return {
          ...item,
          product: prod
        };
      })
    );

    res.json(populatedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Failed to update cart' });
  }
});

// Remove from cart
router.delete('/remove', auth, async (req, res) => {
  try {
    const { productId, size } = req.body;
    const userId = req.user._id;

    if (!carts[userId]) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    carts[userId] = carts[userId].filter(
      item => !(item.productId === productId && item.size === size)
    );

    // Return populated cart
    const populatedCart = await Promise.all(
      carts[userId].map(async (item) => {
        const prod = await Product.findById(item.productId);
        return {
          ...item,
          product: prod
        };
      })
    );

    res.json(populatedCart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Failed to remove from cart' });
  }
});

// Clear cart
router.delete('/clear', auth, (req, res) => {
  const userId = req.user._id;
  carts[userId] = [];
  res.json({ message: 'Cart cleared' });
});

module.exports = router;
