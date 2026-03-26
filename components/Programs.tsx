"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { programs } from "@/utils/program";

gsap.registerPlugin(ScrollTrigger);

const Programs = () => {
  const programsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".program-card");

      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });
    }, programsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="programs"
      ref={programsRef}
      className="min-h-screen px-6 md:px-20 py-20"
    >
      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center space-y-6 mb-16">
        <h2 className="font-modern-negra text-4xl md:text-6xl text-yellow-500">
          My Mission
        </h2>

        <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
          I’m not here to give you a generic workout plan. I’m here to give you
          the tools to master your body.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {programs.map((program, index) => {
          const Icon = program.icon;

          return (
            <div
              key={index}
              className="program-card group bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-yellow-500 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-20 h-20 mb-6 mx-auto rounded-full bg-yellow-500/10 text-yellow-500 text-4xl transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-black">
                <Icon />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 text-center">
                {program.title}
              </h3>

              <p className="text-white/70 leading-relaxed text-center">
                {program.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* FINAL MESSAGE */}
      <div className="mt-20 text-center max-w-3xl mx-auto">
        <p className="text-yellow-500 text-xl md:text-2xl font-semibold">
          My goal is simple:
        </p>

        <p className="text-white text-lg md:text-xl mt-4 leading-relaxed">
          To turn your gym time into the beach body you’ve always been looking
          for.
        </p>
      </div>
    </section>
  );
};

export default Programs;
