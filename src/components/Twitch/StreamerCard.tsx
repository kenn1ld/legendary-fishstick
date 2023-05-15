import React, { useState } from 'react';
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
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import './fireEffect.css';

interface StreamerCardProps {
  streamer: {
    id: string;
    user_name: string;
    viewer_count: number;
  };
}

const StreamerCard: React.FC<StreamerCardProps> = ({ streamer }) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Grid key={streamer.id} item xs={12} sm={6} md={4} lg={3}>
      <Grow in={true}>
        <Tooltip
          title={`${streamer.viewer_count} viewers`}
          placement="top"
          arrow
          PopperProps={{
            style: {
              userSelect: 'none',
            },
          }}
        >
          <Card
            className={hover ? 'fire-effect' : ''}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{
              width: '100%',
              position: 'relative',
              borderRadius: '16px',
              backgroundColor: alpha('#0f0f0f', 0.85),
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url(https://static-cdn.jtvnw.net/previews-ttv/live_user_${encodeURIComponent(
                streamer.user_name
              )}-640x360.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: 3,
              },
              transition:
                'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, color 0.3s ease-in-out',
            }}
            onClick={() =>
              window.open(`https://www.twitch.tv/${streamer.user_name}`, '_blank')
            }
          >
            {hover && (
              <iframe
                title={`stream-${streamer.id}`}
                src={`https://player.twitch.tv/?channel=${streamer.user_name}&muted=false&parent=${window.location.hostname}`}
                width="100%"
                height="100%"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  border: 0,
                }}
              />
            )}
            <CardActionArea
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            />
            <CardContent>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Avatar
                    alt={streamer.user_name}
                    src={`https://static-cdn.jtvnw.net/jtv_user_pictures/${encodeURIComponent(
                      streamer.user_name
                    )}-profile_image-300x300.png`}
                    sx={{ width: 48, height: 48, borderRadius: '12px' }}
                  />
                </Grid>
                <Grid item xs>
                  <Typography variant="h6" gutterBottom sx={{
                    fontWeight: 'bold',
                    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
                  }}>
                    {streamer.user_name}
                  </Typography>
                  <Chip
                    label={`${streamer.viewer_count} viewers`}
                    size="small"
                    sx={{
                      backgroundColor: alpha('#FF3A00', 0.6),
                      borderRadius: '8px',
                      color: '#fff',
                      fontWeight: 'bold'
                    }}
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