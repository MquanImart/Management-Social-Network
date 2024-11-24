import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Chip,
    Grid,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import { Article } from '../interface/interface';

interface PostDetailsProps {
    post: Article | null;
    onClose: () => void;
    onApproveReport: (reportId: string) => void;
    onRejectReport: (reportId: string) => void;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, onClose, onApproveReport, onRejectReport }) => {
    if (!post) return null;

    return (
        <Dialog open={!!post} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle
                sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >
                Chi tiết bài viết
            </DialogTitle>
            <DialogContent>
                {/* Post Content Card */}
                <Card
                    sx={{
                        mb: 3,
                        boxShadow: 6,
                        borderRadius: 3,
                        overflow: 'hidden',
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <CardHeader
                        avatar={
                            <Avatar
                                src={post.createdBy.avt[0]?.link}
                                sx={{ width: 70, height: 70, border: '2px solid #1976d2' }}
                            />
                        }
                        title={
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                {post.createdBy.displayName}
                            </Typography>
                        }
                        subheader={
                            <Box display="flex" alignItems="center" gap={1}>
                                <Chip
                                    icon={<ThumbUpAltIcon />}
                                    label={`Likes: ${post.totalLikes}`}
                                    color="success"
                                    size="small"
                                />
                                <Chip
                                    icon={<CommentIcon />}
                                    label={`Comments: ${post.totalComments}`}
                                    color="info"
                                    size="small"
                                />
                            </Box>
                        }
                        sx={{ bgcolor: '#f9f9f9', padding: 2 }}
                    />
                    <CardContent>
                        <Typography variant="body1" sx={{ mb: 2, fontSize: '1.2rem' }}>
                            {post.content}
                        </Typography>
                        {/* Display Post Images */}
                        {post.listPhoto && post.listPhoto.length > 0 ? (
                            <Grid container spacing={2}>
                                {post.listPhoto.map((photo) => (
                                    <Grid item xs={6} md={4} key={photo._id}>
                                        <Box
                                            component="img"
                                            src={photo.link}
                                            alt="Post Image"
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                borderRadius: 2,
                                                boxShadow: 3,
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No photos available.
                            </Typography>
                        )}
                    </CardContent>
                </Card>

                {/* Report Table */}
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                    Reports ({post.reports.length}):
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f0f0f0' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>ID Reporter</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Reason</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Reported On</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {post.reports.map((report) => (
                                <TableRow key={report._id}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Typography>{report._idReporter}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{report.reason}</TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                color: report.status === 'pending' ? 'red' : 'green',
                                            }}
                                        >
                                            {report.status}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(report.reportDate).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {report.status === 'pending' && (
                                            <Box display="flex" justifyContent="center" gap={1}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => onApproveReport(report._id)}
                                                >
                                                    Duyệt
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => onRejectReport(report._id)}
                                                >
                                                    Từ chối
                                                </Button>
                                            </Box>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', padding: 2 }}>
                <Button onClick={onClose} variant="outlined" sx={{ fontWeight: 'bold' }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PostDetails;
