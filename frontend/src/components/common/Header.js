import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box, Menu, MenuItem } from '@mui/material';
import { ShoppingCart, AccountCircle, AdminPanelSettings } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleClose();
  };

  const handleAdminClick = () => {
    navigate('/admin');
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#8B4513' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
            fontFamily: 'cursive'
          }}
        >
          DS Choco Bliss
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>

          {user ? (
            <>
              <IconButton color="inherit" component={Link} to="/cart">
                <Badge badgeContent={getCartItemCount()} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              <Button color="inherit" component={Link} to="/orders">
                Orders
              </Button>

              {user.role === 'admin' && (
                <IconButton
                  color="inherit"
                  onClick={handleAdminClick}
                  title="Admin Panel"
                >
                  <AdminPanelSettings />
                </IconButton>
              )}

              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
