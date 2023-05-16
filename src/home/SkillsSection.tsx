import React from 'react';

import { Grid, Typography } from '@mui/material';

import { StyledPaper, LightTypography } from './StyledComponents';
const skills = [
  'React',
  'Node.js',
  'Python', 
  'MongoDB',
  'Firebase',
  'Express',
];

export const SkillsSection = () => {
  return (
    <>
      <LightTypography variant="h5" gutterBottom>Skills</LightTypography>
      <Grid container spacing={3}>
        {skills.map((skill, index) => (
          <Grid key={index} item xs={6} sm={4} md={2}>
            <StyledPaper elevation={0} variant="outlined">
              <Typography variant="subtitle1" align="center">{skill}</Typography>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};