import { auth } from "@clerk/nextjs/server";
import FormAudit from "./FormAudit";

export default async function FormAuditServer() {
  const { userId, has } = await auth();

  // 1. Not logged in
  if (!userId) {
    return <FormAudit canSubmit={false} reason="not_logged_in" />;
  }

  // 2. Check plan via Clerk
  const isStandard = has({ plan: "standard" });
  const isPremium = has({ plan: "premium" });

  // 3. No plan — prompt to buy
  if (!isStandard && !isPremium) {
    return <FormAudit canSubmit={false} reason="no_plan" />;
  }

  // 4. Has plan — allow unlimited submissions
  return <FormAudit canSubmit={true} reason={null} />;
}