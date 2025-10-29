import React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#8B4513',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              DS Choco Bliss
            </Typography>
            <Typography variant="body2">
              Indulge in the finest artisanal chocolates crafted with passion and premium ingredients.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/products" color="inherit" display="block" sx={{ mb: 1 }}>
              Products
            </Link>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2">
              Email: info@dschocobliss.com
            </Typography>
            <Typography variant="body2">
              Phone: (555) 123-4567
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="inherit" align="center">
            © {new Date().getFullYear()} DS Choco Bliss. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
