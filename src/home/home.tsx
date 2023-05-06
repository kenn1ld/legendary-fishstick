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
import { motion } from "framer-motion";

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

const bounceTransition = {
  y: {
    duration: 0.4,
    yoyo: Infinity,
    ease: "easeInOut",
  },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const scaleUp = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const staggeredChildren = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const slideRight = {
  initial: { x: -100 },
  animate: {
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

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
                  <motion.div initial="initial" animate="animate" variants={scaleUp}>
                    <LargeAvatar src="https://via.placeholder.com/150" />
                  </motion.div>
                  <motion.div initial="initial" animate="animate" variants={fadeIn}>
                    <WelcomeText variant="h4">
                      Welcome, {user ? user.name : "Unknown"}!
                    </WelcomeText>
                    <LightTypography variant="subtitle1">
                      Full Stack Developer
                    </LightTypography>
                  </motion.div>
                  <Box mt={2}>
                    <motion.div
                      initial="initial"
                      animate="animate"
                      variants={slideRight}
                    >
                      <IconButton>
                        <GitHubIcon sx={{ color: "white" }} />
                      </IconButton>
                      <IconButton>
                        <LinkedInIcon sx={{ color: "white" }} />
                      </IconButton>
                      <IconButton>
                        <EmailIcon sx={{ color: "white" }} />
                      </IconButton>
                    </motion.div>
                  </Box>
                </Col>
              </Row>
            </Container>
          </DarkBox>

          <Box mt={4}>
            <Container>
              <motion.div initial="initial" animate="animate" variants={fadeIn}>
                <LightTypography variant="h5">Skills</LightTypography>
              </motion.div>
              <motion.div initial="initial" animate="animate" variants={staggeredChildren}>
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
                      <motion.div
                        initial="initial"
                        animate="animate"
                        variants={slideRight}
                      >
                        <StyledPaper elevation={1}>
                          <Typography variant="subtitle1">{skill}</Typography>
                        </StyledPaper>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            </Container>
          </Box>

          <Box mt={4}>
            <Container>
              <motion.div initial="initial" animate="animate" variants={fadeIn}>
                <LightTypography variant="h5">Portfolio</LightTypography>
              </motion.div>
              <motion.div initial="initial" animate="animate" variants={staggeredChildren}>
                <Row>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Col key={index} xs={12} sm={6} md={4} className="mb-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={bounceTransition}
                      >
                        <StyledCard>
                          <Typography variant="h6">Project Title</Typography>
                          <Typography variant="body1">
                            Project description
                          </Typography>
                        </StyledCard>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            </Container>
          </Box>

          <Box mt={4} mb={4}>
            <Container>
              <motion.div initial="initial" animate="animate" variants={fadeIn}>
                <LightTypography variant="h5">Get in Touch</LightTypography>
              </motion.div>
              <motion.div initial="initial" animate="animate" variants={slideRight}>
                <Typography variant="body1">
                  Email: {user ? user.email : "example@example.com"}
                </Typography>
              </motion.div>
            </Container>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Home;