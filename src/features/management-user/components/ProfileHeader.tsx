import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { User } from '../../../interface/interface';

export type DataUser = {
  myUser: User;
}

const ProfileHeader = ({myUser}: DataUser) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '420px',
        overflow: 'hidden',
        borderBottom: '1px solid #e9e9e9',
        paddingBottom: '20px',
        backgroundColor: '#fff',
      }}
    >
      <Box
      sx={{
        backgroundImage: `url(${myUser.backGround[myUser.backGround.length - 1]})`,
        height: '300px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        position: 'relative',
      }}
      />
      {/* Group Info and Avatar */}
      <Box sx={{ position: 'absolute', bottom: '20px', left: '16px', display: 'flex', alignItems: 'center' }}>
        <IconButton sx={{padding: 0}}>
          <Avatar src={myUser.avt[myUser.avt.length - 1]} sx={{ width: '150px', height: '150px', border: '4px solid white' }} />
        </IconButton>
        <Box sx={{ marginLeft: '16px', marginTop: '10px'}}>
          <Typography variant="h5" color="black" fontWeight="bold">
            {myUser.firstName + " " + myUser.lastName}
          </Typography>
          <Typography variant="body1" color="black">
            {myUser.userName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
