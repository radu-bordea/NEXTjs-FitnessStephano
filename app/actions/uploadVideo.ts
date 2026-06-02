"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function uploadVideo(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "admin") throw new Error("Not authorized");

  const file = formData.get("video") as File;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const plan = formData.get("plan") as string;

  if (!file || !title) throw new Error("Missing required fields");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "video",
            folder: "fitness-app/videos",
            transformation: [
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as { secure_url: string; public_id: string });
          }
        )
        .end(buffer);
    }
  );

  await prisma.video.create({
    data: {
      title,
      description,
      url: result.secure_url,
      publicId: result.public_id,
      plan,
    },
  });

  revalidatePath("/admin/videos");
  revalidatePath("/plan");
}