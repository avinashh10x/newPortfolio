import AboutIntro from "./about/AboutIntro";
import AboutJourney from "./about/AboutOrigin";
import AboutNow from "./about/AboutNow";
import AboutTechStack from "./about/AboutTechStack";
import Divider from "./about/Divider";

export default function About2() {
  return (
    <div className="relative bg-background">
      
      <div className="relative z-10 ">
        <AboutIntro />
   
        {/* <AboutJourney />
      
        <AboutNow /> */}
        {/* <AboutTechStack /> */}
      
      </div>
    </div>
  );
}
