import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, Paper } from '@mui/material';
import { FC, useEffect, useState } from 'react';

type Props = {
  value: string;
  onSearch: (value: string) => void;
};

export const SearchBar: FC<Props> = ({ value, onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

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
        onChange={(event): void => {
          setSearchValue(event.target.value);
        }}
        placeholder="Search..."
        renderSuffix={(): JSX.Element => (
          <IconButton
            aria-label="search"
            onClick={(): void => onSearch(searchValue)}
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
