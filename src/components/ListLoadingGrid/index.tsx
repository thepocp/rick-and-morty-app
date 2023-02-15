import { Grid, Skeleton } from '@mui/material';
import { FC } from 'react';

export const ListLoadingGrid: FC = () => (
  <Grid container spacing={2}>
    {new Array(20).fill(0).map((_, index) => (
      <Grid key={index} height="320px" item lg={3} md={4} sm={6} xs={6}>
        <Skeleton height="100%" variant="rectangular" />
      </Grid>
    ))}
  </Grid>
);
