import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Avatar } from '@mui/material';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const CryptoCurrency: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false'
        );
        setCryptos(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {cryptos.map((crypto) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={crypto.id}>
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
                  color={crypto.price_change_percentage_24h >= 0 ? 'primary' : 'error'}
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