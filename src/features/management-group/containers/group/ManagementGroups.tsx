import { Grid, Box } from '@mui/material';
import React from 'react';
import Sidebar from '../../../../shared/components/sidebar/Sidebar';
import Header from '../../../../shared/components/header/Header';
import useGroups from './useGroups';
import GroupsTable from '../../components/GroupsTable';
import useFilterGroups from './useFilterGroups';
import FilterGroups from '../../components/FilterGroups';

const ManagementGroups: React.FC = () => {
  const {listGroups, activeLock, openActivity } = useGroups();
  const {selectedTopic, sortOrder, handleChangeTopic, handleSortChange} = useFilterGroups();
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={3} sx={{ backgroundColor: '#f4f5fa' }}>
        <Sidebar />
      </Grid>
      <Grid item xs={9} sx={{ backgroundColor: '#f8f9fb' }}>
        <Header />
        <Box sx={{mb: 2}}/>
        <FilterGroups selectedTopic={selectedTopic} sortOrder={sortOrder} 
            handleChangeTopic={handleChangeTopic} handleSortChange={handleSortChange}/>
        <GroupsTable groups={listGroups} selectedTopic={selectedTopic} sortOrder={sortOrder}
        activeLock={activeLock} openActivity={openActivity}/>
      </Grid>
    </Grid>
  );
};

export default ManagementGroups;
