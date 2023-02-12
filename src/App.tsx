import {
  CircularProgress,
  createTheme,
  CssBaseline,
  Grid,
  SwipeableDrawer,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { FC, useMemo, useState } from 'react';

import { CharacterInfo } from './components/CharacterInfo';
import { CharacterList } from './components/CharacterList';
import { TopBar } from './components/TopBar';
import { useCharacterLazyQuery, useCharactersQuery } from './generated/graphql';
import { filterEmpty } from './helpers/arrays';

export const App: FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: charactersData, loading: charactersLoading } =
    useCharactersQuery();

  const [
    loadCharacterInfo,
    {
      data: characterData,
      variables: characterVariables,
      loading: characterLoading,
    },
  ] = useCharacterLazyQuery();

  const characters = filterEmpty(charactersData?.characters?.results || []);

  const characterLoadingId = characterLoading
    ? characterVariables?.id
    : undefined;

  const showCharacterInfo = (id: string): void => {
    loadCharacterInfo({ variables: { id } });
    setIsDrawerOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
      {charactersLoading ? (
        <Grid container justifyContent="center" margin="100px" width="100%">
          <CircularProgress />
        </Grid>
      ) : null}
      <CharacterList
        characterLoadingId={characterLoadingId}
        characters={characters}
        showCharacterInfo={showCharacterInfo}
      />
      <SwipeableDrawer
        anchor={isSm ? 'right' : 'bottom'}
        onClose={(): void => {
          setIsDrawerOpen(false);
        }}
        onOpen={(): void => {
          setIsDrawerOpen(true);
        }}
        open={isDrawerOpen}
        PaperProps={{
          sx: {
            width: isSm ? '500px' : 'auto',
            height: isSm ? '100vh' : '70vh',
          },
        }}
      >
        {characterLoading ? (
          <CircularProgress />
        ) : (
          <CharacterInfo character={characterData?.character} />
        )}
      </SwipeableDrawer>
    </ThemeProvider>
  );
};
