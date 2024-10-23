/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Xóa thông báo lỗi trước khi đăng nhập
  
    try {
      // Gửi yêu cầu đăng nhập tới API
      const response = await fetch('http://localhost:3000/v1/auth/login-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        sessionStorage.setItem('token', data.token);
  
        navigate('/management-user');
      } else {
        setError(data.message || 'Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập.');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi trong quá trình đăng nhập, vui lòng thử lại sau.');
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* Phần bên trái (2/3 màn hình) */}
        <Grid
          item
          xs={false}
          sm={7}
          md={8}
          sx={{
            backgroundImage: 'url(./src/assets/background-login.jpg)', // Sử dụng đường dẫn đến ảnh bạn tải lên
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
          }}
        />

        {/* Phần bên phải (1/3 màn hình) */}
        <Grid
          item
          xs={12}
          sm={5}
          md={4}
          component={Box}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            p: 4,
            boxShadow: 2,
            borderRadius: 2,
            minHeight: '100vh', // Giữ phần bên phải luôn cao 100% màn hình
            overflowY: 'auto',
          }}
        >
          <Container component="main" maxWidth="xs" sx={{ width: '100%', p: 0 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
                HỆ THỐNG ADMIN 
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} onSubmit={handleLogin}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  sx={{ mb: 2 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{ mb: 2 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Ghi nhớ đăng nhập"
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2, bgcolor: '#1976d2', ':hover': { bgcolor: '#1565c0' } }}
                >
                  Đăng nhập
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
