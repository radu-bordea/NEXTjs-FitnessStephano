import { FaRocket, FaFire, FaCrown } from "react-icons/fa";

export const programs = [
  {
    icon: FaRocket,
    title: "Starter Plan",
    badge: "$19 / month",
    description:
      "Perfect for beginners who want a simple, structured plan to kickstart their fitness journey.",
    features: [
      "Goal & fitness assessment form",
      "Basic workout PDF delivered by email",
      "Structured beginner-friendly training",
      "Standard email support",
    ],
  },
  {
    icon: FaFire,
    title: "Standard Plan",
    badge: "$39 / month",
    description:
      "A personalised fitness and nutrition system tailored to your goals, schedule, and lifestyle.",
    features: [
      "Detailed onboarding form",
      "Personalised workout plan",
      "Custom meal plan",
      "Faster email support",
      "Adjustments based on your needs",
    ],
  },
  {
    icon: FaCrown,
    title: "Professional Plan",
    badge: "$79 / month",
    description:
      "Full premium coaching with direct support, accountability, and continuous progress optimisation.",
    features: [
      "Everything in Standard",
      "1-on-1 coaching via Instagram / WhatsApp",
      "Video exercise demonstrations",
      "Progress tracking & plan adjustments",
      "Priority support",
    ],
  },
];