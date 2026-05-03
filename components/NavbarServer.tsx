import { getUserRole } from "@/app/actions/getUserRole";
import { auth } from "@clerk/nextjs/server";
import NavbarClient from "./NavbarClient";
import { syncUserPlan } from "@/app/actions/syncUserPlan";
import { unstable_noStore as noStore } from "next/cache";

export default async function NavbarServer() {
  noStore(); // forces fresh render every time — no caching

  const role = await getUserRole();
  await syncUserPlan();

  const { has } = await auth();
  const isStandard = has({ plan: "standard" });
  const isPremium = has({ plan: "premium" });

  const plan = isPremium ? "premium" : isStandard ? "standard" : "none";

  return <NavbarClient role={role} plan={plan} />;
}