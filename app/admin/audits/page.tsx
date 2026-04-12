import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function AuditsPage() {
  const audits = await prisma.auditSubmission.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, email: true, role: true },
      },
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Audit Submissions</h1>

      <div className="rounded-xl border border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-white/50">Name</TableHead>
              <TableHead className="text-white/50">Email</TableHead>
              <TableHead className="text-white/50">User</TableHead>
              <TableHead className="text-white/50">Lift</TableHead>
              <TableHead className="text-white/50">Submitted</TableHead>
              <TableHead className="text-white/50">Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {audits.map((audit) => (
              <TableRow
                key={audit.id}
                className="border-white/10 hover:bg-white/5"
              >
                <TableCell className="font-medium">
                  {audit.name}
                </TableCell>
                <TableCell className="text-white/70">
                  {audit.email}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      audit.user
                        ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                        : "bg-white/10 text-white/50 border-white/20"
                    }
                  >
                    {audit.user ? "User" : "-"}
                  </Badge>
                </TableCell>
                <TableCell className="text-white/70 max-w-50 truncate">
                  {audit.lift ?? "—"}
                </TableCell>
                <TableCell className="text-white/70">
                  {new Date(audit.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/audits/${audit.id}`}
                    className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors"
                  >
                    View →
                  </Link>
                </TableCell>
              </TableRow>
            ))}

            {audits.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-white/30 py-12"
                >
                  No audit submissions yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}