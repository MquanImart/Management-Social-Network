import { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { Article, Comment } from '../../../../interface/interface';
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
  const handleAddComment = (postId: string, newComment: Comment) => {
    setPost({ 
        ...post, 
        interact: { 
            ...post.interact, 
            comment: [
                ...post.interact.comment, 
                newComment] } }
        )
  }
  const handleAddReply = (postId: string, commentId: string, newReply: Comment) => {
    setPost({
        ...post,
        interact: { 
            ...post.interact, 
            comment: post.interact.comment.map((comment)=> comment._id === commentId?{
                ...comment,
                replyComment: [...comment.replyComment, newReply],
              }: comment) } }
        )
  };

  const handleDeletePost = (postId: string) => {
    
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={3} sx={{ backgroundColor: '#f4f5fa' }}>
        <Sidebar />
      </Grid>
      <Grid item xs={9} sx={{ backgroundColor: '#f8f9fb' }}>
        <Header />
        <Box sx={{mb: 2}}/>
        <Button variant="text" sx={{margin: '10px'}} startIcon={<ArrowBackIosNewIcon/>}
        onClick={() => navigate(-1)}>
            Quay lại
        </Button>
        <Post
          post={post}
          onAddComment={handleAddComment}
          onAddReply={handleAddReply}
          onDeletePost={handleDeletePost}
          currentUserId={'user001'}
        />
        <ListReport reports={post.reports}/>
    </Grid>
    </Grid>
  );
};

export default DetailNewsFeed;
