import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const saveDataToLocalStorage = (key: string, data: any) => {
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

  const tenHoursInMs = 10 * 60 * 60 * 1000; // Updated the duration
  const savedDataTimestamp = new Date(parsedData.timestamp);
  const now = new Date();

  if (now.getTime() - savedDataTimestamp.getTime() > tenHoursInMs) {
    localStorage.removeItem(key);
    return null;
  }
  return parsedData.data;
};

const CryptoCurrency: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const localStorageKey = "crypto_data";
      const savedData = loadDataFromLocalStorage(localStorageKey);

      if (savedData) {
        setCryptos(savedData);
        setError(null);
      } else {
        setLoading(true);
        try {
          const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false"
          );
          setCryptos(response.data);
          setError(null);
          saveDataToLocalStorage(localStorageKey, response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data. Please try again later.");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {cryptos.map((crypto) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={crypto.id}>
            <Card>
              <CardContent>
                <Avatar src={crypto.image} alt={crypto.name} />
                <Typography color="textSecondary" gutterBottom>
                  {crypto.symbol.toUpperCase()}
                </Typography>
                <Typography color="textSecondary">
                  Worth per coin (USD): ${crypto.current_price.toFixed(2)}
                </Typography>
                <Typography
                  color={crypto.price_change_percentage_24h >= 0 ? "primary" : "error"}
                >
                  Change (24h): {crypto.price_change_percentage_24h.toFixed(2)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CryptoCurrency;