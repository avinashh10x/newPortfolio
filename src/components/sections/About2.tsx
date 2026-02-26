import AboutIntro from "./about/AboutIntro";
import AboutJourney from "./about/AboutOrigin";
import AboutNow from "./about/AboutNow";
import AboutTechStack from "./about/AboutTechStack";
import Divider from "./about/Divider";

export default function About2() {
  return (
    <div className="relative bg-background">
      {/* subtle dot texture matching hero */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--primary) 0.5px, transparent 0.5px)",
          backgroundSize: "10px 10px",
        }}
      />

      <div className="relative z-10">
        <AboutIntro />
   
        <AboutJourney />
      
        <AboutNow />
      
        <AboutTechStack />
      </div>
    </div>
  );
}
