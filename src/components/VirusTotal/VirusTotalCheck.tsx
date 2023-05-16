import React, { useState, ChangeEvent, FormEvent } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import validator from 'validator';

import Report from './Report';
import { ApiResponse } from './VirusTotalTypes';

const VirusTotalCheck = () => {
  const [domain, setDomain] = useState('');
  const [report, setReport] = useState<null | ApiResponse>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleDomainChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDomain(event.target.value);
  };

  const isDomainValid = (domain: string) => {
    return validator.isFQDN(domain);
  };

  const checkDomain = async () => {
    setError(null);
    setLoading(true);
    const url = `/api/virustotal/${domain}`;
    try {
      const response = await axios.get<ApiResponse>(url);
      setReport(response.data);
    } catch (error) {
      setError('Error during VirusTotal API request');
      setReport(null);
    }
    setLoading(false);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await checkDomain();
    } catch (err) {
      setError('An error occurred while submitting the form.');
    }
  };

  const handleFormSubmitWrapper = (event: FormEvent) => {
    event.preventDefault();
    handleFormSubmit(event).catch(() => {
      setError('An error occurred while submitting the form.');
    });
  };

  return (
    <Box
      sx={{
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Box
            component="form"
            onSubmit={handleFormSubmitWrapper}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h4" gutterBottom>
              VirusTotal Domain Checker
            </Typography>
            <TextField
              label="Enter domain"
              value={domain}
              onChange={handleDomainChange}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              color="primary"
              variant="contained"
              size="large"
              disabled={!isDomainValid(domain)}
            >
            Check Domain
            </Button>
            {loading && (
              <Box sx={{ mt: 2, mb: 4 }}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              </Box>
            )}
          </Box>
          {report && <Report report={report} />}
        </motion.div>
      </Container>
    </Box>
  );
};

export default VirusTotalCheck;