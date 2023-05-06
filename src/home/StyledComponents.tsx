import { styled } from "@mui/system";
import { Avatar, Typography, Paper, Box } from "@mui/material";

export const DarkBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  width: "100%",
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const LightTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
}));

export const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(1),
}));

export const WelcomeText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));