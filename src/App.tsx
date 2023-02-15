import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import { CharacterFilters } from './components/CharacterFilters';
import { CharacterList } from './components/CharacterList';
import { CharacterPanel } from './components/CharacterPanel';
import { ListLoadingGrid } from './components/ListLoadingGrid';
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
      <CssBaseline />
      <TopBar />
      <ListWrapper>
        <CharacterFilters
          filters={charactersVariables?.filters || {}}
          onChange={applyFilters}
        />
        {charactersLoading ? (
          <ListLoadingGrid />
        ) : (
          <CharacterList
            characters={characters}
            showCharacterInfo={showCharacterInfo}
          />
        )}
        <Pagination
          canNextPage={charactersData?.characters?.info?.next !== null}
          canPrevPage={charactersVariables?.page !== 1}
          fetchNextData={fetchNextData}
          fetchPrevData={fetchPrevData}
        />
      </ListWrapper>
      <CharacterPanel
        character={characterData?.character}
        characterLoading={characterLoading}
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={(): void => setIsDrawerOpen(!isDrawerOpen)}
      />
    </ThemeProvider>
  );
};
