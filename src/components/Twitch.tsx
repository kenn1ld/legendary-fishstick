import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface TwitchGameData {
  id: string;
  name: string;
  box_art_url: string;
}

const TwitchApi: React.FC = () => {
  const [games, setGames] = useState<TwitchGameData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const clientId = '65c87wwt7b8odaqd7b0hzgulachem3';
    const clientSecret = 'b50zus7u1znwejg8uvgzztqbbkdmu2';

    const fetchData = async () => {
      setLoading(true);
      try {
        const tokenResponse = await axios.post(
          `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
        );
        const accessToken = tokenResponse.data.access_token;

        const config = {
          headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`,
          },
        };

        const response = await axios.get(
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

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <Grid container spacing={2}>
        {games.map((game) => (
          <Grid item xs={12} sm={12} md={1} lg={1} key={game.id}>
            <Card>
              <CardMedia
                component="img"
                image={game.box_art_url
                    .replace('{width}', '720')
                    .replace('{height}', '1000')}
                alt={game.name}
              />
              <CardContent>
                <Typography variant="subtitle1" align="center">
                  {game.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TwitchApi;