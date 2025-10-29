import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Dark Chocolate Truffles',
      image: '/image/truffle-chocolate.jpeg',
      description: 'Rich and decadent dark chocolate truffles',
    },
    {
      id: 2,
      name: 'Milk Chocolate Bar',
      image: '/image/plain-milk-chocolate-bar.jpeg',
      description: 'Smooth and creamy milk chocolate bar',
    },
    {
      id: 3,
      name: 'White Chocolate Assortment',
      image: '/image/plain-white-chocolate-bar.jpeg',
      description: 'Delicious white chocolate assortment',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #8B4513 30%, #D2691E 90%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom fontFamily="cursive">
            Welcome to DS Choco Bliss
          </Typography>
          <Typography variant="h5" paragraph>
            Discover the finest artisanal chocolates crafted with passion and premium ingredients
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/products"
            sx={{
              mt: 4,
              backgroundColor: 'white',
              color: '#8B4513',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            About DS Choco Bliss
          </Typography>
          <Typography variant="body1" paragraph textAlign="center">
            At DS Choco Bliss, we believe that chocolate is more than just a treat—it's an experience.
            Our master chocolatiers use only the finest ingredients to create chocolates that delight
            the senses and create lasting memories.
          </Typography>
          <Typography variant="body1" paragraph textAlign="center">
            From rich dark chocolate to creamy milk chocolate varieties, each piece is handcrafted
            with care and attention to detail. Join us in celebrating the art of chocolate making.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
