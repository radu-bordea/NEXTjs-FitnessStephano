import { getUserRole } from "@/app/actions/getUserRole";
import { auth } from "@clerk/nextjs/server";
import NavbarClient from "./NavbarClient";

export default async function NavbarServer() {
  const role = await getUserRole();

  const { has } = await auth();

  // ✅ your real Clerk plan
  const isSubscribed = has({ plan: "monthly_coaching" });

  // ✅ map to simple UI value
  const plan = isSubscribed ? "coaching" : "free";

  return <NavbarClient role={role} plan={plan} />;
}