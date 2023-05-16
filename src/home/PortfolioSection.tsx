// PortfolioSection.tsx
import React from 'react';

import { Grid, Typography } from '@mui/material';

import { StyledCard, LightTypography } from './StyledComponents';

const projects = [
  { title: 'Project Title 1', description: 'Project 1 description' },
  { title: 'Project Title 2', description: 'Project 2 description' },
  { title: 'Project Title 3', description: 'Project 3 description' },
  { title: 'Project Title 4', description: 'Project 4 description' },
  { title: 'Project Title 5', description: 'Project 5 description' },
  { title: 'Project Title 6', description: 'Project 6 description' },
];

export const PortfolioSection = () => {
  return (
    <>
      <LightTypography variant="h5" gutterBottom>
        Portfolio
      </LightTypography>
      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <StyledCard>
              <Typography variant="h6" gutterBottom>
                {project.title}
              </Typography>
              <Typography variant="body1">{project.description}</Typography>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};