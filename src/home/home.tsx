import React, { useState, useEffect } from "react";
import {
  Avatar,
  Typography,
  IconButton,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CssBaseline } from "@mui/material";
interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
}
interface HomeProps {
  user: User | null;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const DarkBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  width: "100%",
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

const LightTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(1),
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

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
      <CssBaseline />
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DarkBox>
            <Container>
              <Row className="justify-content-center">
                <Col xs={12} md={6} className="text-center">
                  <LargeAvatar src="https://via.placeholder.com/150" />
                  <WelcomeText variant="h4">
                    Welcome, {user ? user.name : "Unknown"}!
                  </WelcomeText>
                  <LightTypography variant="subtitle1">
                    Full Stack Developer
                  </LightTypography>
                  <Box mt={2}>
                    <IconButton>
                      <GitHubIcon sx={{ color: "white" }} />
                    </IconButton>
                    <IconButton>
                      <LinkedInIcon sx={{ color: "white" }} />
                    </IconButton>
                    <IconButton>
                      <EmailIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Box>
                </Col>
              </Row>
            </Container>
          </DarkBox>

          <Box mt={4}>
            <Container>
              <LightTypography variant="h5">
                Skills
              </LightTypography>
              <Row>
                {[
                  "React",
                  "Node.js",
                  "Python",
                  "Django",
                  "MongoDB",
                  "Firebase",
                ].map((skill, index) => (
                  <Col key={index} xs={6} sm={4} md={2} className="mb-3">
                    <StyledPaper elevation={1}>
                      <Typography variant="subtitle1">{skill}</Typography>
                    </StyledPaper>
                  </Col>
                ))}
              </Row>
            </Container>
          </Box>

          <Box mt={4}>
            <Container>
              <LightTypography variant="h5">Portfolio</LightTypography>
              <Row>
                {Array.from({ length: 6 }).map((_, index) => (
                  <Col key={index} xs={12} sm={6} md={4} className="mb-3">
                    <StyledCard>
                      <Typography variant="h6">Project Title</Typography>
                      <Typography variant="body1">
                        Project description
                      </Typography>
                    </StyledCard>
                  </Col>
                ))}
              </Row>
            </Container>
          </Box>

          <Box mt={4} mb={4}>
            <Container>
              <LightTypography variant="h5" >
                Get in Touch
              </LightTypography>
              <Typography variant="body1">
                Email: {user ? user.email : "example@example.com"}
              </Typography>
            </Container>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Home;