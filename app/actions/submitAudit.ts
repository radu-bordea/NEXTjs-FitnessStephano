"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

const auditSchema = z.object({
  name: z.string().min(2, { message: "Name is too short" }),
  email: z.string().pipe(z.email({ message: "Invalid email" })),
  lift: z.string().min(10, { message: "Description to short" }),
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

  // 2. Check if signed in — works for both guests and members
  const session = await auth();
  const userId = session?.userId;
  console.log("userId from Clerk:", userId); // add this

  if (userId) {
    // Signed in: ensure user exists in our DB
    const clerkUser = await currentUser();
    console.log("clerkUser:", clerkUser?.emailAddresses[0].emailAddress); // and this
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: clerkUser!.emailAddresses[0].emailAddress,
        name: `${clerkUser!.firstName ?? ""} ${clerkUser!.lastName ?? ""}`.trim(),
      },
    });
  }

  // 3. Save submission (userId is null for guests — totally fine)
  await prisma.auditSubmission.create({
    data: {
      name,
      email,
      lift,
      ...(userId ? { user: { connect: { id: userId } } } : {}),
    },
  });

  // 4. Send emails
  // try {
  //   await resend.emails.send({
  //     from: "onboarding@resend.dev",
  //     to: process.env.TRAINER_EMAIL!,
  //     subject: `New audit request from ${name}`,
  //     html: `<h2>New audit</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Focus:</b> ${lift ?? "—"}</p>`,
  //   });
  // } catch (err) {
  //   console.error("Email failed but submission was saved:", err);
  //   // don't rethrow — submission already succeeded
  // }

  // // confirmation to the user
  // try {
  //   await resend.emails.send({
  //     from: "onboarding@resend.dev",
  //     to: email,
  //     subject: "Got your form audit request!",
  //     html: `<p>Hey ${name}, I received your request and will review it shortly. 💪</p>`,
  //   });
  // } catch (error) {
  //   console.error("Email failed but submission was saved:", err);
  //   // don't rethrow — submission already succeeded
  // }

  return { success: true };
}
