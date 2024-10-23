import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import { User } from '../../../interface/interface';

interface UserTableProps {
  users: User[];
  onViewUser: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onViewUser }) => {

  // Hàm để format trạng thái người dùng
  const formatStatus = (status: string) => {
    if (status === 'active') {
      return <Typography color="green">Active</Typography>;
    }
    return <Typography color="red">Locked</Typography>;
  };

  // Hàm format số điện thoại
  const formatPhoneNumber = (phoneNumber?: string) => {
    if (!phoneNumber) return 'N/A'; // Nếu không có số điện thoại
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  // Tạo các hàng trống nếu số lượng user ít hơn 10
  const emptyRows = Math.max(0, 10 - users.length); // Hiển thị tối đa 10 user mỗi lần

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 3,
        borderRadius: 3,
        width: '100%', 
        margin: 'auto',
        height: '695px',  // Cố định chiều cao của bảng
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>SĐT</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Mức độ</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Trạng thái</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>Tác vụ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow 
              key={user._id} 
              sx={{ height: '50px', ...(index === users.length - 1 && { borderBottom: 'none' }) }}  // Xóa border hàng cuối cùng
            >
              <TableCell>{user.account.email}</TableCell>
              <TableCell>{formatPhoneNumber(user.details?.phoneNumber)}</TableCell>
              <TableCell>
                <Typography>{user.account.warningLevel}</Typography>
              </TableCell>
              <TableCell>
                {formatStatus(user.status)}
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ marginRight: 1 }}
                    style={{ backgroundColor: '#007BFF', color: 'white' }}
                    onClick={() => onViewUser(user)}
                  >
                    Xem
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}

          {/* Hiển thị các hàng trống để giữ chiều cao bảng nếu số lượng user ít */}
          {emptyRows > 0 && (
            <TableRow style={{ height: 50 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
