import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface PaginationProps {
  currentPage: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  handlePreviousPage,
  handleNextPage,
}) => (
  <Box mt={4} display="flex" justifyContent="center">
    <IconButton
      disabled={currentPage === 1}
      onClick={handlePreviousPage}
      color="secondary"
    >
      <ArrowBackIos />
    </IconButton>
    <Typography variant="h6" component="span">
      &nbsp;Page {currentPage}&nbsp;
    </Typography>
    <IconButton onClick={handleNextPage} color="secondary">
      <ArrowForwardIos />
    </IconButton>
  </Box>
);

export default Pagination;