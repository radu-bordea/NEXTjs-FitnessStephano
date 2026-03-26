"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

useGSAP(() => {
  document.fonts.ready.then(() => {
    const ctx = gsap.context(() => {
      const titleSplit = new SplitText(".about-title", {
        type: "chars, words",
      });

      const paragraphSplit = new SplitText(".about-text", {
        type: "lines",
      });

      const ahaSplit = new SplitText(".aha-text", {
        type: "lines",
      });

      gsap.from(titleSplit.chars, {
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%",
        },
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.03,
      });

      gsap.from(paragraphSplit.lines, {
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 85%",
        },
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.15,
      });

      gsap.from(ahaSplit.lines, {
        scrollTrigger: {
          trigger: ".aha-section",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
      });

      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 85%",
        },
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "expo.out",
      });
    }, aboutRef);

    return () => ctx.revert();
  });
}, []);

  return (
    <section id="about" ref={aboutRef} className="min-h-screen  ">
      <div className="flex items-center justify-center px-6 md:px-10 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl w-full">
          {/* IMAGE */}
          <div className="about-image relative w-full h-100 md:h-125 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/stephano.jpg"
              alt="Stephano Fitness"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-110 duration-700"
            />
          </div>

          {/* TEXT */}
          <div className="space-y-6 text-center">
            {/* Title */}
            <h2 className="about-title font-modern-negra text-4xl md:text-6xl text-yellow-500">
              About Me
            </h2>

            <h3 className="about-title text-xl md:text-2xl font-serif italic text-white/80">
              My 6-Year Journey
            </h3>

            {/* Main story */}
            <div className="space-y-5 text-white text-lg md:text-xl leading-relaxed">
              <p className="about-text">
                Six years ago, I started my fitness journey for the same reasons
                many do: I wanted more confidence, better health, and to perform
                better in sports.
              </p>

              <p className="about-text">
                I spent years in and out of the gym, pushing heavy weights and
                following the ‘bro-science’ advice I saw online.
              </p>

              <p className="about-text">
                But something was off. Despite the heavy lifting and the hours
                spent in the gym, my body stayed flat.
              </p>

              <p className="about-text text-yellow-500 font-semibold">
                I wasn’t seeing the muscle gains or the transformation I was
                working so hard for.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 🔥 AHA MOMENT */}
      <div className="aha-section mt-8 space-y-4 border-l-4 border-yellow-500 pl-4 px-6 md:px-10 py-20 max-w-6xl text-center mx-auto">
        <h4 className="text-yellow-500 font-bold text-lg uppercase tracking-wide">
          The “Aha!” Moment
        </h4>

        <p className="aha-text text-white text-lg leading-relaxed">
          I realized that ‘moving the weight’ isn’t the same as ‘training the
          muscle.’ I shifted my focus from ego-lifting to form mastery.
        </p>

        <p className="aha-text text-white text-lg leading-relaxed">
          Once I mastered the ‘Wrong vs. Right’ of every movement, like setting
          my shoulders for lat pull-downs or leading with my elbows on lateral
          raises, everything changed.
        </p>

        <p className="aha-text text-yellow-500 font-semibold text-lg leading-relaxed">
          Not just my physique, but my discipline, my mental health, and my
          energy for my daily life.
        </p>
      </div>
    </section>
  );
};

export default About;
