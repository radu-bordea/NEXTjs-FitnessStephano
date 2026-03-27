-- DropForeignKey
ALTER TABLE "AuditSubmission" DROP CONSTRAINT "AuditSubmission_userId_fkey";

-- AlterTable
ALTER TABLE "AuditSubmission" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AuditSubmission" ADD CONSTRAINT "AuditSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
