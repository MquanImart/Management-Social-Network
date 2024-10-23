/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import Sidebar from '../../../../shared/components/sidebar/Sidebar';
import Header from '../../../../shared/components/header/Header';
import UserTable from '../../components/UserTable';
import UserDetails from '../../components/UserDetails';
import { User } from '../../../../interface/interface';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 7 ; // Số lượng người dùng trên mỗi trang

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/v1/admin/management-users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.data); // Gán danh sách người dùng từ API
        setLoading(false);
      } catch (error) {
        setError('Lỗi khi tải danh sách người dùng');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleLockUnlock = (userId: string, newStatus: string) => {
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);

    if (selectedUser && selectedUser._id === userId) {
      setSelectedUser({ ...selectedUser, status: newStatus });
    }
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={3} sx={{ backgroundColor: '#f4f5fa' }}>
        <Sidebar />
      </Grid>
      
      <Grid item xs={9} sx={{ backgroundColor: '#f8f9fb' }}>
        <Header />
        <Box sx={{mb: 2}}/>

        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <UserTable users={currentUsers} onViewUser={handleViewUser} />
            </Grid>
            <Grid item xs={4}>
              <UserDetails user={selectedUser} onLockUnlock={handleLockUnlock} />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination
                count={Math.ceil(users.length / usersPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default UserManagementPage;
