import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Skeleton } from '@mui/lab';
import {
  Grid,
  CircularProgress,
  Typography,
  Box,
  Grow,
  Paper,
  Divider,
} from '@mui/material';
import GameCard from './GameCard';
import StreamerCard from './StreamerCard';
import Pagination from './Pagination';
import { getConfig, getTwitchApiCall } from './twitch-api';
import './TwitchApi.css';

interface TwitchGameData {
  id: string;
  name: string;
  box_art_url: string;
}

interface StreamerData {
  id: string;
  user_name: string;
  viewer_count: number;
}

const TwitchApi: React.FC = () => {
  const [games, setGames] = useState<TwitchGameData[]>([]);
  const [streamers, setStreamers] = useState<StreamerData[]>([]);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStreamers, setLoadingStreamers] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 24;
  const [paginationCursor, setPaginationCursor] = useState<string | null>(null);

  const fetchStreamers = async (gameId: string, usePaginationCursor: boolean, page: number) => {
  setLoadingStreamers(true);
  try {
    const config = await getConfig();

    // Use after parameter only if usePaginationCursor is true
    const afterParam = usePaginationCursor ? `&after=${paginationCursor}` : '';

    const response = await getTwitchApiCall(
      `https://api.twitch.tv/helix/streams?game_id=${gameId}&first=${itemsPerPage}${afterParam}`,
      config
    );

    setStreamers(response.data.data);
    setPaginationCursor(response.data.pagination.cursor);
  } catch (error) {
    console.error('Error fetching streamers:', error);
    setError('Failed to fetch streamers. Please try again later.');
  }
  setLoadingStreamers(false);
};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const config = await getConfig();

        const response = await getTwitchApiCall(
          'https://api.twitch.tv/helix/games/top?first=12',
          config
        );

        setGames(response.data.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
  let isMounted = true; // Add this flag to track component's mounting state

  if (selectedGame) {
    const usePaginationCursor = currentPage !== 1;
    fetchStreamers(selectedGame, usePaginationCursor, currentPage).catch((error) => {
      if (isMounted) {
        setError('Failed to fetch streamers. Please try again later.');
      }
    });
  }

  return () => {
    isMounted = false; // Set the flag to false when the component is unmounted
  };
}, [selectedGame, currentPage]);

 const handleGameClick = async (gameId: string) => {
  setSelectedGame(gameId);
  setCurrentPage(1);
  setPaginationCursor(null);
};

  const handlePreviousPage = () => {
  setCurrentPage((prevPage) => prevPage - 1);
};

const handleNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
};

   return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
        <Typography variant="h5" align="center" style={{ fontWeight: 'bold' }}>
          Top Games
        </Typography>
        <Divider variant="middle" style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
        <Grid container spacing={2} className="game-grid">
          {games.map((game) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={game.id}>
              <Grow in={!loading}>
                <GameCard
                  game={game}
                  onClick={() => handleGameClick(game.id)}
                  isActive={selectedGame === game.id}
                />
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {selectedGame && (
        <Box mt={4}>
          <Typography variant="h6" align="center" gutterBottom>
  Top {itemsPerPage} Streamers
</Typography>
          {loadingStreamers && (
            <Box display="flex" justifyContent="center">
              <CircularProgress size={50} color="secondary" />
            </Box>
          )}
<Grid container spacing={2} justifyContent="center">
  {loadingStreamers ? (
    Array.from(new Array(10)).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Box width="100%">
          <Skeleton variant="text" height={20} />
        </Box>
        <Skeleton variant="rectangular" width="100%" height={180} />
      </Grid>
    ))
  ) : (
    streamers.map((streamer) => <StreamerCard streamer={streamer} />)
  )}
</Grid>


          <Pagination
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        </Box>
      )}
    </div>
  );
};

export default TwitchApi;