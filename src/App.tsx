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
  Character,
  useCharacterLazyQuery,
  useCharactesLazyQuery,
} from './generated/graphql';
import { filterEmpty } from './helpers/arrays';

export const App: FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const [characters, setCharacters] = useState<Partial<Character>[]>([]);

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

  useEffect(() => {
    setCharacters(oldValue =>
      filterEmpty([...oldValue, ...(charactersData?.characters?.results || [])])
    );
  }, [charactersData]);

  const showCharacterInfo = (id: string): void => {
    loadCharacterInfo({ variables: { id } });
    setIsDrawerOpen(true);
  };

  const fetchData = (): void => {
    loadCharacters({
      variables: {
        page: (charactersVariables?.page || 0) + 1,
      },
    });
  };

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
        characters={characters}
        fetchData={fetchData}
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
