import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1, size = null) => {
    try {
      setLoading(true);
      const response = await api.post('/cart/add', { productId, quantity, size });
      setCart(response.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to add to cart' };
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity, size = null) => {
    try {
      setLoading(true);
      const response = await api.put('/cart/update', { productId, quantity, size });
      setCart(response.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to update cart' };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId, size = null) => {
    try {
      setLoading(true);
      const response = await api.delete('/cart/remove', { data: { productId, size } });
      setCart(response.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to remove from cart' };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await api.delete('/cart/clear');
      setCart([]);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to clear cart' };
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    fetchCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
