import React from 'react';

import EmailIcon from '@mui/icons-material/Email';
import { Box, Button, Link } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled, useTheme } from '@mui/system';

import { LightTypography } from './StyledComponents';

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
}

interface ContactSectionProps {
  user: User | null;
}

const EmailIconWrapper = styled(EmailIcon)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ContactSection = ({ user }: ContactSectionProps) => {
  const theme: Theme = useTheme();

  return (
    <>
      <LightTypography variant="h5" gutterBottom>
        Get in Touch
      </LightTypography>
      <Box component="div">
        You can contact me at
        <Link
          href={`mailto:${user ? user.email : 'example@example.com'}`}
          variant="body1"
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <EmailIconWrapper
              sx={{
                marginRight: theme.spacing(1),
                color: theme.palette.primary.main,
              }}
            />
            {user ? user.email : 'example@example.com'}
          </Box>
        </Link>
      </Box>
      <Box mt={2}>
        <Button
          variant="outlined"
          color="primary"
          href={`mailto:${user ? user.email : 'example@example.com'}`}
          startIcon={<EmailIcon />}
        >
          Send a message
        </Button>
      </Box>
    </>
  );
};