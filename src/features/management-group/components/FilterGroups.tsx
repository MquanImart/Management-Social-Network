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

interface FilterGroupsTableProps {
  selectedTopic: string[];
  sortOrder: string;
  handleChangeTopic: (event: SelectChangeEvent<string[]>) => void;
  handleSortChange: (event: SelectChangeEvent<string>) => void;
}

const FilterGroups = ({selectedTopic, sortOrder, handleChangeTopic, handleSortChange} : FilterGroupsTableProps) => {
    const Topics = [
        'Programming',
        'Gaming',
        'Running',
        'Weightlifting',
        'Cooking',
        'Traveling'
      ];
      const sortOptions = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
      ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
    <Box sx={{ display: 'flex', alignItems: 'center'}}>
    {/* Combobox checkbox */}
      <Typography>Topic: </Typography>
      <FormControl sx={{minWidth: '10vw', margin: '20px' }}>
        <Select
          multiple
          value={selectedTopic}
          onChange={handleChangeTopic}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap'}}>
              {selected.length === Topics.length ? (
                <Chip label="Tất cả" />
              ) : (
                selected.map((value) => (
                  <Chip key={value} label={value}/>
                ))
              )}
            </Box>
          )}
        >
          {Topics.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedTopic.indexOf(option) > -1} />
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

export default FilterGroups;
