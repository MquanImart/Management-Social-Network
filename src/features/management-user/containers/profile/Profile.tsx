import { Button, Grid } from '@mui/material';
import { useProfile } from './useProfile';
import Sidebar from '../../../../shared/components/sidebar/Sidebar';
import Header from '../../../../shared/components/header/Header';
import ProfileTabs from '../../components/ProfileTabs';
import ProfileHeader from '../../components/ProfileHeader';
import { Outlet, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Profile = () => {
  const {myUser} = useProfile();
  const navigate = useNavigate();
  if (myUser == null) {
    return <></>;
  }
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={3} sx={{ backgroundColor: '#f4f5fa' }}>
        <Sidebar />
      </Grid>
      <Grid item xs={9} sx={{ backgroundColor: '#f8f9fb' }}>
        <Header />
        <Button variant="text" sx={{margin: '10px'}} startIcon={<ArrowBackIosNewIcon/>}
          onClick={() => navigate(-1)}>
              Quay lại
        </Button>
        <ProfileHeader myUser={myUser} />
        <ProfileTabs userID={myUser._id}/>
        <Outlet/>  
      </Grid>
    </Grid>
  );
};

export default Profile;

