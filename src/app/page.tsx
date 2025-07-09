"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthenticated } from "@nhost/nextjs";

export default function HomeRedirect() {
  const router = useRouter();
  const isAuthenticated = useAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/boards");
    } else {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  return null;
}
