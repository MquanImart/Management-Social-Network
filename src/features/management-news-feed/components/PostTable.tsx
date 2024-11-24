import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Avatar,
    Box,
    Typography,
} from '@mui/material';
import { Article } from '../interface/interface'

interface PostTableProps {
    posts: Article[];
    onViewPost: (post: Article) => void;
}

const PostTable: React.FC<PostTableProps> = ({ posts, onViewPost }) => {
    return (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 3, width: '100%' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Tác giả</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Nội dung</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Lượt thích</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Bình luận</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Báo cáo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Trạng thái báo cáo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((post) => (
                        <TableRow key={post._id}>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Avatar
                                        src={post.createdBy.avt[0]?.link}
                                        sx={{ width: 40, height: 40, mr: 1 }}
                                    />
                                    {post.createdBy.displayName}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2,
                                        overflow: 'hidden',
                                    }}
                                >
                                    {post.content}
                                </Typography>
                            </TableCell>
                            <TableCell>{post.totalLikes}</TableCell>
                            <TableCell>{post.totalComments}</TableCell>
                            <TableCell>{post.reports.length}</TableCell>
                            <TableCell>
                                {post.reports.some((r) => r.status === 'pending')
                                    ? 'Đang chờ xử lý'
                                    : 'Không có'}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => onViewPost(post)}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Xem chi tiết
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PostTable;
