import { Box, IconProps } from '@mui/material';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import React from 'react';
type IconWrapperProps = {
  color: string;
  children: ReactNode;
} & Omit<IconProps, 'color'>;

const IconWrapper: React.FC<IconWrapperProps> = ({ children, color, ...rest }) => (
  <motion.div
    style={{
      color: color,
      textShadow: `1px 1px 2px ${color}, -1px -1px 2px ${color}`,
    }}
    initial={{ opacity: 0, scale: 0.9, y: -5 }}
    animate={{
      opacity: 1,
      scale: 1,
      y: 0,
    }}
    exit={{
      opacity: 0,
      scale: 0.9,
      y: 5,
    }}
    transition={{ duration: 0.5 }}
  >
    <Box component="span" {...rest}>
      {children}
    </Box>
  </motion.div>
);

export default IconWrapper;