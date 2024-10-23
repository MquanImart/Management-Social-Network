/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';

interface LineChartProps {
  data: any;
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  return (
    <Paper sx={{ padding: 3, borderRadius: 2 }}>
      <Typography variant="h6" mb={2} fontWeight="bold" color="textSecondary">
        {title}
      </Typography>
      <Line data={data} />
    </Paper>
  );
};

export default LineChart;
