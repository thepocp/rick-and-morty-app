import {
  CircularProgress,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { FC, useMemo, useState } from 'react';

import { CharacterList } from './components/CharacterList';
import { CharacterPanel } from './components/CharacterPanel';
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
        <Grid
          alignItems="center"
          container
          height="100vh"
          justifyContent="center"
        >
          <CircularProgress />
        </Grid>
      ) : null}
      <CharacterList
        characterLoadingId={characterLoadingId}
        characters={characters}
        showCharacterInfo={showCharacterInfo}
      />
      <CharacterPanel
        character={characterData?.character}
        characterLoading={characterLoading}
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={(): void => setIsDrawerOpen(!isDrawerOpen)}
      />
    </ThemeProvider>
  );
};
