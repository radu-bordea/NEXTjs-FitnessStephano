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
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    lift: formData.get("lift"),
  };

  const result = auditSchema.safeParse(rawData);
  if (!result.success) throw new Error(result.error.issues[0].message);

  const { name, email, lift } = result.data;

  // 1. Require login
  const { userId, has } = await auth();
  if (!userId) throw new Error("Please sign in to submit an audit.");

  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("User not found.");

  // 2. Ensure user exists in DB — no plan field
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
    },
  });

  // 3. Save submission
  await prisma.auditSubmission.create({
    data: {
      name,
      email,
      lift,
      user: { connect: { id: userId } },
    },
  });

  // 4. Send email
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