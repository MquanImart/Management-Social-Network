import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

interface InfoCardProps {
  title: string;
  value: number;
  bgColor: string;
}

interface InfoCardsProps {
  cards: InfoCardProps[];
}

const InfoCards: React.FC<InfoCardsProps> = ({ cards }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {cards.map((card, index) => (
        <Grid item xs={12} md={3} key={index}>
          <Paper sx={{ padding: 2, borderLeft: `6px solid ${card.bgColor}`, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="textSecondary">
              {card.title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" color={card.bgColor}>
              {card.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default InfoCards;
