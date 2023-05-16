import React, { useState, useEffect } from 'react';
import { getLeagues, getTopScorers } from './FootballApi';
import PlayerList, { Player } from './PlayerList';
import SeasonSelect from './SeasonSelect';
import LeagueSelect from './LeagueSelect';
import { SelectChangeEvent, Button, Typography } from '@mui/material';

interface League {
  id: number;
  name: string;
}

const FootballComponent: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [topScorers, setTopScorers] = useState<Player[]>([]);
  const availableSeasonYears = ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];

  useEffect(() => {
    const fetchLeagues = async () => {
      const leaguesData = await getLeagues();
      if (leaguesData && leaguesData.api) {
        const extractedLeagues = leaguesData.api.response.map((leagueObj: any) => leagueObj.league);
        setLeagues(extractedLeagues);
      } else {
        setLeagues([
          { id: 1, name: "Test League 1" },
          { id: 2, name: "Test League 2" },
        ]);
      }
    };

    fetchLeagues();
  }, []);

   const handleLeagueChange = (event: SelectChangeEvent<string>) => {
    setSelectedLeague(event.target.value);
  };

  const handleSeasonChange = (event: SelectChangeEvent<string>) => {
    setSelectedSeason(event.target.value);
  };

  const handleClick = async () => {
    if (selectedLeague && selectedSeason) {
      const scorersData = await getTopScorers(selectedSeason, selectedLeague);
      if (scorersData && scorersData.response) {
        setTopScorers(scorersData.response);
      }
    } else {
      console.log("League or season not selected.");
    }
  };

   return (
    <div>
      <LeagueSelect leagues={leagues} selectedLeague={selectedLeague} onChange={handleLeagueChange} />

      <SeasonSelect availableSeasonYears={availableSeasonYears} selectedSeason={selectedSeason} onChange={handleSeasonChange} />

      <Button variant="contained" onClick={handleClick}>
        Get Top Scorers
      </Button>

      <Typography variant="h4" component="h3" gutterBottom>
        Top Scorers:
      </Typography>
      <PlayerList players={topScorers} />
    </div>
  );
};


export default FootballComponent;