import React from 'react';
import { Box, Card, Typography, CardContent, CardMedia, CardActionArea, Grid } from '@mui/material';
import Particles from 'react-tsparticles';

export interface Player {
  player: {
    id: number;
    name: string;
    position: string;
    birth: {
      date: string;
      place: string;
      country: string;
    };
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
  };
  statistics: {
    team: {
      id: number;
      name: string;
      logo: string;
    };
    league: {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string;
      season: number;
    };
    games: {
      appearences: number;
      lineups: number;
      minutes: number;
      number: null | number;
      position: string;
      rating: string;
      captain: boolean;
    };
    substitutes: {
      in: number;
      out: number;
      bench: number;
    };
    shots: {
      total: number;
      on: number;
    };
    goals: {
      total: number;
      conceded: null | number;
      assists: number;
      saves: number;
    };
    passes: {
      total: number;
      key: number;
      accuracy: number;
    };
    tackles: {
      total: number;
      blocks: number;
      interceptions: number;
    };
    duels: {
      total: number;
      won: number;
    };
    dribbles: {
      attempts: number;
      success: number;
      past: null | number;
    };
    fouls: {
      drawn: number;
      committed: number;
    };
    cards: {
      yellow: number;
      yellowred: number;
      red: number;
    };
    penalty: {
      won: number;
      commited: null | number;
      scored: number;
      missed: number;
      saved: null | number;
    };
  }[];
}

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  const renderPlayerStatistics = (player: Player) => {
    const stats = player.statistics[0];
    return `
      ${stats.games.appearences} appearances, ${stats.games.lineups} lineups, ${stats.cards.yellow} yellow cards, ${stats.cards.yellowred} yellowred cards, ${stats.cards.red} red cards
      `;
  };

  console.log('players prop value in PlayerList:', players);

  return (
    <>
      <Particles
        id="tsparticles"
        options={{
         
          particles: {
            color: {
              value: '#ff9800',
            },
            links: {
              color: {
                value: '#ff9800',
              },
            },
            move: {
              attract: {
                rotate: {
                  x: 600,
                  y: 1200,
                },
              },
            },
            number: {
              density: {
                enable: true,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
              anim: {
                enable: true,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: true,
                speed: 3,
              },
            },
          },
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {players.map((player, index) => {
            const stats = player.statistics[0];
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={player.player.photo}
                      alt={player.player.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {player.player.name} - {stats.goals.total} goals
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {renderPlayerStatistics(player)}
                        <br />
                        {stats.dribbles.attempts} dribble attempts, {stats.dribbles.success} successful dribbles
                        <br />
                        {stats.passes.key} key passes
                        <br />
                        {stats.tackles.blocks} blocks, {stats.tackles.interceptions} interceptions
                        <br />
                        {stats.fouls.drawn} fouls drawn, {stats.fouls.committed} fouls committed
                        <br />
                        {stats.penalty.scored} penalties scored, {stats.penalty.missed} penalties missed,{' '}
                        {stats.penalty.won} penalties won
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default PlayerList;