import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from '../../../../shared/components/sidebar/Sidebar';
import Header from '../../../../shared/components/header/Header';
import UserTable from '../../components/UserTable';
import UserDetails from '../../components/UserDetails';
import { User } from '../../../../interface/interface';

const mockUserData: User[] = [
  {
    _id: '1',
    account: { warningLevel: 0, email: 'john.doe@example.com', password: '' },
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'John Doe',
    userName: 'johndoe',
    details: { phoneNumber: '123456789', address: '123 Main St', gender: true, birthDate: new Date() },
    friends: [],
    status: 'active',
    avt: ['https://via.placeholder.com/150'],
    collections: [],
    groups: [],
    backGround: [],
    aboutMe: 'A passionate software engineer',
    createDate: '2021-01-01',
    hobbies: ['Reading', 'Gaming'],
    listArticle: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  },
  {
    _id: '2',
    account: { warningLevel: 3, email: 'jane.smith@example.com', password: '' },
    firstName: 'Jane',
    lastName: 'Smith',
    displayName: 'Jane Smith',
    userName: 'janesmith',
    details: { phoneNumber: '987654321', address: '456 Main St', gender: false, birthDate: new Date() },
    friends: [],
    status: 'locked',
    avt: ['https://via.placeholder.com/150'],
    collections: [],
    groups: [],
    backGround: [],
    aboutMe: 'Love to travel and explore new places',
    createDate: '2021-02-15',
    hobbies: ['Traveling', 'Photography'],
    listArticle: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    _destroy: new Date(),
  },
];

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUserData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={3} sx={{ backgroundColor: '#f4f5fa' }}>
        <Sidebar />
      </Grid>
      
      <Grid item xs={9} sx={{ backgroundColor: '#f8f9fb' }}>
        <Header />
        <Box sx={{mb: 2}}/>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <UserTable users={users} onViewUser={handleViewUser} />
          </Grid>
          <Grid item xs={4}>
            <UserDetails user={selectedUser} onLockUnlock={handleLockUnlock} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserManagementPage;
