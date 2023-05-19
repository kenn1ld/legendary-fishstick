import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  Typography,
  Avatar,
  CircularProgress,
  Fade,
} from "@mui/material";
import { saveData, loadData } from "../../config/indexedDBConfig";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

interface SavedData {
  data: CryptoData[];
  lastUpdated: Date;
}

const Container = styled("div")`
  padding: 16px;
`;

const LoadingContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const ErrorText = styled(Typography)`
  color: red;
  text-align: center;
`;

const LastUpdatedText = styled(Typography)`
  margin-bottom: 16px;
  text-align: center;
`;

const fadeAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CryptoCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  animation: ${fadeAnimation} 1s ease-in-out;

  .MuiAvatar-root {
    width: 80px;
    height: 80px;
  }

  .MuiTypography-root {
    margin-bottom: 8px;
  }
`;

// Custom hook for fetching data
const useCryptoData = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const localStorageKey = "crypto_data";
      const savedData: SavedData | null = await loadData(localStorageKey, 0.16); // 0.16 hours = 10 minutes

      if (savedData) {
        setCryptos(savedData.data);
        setLastUpdated(savedData.lastUpdated);
      } else {
        setLoading(true);
        try {
          const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false"
          );
          const newData: SavedData = { data: response.data, lastUpdated: new Date() };
          await saveData(localStorageKey, newData);
          setCryptos(newData.data);
          setLastUpdated(newData.lastUpdated);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data. Please try again later.");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cryptos, error, loading, lastUpdated };
};

const CryptoCurrency: React.FC = () => {
  const { cryptos, error, loading, lastUpdated } = useCryptoData();

  return (
    <Container>
      {loading && (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      )}
      {error && (
        <Fade in={!loading}>
          <ErrorText color="error">{error}</ErrorText>
        </Fade>
      )}
      <LastUpdatedText variant="subtitle2">
        Last updated:{" "}
        {lastUpdated ? lastUpdated.toLocaleString() : "Loading..."}
      </LastUpdatedText>
      <Grid container spacing={2}>
        {cryptos.map((crypto, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={crypto.id}>
            <Fade in={!loading} timeout={500 + index * 300}>
              <CryptoCard>
                <Avatar src={crypto.image} alt={crypto.name} />
                <Typography variant="h6" component="h2">
                  {crypto.symbol.toUpperCase()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Worth per coin (USD): ${crypto.current_price.toFixed(2)}
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    crypto.price_change_percentage_24h >= 0
                      ? "primary"
                      : "error"
                  }
                >
                  Change (24h): {crypto.price_change_percentage_24h.toFixed(2)}%
                </Typography>
              </CryptoCard>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CryptoCurrency;