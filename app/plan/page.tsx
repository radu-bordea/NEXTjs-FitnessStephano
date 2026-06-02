import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";

type Video = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  plan: string;
  createdAt: Date;
};

const VideoCard = ({ video, premium = false }: { video: Video; premium?: boolean }) => (
  <div className={`bg-black/40 rounded-xl overflow-hidden border transition-colors ${
    premium
      ? "border-yellow-500/20 hover:border-yellow-500/50"
      : "border-white/10 hover:border-white/30"
  }`}>
    <video
      src={video.url}
      controls
      preload="none"
      className="w-full h-48 object-cover"
    />
    <div className="p-3">
      <h3 className="text-white font-semibold text-sm mb-1">{video.title}</h3>
      {video.description && (
        <p className="text-white/50 text-xs">{video.description}</p>
      )}
    </div>
  </div>
);

const DashboardPage = async () => {
  const { has, userId } = await auth();

  if (!userId) redirect("/sign-in");

  const isStandard = has({ plan: "standard" });
  const isPremium = has({ plan: "premium" });

  if (!isStandard && !isPremium) redirect("/pricing");

  const allVideos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });

  // starter = visible to everyone with a plan
  // standard = visible to standard + premium
  // premium = visible to premium only
  const starterVideos = allVideos.filter((v) => v.plan === "starter");
  const standardVideos = allVideos.filter((v) => v.plan === "standard");
  const premiumVideos = allVideos.filter((v) => v.plan === "premium");

  return (
    <div className="max-w-4xl mx-auto py-20 px-4 text-white">
      <h1 className="text-3xl font-bold mb-2">
        {isPremium ? "Premium Coaching 💪" : "Standard Plan 💪"}
      </h1>
      <p className="text-white/50 mb-10">
        {isPremium ? "Full access to all features" : "Standard access"}
      </p>

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
            Submit audit
          </Link>
        </div>

        {/* Starter videos — visible to standard + premium */}
        {starterVideos.length > 0 && (
          <div className="p-6 bg-white/5 rounded-xl">
            <h2 className="text-xl font-semibold mb-6">🎥 Video Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {starterVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}

        {/* Standard videos — visible to standard + premium */}
        {(isStandard || isPremium) && standardVideos.length > 0 && (
          <div className="p-6 bg-white/5 rounded-xl">
            <h2 className="text-xl font-semibold mb-6">🎥 Standard Video Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {standardVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}

        {/* Premium videos — visible to premium only */}
        {isPremium && (
          <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <h2 className="text-xl font-semibold mb-6">
              🎥 Premium Video Demonstrations
            </h2>
            {premiumVideos.length === 0 ? (
              <p className="text-white/70">Premium videos coming soon!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {premiumVideos.map((video) => (
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
            <p className="text-white/70">
              Direct access to your trainer via Instagram or WhatsApp.
            </p>
              <a
              href="https://instagram.com/stephanofitness"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-yellow-500 hover:text-yellow-400 transition-colors"
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
              Upgrade to Premium for exclusive videos and direct coaching.
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