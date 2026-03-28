import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminPage() {
  const [totalUsers, totalAudits] = await Promise.all([
    prisma.user.count(),
    prisma.auditSubmission.count(),
  ]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-8">Dashboard - <span className="text-yellow-500">Overview</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white/70 text-sm font-medium">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-yellow-500">{totalUsers}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white/70 text-sm font-medium">
              Total Audit Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-yellow-500">{totalAudits}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}