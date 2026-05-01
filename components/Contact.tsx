"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const Contact = () => {
  const contactRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".contact-card", {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      id="contact"
      ref={contactRef}
      className="flex items-center justify-center px-6 md:px-20 py-20"
    >
      <div className="max-w-5xl w-full text-center space-y-10">
        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-modern-negra text-yellow-500">
          Contact Me
        </h2>

        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
          Have questions, want coaching, or need a form audit? Reach out anytime.
        </p>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
          {/* Email */}
          <div className="contact-card bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <Mail className="mx-auto text-yellow-500 mb-3" size={28} />
            <h3 className="text-white font-semibold mb-2">Email</h3>
            <a
              href="mailto:stephanokanyana@gmail.com"
              className="text-white/70 hover:text-yellow-500 transition"
            >
              Email Me
            </a>
          </div>

          {/* Phone */}
          <div className="contact-card bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <Phone className="mx-auto text-yellow-500 mb-3" size={28} />
            <h3 className="text-white font-semibold mb-2">Phone</h3>
            <a
              href="tel:+4773512456"
              className="text-white/70 hover:text-yellow-500 transition"
            >
              Call
            </a>
          </div>

          {/* Instagram */}
          <div className="contact-card bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <FaInstagram className="mx-auto text-yellow-500 mb-3 text-3xl" />
            <h3 className="text-white font-semibold mb-2">Instagram</h3>
            <a
              href="https://instagram.com/stephanofitness"
              target="_blank"
              className="text-white/70 hover:text-yellow-500 transition"
            >
              Follow
            </a>
          </div>

          {/* TikTok */}
          <div className="contact-card bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <FaTiktok className="mx-auto text-yellow-500 mb-3 text-3xl" />
            <h3 className="text-white font-semibold mb-2">TikTok</h3>
            <a
              href="https://tiktok.com/@YOURUSERNAME"
              target="_blank"
              className="text-white/70 hover:text-yellow-500 transition"
            >
              Watch
            </a>
          </div>

          {/* Location */}
          <div className="contact-card bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <MapPin className="mx-auto text-yellow-500 mb-3" size={28} />
            <h3 className="text-white font-semibold mb-2">Location</h3>
            <p className="text-white/70">Online Worldwide 🌍</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <a
            href="mailto:stephano.fitness@gmail.com"
            className="inline-block px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition"
          >
            Start Coaching
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;