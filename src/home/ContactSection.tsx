import React from "react";
import { Typography } from "@mui/material";
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

export const ContactSection = ({ user }: ContactSectionProps) => {
  return (
    <>
      <LightTypography variant="h5">Get in Touch</LightTypography>
      <Typography variant="body1">
        Email: {user ? user.email : "example@example.com"}
      </Typography>
    </>
  );
};