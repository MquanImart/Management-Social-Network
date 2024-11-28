import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

const sortOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
];

const useFilterGroups = () => {
    const [selectedWarningLevel, setSelectedWarningLevel] = useState<number[]>([]);  // Lưu trữ các mức cảnh báo kiểu số
    const [sortOrder, setSortOrder] = useState<string>(sortOptions[0].value);

    const handleWarningLevelChange = (event: SelectChangeEvent<number[]>) => {
        const value = event.target.value as number[];
        setSelectedWarningLevel(value);
    };

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortOrder(event.target.value as string);
    };

    return {
        selectedWarningLevel, sortOrder,
        handleWarningLevelChange,
        handleSortChange
    }
}

export default useFilterGroups;
