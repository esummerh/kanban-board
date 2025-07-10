"use client";

// For navigation purposes between pages
import { useRouter } from "next/navigation";
// Hook to perform side effects
import { useEffect } from "react";
// Hook to check if user is authenticated
import { useAuthenticated } from "@nhost/nextjs";

// Handles redirecting the user from the home page
export default function HomeRedirect() {
  // Initializes the router for navigation
  const router = useRouter();
  // Boolean indicating whether the user is logged in
  const isAuthenticated = useAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      // If the user is authenticated, redirect to the boards page
      router.replace("/boards");
    } else {
      // Else, redirect to the login page
      router.replace("/login");
    }
  }, [isAuthenticated, router]); // Rerun if authentication state or router changes

  // Nothing is rendered to the screen
  // Only purpose of the page is to handle redirection
  return null;
}
