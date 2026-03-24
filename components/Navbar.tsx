"use client";

import { useState, useEffect } from "react";
import { navLinks } from "@/utils/navlinks";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Optional: GSAP for smooth background fade
  useEffect(() => {
    gsap.to("nav", {
      backgroundColor: scrolled ? "rgba(0,0,0,0.7)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
      duration: 0.5,
      ease: "power1.out",
    });
  }, [scrolled]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between p-4">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2">
          <Image
            src="/images/fitness.jpg"
            alt="Stephano Fitness Mentor Logo"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <p className="font-bold text-lg md:text-xl text-white">
            Stephano <span className="text-yellow-500">Fitness</span>
          </p>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 text-white">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={`#${link.id}`}
                className="hover:text-yellow-500 transition-colors"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <ul className="md:hidden flex flex-col bg-black/80 backdrop-blur-lg text-white p-6 gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={`#${link.id}`}
                onClick={() => setMobileOpen(false)}
                className="hover:text-yellow-500 transition-colors text-lg"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
