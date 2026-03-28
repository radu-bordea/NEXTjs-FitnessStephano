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


// Prisma
- npm install prisma tsx @types/pg --save-dev
- npm install @prisma/client @prisma/adapter-pg dotenv pg
- npx prisma init --output ../app/generated/prisma
- npx prisma migrate dev --name init
- npx prisma migrate dev --name added-user-role