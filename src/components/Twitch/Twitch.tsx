import React, { useState, useEffect, useCallback, useMemo } from "react";

import { Skeleton } from "@mui/lab";
import {
  Grid,
  CircularProgress,
  Typography,
  Box,
  Grow,
  Paper,
  Divider,
} from "@mui/material";
import { range, debounce } from "lodash";

import GameCard from "./GameCard";
import Pagination from "./Pagination";
import StreamerCard from "./StreamerCard";
import { getConfig, getTwitchApiCall } from "./twitch-api";

import "./TwitchApi.css";

const saveDataToLocalStorage = (key: string, data: unknown) => {
  const currentTimestamp = new Date().toISOString();
  const dataToSave = { data, timestamp: currentTimestamp };
  localStorage.setItem(key, JSON.stringify(dataToSave));
};

const loadDataFromLocalStorage = (key: string) => {
  const savedData = localStorage.getItem(key);
  if (!savedData) {
    return null;
  }
  const parsedData = JSON.parse(savedData);

  const tenMinutesInMs = 10 * 60 * 1000; 
  const savedDataTimestamp = new Date(parsedData.timestamp);
  const now = new Date();

  if (now.getTime() - savedDataTimestamp.getTime() > tenMinutesInMs) {
    localStorage.removeItem(key);
    return null;
  }
  return parsedData.data;
};


interface TwitchGameData {
  id: string;
  name: string;
  box_art_url: string;
}

interface StreamerData {
  id: string;
  user_name: string;
  viewer_count: number;
}
const paperSx = { padding: "1rem", marginTop: "1rem", marginBottom: "1.5rem" };

const typographySx = { fontWeight: "bold" };

const dividerSx = { marginTop: "0.5rem", marginBottom: "0.5rem" };

const TwitchApi: React.FC = () => {
  const [games, setGames] = useState<TwitchGameData[]>([]);
  const [streamers, setStreamers] = useState<StreamerData[]>([]);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStreamers, setLoadingStreamers] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 24;
  const [paginationCursor, setPaginationCursor] = useState<string | null>(null);

  const growInProps = useMemo(() => ({ in: !loading }), [loading]);
  const fetchStreamers = async (
    gameId: string,
    usePaginationCursor: boolean,
    page: number
  ) => {
    setLoadingStreamers(true);
    try {
      const config = await getConfig();

      // Use after parameter only if usePaginationCursor is true
      const afterParam = usePaginationCursor
        ? `&after=${paginationCursor}`
        : "";

      const response = await getTwitchApiCall(
        `https://api.twitch.tv/helix/streams?game_id=${gameId}&first=${itemsPerPage}${afterParam}`,
        config
      );

      setStreamers(response.data.data);
      setPaginationCursor(response.data.pagination.cursor);
    } catch (error) {
      console.error("Error fetching streamers:", error);
      setError("Failed to fetch streamers. Please try again later.");
    }
    setLoadingStreamers(false);
  };

 useEffect(() => {
  const fetchData = async () => {
    const localStorageKey = "top_games_data";
    const savedData = loadDataFromLocalStorage(localStorageKey);

    if (savedData) {
      setGames(savedData);
      setError(null);
    } else {
      setLoading(true);
      try {
        const config = await getConfig();

        const response = await getTwitchApiCall(
          "https://api.twitch.tv/helix/games/top?first=12",
          config
        );

        setGames(response.data.data);
        setError(null);
        saveDataToLocalStorage(localStorageKey, response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
      setLoading(false);
    }
  };

  fetchData();
}, []);

  useEffect(() => {
  let isMounted = true; // Add this flag to track component's mounting state

  if (selectedGame) {
    const usePaginationCursor = currentPage !== 1;

    const localStorageKey = `streamers_data_${selectedGame}`;
    const savedData = loadDataFromLocalStorage(localStorageKey);

    if (savedData) {
      setStreamers(savedData);
      setError(null);
    } else {
      fetchStreamers(selectedGame, usePaginationCursor, currentPage).catch(
        (error) => {
          if (isMounted) {
            error("Failed to fetch streamers. Please try again later.");
          }
        }
      );
    }
  }

  return () => {
    isMounted = false; // Set the flag to false when the component is unmounted
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedGame, currentPage]);

  const debouncedHandleGameClick = useCallback((gameId: string) => {
    const debouncedFunction = debounce(() => {
      setSelectedGame(gameId);
      setCurrentPage(1);
      setPaginationCursor(null);
    }, 250);

    debouncedFunction();
  }, []);
  const handleGameClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const gameId = event.currentTarget.getAttribute("data-game-id") || "";
      debouncedHandleGameClick(gameId);
    },
    [debouncedHandleGameClick]
  );

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prevPage) => prevPage - 1);
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <Paper elevation={3} sx={paperSx}>
        <Typography variant="h5" align="center" sx={typographySx}>
          Top Games
        </Typography>
        <Divider variant="middle" sx={dividerSx} />
        <Grid container spacing={2} className="game-grid">
          {games.map((game) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={game.id}>
              <Grow {...growInProps}>
                <GameCard
                  game={game}
                  onClick={handleGameClick} // Pass handleGameClick directly
                  isActive={selectedGame === game.id}
                  gameId={game.id}
                />
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {selectedGame && (
        <Box mt={4}>
          <Typography variant="h6" align="center" gutterBottom>
            Top {itemsPerPage} Streamers
          </Typography>
          {loadingStreamers && (
            <Box display="flex" justifyContent="center">
              <CircularProgress size={50} color="secondary" />
            </Box>
          )}
          <Grid container spacing={2} justifyContent="center">
            {loadingStreamers
              ? range(10).map((index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Box width="100%">
                      <Skeleton variant="text" height={20} />
                    </Box>
                    <Skeleton variant="rectangular" width="100%" height={180} />
                  </Grid>
                ))
              : streamers.map((streamer) => (
                  <StreamerCard key={streamer.id} streamer={streamer} />
                ))}
          </Grid>

          <Pagination
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        </Box>
      )}
    </div>
  );
};

export default TwitchApi;
