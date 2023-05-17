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
  width: 100,
  height: 100,
  marginRight: theme.spacing(2),
  border: "2px solid #fff",
  borderRadius: "50%",
  boxShadow: `0 4px 10px 0 rgba(0, 0, 0, 0.08)`,
  transition: "box-shadow 0.3s, transform 0.3s",
  "&:hover": {
    boxShadow: `0 8px 16px 0 rgba(0, 0, 0, 0.1), 0 12px 22px 0 rgba(0, 0, 0, 0.12)`,
    transform: "scale(1.05)",
  },
  "& .MuiAvatar-img": {
    borderRadius: "50%",
    objectFit: "cover",
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: "50px",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  backgroundColor: "#f1f1f1",
  color: "#333",
  boxShadow: `0 2px 6px 0 rgba(0, 0, 0, 0.08)`,
  "& .MuiChip-label": {
    fontSize: "14px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  "&:hover": {
    backgroundColor: "#e0e0e0",
    boxShadow: `0 4px 10px 0 rgba(0, 0, 0, 0.12)`,
  },
  "& .MuiChip-avatar": {
    color: "#fff",
    backgroundColor: "#333",
    fontWeight: 700,
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    fontSize: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "-4px",
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    boxShadow: `0 8px 16px 0 rgba(0, 0, 0, 0.1)`,
    transition: "box-shadow 0.3s, transform 0.3s",
    maxWidth: "600px", // Added max-width
  },
  "& .MuiDialog-paperFullScreen": {
    margin: 0,
  },
  "& .MuiDialogTitle-root": {
    paddingBottom: theme.spacing(2),
    borderBottom: "1px solid #ccc",
    fontWeight: 700,
    fontSize: "20px",
    color: "#333",
  },
  "& .MuiDialogContent-root": {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    fontSize: "16px",
    color: "#444",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
    borderTop: "1px solid #ccc",
  },
  "& .MuiButton-root": {
    borderRadius: "50px",
    textTransform: "none",
    fontWeight: 600,
    padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
    boxShadow: `0 2px 6px 0 rgba(0, 0, 0, 0.1)`,
    "&:hover": {
      backgroundColor: "#e0e0e0",
      boxShadow: `0 4px 10px 0 rgba(0, 0, 0, 0.12)`,
    },
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
    return (
      <div>
        <DialogTitle
          sx={{
            background: "#212121",
            color: "#32CD32",
            padding: "24px 32px",
            borderRadius: "16px 16px 0 0",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "1.8rem",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)", // Added text shadow
            borderBottom: "2px solid #32CD32", // Added bottom border
          }}
        >
          <Typography
            component="div"
            variant="h6"
            sx={{
              color: "#FFFFFF", // Updated text color
            }}
          >
            {player.player.firstname} {player.player.lastname}
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            textAlign: "center",
            background: "#303030",
            color: "#FFFFFF",
            padding: "32px",
            borderRadius: "0 0 16px 16px",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Avatar
                src={player.player.photo}
                alt={player.player.name}
                sx={{
                  width: 150,
                  height: 150,
                  marginBottom: 4, // Increased margin bottom
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Added box shadow
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <DialogContentText>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 4, // Increased margin bottom
                    lineHeight: 1.5,
                    color: "#32CD32",
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)", // Added text shadow
                    letterSpacing: "1px", // Added letter spacing
                    textTransform: "uppercase", // Uppercase text
                  }}
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
                  <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                    Age:
                  </Typography>
                  <Typography>{player.player.age}</Typography>
                  <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                    Height:
                  </Typography>
                  <Typography>{player.player.height}</Typography>
                  <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                    Weight:
                  </Typography>
                  <Typography>{player.player.weight}</Typography>
                  <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                    Position:
                  </Typography>
                  <Typography>{player.player.position}</Typography>
                  <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                    Nationality:
                  </Typography>
                  <Typography>{player.player.nationality}</Typography>
                  <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                    Injured:
                  </Typography>
                  <Typography>
                    {player.player.injured ? "Yes" : "No"}
                  </Typography>
                </Box>
              </DialogContentText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DialogContentText>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 2,
                    lineHeight: 1.5,
                  }}
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
                  <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                    Team:
                  </Typography>
                  <Typography>{stats.team.name}</Typography>
                  <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                    League:
                  </Typography>
                  <Typography>{stats.league.name}</Typography>
                  <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                    Appearances:
                  </Typography>
                  <Typography>{stats.games.appearences}</Typography>
                  <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                    Goals:
                  </Typography>
                  <Typography>{stats.goals.total}</Typography>
                  <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                    Assists:
                  </Typography>
                  <Typography>{stats.goals.assists}</Typography>
                  <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                    Yellow Cards:
                  </Typography>
                  <Typography>{stats.cards.yellow}</Typography>
                  <Typography sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
                    Red Cards:
                  </Typography>
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
            </Grid>
          </Grid>
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
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", letterSpacing: 0.5 }}
                  >
                    {player.player.name} - {stats.goals.total} goals
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ letterSpacing: 0.3 }}
                  >
                    {renderPlayerStatistics(player)}
                  </Typography>
                </Box>
              </PlayerCard>
            </Grid>
          );
        })}
      </Grid>
      <StyledDialog
        open={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      >
        {selectedPlayer && renderPlayerDetails(selectedPlayer)}
      </StyledDialog>
    </Box>
  );
};

export default PlayerList;
