import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box, Button } from '@mui/material';
import { FC } from 'react';

type Props = {
  fetchPrevData: () => void;
  fetchNextData: () => void;
  canPrevPage: boolean;
  canNextPage: boolean;
};
export const Pagination: FC<Props> = ({
  fetchPrevData,
  fetchNextData,
  canPrevPage,
  canNextPage,
}) => (
  <Box display="flex" justifyContent="center">
    <Button disabled={!canPrevPage} onClick={fetchPrevData} size="large">
      <ArrowLeftIcon sx={{ transform: 'scale(1.5)' }} />
    </Button>
    <Button disabled={!canNextPage} onClick={fetchNextData} size="large">
      <ArrowRightIcon sx={{ transform: 'scale(1.5)' }} />
    </Button>
  </Box>
);
