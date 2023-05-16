// BackgroundParticles.tsx
import React, { CSSProperties, useCallback } from 'react';
import { Main, Container } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

 interface BackgroundParticlesProps {
  style?: CSSProperties;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ style }) => {
  const particlesInit = useCallback(async (engine: Main) => {
    console.log(engine);
    await loadFull(engine);
  }, []);
    

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container);
  }, []);

  const particleOptions = {
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ff9800", // Fire-like color
    },
    links: {
      enable: false,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none" as const, // Fire-like movement direction
      enable: true,
      outModes: {
        default: "destroy" as const,
      },
      random: true,
      speed: 1.5, // Adjust speed for fire-like movement
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 200, // Increase the particles number for a denser fire
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: 3, // Adjust size for fire-like appearance
      random: {
        enable: true,
        minimumValue: 1,
      },
      animation: {
        enable: true,
        speed: 3, // Animate particles size for dynamic fire-like effect
        minimumValue: 0.1,
        sync: false,
      },
    },
  },
  detectRetina: true,
};

  return (
  <Particles
    style={{
      position: "relative",
      zIndex: -1,
      height: "100%",
      width: "100%",
      ...style,
    }}
    id="tsparticles"
    init={particlesInit}
    loaded={particlesLoaded}
    options={particleOptions}
  />
);
};

export default BackgroundParticles;