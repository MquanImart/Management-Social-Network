import React from 'react';
import { Box, Button } from '@mui/material';

const ActionButtons: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 2 }}>
      <Button variant="contained" color="primary">Add User</Button>
      <Button variant="contained" color="secondary">Delete User</Button>
    </Box>
  );
};

export default ActionButtons;
