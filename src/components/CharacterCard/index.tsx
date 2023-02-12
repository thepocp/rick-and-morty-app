import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { FC } from 'react';

import { Character } from '../../generated/graphql';

type Props = {
  character: Partial<Character>;
  showCharacterInfo: (id: string) => void;
  loading: boolean;
};

export const CharacterCard: FC<Props> = ({
  character,
  showCharacterInfo,
  loading,
}) => (
  <Grid item lg={3} md={4} sm={6} xs={6}>
    <Card
      onClick={(): void => showCharacterInfo(character.id || '')}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia alt="random" component="img" image={character.image || ''} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography>{character.name}</Typography>
      </CardContent>
      <CardActions>
        <Button
          disabled={loading}
          onClick={(): void => showCharacterInfo(character.id || '')}
          size="small"
        >
          {loading ? 'Loading...' : 'View Details'}
        </Button>
      </CardActions>
    </Card>
  </Grid>
);
