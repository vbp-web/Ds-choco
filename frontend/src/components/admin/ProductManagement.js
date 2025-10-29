import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
} from '@mui/material';
import { Add, Edit, Delete, Image } from '@mui/icons-material';
import ProductForm from './ProductForm';
import LoadingSpinner from '../common/LoadingSpinner';
import api from '../../services/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
      setError('');
    } catch (error) {
      setError('Failed to load products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${productId}`);
        fetchProducts();
      } catch (error) {
        setError('Failed to delete product');
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setDialogOpen(false);
    fetchProducts();
  };

  const handleFormCancel = () => {
    setDialogOpen(false);
  };

  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Product Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddProduct}
          sx={{
            backgroundColor: '#8B4513',
            '&:hover': {
              backgroundColor: '#A0522D',
            },
          }}
        >
          Add Product
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        bgcolor: 'grey.300',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image />
                    </Box>
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <Chip label={product.category} size="small" />
                </TableCell>
                <TableCell>₹{product.price?.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={product.inStock ? 'In Stock' : 'Out of Stock'}
                    color={product.inStock ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEditProduct(product)}
                    color="primary"
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteProduct(product._id)}
                    color="error"
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {products.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No products found. Add your first product to get started.
          </Typography>
        </Box>
      )}

      <Dialog
        open={dialogOpen}
        onClose={handleFormCancel}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <ProductForm
            product={editingProduct}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProductManagement;
