import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import validator from "validator";
import { ApiResponse } from "./VirusTotalTypes";
import Report from "./Report";

const VirusTotalCheck = () => {
  const [domain, setDomain] = useState("");
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
      const response = await axios.get(url);
      setReport(response.data);
    } catch (error) {
      setError("Error during VirusTotal API request");
      setReport(null);
    }
    setLoading(false);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    checkDomain();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
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
            onSubmit={handleFormSubmit}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
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
              onClick={checkDomain}
              size="large"
              disabled={!isDomainValid(domain)}
              type="submit"
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