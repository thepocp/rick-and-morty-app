import { useCallback, useEffect, useMemo } from 'react';

import {
  Character,
  CharactesQueryVariables,
  FilterCharacter,
  useCharactesLazyQuery,
} from '../generated/graphql';
import { filterEmpty } from '../helpers/arrays';
import { useLocation } from './useLocation';

type Result = {
  characters: Partial<Character>[];
  fetchNextData: () => void;
  fetchPrevData: () => void;
  applyFilters: (filters: FilterCharacter) => void;
  charactersLoading: boolean;
  canNextPage: boolean;
  canPrevPage: boolean;
  charactersVariables: CharactesQueryVariables | undefined;
};

export const useCharacters = (): Result => {
  const { setQueryParams } = useLocation();
  const [
    loadCharacters,
    {
      data: charactersData,
      loading: charactersLoading,
      variables: charactersVariables,
    },
  ] = useCharactesLazyQuery();

  const fetchPrevData = useCallback((): void => {
    const variables = {
      page: (charactersVariables?.page || 0) - 1,
      filters: charactersVariables?.filters,
    };

    setQueryParams(variables);
    loadCharacters({ variables });
  }, [charactersVariables, loadCharacters, setQueryParams]);

  const fetchNextData = useCallback((): void => {
    const variables = {
      page: (charactersVariables?.page || 0) + 1,
      filters: charactersVariables?.filters,
    };
    setQueryParams(variables);
    loadCharacters({ variables });
  }, [charactersVariables, loadCharacters, setQueryParams]);

  const applyFilters = useCallback(
    (filters: FilterCharacter): void => {
      const variables = { page: 1, filters };
      setQueryParams(variables);
      loadCharacters({ variables });
    },
    [loadCharacters, setQueryParams]
  );

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

    loadCharacters({
      variables: {
        page: getPage(),
        filters: getFilters(),
      },
    });
  }, [loadCharacters]);

  const characters = useMemo(
    () => filterEmpty(charactersData?.characters?.results || []) || [],
    [charactersData?.characters?.results]
  );

  return {
    characters,
    fetchNextData,
    fetchPrevData,
    applyFilters,
    charactersLoading,
    canNextPage: charactersData?.characters?.info?.next !== null,
    canPrevPage: charactersVariables?.page !== 1,
    charactersVariables,
  };
};
