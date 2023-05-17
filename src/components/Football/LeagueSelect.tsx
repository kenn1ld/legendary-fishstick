import React, { memo, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface LeagueSelectProps {
  leagues: { id: number; name: string }[];
  selectedLeague: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const LeagueSelect: React.FC<LeagueSelectProps> = memo(({ leagues, selectedLeague, onChange }) => {
  const handleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      onChange(event);
    },
    [onChange]
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="league-label">Select a league</InputLabel>
      <Select
        id="league"
        labelId="league-label"
        value={selectedLeague}
        onChange={handleChange}
        label="Select a league"
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
            },
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        }}
      >
        {leagues.map((league) => (
          <MenuItem key={league.id} value={league.id}>
            {league.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
LeagueSelect.displayName = 'LeagueSelect';
export default LeagueSelect;