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
  selectedWarningLevel: number[];  // Kiểu mảng số
  sortOrder: string;
  handleSortChange: (event: SelectChangeEvent<string>) => void;
  handleWarningLevelChange: (event: SelectChangeEvent<number[]>) => void;  // Sửa để nhận mảng số
}

const FilterGroups = ({ selectedWarningLevel, sortOrder, handleSortChange, handleWarningLevelChange }: FilterGroupsTableProps) => {
  const warningLevels = [0, 1, 2, 3];  // Mức độ cảnh báo dưới dạng số

  const sortOptions = [
      { value: 'asc', label: 'Ascending' },
      { value: 'desc', label: 'Descending' },
  ];

  return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Mức Cảnh Báo: </Typography>
              <FormControl sx={{ minWidth: '10vw', margin: '20px' }}>
                  <Select
                      multiple
                      value={selectedWarningLevel}
                      onChange={handleWarningLevelChange}
                      renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                              {selected.length === warningLevels.length ? (
                                  <Chip label="Tất cả" />
                              ) : (
                                  selected.map((value) => (
                                      <Chip key={value} label={`Cảnh báo mức ${value}`} />
                                  ))
                              )}
                          </Box>
                      )}
                  >
                      {warningLevels.map((level) => (
                          <MenuItem key={level} value={level}>
                              <Checkbox checked={selectedWarningLevel.indexOf(level) > -1} />
                              <ListItemText primary={`Mức ${level}`} />
                          </MenuItem>
                      ))}
                  </Select>
              </FormControl>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Sắp xếp theo: </Typography>
              <FormControl sx={{ width: '10vw', margin: '20px' }}>
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
