import React from 'react';

import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton, Box, Tooltip } from '@mui/material';


import { LargeAvatar, WelcomeText, LightTypography } from './StyledComponents';

interface User {
  _id: string;

  name: string;

  username: string;

  email: string;
}

interface AvatarSectionProps {
  user: User | null;
}

export const AvatarSection = ({ user }: AvatarSectionProps) => {
  return (
    <>
      <LargeAvatar src="https://via.placeholder.com/150" />

      <WelcomeText variant="h4">
        Welcome, {user ? user.name : 'Unknown'}!
      </WelcomeText>

      <LightTypography variant="subtitle1">
        Full Stack Developer
      </LightTypography>

      <Box mt={2} display="flex" justifyContent="center" alignItems="center">
        <Tooltip title="GitHub" arrow>
          <IconButton href="https://github.com/kenn1ld" target="_blank">
            <GitHubIcon color="primary" />
          </IconButton>
        </Tooltip>

        <Tooltip title="LinkedIn" arrow>
          <IconButton
            href="https://linkedin.com/in/yourusername"
            target="_blank"
          >
            <LinkedInIcon color="primary" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Email" arrow>
          <IconButton href="mailto:kennethskjellvik@gmail.com">
            <EmailIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};
