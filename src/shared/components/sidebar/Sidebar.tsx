import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import GroupsIcon from '@mui/icons-material/Groups';

const Sidebar: React.FC = () => {
  const primaryColor = '#1976d2'; // Màu chủ đạo
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const navigate = useNavigate(); // Sử dụng navigate để chuyển hướng người dùng
  const sidebarWidth = 240; // Thiết lập kích thước cố định cho Sidebar

  // Các mục trong sidebar với đường dẫn tương ứng
  const menuItems = [
    { text: 'Thống Kê', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Quản lí người dùng', icon: <PeopleIcon />, path: '/management-user' },
    { text: 'Quản lí bài viết', icon: <ArticleIcon />, path: '/management-news-feed' },
    { text: 'Quản lí nhóm', icon: <GroupsIcon />, path: '/groups' },
    { text: 'Cài đặt', icon: <SettingsIcon />, path: '/settings' },
  ];

  // Hàm xử lý logout
  const handleLogout = async () => {
    try {
      // Lấy token từ sessionStorage
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Token không tồn tại');
        return;
      }

      // Gửi yêu cầu logout tới API
      const response = await fetch('http://localhost:3000/v1/auth/logout-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        // Xóa token khỏi sessionStorage
        sessionStorage.removeItem('token');
        // Chuyển hướng người dùng về trang đăng nhập
        navigate('/login');
      } else {
        console.error('Logout thất bại:', data.message);
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi đăng xuất:', error);
    }
  };

  return (
    <Box
      sx={{
        width: `${sidebarWidth}px`, // Áp dụng kích thước cố định
        height: '100vh',
        backgroundColor: '#f4f5fa',
        color: '#37474f',
        padding: 6,
        boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Tên logo hoặc thương hiệu */}
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          mb: 3,
          fontWeight: 'bold',
          color: primaryColor,
        }}
      >
        HỆ THỐNG ADMIN
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Menu list */}
      <List>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            style={{ textDecoration: 'none' }}
          >
            <ListItemButton
              sx={{
                borderRadius: 2,
                marginBottom: 1,
                paddingLeft: 3,
                backgroundColor: location.pathname === item.path ? primaryColor : 'transparent',
                '&:hover': {
                  backgroundColor: location.pathname === item.path ? primaryColor : 'rgba(0, 0, 0, 0.04)',
                },
                color: location.pathname === item.path ? 'white' : '#424242',
              }}
            >
              {/* Biểu tượng cho mỗi mục */}
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'white' : primaryColor,
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              {/* Văn bản cho mỗi mục */}
              <ListItemText
                primary={item.text}
                sx={{
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                }}
              />
            </ListItemButton>
          </NavLink>
        ))}

        {/* Mục Đăng xuất */}
        <ListItemButton
          sx={{
            borderRadius: 2,
            paddingLeft: 3,
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
            color: '#424242',
          }}
          onClick={handleLogout} // Thêm sự kiện click cho nút Đăng xuất
        >
          <ListItemIcon
            sx={{
              color: primaryColor,
              minWidth: 40,
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Đăng xuất"
            sx={{ fontWeight: 'normal' }}
          />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
