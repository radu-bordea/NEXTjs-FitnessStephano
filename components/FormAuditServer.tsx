import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import FormAudit from "./FormAudit";

export default async function FormAuditServer() {
  const { userId, has } = await auth();

  // 1. Not logged in
  if (!userId) {
    return <FormAudit canSubmit={false} reason="not_logged_in" />;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const isSubscribed = has({ feature: "monthly_coaching", });

  console.log("USER ID:", userId);
  console.log("AUDIT USED:", user?.auditUsed);
  console.log("IS SUBSCRIBED:", isSubscribed);

  const auditUsed = user?.auditUsed ?? 0;

  // 2. SUBSCRIBED → ALWAYS ALLOW
  if (isSubscribed) {
    return <FormAudit canSubmit={true} reason={null} />;
  }

  // 3. FREE USER LIMIT CHECK
  if (auditUsed >= 1) {
    return <FormAudit canSubmit={false} reason="limit_reached" />;
  }

  // 4. FREE USER ALLOWED
  return <FormAudit canSubmit={true} reason={null} />;
}
