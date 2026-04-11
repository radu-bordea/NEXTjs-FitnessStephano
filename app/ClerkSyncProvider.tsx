"use client";

import { useEffect } from "react";

export default function ClerkSyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const refresh = () => {
      window.dispatchEvent(new Event("focus"));
    };

    window.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);

    return () => {
      window.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return children;
}