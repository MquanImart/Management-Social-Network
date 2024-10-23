/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from '../../../../shared/components/sidebar/Sidebar';
import Header from '../../../../shared/components/header/Header';
import InfoCards from '../../components/InfoCards';
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

interface InfoCardProps {
  title: string;
  value: number;
  bgColor: string;
}

const DashboardPage: React.FC = () => {
  const [infoCards, setInfoCards] = useState<InfoCardProps[]>([]);
  const [barChartData, setBarChartData] = useState<any>(null); // Khởi tạo null để kiểm tra sau
  const [lineChartData, setLineChartData] = useState<any>(null); // Khởi tạo null để kiểm tra sau
  const [pieChartData, setPieChartData] = useState<any>(null); // Khởi tạo null để kiểm tra sau

  // Lấy token từ sessionStorage
  const token = sessionStorage.getItem('token');

  // Fetch dữ liệu từ API khi trang load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        // Fetch tổng quan
        const summaryResponse = await fetch('http://localhost:3000/v1/dashboards/summary', {
          method: 'GET',
          headers,
        });
        const summaryData = await summaryResponse.json();

        setInfoCards([
          { title: 'Tổng người dùng', value: Number(summaryData.totalUsers), bgColor: '#1976d2' },
          { title: 'Tổng nhóm', value: Number(summaryData.totalGroups), bgColor: '#66bb6a' },
          { title: 'Tổng bài viết', value: Number(summaryData.totalArticles), bgColor: '#ffa726' },
          { title: 'Người dùng mới', value: Number(summaryData.newUsers), bgColor: '#ef5350' },
        ]);

        // Fetch số người dùng mới trong tuần
        const newUsersResponse = await fetch('http://localhost:3000/v1/dashboards/new-users-week', {
          method: 'GET',
          headers,
        });
        const newUsersData = await newUsersResponse.json();
        setBarChartData({
          labels: newUsersData.map((d: any) => d.day),
          datasets: [
            {
              label: 'Người dùng mới',
              data: newUsersData.map((d: any) => d.count),
              backgroundColor: '#1976d2',
            },
          ],
        });

        // Fetch tăng trưởng người dùng theo tuần
        const growthResponse = await fetch('http://localhost:3000/v1/dashboards/user-growth', {
          method: 'GET',
          headers,
        });
        const growthData = await growthResponse.json();
        setLineChartData({
          labels: growthData.map((d: any) => d.week),
          datasets: [
            {
              label: 'Sự tăng trưởng người dùng',
              data: growthData.map((d: any) => d.count),
              borderColor: '#1976d2',
              borderWidth: 2,
              fill: false,
            },
          ],
        });

        // Fetch phân phối người dùng theo nhóm
        const groupDistributionResponse = await fetch('http://localhost:3000/v1/dashboards/group-distribution', {
          method: 'GET',
          headers,
        });
        const groupDistributionData = await groupDistributionResponse.json();
        setPieChartData({
          labels: groupDistributionData.map((group: any) => group.name),
          datasets: [
            {
              label: 'Số người trong nhóm',
              data: groupDistributionData.map((group: any) => group.count),
              backgroundColor: ['#1976d2', '#66bb6a', '#ffa726'],
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={3} sx={{ backgroundColor: '#f4f5fa' }}>
        <Sidebar />
      </Grid>
      <Grid item xs={9} sx={{ backgroundColor: '#f8f9fb' }}>
        <Header />
        <Box sx={{ mb: 2 }} />
        <InfoCards cards={infoCards} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* Kiểm tra dữ liệu trước khi render */}
            {barChartData && <BarChart data={barChartData} title="Số người dùng mới trong tuần" />}
          </Grid>
          <Grid item xs={12} md={6}>
            {lineChartData && <LineChart data={lineChartData} title="Tăng trưởng người dùng trong tháng" />}
          </Grid>
          <Grid item xs={12} md={6}>
            {pieChartData && <PieChart data={pieChartData} title="Phân phối người dùng theo nhóm" />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
