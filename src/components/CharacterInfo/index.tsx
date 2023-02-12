import { Card, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';

import { CharacterQuery } from '../../generated/graphql';

type Props = {
  character: CharacterQuery['character'];
};

export const CharacterInfo: FC<Props> = ({ character }) => (
  <Card sx={{ padding: '1rem', overflow: 'auto' }}>
    <CardMedia
      alt={character?.name || ''}
      component="img"
      image={character?.image || ''}
      sx={{ borderRadius: '4px', marginBottom: '1rem' }}
    />
    {character?.name ? (
      <Typography component="h5" sx={{ marginBottom: '1rem' }} variant="h5">
        {character.name}
      </Typography>
    ) : null}
    {character?.gender ? (
      <Typography>Gender: {character.gender}</Typography>
    ) : null}
    {character?.status ? (
      <Typography>Status: {character.status}</Typography>
    ) : null}
    {character?.species ? (
      <Typography>Species: {character.species}</Typography>
    ) : null}
    {character?.type ? <Typography>Type: {character.type}</Typography> : null}
    {character?.origin?.name ? (
      <Typography>Origin: {character.origin.name}</Typography>
    ) : null}
    {character?.location?.name ? (
      <Typography>Location: {character.location.name}</Typography>
    ) : null}
    {character?.episode?.length ? (
      <>
        <Typography>Episode count: {character.episode.length}</Typography>
        <Typography component="h6" sx={{ marginTop: '1rem' }} variant="h6">
          Episodes
        </Typography>
        {character.episode.map(episode => (
          <Typography key={episode?.id}>
            {episode?.episode} {episode?.name}
          </Typography>
        ))}
      </>
    ) : null}
  </Card>
);
