import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Pagination,
    CircularProgress,
    Typography,
    TextField,
    Paper,
    InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../../../../shared/components/sidebar/Sidebar';
import Header from '../../../../shared/components/header/Header';
import UserTable from '../../components/UserTable';
import UserDetails from '../../components/UserDetails';
import { User } from '../../../../interface/interface';

const UserManagementPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const usersPerPage = 7; // Số lượng người dùng trên mỗi trang

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
                setFilteredUsers(data.data); // Gán danh sách người dùng để tìm kiếm
                setLoading(false);
            } catch (error) {
                setError('Lỗi khi tải danh sách người dùng');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value.toLowerCase();
        setSearchTerm(keyword);

        const filtered = users.filter(
            (user) =>
                user.account.email.toLowerCase().includes(keyword) ||
                user.details?.phoneNumber?.toLowerCase().includes(keyword)
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    };

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
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item xs={3} sx={{ backgroundColor: '#f4f5fa' }}>
                <Sidebar />
            </Grid>

            <Grid item xs={9} sx={{ backgroundColor: '#f8f9fb', padding: 2 }}>
                <Header />
                {/* Khoảng cách giữa Header và thanh tìm kiếm */}
                <Box sx={{ marginTop: 2 }}> {/* Đảm bảo khoảng cách với Header */}
                <Box  
                    component={Paper}
                    elevation={3}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 2,
                        gap: 1,
                        backgroundColor: '#ffffff',
                        maxWidth: '500px',
                        margin: '0 auto',
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Tìm kiếm email hoặc SĐT..."
                        value={searchTerm}
                        onChange={handleSearch}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            borderRadius: 2,
                            bgcolor: '#f7f7f7',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: '1px solid #ccc',
                                },
                            },
                        }}
                    />
                </Box>
            </Box>

                {/* Content chính */}
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography align="center" color="error" variant="h6">
                        {error}
                    </Typography>
                ) : filteredUsers.length === 0 ? (
                    <Typography align="center" variant="h6">
                        Không tìm thấy người dùng phù hợp.
                    </Typography>
                ) : (
                    <Grid container spacing={2} sx={{ mt: 1 }}> {/* Khoảng cách phía trên bảng */}
                        <Grid item xs={8}>
                            <UserTable users={currentUsers} onViewUser={handleViewUser} />
                        </Grid>
                        <Grid item xs={4}>
                            <UserDetails user={selectedUser} onLockUnlock={handleLockUnlock} />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Pagination
                                count={Math.ceil(filteredUsers.length / usersPerPage)}
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
