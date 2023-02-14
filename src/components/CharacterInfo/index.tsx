import CloseIcon from '@mui/icons-material/Close';
import { Box, CardMedia, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

import { CharacterQuery } from '../../generated/graphql';
import { InfoGrid } from '../InfoGrid';

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
    <InfoGrid
      rows={[
        { label: 'Gender', value: character?.gender },
        { label: 'Status', value: character?.status },
        { label: 'Species', value: character?.species },
        { label: 'Type', value: character?.type },
        { label: 'Origin', value: character?.origin?.name },
        { label: 'Location', value: character?.location?.name },
        {
          label: 'Episode count',
          value: character?.episode?.length?.toString(),
        },
      ]}
    />

    {character?.episode?.length ? (
      <>
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
