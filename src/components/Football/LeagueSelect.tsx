import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface LeagueSelectProps {
  leagues: { id: number; name: string }[];
  selectedLeague: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const LeagueSelect: React.FC<LeagueSelectProps> = ({ leagues, selectedLeague, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="league-label">Select a league</InputLabel>
      <Select id="league" labelId="league-label" value={selectedLeague} onChange={onChange} label="Select a league">
        {leagues.map((league) => (
          <MenuItem key={league.id} value={league.id}>
            {league.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LeagueSelect;