import React, { forwardRef } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./GameCard.css"; // Import the CSS file

interface GameCardProps {
  game: {
    id: string;
    name: string;
    box_art_url: string;
  };
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void; // Update the type here
  isActive: boolean;
  gameId: string;
}

const GameCard = forwardRef<HTMLDivElement, GameCardProps>(
  ({ game, onClick, isActive, gameId }, ref) => (
    <Card
      ref={ref}
      className={`game-card ${isActive ? "active" : ""}`}
      onClick={onClick} 
      data-game-id={gameId} 
    >
      <CardMedia
        component="img"
        image={game.box_art_url
          .replace("{width}", "720")
          .replace("{height}", "1000")}
        alt={game.name}
        className="game-card-media"
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          align="center"
          className="game-card-text"
        >
          {game.name}
        </Typography>
      </CardContent>
    </Card>
  )
);
GameCard.displayName = "GameCard";

export default GameCard;
