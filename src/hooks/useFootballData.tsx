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
const [loading, setLoading] = useState(false);
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
  setLoading(true);
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
    } finally {
      setLoading(false); // Add this line to ensure loading state is set to false after fetching
    }
  } else {
    console.log('League or season not selected.');
    setLoading(false); // Add this line to ensure loading state is set to false even if not all data is selected
  }
};


  return { leagues, topScorers, error, fetchTopScorers, loading };
};