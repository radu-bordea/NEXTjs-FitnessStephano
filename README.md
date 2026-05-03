// CREATE PROJECT
npx create-next-app@latest nextjs-cocktails

// LIBRARIES
- npm install gsap @gsap/react react-responsive
- npm install react-icons
- npm install lucide-react
- npm install sonner
- npm install zod
- npm install @clerk/nextjs
- npm install resend

// SHADCN
- npx shadcn@latest init
- npx shadcn@latest add button
- npx shadcn@latest add table badge card button avatar

// Prisma
- npm install prisma tsx @types/pg --save-dev
- npm install @prisma/client @prisma/adapter-pg dotenv pg
- npx prisma init --output ../app/generated/prisma
- npx prisma migrate dev --name init
- npx prisma migrate dev --name added-user-role
- npx prisma migrate dev --name add-audit-limit
- npx prisma migrate dev --name remove-plan-field
- npx prisma migrate resolve --applied "name_of_your_last_migration"
- npx prisma migrate dev --name sync-clean
- npx prisma db push --accept-data-loss
- npx prisma migrate resolve --applied "20260101000000_init"
- npx prisma migrate status
- npx prisma migrate dev --name describe_your_change