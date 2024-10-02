import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import { User } from '../../../interface/interface';

interface UserTableProps {
  users: User[];
  onViewUser: (user: User) => void; // Hàm xử lý sự kiện khi nhấn View
}

const UserTable: React.FC<UserTableProps> = ({ users, onViewUser }) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Tên</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>SĐT</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Mức độ vi phạm</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Tác vụ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.account.email}</TableCell>
              <TableCell>{user.details.phoneNumber}</TableCell>
              <TableCell>
                <Typography>{user.account.warningLevel}</Typography>
              </TableCell>
              <TableCell>
                <Typography color={user.status === 'active' ? 'green' : 'red'}>{user.status === 'active' ? 'Active' : 'Locked'}</Typography>
              </TableCell>
              <TableCell>
                {/* Sử dụng Box với display: 'flex' để xếp các nút theo chiều ngang */}
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
                  <Button variant="outlined" color="secondary" size="small">
                    Sửa
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
