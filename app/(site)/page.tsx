import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import FormAuditServer from "@/components/FormAuditServer";
import Contact from "@/components/Contact";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default async function Home() {
  const { userId, has } = await auth();

  const isStandard = userId ? has({ plan: "standard" }) : false;
  const isPremium = userId ? has({ plan: "premium" }) : false;
  const hasNoPlan = userId && !isStandard && !isPremium;

  return (
    <main>
      {/* Banner for signed in users with no plan */}
      {hasNoPlan && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-yellow-500 text-black py-3 px-6 flex items-center justify-between">
          <p className="font-semibold text-sm">
            You don't have an active plan yet — unlock full access today!
          </p>
          <Link
            href="/pricing"
            className="px-4 py-1.5 bg-black text-yellow-500 rounded-lg text-sm font-bold hover:bg-black/80 transition-colors"
          >
            View Plans →
          </Link>
        </div>
      )}

      <Hero />
      <Programs />
      <FormAuditServer />
      <About />
      <Contact />
    </main>
  );
}