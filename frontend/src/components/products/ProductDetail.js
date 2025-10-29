import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Rating,
  Chip,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';
import { ShoppingCart, Add, Remove } from '@mui/icons-material';
import LoadingSpinner from '../common/LoadingSpinner';
import { useCart } from '../../context/CartContext';
import api from '../../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
      setError('');
    } catch (error) {
      setError('Failed to load product details');
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const result = await addToCart(product._id, quantity, selectedSize);
    if (result.success) {
      alert('Product added to cart!');
    } else {
      alert(result.message);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  if (loading) {
    return <LoadingSpinner message="Loading product details..." />;
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          {error || 'Product not found'}
        </Alert>
      </Container>
    );
  }

  const currentPrice = selectedSize
    ? product.sizes?.find(s => s.size === selectedSize)?.price || product.price
    : product.price;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.image || '/image/placeholder.jpg'}
            alt={product.name}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 500,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating || 0} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviews?.length || 0} reviews)
            </Typography>
          </Box>

          <Chip label={product.category} sx={{ mb: 2 }} />

          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          <Typography variant="h4" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
            ₹{currentPrice?.toFixed(2)}
          </Typography>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Size</InputLabel>
              <Select
                value={selectedSize}
                label="Select Size"
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {product.sizes.map((size) => (
                  <MenuItem key={size.size} value={size.size}>
                    {size.size} - ₹{size.price.toFixed(2)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Quantity Selection */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Quantity:
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Remove />
            </Button>
            <Typography sx={{ mx: 2, minWidth: 40, textAlign: 'center' }}>
              {quantity}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleQuantityChange(1)}
            >
              <Add />
            </Button>
          </Box>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            sx={{
              backgroundColor: '#8B4513',
              '&:hover': {
                backgroundColor: '#A0522D',
              },
              py: 1.5,
              px: 4,
            }}
          >
            Add to Cart - ₹{(currentPrice * quantity).toFixed(2)}
          </Button>

          {/* Stock Status */}
          <Box sx={{ mt: 2 }}>
            {product.inStock ? (
              <Typography variant="body2" color="success.main">
                ✓ In Stock
              </Typography>
            ) : (
              <Typography variant="body2" color="error.main">
                ✗ Out of Stock
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Customer Reviews
          </Typography>
          <Grid container spacing={2}>
            {product.reviews.map((review, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={review.rating} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {review.rating}/5
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1">
                      {review.comment}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetail;
