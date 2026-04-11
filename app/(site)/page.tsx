import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import FormAuditServer from "@/components/FormAuditServer";
import Contact from "@/components/Contact";


// Register GSAP plugins (required for them to work)
gsap.registerPlugin(ScrollTrigger, SplitText);


export default function Home() {
  return (
    <main>
      <Hero />
      <Programs />
      <FormAuditServer />
      <About />
      <Contact />
    </main>
  );
}
