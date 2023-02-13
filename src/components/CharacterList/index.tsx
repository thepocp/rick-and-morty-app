import { Container, Grid } from '@mui/material';
import { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Character } from '../../generated/graphql';
import { CharacterCard } from '../CharacterCard';

type Props = {
  characters: Partial<Character>[];
  showCharacterInfo: (id: string) => void;
  fetchData: () => void;
};
export const CharacterList: FC<Props> = ({
  characters,
  showCharacterInfo,
  fetchData,
}) => (
  <InfiniteScroll
    dataLength={characters.length}
    hasMore
    loader={<h4>Loading...</h4>}
    next={fetchData}
  >
    <Container maxWidth="md">
      <Grid container spacing={2}>
        {characters.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
            showCharacterInfo={showCharacterInfo}
          />
        ))}
      </Grid>
    </Container>
  </InfiniteScroll>
);
