import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "./lib/prisma";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();

  // If trying to access admin route
  if (isAdminRoute(req)) {
    // Not logged in - redirect to home
    if (!session.userId) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Logged in but check role in DB
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    // Not admin - redirect to home
    if (!user || user.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
