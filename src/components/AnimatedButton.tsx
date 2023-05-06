// src/components/AnimatedButton.tsx
import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';

interface AnimatedButtonProps extends ButtonProps {}

const AnimatedButton: React.FC<AnimatedButtonProps> = (props) => {
    const { children, className, ...buttonProps } = props;

    // Define the particle animation
    const particleAnimation = {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
    };

    return (
        <Button
            {...buttonProps}
            className={`animated-button ${className}`}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderColor: 'white',
                borderStyle: 'solid',
                borderWidth: '2px',
            }}
        >
            {children}
            <motion.svg
                width="100%"
                height="100%"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: -1,
                }}
                viewBox="0 0 100 100"
            >
                <motion.path
                    d="M0,0 L100,0 L100,100 L0,100 Z"
                    stroke="limegreen"
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial="initial"
                    animate="animate"
                    variants={particleAnimation}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                />
            </motion.svg>
        </Button>
    );
};

export default AnimatedButton;