"use client";

import { submitAudit } from "@/app/actions/submitAudit";
import { useTransition } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const FormAudit = () => {
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();

  const userEmail = user?.emailAddresses[0]?.emailAddress ?? "";
  const userName = user?.fullName ?? "";

  return (
    <section
      id="audit"
      className="min-h-screen flex items-center justify-center px-6 md:px-20 py-20"
    >
      <div className="max-w-3xl w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8">
        <h2 className="font-modern-negra text-4xl md:text-5xl text-yellow-500 text-center mb-4">
          Free Form Audit
        </h2>
        <p className="text-white/70 text-center mb-6">
          Send me your lift and I'll personally break down your form.
        </p>

        <form
          action={(formData) =>
            startTransition(async () => {
              try {
                await submitAudit(formData);
                toast.success("Audit request sent 💪", {
                  duration: 2000,
                  style: {
                    background: "#14532d",
                    color: "#bbf7d0",
                    border: "1px solid #22c55e",
                  },
                });
              } catch (err) {
                toast.error((err as Error).message);
              }
            })
          }
          className="space-y-6"
        >
          {/* Name */}
          <input
            name="name"
            placeholder="Your Name"
            required
            defaultValue={userName}
            className="w-full p-3 rounded-lg bg-black/60 border border-white/10 text-white focus:border-yellow-500 outline-none disabled:opacity-50"
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            defaultValue={userEmail}
            readOnly={!!userEmail}
            className={`w-full p-3 rounded-lg bg-black/60 border border-white/10 text-white outline-none
              ${userEmail
                ? "opacity-60 cursor-not-allowed border-white/5"
                : "focus:border-yellow-500"
              }`}
          />

          {/* Lift description */}
          <textarea
            name="lift"
            rows={4}
            required
            placeholder="What do you want me to focus on?"
            className="w-full p-3 rounded-lg bg-black/60 border border-white/10 text-white focus:border-yellow-500 outline-none"
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition"
          >
            {isPending ? "Submitting..." : "Submit for Free Audit"}
          </button>
        </form>

        <p className="text-white/50 text-sm text-center mt-4">
          I personally review every submission.
        </p>
      </div>
    </section>
  );
};

export default FormAudit;