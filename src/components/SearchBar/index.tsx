import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, Paper } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';

type Props = {
  value: string;
  onSearch: (value: string) => void;
};

export const SearchBar: FC<Props> = ({ value, onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleSearch = useCallback((): void => {
    onSearch(searchValue);
  }, [onSearch, searchValue]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent): void => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchValue(event.target.value);
    },
    []
  );

  return (
    <Paper
      sx={{
        padding: '0 4px',
      }}
    >
      <InputBase
        color="success"
        fullWidth
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        renderSuffix={(): JSX.Element => (
          <IconButton
            aria-label="search"
            onClick={handleSearch}
            sx={{ p: '10px' }}
            type="button"
          >
            <SearchIcon />
          </IconButton>
        )}
        value={searchValue}
      />
    </Paper>
  );
};
