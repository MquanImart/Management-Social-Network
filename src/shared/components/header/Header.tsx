import React from 'react';
import { Box, Typography, InputBase, Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header: React.FC = () => {
  const primaryColor = '#1976d2'; // Màu chủ đạo

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        backgroundColor: primaryColor,
        color: 'white', // Chữ màu trắng trên nền màu chủ đạo
        borderRadius: 2,
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Tiêu đề */}
      <Typography variant="h6" fontWeight="bold">
        HỆ THỐNG ADMIN
      </Typography>

      {/* Phần tìm kiếm và thông tin người dùng */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'white',
            borderRadius: 2,
            px: 2,
            py: 0.5,
            boxShadow: '0px 2px 5px rgba(0,0,0,0.15)',
            marginRight: 2,
          }}
        >
          {/* Ô nhập liệu tìm kiếm */}
          <InputBase
            placeholder="Search..."
            sx={{ width: '200px', color: primaryColor }}
          />
          {/* Nút tìm kiếm */}
          <IconButton sx={{ color: primaryColor }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Avatar và tên người dùng */}
        <Avatar
          alt="Admin User"
          src="https://via.placeholder.com/150"
          sx={{
            marginLeft: 1,
            width: 40,
            height: 40,
            border: `2px solid white`,
          }}
        />
        <Typography sx={{ marginLeft: 1, fontWeight: 'bold' }}>Admin User</Typography>
      </Box>
    </Box>
  );
};

export default Header;
