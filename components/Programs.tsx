"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { programs } from "@/utils/program";
import { FaCheck } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Programs = () => {
  const programsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".program-card");

      gsap.from(".section-title", {
        scrollTrigger: {
          trigger: programsRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".section-subtitle", {
        scrollTrigger: {
          trigger: programsRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      });

      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
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
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="section-title font-modern-negra text-4xl md:text-6xl text-yellow-500">
          Coaching Plans
        </h2>

        <p className="section-subtitle text-white/80 text-lg md:text-xl max-w-3xl mx-auto mt-4">
          Choose the level of guidance that matches your goals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {programs.map((program, index) => {
          const Icon = program.icon;

          return (
            <div
              key={index}
              className={`program-card relative bg-black/40 backdrop-blur-md rounded-2xl p-8 border transition-all duration-300 hover:scale-[1.02]
              ${
                index === 1
                  ? "border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.15)]"
                  : "border-white/10 hover:border-yellow-500"
              }`}
            >
              {/* Badge */}
              <span className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500 text-black">
                {program.badge}
              </span>

              <div className="flex items-center justify-center w-20 h-20 mb-6 mx-auto rounded-full bg-yellow-500/10 text-yellow-500 text-4xl">
                <Icon />
              </div>

              <h3 className="text-2xl font-bold text-white text-center mb-3">
                {program.title}
              </h3>

              <p className="text-white/70 text-center mb-8">
                {program.description}
              </p>

              <ul className="space-y-4">
                {program.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <FaCheck className="text-yellow-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full mt-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition">
                Get Started
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Programs;