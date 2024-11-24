import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        backgroundColor: 'primary.main', // Use theme's primary color
        color: 'white', // Text color
        borderRadius: 2,
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Title */}
      <Typography variant="h6" fontWeight="bold">
        HỆ THỐNG ADMIN
      </Typography>

      {/* User Info */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt="Admin User"
          src="/src/assets/admin.png" // Replace with a valid image path
          sx={{
            marginLeft: 1,
            width: 40,
            height: 40,
            border: '2px solid white',
          }}
        />
        <Typography sx={{ marginLeft: 1, fontWeight: 'bold' }}>Admin</Typography>
      </Box>
    </Box>
  );
};

export default Header;
