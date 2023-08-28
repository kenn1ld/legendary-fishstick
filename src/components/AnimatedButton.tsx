import React, { useMemo, ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';

// Define type for AnimatedButton props by extending ButtonProps from MUI
interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode;
  className?: string;
}

/**
 * AnimatedButton Component
 *
 * This component extends the Material-UI Button component, adding custom animations
 * and styling to enhance the user experience.
 */
const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className, ...buttonProps }) => {
  const controls = useAnimation();

  // Define complex animation variants
  const variants = {
    initial: {
      scale: 1,
      rotate: 0,
      boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.2)',
      borderColor: 'white',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
    hover: {
      scale: 1.1,
      rotate: 15,
      boxShadow: '0px 0px 8px 2px rgba(0,0,0,0.2)',
      borderColor: '#FE6B8B',
      clipPath: 'polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)',
    },
    active: {
      scale: [0.95, 1.05, 0.95],
      rotate: [-10, 10, -10],
      boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.1)',
      transition: {
        scale: {
          yoyo: 2,
          duration: 0.3,
        },
        rotate: {
          yoyo: 2,
          duration: 0.3,
        },
      },
    },
  };

  // Use useMemo to memorize style for better performance
  const animatedButtonStyle = useMemo(
    () => ({
      position: 'relative',
      overflow: 'hidden',
      background: 'transparent',
      border: '2px solid white',
      borderRadius: '8px',
      color: 'white',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      padding: '12px 36px',
    }),
    []
  );

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap="active"
      variants={variants}
      animate={controls}
    >
      <Button
        // Spread additional ButtonProps to ensure extensibility
        {...buttonProps}
        // Add predefined and incoming classes
        className={`animated-button ${className}`}
        // Apply memorized style
        sx={animatedButtonStyle}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
