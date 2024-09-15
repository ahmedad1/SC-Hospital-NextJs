"use client";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import particlesConfigs from "./configs";
import { useCallback } from "react";
export default function ParticlesComponent() {
  const init = useCallback(async (engine) => {
    await loadSlim(engine);
  });
  return (
    <Particles
      init={init}
      id="tsparitcles"
      options={particlesConfigs}
    />
  );
}
