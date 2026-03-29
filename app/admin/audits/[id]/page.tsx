import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AuditDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const audit = await prisma.auditSubmission.findUnique({
    where: { id },
    include: {
      user: {
        select: { name: true, email: true, role: true, createdAt: true },
      },
    },
  });

  if (!audit) notFound();

  // rest of your JSX stays exactly the same

  return (
    <div className="max-w-2xl">
      {/* Back link */}
      <Link
        href="/admin/audits"
        className="text-sm text-white/50 hover:text-white transition-colors mb-8 inline-block"
      >
        ← Back to audits
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Audit Detail</h1>
        <Badge
          variant="outline"
          className={
            audit.user
              ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
              : "bg-white/10 text-white/50 border-white/20"
          }
        >
          {audit.user ? "Member" : "Guest"}
        </Badge>
      </div>

      {/* Submitter info */}
      <Card className="bg-white/5 border-white/10 mb-6">
        <CardHeader>
          <CardTitle className="text-white/50 text-sm font-medium">
            Submitter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-white/50 text-sm">Name</span>
            <span className="text-white font-medium">{audit.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50 text-sm">Email</span>
            <span className="text-white">{audit.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50 text-sm">Submitted</span>
            <span className="text-white">
              {new Date(audit.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          {audit.user && (
            <div className="flex justify-between">
              <span className="text-white/50 text-sm">Member since</span>
              <span className="text-white">
                {new Date(audit.user.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lift description */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white/50 text-sm font-medium">
            Lift description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white leading-relaxed">
            {audit.lift ?? "No description provided"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}