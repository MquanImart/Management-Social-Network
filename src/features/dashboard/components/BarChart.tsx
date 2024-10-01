import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';

interface BarChartProps {
  data: any;
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  return (
    <Paper sx={{ padding: 3, borderRadius: 2 }}>
      <Typography variant="h6" mb={2} fontWeight="bold" color="textSecondary">
        {title}
      </Typography>
      <Bar data={data} />
    </Paper>
  );
};

export default BarChart;
