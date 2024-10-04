import { useState } from 'react';
import { Box } from '@mui/material';
import { Article } from '../../../../../interface/interface';
import Post from '../../../../../shared/components/post/Post';

const ProfilePost = () => {
  const [posts, setPosts] = useState<Article[]>([
    {
      _id: '62462628864',
      sharedPostId: null,
      idHandler: 'user001',
      handleDate: null,
      reports: [
          {
              _idReporter: "user005",
              reason: "Harassment",
              reportDate: new Date("2023-09-21"),
              status: "processed"
          },
      ],
      groupID: null,
      content: 'Bài viết đầu tiên của tôi',
      hashTag: [],
      listPhoto: [],
      scope: 'Public',
      interact: {
          _id: '1',
          emoticons: [],
          comment: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      _destroy: null,
      createdBy: "53591573157137"
      },
      {
        _id: '62462628864',
        sharedPostId: null,
        idHandler: 'user001',
        handleDate: null,
        reports: [
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
        ],
        groupID: null,
        content: 'Bài viết đầu tiên của tôi',
        hashTag: [],
        listPhoto: [],
        scope: 'Public',
        interact: {
            _id: '1',
            emoticons: [],
            comment: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        _destroy: null,
        createdBy: "53591573157137"
        }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  return (
    <Box sx={{ padding: 2, height: '85vh', backgroundColor: '#e9e9e9', }}>
      {isLoading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p>{error}</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <Post
          post={post}
          currentUserId={'user001'}
        />
        ))
      ) : (
        <p>Không có bài viết nào.</p>
      )}
    </Box>
  );
};

export default ProfilePost;

