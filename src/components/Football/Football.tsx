// FootballComponent.tsx
import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  Container,
  LinearProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import Logo from "../../assets/pngwing.com (1).png";

import LeagueSelect from "./LeagueSelect";
import PlayerList from "./PlayerList";
import SeasonSelect from "./SeasonSelect";

import { useFootballData } from "../../hooks/useFootballData";
import { useSelectedData } from "../../hooks/useSelectedData";

const availableSeasonYears = [
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
];

const Header = styled("header")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  backgroundColor: "#424242",
  borderRadius: "5px",
  padding: "10px",
}));

const LogoImage = styled("img")({
  height: 50,
  marginRight: 16,
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#424242",
  color: "white",
  "&:hover": {
    backgroundColor: "#303030",
  },
  marginBottom: theme.spacing(2),
}));

const FootballComponent: React.FC = () => {
  const { leagues, topScorers, error, loading, fetchTopScorers } =
    useFootballData();
  const {
    selectedLeague,
    selectedSeason,
    handleLeagueChange,
    handleSeasonChange,
  } = useSelectedData();

  const [fetchTimeout, setFetchTimeout] = useState(false); // State for fetch timeout

  const handleClick = async () => {
    if (selectedLeague && selectedSeason) {
      setFetchTimeout(false);
      const timeoutId = setTimeout(() => setFetchTimeout(true), 10000); // Set timeout for 10 seconds
      await fetchTopScorers(selectedSeason, selectedLeague);
      clearTimeout(timeoutId); // Clear the timeout if fetching is done before 10 seconds
    }
  };

  return (
    <Container>
      <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <Header>
          <LogoImage src={Logo} alt="Logo" />
          <Typography variant="h4" component="div" color="white">
            Football Stats
          </Typography>
        </Header>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <LeagueSelect
                leagues={leagues}
                selectedLeague={selectedLeague}
                onChange={handleLeagueChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SeasonSelect
                availableSeasonYears={availableSeasonYears}
                selectedSeason={selectedSeason}
                onChange={handleSeasonChange}
              />
            </Grid>
          </Grid>
        </Paper>
        <StyledButton
          variant="contained"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Get Top Scorers"}
        </StyledButton>
        {loading && <LinearProgress sx={{ mb: 2 }} />}
        {fetchTimeout && !loading && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Fetching data took longer than expected. Please try again.
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            color: "#FFFFFF",
            mt: 3,
            mb: 4,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: 2,
            fontWeight: "bold",
            borderBottom: "2px solid #FFFFFF",
            paddingBottom: "8px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(45deg, #333333 30%, #333333 90%)",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          Top Scorers
        </Typography>

        <Card sx={{ p: 2 }}>
          <PlayerList players={topScorers} />
        </Card>
      </Box>
    </Container>
  );
};

export default FootballComponent;
