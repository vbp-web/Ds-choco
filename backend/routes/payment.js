const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { auth } = require('../middleware/auth');

// Create Razorpay order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    const razorpay = req.app.get('razorpay');
    if (!razorpay) {
      return res.status(503).json({
        success: false,
        message: 'Payment service not configured',
      });
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paisa
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
    });
  }
});

// Verify payment
router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const razorpay = req.app.get('razorpay');
    if (!razorpay) {
      return res.status(503).json({
        success: false,
        message: 'Payment service not configured',
      });
    }

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      res.json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
    });
  }
});

module.exports = router;
