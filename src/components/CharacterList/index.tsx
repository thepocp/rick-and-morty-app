import { Container, Grid } from '@mui/material';
import { FC } from 'react';

import { Character } from '../../generated/graphql';
import { CharacterCard } from '../CharacterCard';

type Props = {
  characters: Partial<Character>[];
  showCharacterInfo: (id: string) => void;
  characterLoadingId: string | undefined;
};
export const CharacterList: FC<Props> = ({
  characters,
  showCharacterInfo,
  characterLoadingId,
}) => (
  <Container maxWidth="md">
    <Grid container spacing={2}>
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          character={character}
          loading={characterLoadingId === character.id}
          showCharacterInfo={showCharacterInfo}
        />
      ))}
    </Grid>
  </Container>
);
