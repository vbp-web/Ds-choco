import React from 'react';
import { Container } from '@mui/material';
import CheckoutForm from '../components/checkout/CheckoutForm';

const CheckoutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <CheckoutForm />
    </Container>
  );
};

export default CheckoutPage;
