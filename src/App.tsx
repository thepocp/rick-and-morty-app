import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Skeleton,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';

import { CharacterList } from './components/CharacterList';
import { CharacterPanel } from './components/CharacterPanel';
import { TopBar } from './components/TopBar';
import {
  useCharacterLazyQuery,
  useCharactesLazyQuery,
} from './generated/graphql';
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
  const [
    loadCharacters,
    {
      data: charactersData,
      loading: charactersLoading,
      variables: charactersVariables,
    },
  ] = useCharactesLazyQuery();

  const [
    loadCharacterInfo,
    { data: characterData, loading: characterLoading },
  ] = useCharacterLazyQuery();

  const showCharacterInfo = (id: string): void => {
    loadCharacterInfo({ variables: { id } });
    setIsDrawerOpen(true);
  };

  const fetchPrevData = (): void => {
    loadCharacters({
      variables: {
        page: (charactersVariables?.page || 0) - 1,
      },
    });
  };

  const fetchNextData = (): void => {
    loadCharacters({
      variables: {
        page: (charactersVariables?.page || 0) + 1,
      },
    });
  };

  useEffect(() => {
    loadCharacters({
      variables: {
        page: 1,
      },
    });
  }, [loadCharacters]);

  const characters = filterEmpty(charactersData?.characters?.results || []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
      {charactersLoading ? (
        <Container maxWidth="md">
          <Grid container spacing={2}>
            {new Array(20).fill(0).map((_, index) => (
              <Grid key={index} item lg={3} md={4} sm={6} xs={6}>
                <Skeleton height="320px" variant="rectangular" />
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : null}
      <CharacterList
        canNextPage={charactersData?.characters?.info?.next !== null}
        canPrevPage={charactersVariables?.page !== 1}
        characters={characters}
        fetchNextData={fetchNextData}
        fetchPrevData={fetchPrevData}
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
