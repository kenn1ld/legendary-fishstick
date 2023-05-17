// useSelectedData.ts
import { useState, useCallback } from 'react';
import { SelectChangeEvent } from '@mui/material';

export const useSelectedData = () => {
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');

  const handleLeagueChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedLeague(event.target.value);
  }, []);

  const handleSeasonChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedSeason(event.target.value);
  }, []);

  return { selectedLeague, selectedSeason, handleLeagueChange, handleSeasonChange };
};