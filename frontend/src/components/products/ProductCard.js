import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(product._id, 1);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
      component={Link}
      to={`/products/${product._id}`}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image || '/image/placeholder.jpg'}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="h3" noWrap>
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1,
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={product.rating || 0} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviews?.length || 0})
          </Typography>
        </Box>

        <Chip
          label={product.category}
          size="small"
          sx={{ alignSelf: 'flex-start', mb: 2 }}
        />

        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            ₹{product.price?.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            sx={{
              backgroundColor: '#8B4513',
              '&:hover': {
                backgroundColor: '#A0522D',
              },
            }}
          >
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
