import { useCallback, useEffect, useState } from 'react';

import {
  CharacterQuery,
  CharactesQueryVariables,
  useCharacterLazyQuery,
} from '../generated/graphql';
import { useLocation } from './useLocation';

type Result = {
  isCharacterInfoOpen: boolean;
  showCharacterInfo: (id: string) => void;
  toggleInfo: () => void;
  characterLoading: boolean;
  character: CharacterQuery['character'];
};

export const useCharacter = (
  charactersVariables: CharactesQueryVariables | undefined
): Result => {
  const { setQueryParams } = useLocation();

  const [isCharacterInfoOpen, setIsCharacterInfoOpen] = useState(false);

  const [
    loadCharacterInfo,
    { data: characterData, loading: characterLoading },
  ] = useCharacterLazyQuery();

  const showCharacterInfo = useCallback(
    (id: string): void => {
      loadCharacterInfo({ variables: { id } });
      setQueryParams({ ...charactersVariables, characterId: id });
      setIsCharacterInfoOpen(true);
    },
    [charactersVariables, loadCharacterInfo, setQueryParams]
  );

  const toggleInfo = useCallback((): void => {
    setIsCharacterInfoOpen(!isCharacterInfoOpen);

    setQueryParams({
      ...charactersVariables,
      characterId: isCharacterInfoOpen
        ? undefined
        : characterData?.character?.id,
    });
  }, [
    isCharacterInfoOpen,
    setQueryParams,
    charactersVariables,
    characterData?.character?.id,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const characterId = params.get('characterId');

    if (characterId) {
      showCharacterInfo(characterId);
    }
  }, [showCharacterInfo]);

  return {
    isCharacterInfoOpen,
    showCharacterInfo,
    toggleInfo,
    characterLoading,
    character: characterData?.character,
  };
};
