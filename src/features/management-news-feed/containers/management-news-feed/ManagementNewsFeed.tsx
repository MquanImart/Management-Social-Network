import { Grid, Box } from '@mui/material';
import React from 'react';
import Sidebar from '../../../../shared/components/sidebar/Sidebar';
import Header from '../../../../shared/components/header/Header';
import NewsFeedTable from '../../components/NewsFeedTable';
import useNewsFeed from './useNewsFeed';
import { useNavigate } from 'react-router-dom';
import FilterNewsFeed from '../../components/FilterNewsFeed';

const ManagementNewsFeed: React.FC = () => {
  const navigate = useNavigate();
  const {listArticle,deteleArticle, completeCheckArticle } = useNewsFeed();

  const onViewDetailArticle = (idArticle: string) => {
    navigate(`/detail-news-feed/${idArticle}`);
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={3} sx={{ backgroundColor: '#f4f5fa' }}>
        <Sidebar />
      </Grid>
      <Grid item xs={9} sx={{ backgroundColor: '#f8f9fb' }}>
        <Header />
        <Box sx={{mb: 2}}/>
            <FilterNewsFeed/>
            <NewsFeedTable articles={listArticle} 
              onViewDetailArticle={onViewDetailArticle} 
              deleteArticle={deteleArticle} 
              completeCheckArticle={completeCheckArticle}   
            />
      </Grid>
    </Grid>
  );
};

export default ManagementNewsFeed;
