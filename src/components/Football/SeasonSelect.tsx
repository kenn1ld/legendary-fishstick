import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface SeasonSelectProps {
  availableSeasonYears: string[];
  selectedSeason: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const SeasonSelect: React.FC<SeasonSelectProps> = ({ availableSeasonYears, selectedSeason, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="season-label">Select a season</InputLabel>
      <Select id="season" labelId="season-label" value={selectedSeason} onChange={onChange} label="Select a season">
        {availableSeasonYears.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SeasonSelect;