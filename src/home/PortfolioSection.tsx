import React from "react";
import { Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import { StyledCard, LightTypography } from './StyledComponents';

export const PortfolioSection = () => {
  return (
    <>
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
    </>
  );
};