import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  filterValues: string[];
  label: string;
};

export const Filter: FC<Props> = ({ value, onChange, filterValues, label }) => (
  <Grid item lg={1} md={2} sm={3} xs={3}>
    <FormControl fullWidth variant="standard">
      <InputLabel id={`${label}-filter`}>{label}</InputLabel>
      <Select
        defaultValue="all"
        label={label}
        labelId={`${label}-filter`}
        onChange={(event): void => onChange(event.target.value)}
        value={value}
      >
        <MenuItem value="all">All</MenuItem>
        {filterValues.map(item => (
          <MenuItem key={item} value={item}>
            {item === 'unknown' ? 'Unknown' : item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
);
