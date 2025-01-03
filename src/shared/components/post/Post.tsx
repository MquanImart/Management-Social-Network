/* eslint-disable @typescript-eslint/no-unused-vars */
 
import React, { useState } from 'react';
import { Box, Typography, Avatar, Paper, Button,Collapse, TextField, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import {  Favorite, Comment, Share, CardGiftcard, ThumbUpAlt, Reply, Report } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '../../../interface/interface';

interface PostComponentProps {
  post: Article;
  currentUserId: string;
}

const Post = ({ post, currentUserId }: PostComponentProps) => {
  const [showComments, setShowComments] = useState(false);
  const [likedPosts, __] = useState<string[]>([]);
  const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({});
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: boolean }>({});
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const [newComment, setNewComment] = useState('');
  
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedReportReason, setSelectedReportReason] = useState<string>('');
  const [reportTarget, setReportTarget] = useState<{ postId: string; commentId?: string } | null>(null);

  const totalPostLikes = post.interact.emoticons.filter(emoticon => emoticon.typeEmoticons === 'like').length;
  const totalComments = post.interact.comment.reduce((acc, comment) => {
    const replyCount = comment.replyComment.length;
    return acc + 1 + replyCount;
  }, 0);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLikeComment = (commentId: string) => {
    setLikedComments((prevLikedComments) => ({
      ...prevLikedComments,
      [commentId]: !prevLikedComments[commentId],
    }));

    post.interact.comment = post.interact.comment.map((comment) => {
      if (comment._iduser === commentId) {
        const isLiked = likedComments[commentId];

        if (isLiked) {
          comment.emoticons = comment.emoticons.filter((emoticon) => emoticon._iduser !== currentUserId);
        } else {
          comment.emoticons.push({ typeEmoticons: 'like', _iduser: currentUserId });
        }
      }
      return comment;
    });
  };

  const handleLikeReply = (commentId: string, replyId: string) => {
    post.interact.comment = post.interact.comment.map((comment) => {
      if (comment._iduser === commentId) {
        comment.replyComment = comment.replyComment.map((reply) => {
          if (reply._iduser === replyId) {
            const isLiked = likedComments[replyId];

            if (isLiked) {
              reply.emoticons = reply.emoticons.filter((emoticon) => emoticon._iduser !== currentUserId);
            } else {
              reply.emoticons.push({ typeEmoticons: 'like', _iduser: currentUserId });
            }
          }
          return reply;
        });
      }
      return comment;
    });

    setLikedComments((prevLikedComments) => ({
      ...prevLikedComments,
      [replyId]: !prevLikedComments[replyId],
    }));
  };

  const handleReplyToComment = (commentId: string) => {
    setReplyInputs((prevReplyInputs) => ({
      ...prevReplyInputs,
      [commentId]: !prevReplyInputs[commentId],
    }));
  };

  const handleReplyChange = (commentId: string, text: string) => {
    setReplyTexts((prevReplyTexts) => ({
      ...prevReplyTexts,
      [commentId]: text,
    }));
  };

  const handleSubmitReply = (commentId: string) => {
    const replyText = replyTexts[commentId];
    if (replyText.trim()) {
      setReplyInputs((prevReplyInputs) => ({
        ...prevReplyInputs,
        [commentId]: false,
      }));
      setReplyTexts((prevReplyTexts) => ({
        ...prevReplyTexts,
        [commentId]: '',
      }));
    }
  };

  const handleNewCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleSubmitNewComment = () => {
    if (newComment.trim()) {
      setNewComment('');
    }
  };

  const handleOpenReportDialog = (postId: string, commentId?: string) => {
    setReportTarget({ postId, commentId });
    setReportDialogOpen(true);
  };

  const handleCloseReportDialog = () => {
    setReportDialogOpen(false);
    setSelectedReportReason('');
  };

  const handleReportReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReportReason(event.target.value);
  };

  const handleSubmitReport = () => {
    if (reportTarget) {
      // Submit the report logic here
      handleCloseReportDialog();
    }
  };

  return (
    <Paper sx={{ padding: 2, marginBottom: 3, borderRadius: 3, boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Box display="flex" alignItems="center">
          <Avatar alt={post.idHandler ?? 'Anonymous'} src="/static/images/avatar/1.jpg" sx={{ width: 48, height: 48 }} />
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#333' }}>
              {post.idHandler ?? 'Anonymous'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {formatDistanceToNow(new Date(post.createdAt))} - {post.scope}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography variant="body1" sx={{ color: '#424242', marginBottom: 2 }}>
        {post.content}
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={1} sx={{ marginBottom: 2 }}>
        {post.hashTag.map((hashtag, index) => (
          <Button
            key={index}
            onClick={() => console.log('Hashtag clicked:', hashtag)}
            sx={{
              textTransform: 'none',
              color: '#1E90FF',
              padding: 0,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {hashtag}
          </Button>
        ))}
      </Box>

      {post.listPhoto.length > 0 && (
        <Box sx={{ marginTop: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {post.listPhoto.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`post-image-${index}`}
              style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '8px', objectFit: 'cover' }}
            />
          ))}
        </Box>
      )}

      <Box display="flex" alignItems="center" sx={{ marginTop: 2 }}>
        <Favorite fontSize="small" sx={{ color: '#d32f2f' }} />
        <Typography variant="body2" sx={{ color: '#757575', marginLeft: 1 }}>
          {totalPostLikes} lượt thích - {totalComments} bình luận
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
        <Box>
          <Button
            startIcon={<Favorite />}
            size="small"
            sx={{ color: likedPosts.includes(post._id) ? '#d32f2f' : '#424242', marginRight: 2, '&:hover': { backgroundColor: '#f5f5f5' } }}
          >
            {likedPosts.includes(post._id) ? 'Bỏ thích' : 'Yêu thích'}
          </Button>
          <Button startIcon={<Comment />} size="small" sx={{ color: '#424242', marginRight: 2, '&:hover': { backgroundColor: '#f5f5f5' } }} onClick={handleToggleComments}>
            Bình luận
          </Button>
          <Button startIcon={<Share />} size="small" sx={{ color: '#424242', marginRight: 2, '&:hover': { backgroundColor: '#f5f5f5' } }}>
            Chia sẻ
          </Button>
          <Button startIcon={<CardGiftcard />} size="small" sx={{ color: '#424242', '&:hover': { backgroundColor: '#f5f5f5' } }}>
            Quà tặng
          </Button>
        </Box>
      </Box>

      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Box sx={{ marginTop: 2, backgroundColor: '#f5f5f5', padding: 2, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Viết bình luận..."
              value={newComment}
              onChange={handleNewCommentChange}
              sx={{ marginBottom: 1, borderRadius: '8px', backgroundColor: '#fff' }}
            />
            <Button variant="contained" size="small" onClick={handleSubmitNewComment} sx={{ marginTop: 1 }}>
              Gửi
            </Button>
          </Box>

          {post.interact.comment.length > 0 ? (
            <Box>
              {post.interact.comment.map((comment, index) => {
                const commentLikes = comment.emoticons.filter(emoticon => emoticon.typeEmoticons === 'like').length;
                return (
                  <Box key={index} sx={{ marginBottom: 2, padding: 2, borderRadius: 2, backgroundColor: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: '#424242' }}>
                      {comment._iduser}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#616161', marginTop: 1 }}>
                      {comment.content}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#757575', marginTop: 1 }}>
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </Typography>

                    <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                      <Button
                        size="small"
                        startIcon={<ThumbUpAlt />}
                        sx={{ color: likedComments[comment._iduser] ? '#2e7d32' : '#757575', textTransform: 'none' }}
                        onClick={() => handleLikeComment(comment._iduser)}
                      >
                        {likedComments[comment._iduser] ? 'Bỏ thích' : 'Thích'} ({commentLikes})
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Reply />}
                        sx={{ color: '#757575', textTransform: 'none' }}
                        onClick={() => handleReplyToComment(comment._iduser)}
                      >
                        Trả lời
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Report />}
                        sx={{ color: '#757575', textTransform: 'none' }}
                        onClick={() => handleOpenReportDialog(post._id, comment._iduser)}
                      >
                        Báo cáo
                      </Button>
                    </Box>

                    {replyInputs[comment._iduser] && (
                      <Box sx={{ marginTop: 1 }}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          placeholder="Nhập trả lời của bạn..."
                          value={replyTexts[comment._iduser] || ''}
                          onChange={(e) => handleReplyChange(comment._iduser, e.target.value)}
                          sx={{ marginBottom: 1, borderRadius: '8px', backgroundColor: '#fff' }}
                        />
                        <Button variant="contained" size="small" onClick={() => handleSubmitReply(comment._iduser)}>
                          Gửi
                        </Button>
                      </Box>
                    )}

                    {comment.replyComment.map((reply, replyIndex) => {
                      const replyLikes = reply.emoticons.filter(emoticon => emoticon.typeEmoticons === 'like').length;
                      return (
                        <Box key={replyIndex} sx={{ marginTop: 2, paddingLeft: 2, borderLeft: '2px solid #bdbdbd' }}>
                          <Typography variant="body2" fontWeight="bold" sx={{ color: '#424242' }}>
                            {reply._iduser}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#616161', marginTop: 1 }}>
                            {reply.content}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#757575', marginTop: 1 }}>
                            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                          </Typography>

                          <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                            <Button
                              size="small"
                              startIcon={<ThumbUpAlt />}
                              sx={{ color: likedComments[reply._iduser] ? '#2e7d32' : '#757575', textTransform: 'none' }}
                              onClick={() => handleLikeReply(comment._iduser, reply._iduser)}
                            >
                              {likedComments[reply._iduser] ? 'Bỏ thích' : 'Thích'} ({replyLikes})
                            </Button>
                            <Button
                              size="small"
                              startIcon={<Reply />}
                              sx={{ color: '#757575', textTransform: 'none' }}
                              onClick={() => handleReplyToComment(reply._iduser)}
                            >
                              Trả lời
                            </Button>
                            <Button
                              size="small"
                              startIcon={<Report />}
                              sx={{ color: '#757575', textTransform: 'none' }}
                              onClick={() => handleOpenReportDialog(post._id, reply._iduser)}
                            >
                              Báo cáo
                            </Button>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Không có bình luận nào.
            </Typography>
          )}
        </Box>
      </Collapse>

      <Dialog open={reportDialogOpen} onClose={handleCloseReportDialog}>
        <DialogTitle>Báo cáo</DialogTitle>
        <DialogContent>
          <RadioGroup value={selectedReportReason} onChange={handleReportReasonChange}>
            <FormControlLabel value="spam" control={<Radio />} label="Spam" />
            <FormControlLabel value="offensive" control={<Radio />} label="Nội dung xúc phạm" />
            <FormControlLabel value="misleading" control={<Radio />} label="Thông tin sai lệch" />
            <FormControlLabel value="other" control={<Radio />} label="Lý do khác" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReportDialog}>Hủy</Button>
          <Button onClick={handleSubmitReport} variant="contained" color="primary">Gửi báo cáo</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Post;
