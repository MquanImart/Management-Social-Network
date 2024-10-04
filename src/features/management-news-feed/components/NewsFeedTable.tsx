import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import { Article } from '../../../interface/interface';

interface NewsFeedTableProps {
  selectedLevel: string[];
  selectedStatus: string[];
  sortOrder: string;
  articles: Article[];
  onViewDetailArticle: (idArticle: string) => void;
  deleteArticle: (articleID: string) => void;
  completeCheckArticle: (articleID: string) => void;
}
enum ReportStatus {
  Pending = 'pending',      // Đang chờ xử lý
  Processed = 'processed',  // Đã xử lý
  Rejected = 'rejected'     // Bị từ chối
}

const NewsFeedTable: React.FC<NewsFeedTableProps> = ({selectedLevel, selectedStatus, sortOrder, articles, onViewDetailArticle, deleteArticle, completeCheckArticle }) => {
  const [listArticles, setListArtilces] = useState<Article[]>(articles);
  const getReportStatus = (reports: Article['reports']) => {
    if (reports.every(report => report.status === 'processed')) {
      return ReportStatus.Processed;
    }
    if (reports.every(report => report.status === 'rejected')) {
      return ReportStatus.Rejected;
    }
    return ReportStatus.Pending;
  };
  useEffect(()=> {
    const newListArticle = articles.filter((article) => {
      const reportsCount = article.reports.length;
      if (selectedLevel.includes('Nghiêm trọng') && reportsCount > 10) {
        return true;
      } else if (selectedLevel.includes('Xem xét') && reportsCount > 5 && reportsCount <= 10) {
        return true;
      } else if (selectedLevel.includes('Bình thường') && reportsCount >= 0 && reportsCount <= 5) {
        return true;
      }
      return false;
    });

    const newListArticle_ = newListArticle.filter((article) => {
      const reportStatus_ = getReportStatus(article.reports);
      if (reportStatus_ === ReportStatus.Rejected && selectedStatus.includes('rejected')) {
        return true;
      } else if (reportStatus_ === ReportStatus.Processed && selectedStatus.includes('processed')) {
        return true;
      } else if (reportStatus_ === ReportStatus.Pending && selectedStatus.includes('pending')) {
        return true;
      }
      return false;
    });
    setListArtilces(newListArticle_);
  }, [selectedLevel, selectedStatus]);
  
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Group</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Level</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Number of reports</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listArticles.map((article) => (
            <TableRow key={article._id}>
              <TableCell>{article._id}</TableCell>
              <TableCell>{article.createdBy}</TableCell>
              <TableCell>{article.groupID}</TableCell>
              <TableCell>
                <Typography color={article.reports.length > 10 ? 'red' : (article.reports.length > 5? 'orange': 'green')}>{article.reports.length > 10 ? 'Nghiêm trọng' : (article.reports.length > 5? 'Xem xét': 'Bình thường')}</Typography>
              </TableCell>
              <TableCell>{article.reports.length}</TableCell>
              <TableCell>
                <Typography color={getReportStatus(article.reports) === ReportStatus.Rejected ? 'red' 
                  : (getReportStatus(article.reports) === ReportStatus.Pending? 'blue': 'green')}
                  > 
                  {getReportStatus(article.reports)}
                </Typography>
              </TableCell>
              <TableCell>
                {/* Sử dụng Box với display: 'flex' để xếp các nút theo chiều ngang */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ marginRight: 1 }}
                    style={{ backgroundColor: '#007BFF', color: 'white' }}
                    onClick={() => onViewDetailArticle(article._id)}
                  >
                    View
                  </Button>
                  {
                    article._destroy === null? (
                      <Button variant="outlined" color="secondary" size="small"
                  sx={{borderColor: 'red'}} onClick={() => {deleteArticle(article._id)}}>
                    Delete
                  </Button>
                    ): (
                      <Typography>Đã xóa</Typography>
                    )
                  }
                  <Button variant="outlined" color="secondary" size="small"
                   sx={{borderColor: 'green'}} onClick={() => completeCheckArticle(article._id)} >
                    Complete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NewsFeedTable;
