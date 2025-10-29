import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import { CheckCircle, ShoppingBag } from '@mui/icons-material';

const OrderSuccessPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Order Not Found
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Go Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom color="success.main">
          Order Placed Successfully!
        </Typography>
        <Typography variant="h5" gutterBottom>
          Thank you for your order
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Your order has been confirmed and will be processed shortly.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: 'left', mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          <Typography><strong>Order ID:</strong> {order._id}</Typography>
          <Typography><strong>Total Amount:</strong> ₹{order.totalAmount?.toFixed(2)}</Typography>
          <Typography><strong>Status:</strong> {order.status}</Typography>
          <Typography><strong>Payment:</strong> {order.paymentStatus}</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
            Continue Shopping
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/"
          >
            Go Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderSuccessPage;
