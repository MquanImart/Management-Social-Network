import React, { useState } from 'react';
import { Box, Typography, Avatar, Paper, Button, Divider } from '@mui/material';
import { User } from '../../../interface/interface';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';

interface UserDetailsProps {
  user: User | null;
  onLockUnlock: (userId: string, newStatus: string) => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onLockUnlock }) => {
  const primaryColor = '#1976d2'; // Màu chủ đạo
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading

  if (!user) {
    return <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 5, color: primaryColor }}>Select a user to view details</Typography>;
  }

  const handleLockUnlock = async () => {
    setLoading(true); // Bắt đầu loading
    const action = user.status === 'active' ? 'lock' : 'unlock';
    
    try {
      const response = await fetch(`http://localhost:3000/v1/user/${user._id}/${action}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Token nếu có
        },
      });

      const data = await response.json();

      if (response.ok) {
        onLockUnlock(user._id, data.status); // Cập nhật trạng thái của người dùng
      } else {
        console.error(data.message); // Xử lý lỗi nếu có
      }
    } catch (error) {
      console.error('Failed to lock/unlock user:', error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 3, height: '665px'}}>
      {/* Phần thông tin tiêu đề */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          alt={user.displayName}
          src={user.avt[0]}
          sx={{
            width: 90,
            height: 90,
            marginRight: 3,
            border: `3px solid ${primaryColor}`,
            boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
          }}
        />
        <Box>
          <Typography variant="h4" fontWeight="bold" color={primaryColor}>{user.displayName}</Typography>
          <Typography
            variant="subtitle1"
            color="#616161"
            sx={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '90%' }} // Thêm thuộc tính này
          >
            @{user.userName}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Thông tin chi tiết */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <EmailIcon sx={{ color: primaryColor, mr: 1 }} />
          <Typography variant="body1"><strong>Email: </strong>{user.account.email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PhoneIcon sx={{ color: primaryColor, mr: 1 }} />
          <Typography variant="body1"><strong>SĐT: </strong>{user.details?.phoneNumber || 'N/A'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <HomeIcon sx={{ color: primaryColor, mr: 1 }} />
          <Typography variant="body1"><strong>Địa chỉ: </strong>{user.details?.address || 'N/A'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1"><strong>Mức độ vi phạm: </strong>{user.account.warningLevel}</Typography>
        </Box>
        <Typography variant="body1">
          <strong>Trạng thái: </strong>
          <span style={{ color: user.status === 'active' ? primaryColor : 'red', fontWeight: 'bold' }}>
            {user.status === 'active' ? 'Active' : 'Locked'}
          </span>
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* About Me Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" color={primaryColor}>Giới thiệu</Typography>
        <Typography variant="body2" color="#424242" sx={{ fontStyle: 'italic' }}>
          {user.aboutMe || 'Chưa có thông tin giới thiệu'}
        </Typography>
      </Box>

      {/* Hobbies Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" color={primaryColor}>Sở thích</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {user.hobbies.length > 0 ? (
            user.hobbies.map((hobby, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: primaryColor,
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: 14,
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {hobby}
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="#9e9e9e">Không có sở thích</Typography>
          )}
        </Box>
      </Box>

      {/* Nút Khóa/Mở khóa tài khoản */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {user.status === 'active' ? (
          <Button
            variant="contained"
            color="error"
            size="large"
            startIcon={<LockIcon />}
            sx={{
              textTransform: 'none',
              boxShadow: 3,
              '&:hover': { bgcolor: '#d32f2f' },
            }}
            onClick={handleLockUnlock}
            disabled={loading}
          >
            {loading ? 'Đang khóa...' : 'Khóa tài khoản'}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<LockOpenIcon />}
            sx={{
              textTransform: 'none',
              boxShadow: 3,
              '&:hover': { bgcolor: '#1976d2' },
            }}
            onClick={handleLockUnlock}
            disabled={loading}
          >
            {loading ? 'Đang mở...' : 'Mở khóa tài khoản'}
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default UserDetails;
