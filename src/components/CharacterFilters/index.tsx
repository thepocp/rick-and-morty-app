import { Box, Grid } from '@mui/material';
import { FC } from 'react';

import { FilterCharacter } from '../../generated/graphql';
import { SearchBar } from '../SearchBar';
import { genders, specieses, statuses, types } from './constants';
import { Filter } from './Filter';
import { useFilters } from './hooks/useFilters';

type Props = {
  filters: FilterCharacter;
  onChange: (filters: FilterCharacter) => void;
};

export const CharacterFilters: FC<Props> = ({ filters, onChange }) => {
  const { applyFilters } = useFilters(filters, onChange);

  return (
    <Box marginBottom="1rem">
      <Grid alignItems="center" container justifyContent="center" spacing={2}>
        <Filter
          filterValues={types}
          label="Type"
          onChange={(value): void => applyFilters('type', value)}
          value={filters.type || 'all'}
        />
        <Filter
          filterValues={specieses}
          label="Species"
          onChange={(value): void => applyFilters('species', value)}
          value={filters.species || 'all'}
        />
        <Filter
          filterValues={genders}
          label="Gender"
          onChange={(value): void => applyFilters('gender', value)}
          value={filters.gender || 'all'}
        />
        <Filter
          filterValues={statuses}
          label="Status"
          onChange={(value): void => applyFilters('status', value)}
          value={filters.status || 'all'}
        />
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <SearchBar
            onSearch={(value): void => applyFilters('name', value)}
            value={filters.name || ''}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
