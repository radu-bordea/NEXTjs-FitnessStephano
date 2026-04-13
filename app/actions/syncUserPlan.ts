"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function syncUserPlan() {
  const { userId, has } = await auth();

  if (!userId) return;

  const clerkUser = await currentUser();

  const isSubscribed = has({ plan: "monthly_coaching" });

  await prisma.user.upsert({
    where: { id: userId },
    update: {
      plan: isSubscribed ? "monthly_coaching" : "free",
    },
    create: {
      id: userId,
      email: clerkUser!.emailAddresses[0].emailAddress,
      name: `${clerkUser!.firstName ?? ""} ${clerkUser!.lastName ?? ""}`.trim(),
      plan: isSubscribed ? "monthly_coaching" : "free",
    },
  });
}