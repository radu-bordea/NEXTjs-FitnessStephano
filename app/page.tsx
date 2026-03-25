import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";


// Register GSAP plugins (required for them to work)
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Programs/>
      <About/>
      <div className="h-[200vh] bg-black"></div>
    </main>
  );
}
