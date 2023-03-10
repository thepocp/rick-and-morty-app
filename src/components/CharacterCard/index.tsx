import {
  Card,
  CardActionArea,
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
};

export const CharacterCard: FC<Props> = ({ character, showCharacterInfo }) => (
  <Grid height="320px" item lg={3} md={4} sm={6} xs={6}>
    <Card
      onClick={(): void => showCharacterInfo(character.id || '')}
      sx={{
        height: '100%',
        '&:hover': {
          transform: 'scale(1.1)',
          transition: 'transform 0.3s',
        },
      }}
    >
      <CardActionArea
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          alt={character.name || ''}
          component="img"
          image={character.image || ''}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography>{character.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);
