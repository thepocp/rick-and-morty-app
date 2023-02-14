import { Grid, Typography } from '@mui/material';
import { FC } from 'react';

type Row = {
  label: string;
  value: string | null | undefined;
};

type Props = {
  rows: Row[];
};

export const InfoGrid: FC<Props> = ({ rows }) => (
  <Grid container>
    {rows.map(({ label, value }, index) => (
      <Grid key={index} container>
        {value ? (
          <>
            <Grid item xs={4}>
              <Typography
                sx={{
                  opacity: 0.8,
                }}
              >
                {label}:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{value}</Typography>
            </Grid>
          </>
        ) : null}
      </Grid>
    ))}
  </Grid>
);
