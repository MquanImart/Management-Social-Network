import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

const sortOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];

const useFilterNewsFeed = () => {
    const [selectedLevel, setSelectedLevel] = useState<string[]>(['Nghiêm trọng', 'Xem xét', 'Bình thường']);
    const [selectedStatus, setSelectedStatus] = useState<string[]>(['pending', 'rejected', 'processed']);
    const [sortOrder, setSortOrder] = useState<string>(sortOptions[0].value);

    const handleChangeLevel = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setSelectedLevel(value);
    };
    const handleChangeStatus = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setSelectedStatus(value);
    };
    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortOrder(event.target.value as string);
    };
    
    return {
        selectedLevel, selectedStatus, sortOrder,
        handleChangeLevel,
        handleChangeStatus,
        handleSortChange
    }
}

export default useFilterNewsFeed;