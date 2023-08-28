import React, { CSSProperties, useCallback, useMemo } from 'react';
import { Particles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Main } from 'tsparticles-engine';

interface BackgroundParticlesProps {
  style?: CSSProperties;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ style }) => {
  const particlesInit = useCallback(async (engine: Main) => {
    await loadFull(engine);
  }, []);

  const combinedStyle = useMemo(() => ({
    position: 'relative' as const,
    zIndex: -1,
    height: '100%',
    width: '100%',
    ...style,
  }), [style]);

  const particleOptions = useMemo(() => ({
    fpsLimit: 60,  // Reduced FPS for better performance
    interactivity: {
      events: {
        onClick: { enable: true, mode: 'push' },
        onHover: { enable: true, mode: 'repulse' },
        resize: true,
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      color: { value: '#ff5500' },
      links: { enable: false },
      collisions: { enable: true },
      move: {
        direction: 'top' as const,
        enable: true,
        outModes: { default: 'destroy' as const },
        random: true,
        speed: 5,
        straight: false,
      },
      number: {
        density: { enable: true, area: 400 },  // Reduced area for better performance
        value: 50,  // Reduced particle count for better performance
      },
      opacity: {
        value: 1,
        random: true,
        animation: { enable: false },  // Disabled animation for better performance
      },
      shape: { type: 'circle' },
      size: {
        value: 4,
        random: { enable: true, minimumValue: 1 },
        animation: { enable: false },  // Disabled animation for better performance
      },
      twinkle: {
        particles: { enable: false },  // Disabled twinkle for better performance
      },
    },
    detectRetina: true,
  }), []);

  return (
    <Particles
      style={combinedStyle}
      id="tsparticles"
      init={particlesInit}
      options={particleOptions}
    />
  );
};

export default BackgroundParticles;
