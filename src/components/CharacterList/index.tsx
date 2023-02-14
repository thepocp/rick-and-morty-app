import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box, Button, Grid } from '@mui/material';
import { FC } from 'react';

import { Character } from '../../generated/graphql';
import { CharacterCard } from '../CharacterCard';

type Props = {
  characters: Partial<Character>[];
  showCharacterInfo: (id: string) => void;
  fetchPrevData: () => void;
  fetchNextData: () => void;
  canPrevPage: boolean;
  canNextPage: boolean;
};
export const CharacterList: FC<Props> = ({
  characters,
  showCharacterInfo,
  fetchPrevData,
  fetchNextData,
  canPrevPage,
  canNextPage,
}) => (
  <>
    <Grid container spacing={2}>
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          character={character}
          showCharacterInfo={showCharacterInfo}
        />
      ))}
    </Grid>
    <Box display="flex" justifyContent="center" margin="1rem">
      <Button disabled={!canPrevPage} onClick={fetchPrevData} size="large">
        <ArrowLeftIcon sx={{ transform: 'scale(1.5)' }} />
      </Button>
      <Button disabled={!canNextPage} onClick={fetchNextData} size="large">
        <ArrowRightIcon sx={{ transform: 'scale(1.5)' }} />
      </Button>
    </Box>
  </>
);
