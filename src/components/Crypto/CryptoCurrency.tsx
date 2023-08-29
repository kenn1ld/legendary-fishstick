import React, { useState, useEffect, useMemo, useReducer, useCallback } from 'react';
import axios from 'axios';
import { Grid, Card, Typography, Avatar, CircularProgress, Fade } from '@mui/material';
import { saveData, loadData } from '../../config/indexedDBConfig';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';

// Interfaces and Initial States
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

interface State {
  cryptos: CryptoData[];
  error: string | null;
  loading: boolean;
  lastUpdated: Date | null;
}

const initialState: State = {
  cryptos: [],
  error: null,
  loading: false,
  lastUpdated: null,
};

// API and Local Storage Constants
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false';
const LOCAL_STORAGE_KEY = 'crypto_data';

// Styled Components
const Container = styled('div')`
  padding: 16px;
`;

const LoadingContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

// Additional styling
const MoreInfo = styled(motion.div)`
  margin-top: 32px;
  padding: 16px;
  border-radius: 8px;
  
  font-family: 'Arial', sans-serif;
`;

const InfoHeader = styled(motion.h2)`
  font-size: 28px;
  margin-bottom: 16px;
  text-align: center;
  color: #ffff;
  font-weight: bold;
`;

const InfoItem = styled(motion.div)`
  font-size: 20px;
  margin-bottom: 12px;
  color: #ffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Animation variants for framer-motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const childVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120
    }
  }
};

const ErrorText = styled(Typography)`
  color: red;
  text-align: center;
`;

const LastUpdatedText = styled(Typography)`
  margin-bottom: 16px;
  text-align: center;
`;

const CryptoCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

type Actions = 
  | { type: 'START_LOADING' }
  | { type: 'LOAD_SUCCESS', payload: SavedData }
  | { type: 'LOAD_FAIL', payload: string };

// Reducer function to manage state
const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...initialState, loading: true };
    case 'LOAD_SUCCESS':
      return { ...initialState, cryptos: action.payload.data, lastUpdated: action.payload.lastUpdated };
    case 'LOAD_FAIL':
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

// Custom Hook
const useCryptoData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData: SavedData | null = await loadData(LOCAL_STORAGE_KEY, 0.16);
        
        if (savedData) {
          dispatch({ type: 'LOAD_SUCCESS', payload: savedData });
        } else {
          dispatch({ type: 'START_LOADING' });
          
          const { data } = await axios.get<CryptoData[]>(API_URL);
          const newData: SavedData = { data, lastUpdated: new Date() };
          
          await saveData(LOCAL_STORAGE_KEY, newData);
          dispatch({ type: 'LOAD_SUCCESS', payload: newData });
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        dispatch({ type: 'LOAD_FAIL', payload: `Failed to fetch data. Error: ${error}` });
      }
    };

    fetchData();
  }, []);

  return state;
};

const CryptoCurrency: React.FC = () => {
  const { cryptos, error, loading, lastUpdated } = useCryptoData();
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);

  const handleCardClick = useCallback((crypto: CryptoData) => {
    setSelectedCrypto(crypto);
  }, []);

  const filteredCryptos = useMemo(() => 
    cryptos.filter(crypto => crypto?.id && crypto?.image && crypto?.name), 
    [cryptos]
  );
  
  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <>
          <LastUpdatedText>
            Last updated: {lastUpdated?.toLocaleString() ?? 'Loading...'}
          </LastUpdatedText>
          <Grid container spacing={2}>
            {filteredCryptos.map((crypto, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={crypto.id}>
                <Fade in={!loading} timeout={500 + index * 300}>
                  <CryptoCard onClick={() => handleCardClick(crypto)}>
                    <Avatar src={crypto.image} alt={crypto.name} />
                    <Typography variant="h6">{crypto.symbol.toUpperCase()}</Typography>
                    <Typography variant="body2">
                      Worth per coin (USD): ${crypto.current_price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color={crypto.price_change_percentage_24h >= 0 ? 'primary' : 'error'}>
                      Change (24h): {crypto.price_change_percentage_24h.toFixed(2)}%
                    </Typography>
                  </CryptoCard>
                </Fade>
              </Grid>
            ))}
          </Grid>
          <AnimatePresence mode='wait'>
  {selectedCrypto && (
    <MoreInfo
      key={selectedCrypto.id} 
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
    >
      <InfoHeader variants={childVariants}>More Information</InfoHeader>
      <InfoItem variants={childVariants}>
        <strong>Name:</strong> <span>{selectedCrypto.name}</span>
      </InfoItem>
      <InfoItem variants={childVariants}>
        <strong>Symbol:</strong> <span>{selectedCrypto.symbol.toUpperCase()}</span>
      </InfoItem>
      <InfoItem variants={childVariants}>
        <strong>Current Price:</strong> <span>${selectedCrypto.current_price.toFixed(2)}</span>
      </InfoItem>
      <InfoItem variants={childVariants}>
        <strong>Price Change (24h):</strong> <span>{selectedCrypto.price_change_percentage_24h.toFixed(2)}%</span>
      </InfoItem>
    </MoreInfo>
  )}
</AnimatePresence>
        </>
      )}
    </Container>
  );
};

export default CryptoCurrency;