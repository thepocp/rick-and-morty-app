import { FilterCharacter } from '../generated/graphql';

type Result = {
  applyFilters: (name: keyof FilterCharacter, value: string) => void;
};

export const useFilters = (
  filters: FilterCharacter,
  onChange: (filters: FilterCharacter) => void
): Result => {
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

  return {
    applyFilters,
  };
};
