import { Box } from '@mui/material';
import { FC } from 'react';

import { FilterCharacter } from '../../generated/graphql';
import { genders, specieses, statuses, types } from './constants';
import { Filter } from './Filter';

type Props = {
  filters: FilterCharacter;
  onChange: (filters: FilterCharacter) => void;
};

export const CharacterFilters: FC<Props> = ({ filters, onChange }) => {
  const applyFilters = (name: keyof FilterCharacter, value: string): void => {
    const newFilters = {
      ...filters,
      [name]: value,
    };

    if (value === 'all') {
      delete newFilters[name];
    }

    onChange(newFilters);
  };

  return (
    <Box display="flex" justifyContent="center">
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
    </Box>
  );
};
