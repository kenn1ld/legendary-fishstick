import React, { useState, useCallback, useMemo } from "react";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Grow,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import "./fireEffect.css";

interface StreamerCardProps {
  streamer: {
    id: string;
    user_name: string;
    viewer_count: number;
  };
}

const StreamerCard: React.FC<StreamerCardProps> = ({ streamer }) => {
  const [hover, setHover] = useState<boolean>(false);
  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);
  const popperStyle = useMemo<React.CSSProperties>(
    () => ({
      userSelect: "none" as const,
    }),
    []
  );

  const chipStyle = useMemo(
    () => ({
      backgroundColor: alpha("#FF3A00", 0.6),
      borderRadius: "8px",
      color: "#fff",
      fontWeight: "bold",
    }),
    []
  );
  const customPopperProps = useMemo(
    () => ({ style: popperStyle }),
    [popperStyle]
  );

  const cardHoverStyle = useMemo(
    () => ({
      transform: "scale(1.03)",
      boxShadow: 3,
    }),
    []
  );
  const imgStyle = useMemo<React.CSSProperties>(
    () => ({
      width: 48,
      height: 48,
      borderRadius: "12px",
    }),
    []
  );

  const textThemeStyle = useMemo<React.CSSProperties>(
    () => ({
      fontWeight: "bold",
      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
    }),
    []
  );

  const viewerTextStyle = useMemo<React.CSSProperties>(
    () => ({
      fontWeight: "bold",
      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
    }),
    []
  );

  const cardStyle = useMemo(
    () => ({
      width: "100%",
      position: "relative",
      borderRadius: "16px",
      backgroundColor: alpha("#0f0f0f", 0.85),
      backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url(https://static-cdn.jtvnw.net/previews-ttv/live_user_${encodeURIComponent(
        streamer.user_name
      )}-640x360.jpg)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      cursor: "pointer",
      "&:hover": cardHoverStyle,
      transition:
        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, color 0.3s ease-in-out",
    }),
    [cardHoverStyle, streamer.user_name]
  );

  const iframeStyle = useMemo<React.CSSProperties>(
    () => ({
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1,
      border: 0,
    }),
    []
  );

  const cardActionAreaStyle = useMemo<React.CSSProperties>(
    () => ({
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }),
    []
  );

  const handleCardClick = useCallback(() => {
    window.open(`https://www.twitch.tv/${streamer.user_name}`, "_blank");
  }, [streamer.user_name]);

  return (
    <Grid key={streamer.id} item xs={12} sm={6} md={4} lg={3}>
      <Grow in={true}>
        <Tooltip
          title={`${streamer.viewer_count} viewers`}
          placement="top"
          arrow
          PopperProps={customPopperProps}
        >
          <Card
            className={hover ? "fire-effect" : ""}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={cardStyle} // Use the useMemo object
            onClick={handleCardClick}
          >
            {hover && (
              <iframe
                title={`stream-${streamer.id}`}
                src={`https://player.twitch.tv/?channel=${streamer.user_name}&muted=false&parent=${window.location.hostname}`}
                width="100%"
                height="100%"
                style={iframeStyle}
              />
            )}
            <CardActionArea sx={cardActionAreaStyle} />
            <CardContent>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Avatar
                    src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamer.user_name}-48x48.jpg`}
                    sx={imgStyle} // Use the useMemo object
                  />
                  <Typography variant="body1" sx={textThemeStyle}></Typography>
                </Grid>

                <Grid item xs>
                  <Typography variant="h6" gutterBottom sx={viewerTextStyle}>
                    {streamer.user_name}
                  </Typography>
                  <Chip
                    label={`${streamer.viewer_count} viewers`}
                    size="small"
                    sx={chipStyle}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Tooltip>
      </Grow>
    </Grid>
  );
};

export default StreamerCard;
