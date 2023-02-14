import {
  CircularProgress,
  Grid,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC } from 'react';

import { CharacterQuery } from '../../generated/graphql';
import { CharacterInfo } from '../CharacterInfo';

type Props = {
  characterLoading: boolean;
  character: CharacterQuery['character'];
  toggleDrawer: () => void;
  isDrawerOpen: boolean;
};

export const CharacterPanel: FC<Props> = ({
  characterLoading,
  character,
  toggleDrawer,
  isDrawerOpen,
}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <SwipeableDrawer
      anchor={isSm ? 'right' : 'bottom'}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
      open={isDrawerOpen}
      PaperProps={{
        sx: {
          width: isSm ? '500px' : 'auto',
          height: isSm ? '100vh' : '70vh',
        },
      }}
    >
      {characterLoading ? (
        <Grid
          alignItems="center"
          container
          height="100%"
          justifyContent="center"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <CharacterInfo character={character} onClose={toggleDrawer} />
      )}
    </SwipeableDrawer>
  );
};
