import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import VideoCard from "@/components/VideoCard";

const DashboardPage = async () => {
  const { has, userId } = await auth();

  if (!userId) redirect("/sign-in");

  const isStandard = has({ plan: "standard" });
  const isPremium = has({ plan: "premium" });

  if (!isStandard && !isPremium) redirect("/pricing");

  // Only fetch videos if premium
  const videos = isPremium
    ? await prisma.video.findMany({ orderBy: { createdAt: "desc" } })
    : [];

  return (
    <div className="max-w-6xl mx-auto py-20 px-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">
            {isPremium ? "Premium Coaching 💪" : "Standard Plan 💪"}
          </h1>
          <p className="text-white/50 mt-1">
            {isPremium ? "Full access to all features" : "Standard access"}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:border-yellow-500 hover:text-yellow-500 transition-colors text-sm"
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className="px-4 py-2 rounded-lg border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors text-sm"
          >
            Manage Billing
          </Link>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Workout + Diet + Audit — 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">🔥 Weekly Workout</h2>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>Day 1: Chest + Triceps</li>
              <li>Day 2: Back + Biceps</li>
              <li>Day 3: Legs</li>
              <li>Day 4: Shoulders + Core</li>
              <li>Day 5: Cardio + Mobility</li>
            </ul>
          </div>

          <div className="p-6 bg-white/5 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">🥗 Nutrition Guide</h2>
            <p className="text-white/70 text-sm">
              Your personalized diet plan will be sent to your email after
              subscription confirmation.
            </p>
          </div>

          <div className="p-6 bg-white/5 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">📹 Form Audit</h2>
            <p className="text-white/70 text-sm mb-4">
              Submit your lift for personal feedback from your trainer.
            </p>
            <Link
              href="/#audit"
              className="text-yellow-500 hover:text-yellow-400 transition-colors text-sm"
            >
              Submit audit
            </Link>
          </div>
        </div>

        {/* Premium ONLY: Videos */}
        {isPremium && (
          <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <h2 className="text-xl font-semibold mb-6">
              🎥 Video Demonstrations
            </h2>
            {videos.length === 0 ? (
              <p className="text-white/70">Videos coming soon!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} premium />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Premium ONLY: Direct Coaching */}
        {isPremium && (
          <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">💬 Direct Coaching</h2>
            <p className="text-white/70 mb-4">
              Direct access to your trainer via Instagram or WhatsApp.
            </p>
            <a
              href="https://instagram.com/stephanofitness"
              target="_blank"
              rel="noreferrer"
              className="inline-block text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              Contact trainer
            </a>
          </div>
        )}

        {/* Standard: Upgrade prompt */}
        {isStandard && (
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
            <h2 className="text-lg font-semibold mb-2">Want more?</h2>
            <p className="text-white/70 mb-4">
              Upgrade to Premium for video demonstrations and direct coaching.
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