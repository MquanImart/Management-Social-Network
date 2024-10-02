import React from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from '../../../../shared/components/sidebar/Sidebar';
import Header from '../../../../shared/components/header/Header';
import InfoCards from '../../components/InfoCards';
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const DashboardPage: React.FC = () => {
  const barChartData = {
    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
    datasets: [
      {
        label: 'Người dùng mới',
        data: [5, 10, 15, 20, 25, 30, 35],
        backgroundColor: '#1976d2',
      },
    ],
  };

  const lineChartData = {
    labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
    datasets: [
      {
        label: 'Sự tăng trưởng ngừoi dùng',
        data: [50, 100, 200, 300],
        borderColor: '#1976d2',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const pieChartData = {
    labels: ['Nhóm A', 'Nhóm B', 'Nhóm C'],
    datasets: [
      {
        label: 'Số người trong nhóm',
        data: [200, 150, 100],
        backgroundColor: ['#1976d2', '#66bb6a', '#ffa726'],
      },
    ],
  };

  const infoCards = [
    { title: 'Tổng người dùng', value: 1200, bgColor: '#1976d2' },
    { title: 'Tổng nhóm', value: 150, bgColor: '#66bb6a' },
    { title: 'Tổng bài viết', value: 500, bgColor: '#ffa726' },
    { title: 'Người dùng mới', value: 120, bgColor: '#ef5350' },
  ];

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Sidebar sẽ chiếm 25% chiều rộng */}
      <Grid item xs={3} sx={{ backgroundColor: '#f4f5fa' }}>
        <Sidebar />
      </Grid>
      
      {/* Nội dung chính chiếm 75% chiều rộng */}
      <Grid item xs={9} sx={{ backgroundColor: '#f8f9fb' }}>
        <Header />
        <Box sx={{mb: 2}}/>
        <InfoCards cards={infoCards} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <BarChart data={barChartData} title="Số người dùng mới trong tuần" />
          </Grid>
          <Grid item xs={12} md={6}>
            <LineChart data={lineChartData} title="Tăng trưởng người dùng trong tháng" />
          </Grid>
          <Grid item xs={12} md={6}>
            <PieChart data={pieChartData} title="Phân phối người dùng theo nhóm" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
