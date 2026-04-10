import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const PlanPage = async () => {
  const { has, userId } = await auth();

  if (!userId) redirect("/sign-in");

  const isSubscribed = has({ plan: "monthly_coaching" });

  if (!isSubscribed) redirect("/pricing");

  return (
    <div className="max-w-4xl mx-auto py-20 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Monthly Coaching Program 💪
      </h1>

      {/* 🔥 ACTION BUTTONS */}
      <div className="flex gap-4 mb-10 justify-center">
        <Link
          href="/"
          className="px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:border-yellow-500 hover:text-yellow-500 transition-colors"
        >
          Home
        </Link>

        <Link
          href="/user"
          className="px-4 py-2 rounded-lg border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
        >
          Manage Billing
        </Link>
      </div>

      {/* CONTENT */}
      <div className="grid gap-6">
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
      </div>
    </div>
  );
};

export default PlanPage;