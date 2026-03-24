import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";


// Register GSAP plugins (required for them to work)
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="h-[200vh] bg-black"></div>
    </main>
  );
}
