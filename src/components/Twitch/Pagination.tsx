import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { debounce } from 'lodash';

interface PaginationProps {
  currentPage: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  handlePreviousPage,
  handleNextPage,
}) => {
  // Apply debounce to handlePreviousPage and handleNextPage
  const debouncedHandlePreviousPage = debounce(handlePreviousPage, 250);
  const debouncedHandleNextPage = debounce(handleNextPage, 250);

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <IconButton
        disabled={currentPage === 1}
        onClick={debouncedHandlePreviousPage}
        color="secondary"
      >
        <ArrowBackIos />
      </IconButton>
      <Typography variant="h6" component="span">
        &nbsp;Page {currentPage}&nbsp;
      </Typography>
      <IconButton onClick={debouncedHandleNextPage} color="secondary">
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default Pagination;