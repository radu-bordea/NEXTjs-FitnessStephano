"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const auditSchema = z.object({
  name: z.string().min(2, { message: "Name is too short" }),
  email: z.string().pipe(z.email({ message: "Invalid email" })),
  lift: z.string().min(10, { message: "Description too short" }),
});

export async function submitAudit(formData: FormData) {
  // 1. Validate
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    lift: formData.get("lift"),
  };

  const result = auditSchema.safeParse(rawData);

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const { name, email, lift } = result.data;

  // 2. 🔒 REQUIRE LOGIN
  const { userId, has } = await auth();

  if (!userId) {
    throw new Error("Please sign in to submit an audit.");
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("User not found.");
  }

  // 3. Check subscription (Clerk)
  const isSubscribed = has({ plan: "monthly_coaching" });

  // 4. Ensure user exists in DB + sync plan
  const user = await prisma.user.upsert({
    where: { id: userId },
    update: {
      // ✅ update plan every time
      plan: isSubscribed ? "monthly_coaching" : "free",
    },
    create: {
      id: userId,
      email: clerkUser!.emailAddresses[0].emailAddress,
      name: `${clerkUser!.firstName ?? ""} ${clerkUser!.lastName ?? ""}`.trim(),
      plan: isSubscribed ? "monthly_coaching" : "free", // ✅ set on create
    },
  });

  // 5. 🔥 LIMIT LOGIC
  if (!isSubscribed && user.auditUsed >= 1) {
    throw new Error("You’ve used your free audit. Upgrade to continue.");
  }

  // 6. Save submission
  await prisma.auditSubmission.create({
    data: {
      name,
      email,
      lift,
      user: { connect: { id: userId } },
    },
  });

  // 7. Increment usage (ONLY free users)
  if (!isSubscribed) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        auditUsed: { increment: 1 },
      },
    });
  }

  // 8. Send email (non-blocking)
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.TRAINER_EMAIL!,
      subject: `New audit request from ${name}`,
      html: `<h2>New audit</h2>
             <p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Focus:</b> ${lift ?? "—"}</p>`,
    });
  } catch (error) {
    console.error("Email failed but submission was saved:", error);
  }

  return { success: true };
}
