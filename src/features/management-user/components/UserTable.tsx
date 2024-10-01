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
            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Phone Number</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Warning Level</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
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
                    View
                  </Button>
                  <Button variant="outlined" color="secondary" size="small">
                    Edit
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
