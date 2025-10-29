import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import { ShoppingCart, ShoppingBag } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { cart, clearCart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const itemPrice = item.size
      ? item.product.sizes?.find(s => s.size === item.size)?.price || item.product.price
      : item.product.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  if (cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingCart sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Add some delicious chocolates to your cart and start shopping!
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/products"
          startIcon={<ShoppingBag />}
          sx={{
            backgroundColor: '#8B4513',
            '&:hover': {
              backgroundColor: '#A0522D',
            },
          }}
        >
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      <Box sx={{ mb: 4 }}>
        {cart.map((item) => (
          <CartItem key={`${item.product._id}-${item.size || 'default'}`} item={item} />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Total ({totalItems} {totalItems === 1 ? 'item' : 'items'}): ₹{totalPrice.toFixed(2)}
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Free shipping on orders over ₹50! Your order qualifies for free shipping.
      </Alert>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          size="large"
          component={Link}
          to="/products"
        >
          Continue Shopping
        </Button>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/checkout"
          sx={{
            backgroundColor: '#8B4513',
            '&:hover': {
              backgroundColor: '#A0522D',
            },
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
