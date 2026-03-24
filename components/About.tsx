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
    const ctx = gsap.context(() => {
      const titleSplit = new SplitText(".about-title", {
        type: "chars, words",
      });

      const paragraphSplit = new SplitText(".about-text", {
        type: "lines",
      });

      // Title animation
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

      // Text animation
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

      gsap.from(".about-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%", // when top of element is at 80% viewport height
          toggleActions: "play none none reset", // play on enter, reset on leave
        },
      });

      // Image animation
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
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-20 py-20"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl w-full">
        {/* LEFT - IMAGE */}
        <div className="about-image relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/stephano.jpg"
            alt="Stephano Fitness"
            fill
            className="object-cover hover:scale-140 duration-1500"
          />
        </div>

        {/* RIGHT - TEXT */}
        <div className="space-y-6 text-center md:text-left">
          {/* Title */}
          <h2 className="about-title font-modern-negra text-4xl md:text-6xl text-yellow-500">
            About Me
          </h2>

          {/* Subtitle */}
          <h3 className="about-title text-xl md:text-2xl font-serif italic text-white/80">
            My 6-Year Journey
          </h3>

          {/* Text */}
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
    </section>
  );
};

export default About;
