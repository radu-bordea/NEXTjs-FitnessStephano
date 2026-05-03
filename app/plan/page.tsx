import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const DashboardPage = async () => {
  const { has, userId } = await auth();

  if (!userId) redirect("/sign-in");

  const isStandard = has({ plan: "standard" });
  const isPremium = has({ plan: "premium" });

  if (!isStandard && !isPremium) redirect("/pricing");

  return (
    <div className="max-w-4xl mx-auto py-20 px-4 text-white">
      <h1 className="text-3xl font-bold mb-2">
        {isPremium ? "Premium Coaching 💪" : "Standard Plan 💪"}
      </h1>
      <p className="text-white/50 mb-10">
        {isPremium ? "Full access to all features" : "Standard access"}
      </p>

      {/* Navigation */}
      <div className="flex gap-4 mb-10">
        <Link
          href="/"
          className="px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:border-yellow-500 hover:text-yellow-500 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/pricing"
          className="px-4 py-2 rounded-lg border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
        >
          Manage Billing
        </Link>
      </div>

      <div className="grid gap-6">
        {/* Standard + Premium: Workout Plan */}
        <div className="p-6 bg-white/5 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">🔥 Weekly Workout Plan</h2>
          <ul className="list-disc ml-5 text-white/70">
            <li>Day 1: Chest + Triceps</li>
            <li>Day 2: Back + Biceps</li>
            <li>Day 3: Legs</li>
            <li>Day 4: Shoulders + Core</li>
            <li>Day 5: Cardio + Mobility</li>
          </ul>
        </div>

        {/* Standard + Premium: Diet */}
        <div className="p-6 bg-white/5 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">🥗 Nutrition Guide</h2>
          <p className="text-white/70">
            Your personalized diet plan will be sent to your email.
          </p>
        </div>

        {/* Standard + Premium: Form Audit */}
        <div className="p-6 bg-white/5 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">📹 Form Audit</h2>
          <p className="text-white/70">
            Submit your lift for personal feedback from your trainer.
          </p>
          <Link
            href="/#audit"
            className="mt-4 inline-block text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            Submit audit →
          </Link>
        </div>

        {/* Premium ONLY: Videos */}
        {isPremium && (
          <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">
              🎥 Video Demonstrations
            </h2>
            <p className="text-white/70">
              Exclusive exercise demonstration videos from your trainer.
            </p>
            {/* videos will go here later */}
          </div>
        )}

        {/* Premium ONLY: Direct Coaching */}
        {isPremium && (
          <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">💬 Direct Coaching</h2>
            <p className="text-white/70">
              Direct access to your trainer via Instagram or WhatsApp.
            </p>
            <a>
              href="https://instagram.com/stephanofitness" target="_blank"
              className="mt-4 inline-block text-yellow-500 hover:text-yellow-400
              transition-colors" Contact trainer →
            </a>
          </div>
        )}

        {/* Standard: Upgrade prompt */}
        {isStandard && (
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
            <h2 className="text-lg font-semibold mb-2">Want more?</h2>
            <p className="text-white/70 mb-4">
              Upgrade to Premium for videos and direct coaching.
            </p>
            <Link
              href="/pricing"
              className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Upgrade to Premium
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
