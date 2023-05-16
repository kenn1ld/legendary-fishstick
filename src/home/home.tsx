import React, { useState, useEffect } from 'react';

import {
  Box,
  CircularProgress,
  CssBaseline,
} from '@mui/material';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import BackgroundParticles from '../components/BackgroundParticles';

import { AvatarSection } from './AvatarSection';
import { ContactSection } from './ContactSection';
import { PortfolioSection } from './PortfolioSection';
import { SkillsSection } from './SkillsSection';
import { DarkBox } from './StyledComponents';

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
}
interface HomeProps {
  user: User | null;
}

function Home({ user }: HomeProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [user]);

  return (
    <Box>
      <BackgroundParticles />
      <CssBaseline />
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DarkBox>
            <Container>
              <AvatarSection user={user} />
            </Container>
          </DarkBox>
          <Box mt={4}>
            <Container>
              <SkillsSection />
            </Container>
          </Box>
          <Box mt={4}>
            <Container>
              <PortfolioSection />
            </Container>
          </Box>
          <Box mt={4} mb={4}>
            <Container>
              <ContactSection user={user} />
            </Container>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Home;