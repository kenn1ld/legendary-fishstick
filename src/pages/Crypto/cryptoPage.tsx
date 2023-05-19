import React from 'react';

import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

import CryptoCurrency from '../../components/Crypto/CryptoCurrency';

const SectionWrapper = styled('div')({
  marginBottom: '2rem',
});

const SectionTitle = styled(Typography)({
  textAlign: 'center',
  paddingTop: '2rem',
  paddingBottom: '3rem',
  fontSize: '2rem',
  fontWeight: 'bold',
});

const ApiPage = () => {
  return (
    <Container maxWidth="lg">
      <SectionWrapper>
        <SectionTitle variant="h4">CryptoCurrency</SectionTitle>
        <CryptoCurrency />
      </SectionWrapper>
    </Container>
  );
};

export default ApiPage;