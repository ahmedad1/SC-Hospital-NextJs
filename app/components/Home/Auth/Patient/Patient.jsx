import React from "react";

import ParticlesComponent from "./Particles/ParticlesComponent";
import FeaturesSection from "../../Unauth/FeaturesSection/FeaturesSection";
import About from "../../Unauth/About/About";
import Landing from "./Landing/Landing";

export default function Auth() {
  return (
    <>
      <Landing />
      <br /><br /><br /><br /><br />
      <FeaturesSection className="mt-5" />
      <About/>
      <br /><br /><br />
    </>
  );
}
