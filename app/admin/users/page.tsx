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

// When Stripe is fully set up, the clean solution is to store stripeSubscriptionStatus back in Prisma so you can query it efficiently. Something like:
// prismamodel User {
//   // existing fields...
//   stripeCustomerId     String?
//   subscriptionStatus   String?  // "active" | "cancelled" | null
// }

// // When user subscribes → webhook fires → you save to DB
// await prisma.user.update({
//   where: { stripeCustomerId: customerId },
//   data: {
//     subscriptionStatus: "active",
//     planType: "premium", // or "standard"
//   },
// });

{/* <Badge>
  {user.planType ?? "No plan"}
</Badge> */}


export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { auditSubmissions: true },
      },
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Users</h1>

      <div className="rounded-xl border border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-white/50">Name</TableHead>
              <TableHead className="text-white/50">Email</TableHead>
              <TableHead className="text-white/50">Role</TableHead>
              <TableHead className="text-white/50">Audits</TableHead>
              <TableHead className="text-white/50">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="border-white/10 hover:bg-white/5"
              >
                <TableCell className="font-medium">
                  {user.name ?? "—"}
                </TableCell>
                <TableCell className="text-white/70">{user.email}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      user.role === "admin"
                        ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                        : "bg-white/10 text-white/70 border-white/20"
                    }
                    variant="outline"
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-white/70">
                  {user._count.auditSubmissions}
                </TableCell>
                <TableCell className="text-white/70">
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}

            {users.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-white/30 py-12"
                >
                  No users yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}