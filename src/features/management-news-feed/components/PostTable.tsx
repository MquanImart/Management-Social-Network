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
import { Article } from '../interface/interface';

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
                        <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Số báo cáo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Trạng thái báo cáo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Trạng thái bài viết</TableCell>
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
                                        sx={{ width: 40, height: 40, mr: 2 }}
                                    />
                                    <Typography variant="body2">{post.createdBy.displayName}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" sx={{ wordWrap: 'break-word' }}>
                                    {post.content}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{post.totalLikes}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{post.totalComments}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{post.reports.length}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    {post.reports.some(report => report.status === 'pending')
                                        ? 'Đang xử lý'
                                        : 'Hoàn thành'}
                                </Typography>
                            </TableCell>
                            <TableCell>{post._destroy ? 'Đã xóa' : 'Còn tồn tại'}</TableCell>
                            <TableCell>
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    onClick={() => onViewPost(post)}>
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
