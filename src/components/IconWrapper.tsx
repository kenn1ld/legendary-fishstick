import { Box, IconProps } from '@mui/material';
import { motion } from 'framer-motion';
import React, { ReactNode, useMemo } from 'react';

type IconWrapperProps = {
  color: string;
  children: ReactNode;
} & Omit<IconProps, 'color'>;

const iconMotionConfig = {
  initial: { opacity: 0, scale: 0.9, y: -5 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 5 },
  transition: { duration: 0.5 },
};

const IconWrapper: React.FC<IconWrapperProps> = ({ children, color, ...rest }) => {
  const iconStyles = useMemo(() => {
    return {
      color: color,
      textShadow: `1px 1px 2px ${color}, -1px -1px 2px ${color}`,
    };
  }, [color]);

  return (
    <motion.div style={iconStyles} {...iconMotionConfig}>
      <Box component="span" {...rest}>
        {children}
      </Box>
    </motion.div>
  );
};

export default IconWrapper;