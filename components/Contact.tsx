"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const Contact = () => {
  const contactRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".contact-card", {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      id="contact"
      ref={contactRef}
      className="py-24 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-modern-negra text-yellow-500">
          Contact Me
        </h2>

        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mt-4">
          Have questions, want coaching, or need a form audit? Reach out anytime.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-14">
          {[
            {
              icon: <Mail size={30} />,
              label: "Email",
              link: "mailto:stephanokanyana@gmail.com",
              text: "Email Me",
            },
            {
              icon: <Phone size={30} />,
              label: "Phone",
              link: "tel:+4773512456",
              text: "Call",
            },
            {
              icon: <FaInstagram className="text-3xl" />,
              label: "Instagram",
              link: "https://instagram.com/stephanofitness",
              text: "Follow",
            },
            {
              icon: <FaTiktok className="text-3xl" />,
              label: "TikTok",
              link: "https://tiktok.com/@YOURUSERNAME",
              text: "Watch",
            },
            {
              icon: <MapPin size={30} />,
              label: "Location",
              text: "Online Worldwide 🌍",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="contact-card min-h-55 bg-black/30 border border-white/10 rounded-2xl backdrop-blur-lg p-6 flex flex-col justify-between items-center hover:border-yellow-500/40 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-yellow-500">{item.icon}</div>

              <h3 className="text-white font-semibold text-lg">
                {item.label}
              </h3>

              {item.link ? (
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="px-6 py-2 border border-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-500 hover:text-black transition-all"
                >
                  {item.text}
                </a>
              ) : (
                <p className="text-white/70 text-sm">{item.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;