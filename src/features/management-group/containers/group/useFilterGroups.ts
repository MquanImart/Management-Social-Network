import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

const sortOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];

const useFilterGroups = () => {
    const [selectedTopic, setSelectedTopic] = useState<string[]>([
        'Programming',
        'Gaming',
        'Running',
        'Weightlifting',
        'Cooking',
        'Traveling'
      ]);
    const [sortOrder, setSortOrder] = useState<string>(sortOptions[0].value);

    const handleChangeTopic = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setSelectedTopic(value);
    };
    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortOrder(event.target.value as string);
    };
    
    return {
        selectedTopic, sortOrder,
        handleChangeTopic,
        handleSortChange
    }
}

export default useFilterGroups;