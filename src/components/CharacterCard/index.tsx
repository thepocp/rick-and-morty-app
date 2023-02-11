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
};

export const CharacterCard: FC<Props> = ({ character }) => (
  <Grid item lg={3} md={4} sm={6} xs={12}>
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia alt="random" component="img" image={character.image || ''} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography component="h2" gutterBottom variant="h5">
          {character.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  </Grid>
);
