import React from "react";
import { Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import { StyledPaper, LightTypography } from './StyledComponents';

export const SkillsSection = () => {
  return (
    <>
      <LightTypography variant="h5">Skills</LightTypography>
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
    </>
  );
};