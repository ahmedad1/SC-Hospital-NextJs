import About from "./About/About";
import FeaturesSection from "./FeaturesSection/FeaturesSection";
import LandingSection from "./LandingSection/LandingSection";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";


export default function Unauth() {
  return (
    <>
      <LandingSection />
      <FeaturesSection />
      <About />
      <Login/>
      <SignUp/>
    </>
  );
}
