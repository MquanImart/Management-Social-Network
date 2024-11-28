import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Typography, Button, Box
} from '@mui/material';
import { Group } from '../../../interface/interface';

interface GroupsTableProps {
    selectedWarningLevel: string[];
    sortOrder: string;
    activeLock: (groupID: string) => void;
    openActivity: (groupID: string) => void;
    groups: Group[];
    loading: boolean;
}

const GroupsTable: React.FC<GroupsTableProps> = ({ selectedWarningLevel, sortOrder, activeLock, openActivity, groups, loading }) => {
    const [listGroups, setListGroups] = useState<Group[]>(groups);

    useEffect(() => {
        // Lọc theo mức độ cảnh báo
        const filteredGroups = groups.filter(group => 
            selectedWarningLevel.length === 0 || selectedWarningLevel.includes(String(group.warningLevel))
        );
        setListGroups(filteredGroups);
    }, [selectedWarningLevel, sortOrder, groups]);

    if (loading) {
        return <Typography>Đang tải dữ liệu...</Typography>;
    }

    if (listGroups.length === 0) {
        return <Typography>Không tìm thấy nhóm nào.</Typography>;
    }

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>ID Nhóm</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Mức Cảnh Báo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Tên</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>ID Quản Trị</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Số Thành Viên</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Số Bài Viết</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Hành Động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listGroups.map((group) => (
                        <TableRow key={group._id}>
                            <TableCell>{group._id}</TableCell>
                            <TableCell>{group.warningLevel}</TableCell>
                            <TableCell>{group.groupName}</TableCell>
                            <TableCell>{group.idAdmin}</TableCell>
                            <TableCell>{group.members.count}</TableCell>
                            <TableCell>{group.article.count}</TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    {group._destroy ? (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{ borderColor: 'green', color: 'green' }}
                                            onClick={() => {
                                                openActivity(group._id);
                                            }}
                                        >
                                            Mở Khóa
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{ borderColor: 'red', color: 'red' }}
                                            onClick={() => {
                                                activeLock(group._id);
                                            }}
                                        >
                                            Khóa
                                        </Button>
                                    )}
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
