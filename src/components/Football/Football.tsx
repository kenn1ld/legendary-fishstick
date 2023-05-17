import React, { useState, useEffect, useCallback } from 'react';

import { SelectChangeEvent, Button, Typography } from '@mui/material';

import { getLeagues, getTopScorers } from './FootballApi';
import LeagueSelect from './LeagueSelect';
import PlayerList from './PlayerList';
import SeasonSelect from './SeasonSelect';
import { Player } from './Player';
interface League {
  id: number;
  name: string;
}

const availableSeasonYears = [
  '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007',
  '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015',
  '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'
];

const FootballComponent: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [topScorers, setTopScorers] = useState<Player[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchLeagues = async () => {
      const leaguesData = await getLeagues();
      if (leaguesData && leaguesData.api) {
        const extractedLeagues = leaguesData.api.response.map((leagueObj: { league: League }) => leagueObj.league);
        setLeagues(extractedLeagues);
      } else {
        setLeagues([
          { id: 1, name: 'Test League 1' },
          { id: 2, name: 'Test League 2' },
        ]);
      }
    };

    fetchLeagues();
  }, []);

  const handleLeagueChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedLeague(event.target.value);
  }, []);

  const handleSeasonChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedSeason(event.target.value);
  }, []);

  const handleClick = useCallback(async () => {
    if (selectedLeague && selectedSeason) {
      try {
        const scorersData = await getTopScorers(selectedSeason, selectedLeague);
        if (scorersData && scorersData.response) {
          setTopScorers(scorersData.response);
          setError('');
        }
      } catch (err) {
        console.error('Error fetching top scorers:', err);
        setError('An error occurred while fetching Top Scorers.');
      }
    } else {
      console.log('League or season not selected.');
    }
  }, [selectedLeague, selectedSeason]);

  return (
    <div>
      <LeagueSelect leagues={leagues} selectedLeague={selectedLeague} onChange={handleLeagueChange} />

      <SeasonSelect availableSeasonYears={availableSeasonYears} selectedSeason={selectedSeason} onChange={handleSeasonChange} />

      <Button variant="contained" onClick={handleClick}>
        Get Top Scorers
      </Button>

      <Typography variant="h4" component="h3" gutterBottom>
        {error || 'Top Scorers:'}
      </Typography>
      <PlayerList players={topScorers} />
    </div>
  );
};

export default FootballComponent;