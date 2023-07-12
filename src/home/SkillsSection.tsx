import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { StyledPaper, LightTypography } from './StyledComponents';
import { motion } from 'framer-motion';

const skills = [
  'React',
  'Node.js',
  'Python',
  'MongoDB',
  'Firebase',
  'Express',
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
  'C++',
  'C',
];

const skillVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  }),
};

export const SkillsSection = () => {
  const [rotated, setRotated] = useState(Array(skills.length).fill(false));

  const handleClick = (index: number) => {
    const newRotated = [...rotated];
    newRotated[index] = !newRotated[index];
    setRotated(newRotated);
  };

  return (
    <>
      <LightTypography variant="h5" gutterBottom>
        Skills
      </LightTypography>
      <Grid container spacing={3}>
        {skills.map((skill, index) => (
          <Grid key={index} item xs={6} sm={4} md={2}>
            <motion.div
              custom={index}
              initial="hidden"
              animate="visible"
              variants={skillVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              style={{ cursor: 'pointer' }}
            >
              <StyledPaper
                elevation={0}
                variant="outlined"
                sx={{
                  borderRadius: '15px',
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transform: rotated[index] ? 'rotateY(180deg)' : 'none',
                  transition: 'transform 1s, background-image 1s',
                  border: '2px solid transparent',
                  borderColor: 'limegreen',
                  animation: 'borderPulse 2s infinite',
                }}
                onClick={() => handleClick(index)}
              >
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontWeight: 'bold',
                    color: '#fff',
                    backfaceVisibility: 'hidden',
                    position: 'absolute',
                    width: '100%',
                  }}
                >
                  {skill}
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontWeight: 'bold',
                    color: '#fff',
                    backfaceVisibility: 'hidden',
                    position: 'absolute',
                    width: '100%',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {/* Replace the text below with your content */}
                  Backside content for {skill}
                </Typography>
              </StyledPaper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
