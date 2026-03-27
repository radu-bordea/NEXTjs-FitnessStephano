"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";


const auditSchema = z.object({
  name: z.string().min(2, { message: "Name is too short" }),
  email: z.string().pipe(z.email({ message: "Invalid email" })),
  lift: z.string().min(10, { message: "Description to short" })
});

export async function submitAudit(formData: FormData) {
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

  console.log({ name, email, lift });

  return { success: true };
}
