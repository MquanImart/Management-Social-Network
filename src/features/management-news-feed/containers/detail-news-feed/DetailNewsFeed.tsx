import { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Article } from '../../../../interface/interface';
import Post from '../../../../shared/components/post/Post';
import Sidebar from '../../../../shared/components/sidebar/Sidebar';
import Header from '../../../../shared/components/header/Header';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import ListReport from '../../components/ListReport';
const DetailNewsFeed = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState<Article>({
        _id: '62462628864',
        sharedPostId: null,
        idHandler: 'user001',
        handleDate: null,
        reports: [
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
        ],
        groupID: null,
        content: 'Bài viết đầu tiên của tôi',
        hashTag: [],
        listPhoto: [],
        scope: 'Public',
        interact: {
            _id: '1',
            emoticons: [],
            comment: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        _destroy: null,
        createdBy: "53591573157137"
    }
  );

  const deleteArticle = () => {
    setPost({
      ...post,
      _destroy: new Date()
    })
}

const completeCheckArticle = () => {
    setPost({
      ...post,
      reports: post.reports.map((report) => ({
        ...report,
        status: 'rejected',
      })),
    });
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={3} sx={{ backgroundColor: '#f4f5fa' }}>
        <Sidebar />
      </Grid>
      <Grid item xs={9} sx={{ backgroundColor: '#f8f9fb' }}>
        <Header />
        <Box sx={{mb: 2}}/>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Button variant="text" sx={{margin: '10px'}} startIcon={<ArrowBackIosNewIcon/>}
          onClick={() => navigate(-1)}>
              Quay lại
          </Button>
          <Box display='flex'>
            {
              post._destroy === null? (
                <Button variant="outlined" color="secondary" size="small"
            sx={{borderColor: 'red', margin: '0px 10px'}} onClick={() => {deleteArticle()}}>
              Delete
            </Button>
              ): (
                <Typography sx={{margin: '0px 10px'}}>Đã xóa</Typography>
              )
            }
            <Button variant="outlined" color="secondary" size="small"
             sx={{borderColor: 'green', margin: '0px 10px'}} onClick={() => completeCheckArticle()} >
              Complete
            </Button>
          </Box>
        </Box>
        <Post
          post={post}
          currentUserId={'user001'}
        />
        <Button variant="contained"
          sx={{width: '100%', backgroundColor: '#e9e9e9', color: 'black', margin: '10px 0px'}}
          onClick={() => navigate('/profile/u123')}>
          Xem trang cá nhân
        </Button>
        <ListReport reports={post.reports}/>
    </Grid>
    </Grid>
  );
};

export default DetailNewsFeed;
