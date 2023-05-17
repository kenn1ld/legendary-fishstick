// useFootballData.tsx
import { useState, useEffect } from 'react';
import { getLeagues, getTopScorers } from '../components/Football/FootballApi';

interface League {
  id: number;
  name: string;
}

export const useFootballData = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [topScorers, setTopScorers] = useState([]);
  const [error, setError] = useState('');

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

  const fetchTopScorers = async (selectedSeason: string, selectedLeague: string) => {
    if (selectedLeague && selectedSeason) {
      try {
        const scorersData = await getTopScorers(parseInt(selectedSeason), parseInt(selectedLeague));

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
  };

  return { leagues, topScorers, error, fetchTopScorers };
};