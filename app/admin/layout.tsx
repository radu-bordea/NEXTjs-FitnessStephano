import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session.userId) redirect("/");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user || user.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Admin navbar */}
      <header className="sticky top-0 z-50 bg-black border-b border-white/50 px-8 py-8 flex items-center justify-between gap-4">
        <nav className="flex gap-6 text-sm text-white/70 text-center justify-end">
          <Link
            href="/admin"
            className="hover:text-yellow-500 transition-colors"
          >
            Overview
          </Link>
          <Link
            href="/admin/users"
            className="hover:text-yellow-500 transition-colors"
          >
            Users
          </Link>
          <Link
            href="/admin/audits"
            className="hover:text-yellow-500 transition-colors"
          >
            Audits
          </Link>

          <Link
            href="/"
            className="text-white/50 hover:text-white transition-colors pr-12"
          >
            Back to site
          </Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10">{children}</main>
    </div>
  );
}
