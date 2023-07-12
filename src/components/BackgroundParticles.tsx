import React, { CSSProperties, useCallback, useMemo } from "react";
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Main } from "tsparticles-engine";

interface BackgroundParticlesProps {
  style?: CSSProperties;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ style }) => {
  const particlesInit = useCallback(async (engine: Main) => {
    await loadFull(engine);
  }, []);

  const combinedStyle = useMemo(
    () => ({
      position: "relative" as const,
      zIndex: -1,
      height: "100%",
      width: "100%",
      ...style,
    }),
    [style]
  );

  const particleOptions = useMemo(() => ({
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#ff5500" },
      links: { enable: false },
      collisions: { enable: true },
      move: {
        direction: "top" as const,
        enable: true,
        outModes: { default: "destroy" as const },
        random: true,
        speed: 5,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 100,
      },
      opacity: {
        value: 1,
        random: true,
        animation: { enable: true, speed: 2, minimumValue: 0.3, sync: false },
      },
      shape: { type: "circle" },
      size: {
        value: 4,
        random: { enable: true, minimumValue: 1 },
        animation: { enable: true, speed: 5, minimumValue: 0.1, sync: false },
      },
      twinkle: {
        particles: { enable: true, frequency: 0.05, opacity: 1 },
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
