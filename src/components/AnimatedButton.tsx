import React, { useMemo } from "react";

import { Button, ButtonProps } from "@mui/material";

type AnimatedButtonProps = ButtonProps;

const AnimatedButton: React.FC<AnimatedButtonProps> = (props) => {
  const { children, className, ...buttonProps } = props;

  const animatedButtonStyle = useMemo(() => {
    return {
      position: "relative",
      overflow: "hidden",
      borderColor: "white",
      borderStyle: "solid",
      borderWidth: "2px",
    };
  }, []);

  return (
    <Button
      {...buttonProps}
      className={`animated-button conic ${className}`}
      sx={animatedButtonStyle}
    >
      {children}
    </Button>
  );
};

export default AnimatedButton;
