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
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import { Player } from "./Player";

interface PlayerListProps {
  players: Player[];
}

const PlayerCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: theme.spacing(2),
  background: "linear-gradient(45deg, #282828 30%, #323232 90%)", // dark gray to lighter gray
  boxShadow: "0 3px 5px 2px rgba(105, 255, 135, .3)", // lime green shadow
  borderRadius: "4px",
  cursor: "pointer",
  transition: "transform 0.3s, background 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    background: "linear-gradient(45deg, #32CD32 30%, #90EE90 90%)", // lime green to light lime green
  },
}));

const PlayerAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  marginRight: theme.spacing(2),
  border: "2px solid #fff",
  boxShadow: (theme.shadows as any)[3], // bypass TypeScript check here
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: "50px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',  // Rounded corners
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)', // More pronounced shadow
    transition: 'all 0.3s', // Smooth transition
  },
}));

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const renderPlayerStatistics = (player: Player) => {
    const stats = player.statistics[0];
    return `${stats.games.appearences} appearances, ${stats.cards.yellow} yellow cards, ${stats.cards.red} red cards`;
  };

  const renderPlayerDetails = (player: Player) => {
    const stats = player.statistics[0];
    const playerInjuredChip = player.player.injured ? (
      <StyledChip label="Yes" color="error" />
    ) : (
      <StyledChip label="No" color="success" />
    );
    return (
      <div>
        <DialogTitle
          sx={{
            background: "#212121", // Darker background color
            color: "#32CD32",
            padding: "24px 32px", // Increased padding
            borderRadius: '16px 16px 0 0', // Top rounded corners
            fontFamily: "'Roboto', sans-serif", // Personalized font
            fontSize: '1.8rem', // Larger font size
            fontWeight: 'bold', // Bold text
          }}
        >
          {player.player.name}
        </DialogTitle>
        <DialogContent
          sx={{
            textAlign: "center",
            background: "#303030", // Darker background color
            color: "#FFFFFF", // Light text color
            padding: '32px', // Increased padding
            borderRadius: '0 0 16px 16px', // Bottom rounded corners
            fontFamily: "'Roboto', sans-serif", // Personalized font
          }}
        >
          <Avatar
            src={player.player.photo}
            alt={player.player.name}
            sx={{ width: 150, height: 150, marginBottom: 2 }}
          />
          <DialogContentText>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: 2, lineHeight: 1.5 }}
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
              <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>Height:</Typography>
              <Typography>{player.player.height}</Typography>
              <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>Weight:</Typography>
              <Typography>{player.player.weight}</Typography>
              <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>Position:</Typography>
          <Typography>{player.player.position}</Typography>
          <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>Nationality:</Typography>
          <Typography>{player.player.nationality}</Typography>
          <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>Injured:</Typography>
          <Box
            component="span"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {playerInjuredChip}
          </Box>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", marginBottom: 2, lineHeight: 1.5 }}
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
          <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>Team:</Typography>
          <Typography>{stats.team.name}</Typography>
          <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>League:</Typography>
          <Typography>{stats.league.name}</Typography>
          <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>Appearances:</Typography>
          <Typography>{stats.games.appearences}</Typography>
          <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>Goals:</Typography>
          <Typography>{stats.goals.total}</Typography>
          <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>Assists:</Typography>
          <Typography>{stats.goals.assists}</Typography>
          <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>Yellow Cards:</Typography>
          <Typography>{stats.cards.yellow}</Typography>
          <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>Red Cards:</Typography>
          <Typography>{stats.cards.red}</Typography>
          <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
            Fouls Committed:
          </Typography>
          <Typography>{stats.fouls.committed}</Typography>
          <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
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
            <PlayerCard onClick={() => setSelectedPlayer(player)}>
              <PlayerAvatar
                src={player.player.photo}
                alt={player.player.name}
              />
              <Box>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                  {player.player.name} - {stats.goals.total} goals
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: 0.3 }}>
                  {renderPlayerStatistics(player)}
                </Typography>
              </Box>
            </PlayerCard>
          </Grid>
        );
      })}
    </Grid>
    <StyledDialog open={!!selectedPlayer} onClose={() => setSelectedPlayer(null)}>
      {selectedPlayer && renderPlayerDetails(selectedPlayer)}
    </StyledDialog>
  </Box>
);
};

export default PlayerList;
