import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import useLocation from 'wouter/use-location';

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
  const [, setLocation] = useLocation();
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
    setLocation(
      `/?page=${charactersVariables?.page}&filters=${JSON.stringify(
        charactersVariables?.filters
      )}&character=${id}`
    );
    setIsDrawerOpen(true);
  };

  const fetchPrevData = (): void => {
    const variables = {
      page: (charactersVariables?.page || 0) - 1,
      filters: charactersVariables?.filters,
    };
    setLocation(
      `/?page=${variables.page}&filters=${JSON.stringify(variables.filters)}`
    );
    loadCharacters({ variables });
  };

  const fetchNextData = (): void => {
    const variables = {
      page: (charactersVariables?.page || 0) + 1,
      filters: charactersVariables?.filters,
    };
    setLocation(
      `/?page=${variables.page}&filters=${JSON.stringify(variables.filters)}`
    );
    loadCharacters({ variables });
  };

  const applyFilters = (filters: FilterCharacter): void => {
    const variables = { page: 1, filters };
    setLocation(`/?page=${variables.page}&filters=${JSON.stringify(filters)}`);
    loadCharacters({ variables });
  };

  const toggleDrawer = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
    const base = `/?page=${charactersVariables?.page}&filters=${JSON.stringify(
      charactersVariables?.filters
    )}`;
    setLocation(
      isDrawerOpen ? base : `${base}&character=${characterData?.character?.id}`
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const getPage = (): number => {
      const page = params.get('page');
      if (page) {
        return parseInt(page, 10);
      }

      return 1;
    };

    const getFilters = (): FilterCharacter => {
      const filters = params.get('filters');

      if (!filters) {
        return {};
      }

      try {
        return JSON.parse(filters);
      } catch (e) {
        return {};
      }
    };

    if (params.get('character')) {
      setIsDrawerOpen(true);
      loadCharacterInfo({ variables: { id: params.get('character') || '' } });
    }

    loadCharacters({
      variables: {
        page: getPage(),
        filters: getFilters(),
      },
    });
  }, [loadCharacterInfo, loadCharacters]);

  const characters = filterEmpty(charactersData?.characters?.results || []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar />
      <CharacterFilters
        filters={charactersVariables?.filters || {}}
        onChange={applyFilters}
      />
      <ListWrapper>
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
        toggleDrawer={toggleDrawer}
      />
    </ThemeProvider>
  );
};
