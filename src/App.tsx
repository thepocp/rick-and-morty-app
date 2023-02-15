import {
  Box,
  createTheme,
  CssBaseline,
  GlobalStyles,
  Grid,
  Skeleton,
  ThemeProvider,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';

import { CharacterFilters } from './components/CharacterFilters';
import { CharacterList } from './components/CharacterList';
import { CharacterPanel } from './components/CharacterPanel';
import { ListWrapper } from './components/ListWrapper';
import { Pagination } from './components/Pagination';
import { TopBar } from './components/TopBar';
import {
  FilterCharacter,
  useCharacterLazyQuery,
  useCharactesLazyQuery,
} from './generated/graphql';
import { filterEmpty } from './helpers/arrays';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const App: FC = () => {
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

  const applyFilters = (filters: FilterCharacter): void => {
    loadCharacters({
      variables: {
        page: 1,
        filters,
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
      <GlobalStyles
        styles={{
          html: {
            overflow: 'hidden',
          },
          body: {
            overflow: 'hidden',
          },
        }}
      />
      <CssBaseline />
      <Box display="flex" flexDirection="column" gap="1rem" height="100vh">
        <TopBar />
        <CharacterFilters
          filters={charactersVariables?.filters || {}}
          onChange={applyFilters}
        />
        <ListWrapper>
          {charactersLoading ? (
            <Grid container spacing={2}>
              {new Array(20).fill(0).map((_, index) => (
                <Grid key={index} item lg={3} md={4} sm={6} xs={6}>
                  <Skeleton height="320px" variant="rectangular" />
                </Grid>
              ))}
            </Grid>
          ) : null}
          <CharacterList
            characters={characters}
            showCharacterInfo={showCharacterInfo}
          />
        </ListWrapper>
        <Pagination
          canNextPage={charactersData?.characters?.info?.next !== null}
          canPrevPage={charactersVariables?.page !== 1}
          fetchNextData={fetchNextData}
          fetchPrevData={fetchPrevData}
        />
      </Box>
      <CharacterPanel
        character={characterData?.character}
        characterLoading={characterLoading}
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={(): void => setIsDrawerOpen(!isDrawerOpen)}
      />
    </ThemeProvider>
  );
};
