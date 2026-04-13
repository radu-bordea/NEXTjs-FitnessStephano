import { getUserRole } from "@/app/actions/getUserRole";
import { auth } from "@clerk/nextjs/server";
import NavbarClient from "./NavbarClient";
import { syncUserPlan } from "@/app/actions/syncUserPlan";

export default async function NavbarServer() {
  const role = await getUserRole();

  // 🔥 THIS IS THE MAGIC LINE
  await syncUserPlan();

  const { has } = await auth();
  const isSubscribed = has({ plan: "monthly_coaching" });

  const plan = isSubscribed ? "coaching" : "free";

  return <NavbarClient role={role} plan={plan} />;
}