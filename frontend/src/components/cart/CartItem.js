import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();

  const handleQuantityChange = async (change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      await updateCartItem(item.product._id, newQuantity, item.size);
    }
  };

  const handleRemove = async () => {
    await removeFromCart(item.product._id, item.size);
  };

  const itemPrice = item.size
    ? item.product.sizes?.find(s => s.size === item.size)?.price || item.product.price
    : item.product.price;

  const totalPrice = itemPrice * item.quantity;

  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 120, height: 120, objectFit: 'cover' }}
        image={item.product.image || '/image/placeholder.jpg'}
        alt={item.product.name}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" component="h3">
              {item.product.name}
            </Typography>
            {item.size && (
              <Typography variant="body2" color="text.secondary">
                Size: {item.size}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              ₹{itemPrice.toFixed(2)} each
            </Typography>
          </Box>
          <IconButton
            onClick={handleRemove}
            color="error"
            sx={{ alignSelf: 'flex-start' }}
          >
            <Delete />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(-1)}
              disabled={item.quantity <= 1}
            >
              <Remove />
            </IconButton>
            <Typography sx={{ mx: 2, minWidth: 30, textAlign: 'center' }}>
              {item.quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(1)}
            >
              <Add />
            </IconButton>
          </Box>

          <Typography variant="h6" color="primary" fontWeight="bold">
            ₹{totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;
