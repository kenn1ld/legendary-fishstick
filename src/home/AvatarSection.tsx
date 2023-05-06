import React from "react";
import {
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
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
        Welcome, {user ? user.name : "Unknown"}!
      </WelcomeText>
      <LightTypography variant="subtitle1">
        Full Stack Developer
      </LightTypography>
      <Box mt={2}>
        <IconButton>
          <GitHubIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton>
          <LinkedInIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton>
          <EmailIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </>
  );
};