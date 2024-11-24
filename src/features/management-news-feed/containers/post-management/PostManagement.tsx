import React, { useState, useEffect } from 'react';
import { Box, Grid, Pagination, CircularProgress, Typography, TextField } from '@mui/material';
import Sidebar from '../../../../shared/components/sidebar/Sidebar';
import Header from '../../../../shared/components/header/Header';
import PostTable from '../../components/PostTable';
import PostDetails from '../../components/PostDetails';
import { Article } from '../../interface/interface';

const PostManagementPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [selectedPost, setSelectedPost] = useState<Article | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const postsPerPage = 5;

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:3000/v1/article/all", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Không thể lấy danh sách bài viết");
                }

                const data = await response.json();
                setArticles(data.articles || []);
                setFilteredArticles(data.articles || []);
            } catch (error: any) {
                setError('Lỗi khi tải danh sách bài viết');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value.toLowerCase();
        setSearchTerm(keyword);

        const filtered = articles.filter((article) =>
            article.content.toLowerCase().includes(keyword) ||
            article.createdBy.displayName.toLowerCase().includes(keyword)
        );
        setFilteredArticles(filtered);
        setCurrentPage(1);
    };

    const handleViewPost = (post: Article) => {
        setSelectedPost(post);
    };

    const handleCloseDialog = () => {
        setSelectedPost(null);
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleApproveReport = async (reportId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/v1/article/approve/${reportId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to approve the report');
            }
    
            // Update the articles state with the approved report
            setArticles((prevArticles) =>
                prevArticles.map((article) =>
                    article._id === selectedPost?._id
                        ? {
                              ...article,
                              reports: article.reports.map((report) =>
                                  report._id === reportId
                                      ? { ...report, status: 'approved' }
                                      : report
                              ),
                          }
                        : article
                )
            );
    
            // Update filtered articles to reflect changes in the current list
            setFilteredArticles((prevFiltered) =>
                prevFiltered.map((article) =>
                    article._id === selectedPost?._id
                        ? {
                              ...article,
                              reports: article.reports.map((report) =>
                                  report._id === reportId
                                      ? { ...report, status: 'approved' }
                                      : report
                              ),
                          }
                        : article
                )
            );
    
            setSelectedPost((prevPost) =>
                prevPost
                    ? {
                          ...prevPost,
                          reports: prevPost.reports.map((report) =>
                              report._id === reportId
                                  ? { ...report, status: 'approved' }
                                  : report
                          ),
                      }
                    : null
            );
        } catch (error) {
            console.error('Error approving the report:', error);
        }
    };
    
    const handleRejectReport = async (reportId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/v1/article/reject/${reportId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to reject the report');
            }
    
            // Update the articles state with the rejected report
            setArticles((prevArticles) =>
                prevArticles.map((article) =>
                    article._id === selectedPost?._id
                        ? {
                              ...article,
                              reports: article.reports.map((report) =>
                                  report._id === reportId
                                      ? { ...report, status: 'rejected' }
                                      : report
                              ),
                          }
                        : article
                )
            );
    
            // Update filtered articles to reflect changes in the current list
            setFilteredArticles((prevFiltered) =>
                prevFiltered.map((article) =>
                    article._id === selectedPost?._id
                        ? {
                              ...article,
                              reports: article.reports.map((report) =>
                                  report._id === reportId
                                      ? { ...report, status: 'rejected' }
                                      : report
                              ),
                          }
                        : article
                )
            );
    
            setSelectedPost((prevPost) =>
                prevPost
                    ? {
                          ...prevPost,
                          reports: prevPost.reports.map((report) =>
                              report._id === reportId
                                  ? { ...report, status: 'rejected' }
                                  : report
                          ),
                      }
                    : null
            );
        } catch (error) {
            console.error('Error rejecting the report:', error);
        }
    };
    

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredArticles.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item xs={3} sx={{ backgroundColor: '#f4f5fa' }}>
                <Sidebar />
            </Grid>

            <Grid item xs={9} sx={{ backgroundColor: '#f8f9fb' }}>
                <Header />
                <Box sx={{ mb: 2, mt: 2,  px: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Tìm kiếm bài viết hoặc tác giả..."
                        value={searchTerm}
                        onChange={handleSearch}
                        sx={{ bgcolor: 'white', borderRadius: 1 }}
                    />
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography align="center" color="error" variant="h6">
                        {error}
                    </Typography>
                ) : filteredArticles.length === 0 ? (
                    <Typography align="center" variant="h6">
                        Không tìm thấy bài viết phù hợp.
                    </Typography>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PostTable posts={currentPosts} onViewPost={handleViewPost} />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Pagination
                                count={Math.ceil(filteredArticles.length / postsPerPage)}
                                page={currentPage}
                                onChange={handleChangePage}
                                color="primary"
                            />
                        </Grid>
                        {selectedPost && (
                            <PostDetails
                                post={selectedPost}
                                onClose={handleCloseDialog}
                                onApproveReport={handleApproveReport}
                                onRejectReport={handleRejectReport}
                            />
                        )}
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default PostManagementPage;
