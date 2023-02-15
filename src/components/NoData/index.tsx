import { Box } from '@mui/material';
import { FC } from 'react';

export const NoData: FC = () => (
  <Box alignItems="center" display="flex" justifyContent="center" width="100%">
    <img
      alt="No data"
      src="/no_data.webp"
      style={{
        width: '80%',
      }}
    />
  </Box>
);
