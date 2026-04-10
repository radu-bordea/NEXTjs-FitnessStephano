import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "./lib/prisma";

// Route groups
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isProtectedRoute = createRouteMatcher([
  "/plan(.*)", // 👈 subscription content
]);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();

  // 🔐 PROTECTED ROUTES (must be logged in)
  if (isProtectedRoute(req)) {
    if (!session.userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // 🔐 ADMIN ROUTES
  if (isAdminRoute(req)) {
    if (!session.userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/user")) {
    if (!session.userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // ✅ Always allow request if no conditions matched
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
