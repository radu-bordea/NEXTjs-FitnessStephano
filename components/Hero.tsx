"use client";

import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // SplitText animations
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    // Parallax background effect (optional subtle vertical shift)
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        backgroundPosition: "50% 30%", // moves from center 50% to 30% vertical
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, [isMobile]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="noisy flex flex-col items-center justify-center"
    >
      {/* Overlay for subtle background visibility */}
      <div className="hero-overlay" />

      {/* Content above overlay */}
      <div className="relative z-10 text-center px-6 md:px-20">
        {/* Animated gradient title */}
        <h1 className="title uppercase font-bold text-4xl md:text-6xl tracking-wide leading-tight text-gradient">
          Build It Up
        </h1>

        {/* Tagline / subtitle */}
        <p className="subtitle mt-4 md:mt-6 text-yellow-500 font-serif text-xl md:text-3xl italic max-w-3xl mx-auto">
          Lift the Spirit <br /> of Self
        </p>

        {/* Supporting paragraph */}
        <p className="mt-4 md:mt-6 text-white text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Learn how to train like professionals. With a long history of fitness, I’ll guide you step by step to achieve your maximum potential. Keep growing, stay motivated, and unlock your true strength.
        </p>

        {/* Call-to-action button */}
        <Link
          href="#cocktails"
          className="inline-block mt-6 px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition-colors shadow-lg"
        >
          View Programs & Plans
        </Link>
      </div>
    </section>
  );
};

export default Hero;