import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import { User } from '../../../interface/interface';

interface UserTableProps {
  users: User[];
  onViewUser: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onViewUser }) => {

  // Hàm định dạng trạng thái người dùng
  const formatStatus = (status: string) => {
    if (status === 'active') {
      return <Typography color="red">Offline</Typography>;
    }
    if(status == 'online'){
      return <Typography color="green">Online</Typography>;
    }
    return <Typography color="red">Bị khóa</Typography>;
  };

  // Hàm định dạng số điện thoại
  const formatPhoneNumber = (phoneNumber?: string) => {
    if (!phoneNumber) return 'Không có'; // Nếu không có số điện thoại
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  // Tạo các hàng trống nếu số lượng người dùng ít hơn 10
  const emptyRows = Math.max(0, 10 - users.length); // Hiển thị tối đa 10 người dùng mỗi lần

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 3,
        borderRadius: 3,
        width: '100%',
        margin: 'auto',
        height: '695px', // Cố định chiều cao của bảng
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Số điện thoại</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Mức độ cảnh báo</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Trạng thái</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>Tác vụ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user._id}
              sx={{ height: '50px', ...(index === users.length - 1 && { borderBottom: 'none' }) }} // Xóa đường viền hàng cuối cùng
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

          {/* Hiển thị các hàng trống để giữ chiều cao bảng nếu số lượng người dùng ít */}
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
