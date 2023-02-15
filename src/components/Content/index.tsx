import { FC } from 'react';

import {
  Character,
  CharactesQueryVariables,
  FilterCharacter,
} from '../../generated/graphql';
import { CharacterFilters } from '../CharacterFilters';
import { CharacterList } from '../CharacterList';
import { ListLoadingGrid } from '../ListLoadingGrid';
import { ListWrapper } from '../ListWrapper';
import { Pagination } from '../Pagination';

type Props = {
  characters: Partial<Character>[];
  fetchNextData: () => void;
  fetchPrevData: () => void;
  applyFilters: (filters: FilterCharacter) => void;
  charactersLoading: boolean;
  canNextPage: boolean;
  canPrevPage: boolean;
  charactersVariables: CharactesQueryVariables | undefined;
  showCharacterInfo: (id: string) => void;
};

export const Content: FC<Props> = ({
  characters,
  charactersLoading,
  charactersVariables,
  fetchNextData,
  fetchPrevData,
  canPrevPage,
  canNextPage,
  applyFilters,
  showCharacterInfo,
}) => (
  <>
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
        canNextPage={canNextPage}
        canPrevPage={canPrevPage}
        fetchNextData={fetchNextData}
        fetchPrevData={fetchPrevData}
      />
    </ListWrapper>
  </>
);
