import { Container, Grid } from '@mui/material';
import { FC } from 'react';

import { Character } from '../../generated/graphql';
import { CharacterCard } from '../CharacterCard';

type Props = {
  characters: Partial<Character>[];
};
export const CharacterList: FC<Props> = ({ characters }) => (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <Grid container spacing={2}>
      {characters.map(character => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </Grid>
  </Container>
);
