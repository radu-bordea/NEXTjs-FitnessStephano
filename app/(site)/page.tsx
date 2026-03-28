import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import FormAudit from "@/components/FormAudit";
import Contact from "@/components/Contact";


// Register GSAP plugins (required for them to work)
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  return (
    <main>
      <Hero />
      <Programs/>
      <FormAudit/>
      <About/>
      <Contact/>
    </main>
  );
}
