import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface AnimatedButtonProps extends ButtonProps {}

const AnimatedButton: React.FC<AnimatedButtonProps> = (props) => {
    const { children, className, ...buttonProps } = props;

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
        </Button>
    );
};

export default AnimatedButton;