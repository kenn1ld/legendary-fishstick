import React from "react";
import CryptoCurrency from "../components/CryptoCurrency";
import TwitchApi from "../components/Twitch/Twitch";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import VirusTotalCheck from "components/VirusTotal/VirusTotalCheck";

const SectionWrapper = styled("div")({
  marginBottom: "2rem",
});

const SectionTitle = styled(Typography)({
  textAlign: "center",
  paddingTop: "2rem",
  paddingBottom: "3rem",
  fontSize: "2rem",
  fontWeight: "bold",
});

const ApiPage = () => {
  return (
    <Container maxWidth="lg">
      <SectionWrapper>
        <SectionTitle variant="h4">CryptoCurrency</SectionTitle>
        <CryptoCurrency />
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle variant="h4">Twitch</SectionTitle>
        <TwitchApi />
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle variant="h4">Virus Total</SectionTitle>
        <VirusTotalCheck />
      </SectionWrapper>
    </Container>
  );
};

export default ApiPage;