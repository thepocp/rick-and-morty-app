import CloseIcon from '@mui/icons-material/Close';
import { Box, CardMedia, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

import { CharacterQuery } from '../../generated/graphql';

type Props = {
  character: CharacterQuery['character'];
  onClose: () => void;
};

export const CharacterInfo: FC<Props> = ({ character, onClose }) => (
  <div style={{ padding: '1rem', overflow: 'auto' }}>
    <Box alignItems="center" display="flex" marginBottom="1rem">
      <Typography component="h5" flexGrow={1} variant="h5">
        {character?.name}
      </Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>

    <CardMedia
      alt={character?.name || ''}
      component="img"
      image={character?.image || ''}
      sx={{ borderRadius: '4px', marginBottom: '1rem' }}
    />
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
          {character?.episode?.length === 1 ? 'Episode' : 'Episodes'}
        </Typography>
        {character.episode.map(episode => (
          <Typography key={episode?.id}>
            {episode?.episode} {episode?.name}
          </Typography>
        ))}
      </>
    ) : null}
  </div>
);
