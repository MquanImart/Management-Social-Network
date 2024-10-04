import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
  SelectChangeEvent,
  Typography
} from '@mui/material';

interface FilterNewsFeedProps {
  selectedLevel: string[];
  selectedStatus: string[];
  sortOrder: string;
  handleChangeLevel: (event: SelectChangeEvent<string[]>) => void;
  handleChangeStatus: (event: SelectChangeEvent<string[]>) => void;
  handleSortChange: (event: SelectChangeEvent<string>) => void;
}

const FilterNewsFeed = ({selectedLevel, selectedStatus, sortOrder, handleChangeLevel, handleChangeStatus, handleSortChange} : FilterNewsFeedProps) => {
    const Level = [
        'Nghiêm trọng',
        'Xem xét',
        'Bình thường',
      ];
    const Status = [
        'pending',
        'rejected',
        'processed',
      ];
      const sortOptions = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
      ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
    <Box sx={{ display: 'flex', alignItems: 'center'}}>
    {/* Combobox checkbox */}
      <Typography>Level: </Typography>
      <FormControl sx={{minWidth: '10vw', margin: '20px' }}>
        <Select
          multiple
          value={selectedLevel}
          onChange={handleChangeLevel}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap'}}>
              {selected.length === Level.length ? (
                <Chip label="Tất cả" />
              ) : (
                selected.map((value) => (
                  <Chip key={value} label={value}/>
                ))
              )}
            </Box>
          )}
        >
          {Level.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedLevel.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography>Status: </Typography>
      <FormControl sx={{minWidth: '10vw', margin: '20px' }}>
        <Select
          multiple
          value={selectedStatus}
          onChange={handleChangeStatus}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap'}}>
              {selected.length === Level.length ? (
                <Chip label="Tất cả" />
              ) : (
                selected.map((value) => (
                  <Chip key={value} label={value}/>
                ))
              )}
            </Box>
          )}
        >
          {Status.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedStatus.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center'}}>
      <Typography>Sắp xếp theo: </Typography>
        {/* Combobox sắp xếp */}
      <FormControl  sx={{width: '10vw', margin: '20px' }}>
        <Select value={sortOrder} onChange={handleSortChange}>
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    </Box>
  );
};

export default FilterNewsFeed;
