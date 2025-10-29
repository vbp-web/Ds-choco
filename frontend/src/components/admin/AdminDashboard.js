import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Paper sx={{ mt: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Products" />
          <Tab label="Orders" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && <ProductManagement />}
          {activeTab === 1 && <OrderManagement />}
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
