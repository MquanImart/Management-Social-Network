import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,  Typography, Button, Box } from '@mui/material';
import { Group } from '../../../interface/interface';

interface GroupsTableProps {
  selectedTopic: string[];
  sortOrder: string;
  activeLock: (groupsID: string) => void;
  openActivity: (groupsID: string) => void;
  groups: Group[];
}

const GroupsTable: React.FC<GroupsTableProps> = ({selectedTopic, sortOrder, activeLock, openActivity, groups }) => {
  const [listGroups, setListGroups] = useState<Group[]>(groups);
  
  useEffect(() => {
    const filteredGroups = groups.filter(group =>
      group.hobbies.some(hobby => selectedTopic.includes(hobby))
    );
    setListGroups(filteredGroups);  
  }, [selectedTopic, sortOrder])
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Warning Level</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Group Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>type</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>ID Admin</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Members Count</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Main Topic</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listGroups.map((group) => (
            <TableRow key={group._id}>
              <TableCell>{group._id}</TableCell>
              <TableCell>{group.warningLevel}</TableCell>
              <TableCell>{group.groupName}</TableCell>
              <TableCell>{group.type}</TableCell>
              <TableCell>{group.idAdmin}</TableCell>
              <TableCell>{group.members.count}</TableCell>
              <TableCell sx={{display: 'flex', flexDirection: 'column'}}>
                {group.hobbies.map((hobbie) => 
                  <Typography sx={{backgroundColor: '#ccc', borderRadius: 20, margin: '10px', textAlign: 'center'}}>
                    {hobbie}
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {
                    group._destroy === null? (
                      <Button variant="outlined" size="small"
                    sx={{borderColor: 'red', color: 'red'}} onClick={() => {activeLock(group._id)}}>
                    Khóa
                  </Button>
                    ): (
                      <Button variant="outlined" color="secondary" size="small"
                    sx={{borderColor: 'green', color: 'green'}} onClick={() => {openActivity(group._id)}}>
                    Mở khóa
                  </Button>
                    )
                  }
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupsTable;
