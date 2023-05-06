import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Avatar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
}
interface HomeProps {
  user: User | null;
}

const AppContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const CenteredBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(1),
}));

function Home({ user }: HomeProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [user]);

  return (
    <AppContainer>
      {loading ? (
        <CenteredBox>
          <CircularProgress />
        </CenteredBox>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <LargeAvatar src="https://via.placeholder.com/150" />
              <WelcomeText variant="h4">Welcome, {user ? user.name : "Unknown"}!</WelcomeText>
              <Typography variant="subtitle1">Full Stack Developer</Typography>
              <Box mt={2}>
                <IconButton>
                  <GitHubIcon />
                </IconButton>
                <IconButton>
                  <LinkedInIcon />
                </IconButton>
                <IconButton>
                  <EmailIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          <Box mt={4}>
            <SectionTitle variant="h5">Skills</SectionTitle>
            <Grid container spacing={2}>
              {["React", "Node.js", "Python", "Django", "MongoDB", "Firebase"].map(
                (skill, index) => (
                  <Grid item xs={6} sm={4} md={2} key={index}>
                    <StyledPaper elevation={1}>
                      <Typography variant="subtitle1">{skill}</Typography>
                    </StyledPaper>
                  </Grid>
                )
              )}
            </Grid>
          </Box>

          <Box mt={4}>
            <SectionTitle variant="h5">Portfolio</SectionTitle>
            <Grid container spacing={2}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <StyledPaper elevation={1}>
                    <Typography variant="h6">Project Title</Typography>
                    <Typography variant="body1">Project description</Typography>
                  </StyledPaper>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box mt={4} mb={4}>
            <SectionTitle variant="h5">Get in Touch</SectionTitle>
            <Typography variant="body1">
              Email: {user ? user.email : "example@example.com"}
            </Typography>
          </Box>
        </>
      )}
    </AppContainer>
  );
}

export default Home;