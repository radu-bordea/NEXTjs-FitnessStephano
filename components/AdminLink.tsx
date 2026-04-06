// components/AdminLink.tsx
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminLink() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "admin") return null;

  return (
    <Link
      href="/admin"
      className="text-sm text-white/70 hover:text-yellow-500 transition-colors"
    >
      Dashboard
    </Link>
  );
}