import {
  AppBar,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { FC } from 'react';

import { CharacterList } from './components/CharacterList';
import { useCharactersQuery } from './generated/graphql';
import { filterEmpty } from './helpers/arrays';

const darkTheme = createTheme();

export const App: FC = () => {
  const { data } = useCharactersQuery();

  const characters = filterEmpty(data?.characters?.results || []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography color="inherit" noWrap variant="h6">
            Test
          </Typography>
        </Toolbar>
      </AppBar>
      <CharacterList characters={characters} />
    </ThemeProvider>
  );
};
