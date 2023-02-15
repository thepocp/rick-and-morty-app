import { Grid } from '@mui/material';
import { FC } from 'react';

import { Character } from '../../generated/graphql';
import { CharacterCard } from '../CharacterCard';

type Props = {
  characters: Partial<Character>[];
  showCharacterInfo: (id: string) => void;
};
export const CharacterList: FC<Props> = ({ characters, showCharacterInfo }) => (
  <Grid container spacing={2}>
    {characters.map(character => (
      <CharacterCard
        key={character.id}
        character={character}
        showCharacterInfo={showCharacterInfo}
      />
    ))}
  </Grid>
);
