// FootballComponent.tsx
import React from 'react';
import { SelectChangeEvent, Button, Typography, Box, Paper } from '@mui/material';

import LeagueSelect from './LeagueSelect';
import PlayerList from './PlayerList';
import SeasonSelect from './SeasonSelect';

import { useFootballData } from '../../hooks/useFootballData';
import { useSelectedData } from '../../hooks/useSelectedData';

const availableSeasonYears = [
  '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007',
  '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015',
  '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'
];

const FootballComponent: React.FC = () => {
  const { leagues, topScorers, error, fetchTopScorers } = useFootballData();
  const { selectedLeague, selectedSeason, handleLeagueChange, handleSeasonChange } = useSelectedData();

  const handleClick = async () => {
    if (selectedLeague && selectedSeason) {
      await fetchTopScorers(selectedSeason, selectedLeague);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3,
      mt: 3,
      p: 3,
      bgcolor: 'background.paper',
      borderRadius: 2,
    }}>
      <Paper elevation={3} sx={{ p: 2, width: '100%', maxWidth: 500 }}>
        <LeagueSelect leagues={leagues} selectedLeague={selectedLeague} onChange={handleLeagueChange} />
        <SeasonSelect availableSeasonYears={availableSeasonYears} selectedSeason={selectedSeason} onChange={handleSeasonChange} />
      </Paper>
      <Button 
        variant="contained" 
        onClick={handleClick}
        sx={{
          backgroundColor: 'secondary.main',
          '&:hover': {
            backgroundColor: 'secondary.dark',
          }
        }}>
        Get Top Scorers
      </Button>
      <Typography 
        variant="h4" 
        component="h3" 
        gutterBottom
        sx={{
          color: 'primary.main',
          mt: 3,
          mb: 2,
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: 1,
          fontWeight: 'bold',
        }}>
        {error || 'Top Scorers:'}
      </Typography>
      <PlayerList players={topScorers} />
    </Box>
  );
};

export default FootballComponent;
