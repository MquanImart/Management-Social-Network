import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  data: any;
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  return (
    <Paper sx={{ padding: 3, borderRadius: 2 }}>
      <Typography variant="h6" mb={2} fontWeight="bold" color="textSecondary">
        {title}
      </Typography>
      <Pie data={data} />
    </Paper>
  );
};

export default PieChart;
