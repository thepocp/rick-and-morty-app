import { useCallback } from 'react';
import useWouterLocation from 'wouter/use-location';

import { FilterCharacter } from '../generated/graphql';

type Params = {
  page?: number | null | undefined;
  filters?: FilterCharacter | null | undefined;
  characterId?: string | null | undefined;
};

type Result = {
  setQueryParams: (params: Params) => void;
};

export const useLocation = (): Result => {
  const [, setLocationFn] = useWouterLocation();

  const setQueryParams = useCallback(
    ({ page, filters, characterId }: Params): void => {
      let query = `/?page=${page || 1}`;

      if (Object.keys(filters || {}).length !== 0) {
        query += `&filters=${JSON.stringify(filters)}`;
      }

      if (characterId) {
        query += `&characterId=${characterId}`;
      }

      setLocationFn(query);
    },
    [setLocationFn]
  );

  return {
    setQueryParams,
  };
};
