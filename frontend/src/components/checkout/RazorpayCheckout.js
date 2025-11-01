import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const RazorpayCheckout = ({ amount, onSuccess, onError }) => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      // Create order on backend
      const response = await api.post('/payment/create-order', {
        amount: amount,
      });

      const { order } = response.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'DS Choco Bliss',
        description: 'Chocolate Purchase',
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // Create order in database
            const orderData = {
              items: cart.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                size: item.size,
                price: item.size
                  ? item.product.sizes?.find(s => s.size === item.size)?.price || item.product.price
                  : item.product.price,
              })),
              shippingAddress: {
                firstName: user?.name?.split(' ')[0] || '',
                lastName: user?.name?.split(' ')[1] || '',
                email: user?.email || '',
              },
              paymentId: response.razorpay_payment_id,
              paymentMethod: 'razorpay',
            };

            const orderResponse = await api.post('/orders', orderData);

            if (orderResponse.data.success) {
              clearCart();
              navigate('/order-success', { state: { order: orderResponse.data.order } });
              onSuccess && onSuccess();
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            onError && onError('Payment verification failed');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: '',
        },
        theme: {
          color: '#8B4513',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initialization failed:', error);
      onError && onError('Payment initialization failed');
    }
  };

  return (
    <Button
      fullWidth
      variant="contained"
      size="large"
      onClick={handlePayment}
      sx={{
        backgroundColor: '#8B4513',
        '&:hover': {
          backgroundColor: '#A0522D',
        },
        py: 1.5,
      }}
    >
      Pay with Razorpay - ₹{amount.toFixed(2)}
    </Button>
  );
};

export default RazorpayCheckout;
