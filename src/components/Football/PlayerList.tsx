import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { Player } from "./Player";

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  console.log('PlayerList players:', players);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const renderPlayerStatistics = (player: Player) => {
    const stats = player.statistics[0];
    return `${stats.games.appearences} appearances, ${stats.cards.yellow} yellow cards, ${stats.cards.red} red cards`;
  };

  const renderPlayerDetails = (player: Player) => {
    const stats = player.statistics[0];
    return (
      <div>
        <DialogTitle>{player.player.name}</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Avatar
            src={player.player.photo}
            alt={player.player.name}
            sx={{ width: 150, height: 150, marginBottom: 2 }}
          />
          <DialogContentText>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Player Info:
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                gap: 1,
                marginBottom: 2,
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Height:</Typography>
              <Typography>{player.player.height}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Weight:</Typography>
              <Typography>{player.player.weight}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Position:</Typography>
              <Typography>{player.player.position}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Nationality:</Typography>
              <Typography>{player.player.nationality}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Injured:</Typography>
              <Typography>{player.player.injured ? "Yes" : "No"}</Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Statistics:
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                gap: 1,
                marginBottom: 2,
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Team:</Typography>
              <Typography>{stats.team.name}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>League:</Typography>
              <Typography>{stats.league.name}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Appearances:</Typography>
              <Typography>{stats.games.appearences}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Goals:</Typography>
              <Typography>{stats.goals.total}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Assists:</Typography>
              <Typography>{stats.goals.assists}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Yellow Cards:</Typography>
              <Typography>{stats.cards.yellow}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Red Cards:</Typography>
              <Typography>{stats.cards.red}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Fouls Committed:
              </Typography>
              <Typography>{stats.fouls.committed}</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Penalties Scored:
              </Typography>
              <Typography>{stats.penalty.scored}</Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
      </div>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {players.map((player, index) => {
          const stats = player.statistics[0];
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 2,
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
                onClick={() => setSelectedPlayer(player)}
              >
                <Avatar
                  src={player.player.photo}
                  alt={player.player.name}
                  sx={{ width: 80, height: 80, marginRight: 2 }}
                />
                <Box>
                  <Typography variant="h6" component="div">
                    {player.player.name} - {stats.goals.total} goals
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {renderPlayerStatistics(player)}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Dialog open={!!selectedPlayer} onClose={() => setSelectedPlayer(null)}>
        {selectedPlayer && renderPlayerDetails(selectedPlayer)}
      </Dialog>
    </Box>
  );
};

export default PlayerList;
