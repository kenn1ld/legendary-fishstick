// Logo.tsx
import React from 'react';
import { Box, useTheme } from '@mui/material';
import logo from '../assets/brand2.png';
import { motion } from 'framer-motion';


const Logo: React.FC = () => {
  const theme = useTheme();
  
const borderAnimation = {
  initial: {
    borderColor: theme.palette.primary.main,
    boxShadow: "0 4px 6px rgba(0, 355, 0, 1)",
  },
  loop: {
    borderColor: theme.palette.secondary.main,
    boxShadow: "0 8px 12px rgba(0, 355, 0, 0.5)",
  },
    };
    
  return (
    <Box display="flex" justifyContent="center" mb={4}>
      <motion.img
  src={logo}
  alt="My App Logo"
  width="300"
  height="300"
  style={{
    borderRadius: "50%",
    border: '2px solid',
  }}
  initial="initial"
  animate="loop"
  variants={borderAnimation}
  transition={{
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse",
  }}
/>
    </Box>
  );
};

export default Logo;