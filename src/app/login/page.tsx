"use client";

// Manages component states and side effects
import { useEffect, useState } from "react"
// Nhost client for authentication
import { nhost } from "@/lib/nhost"
// Next.js router for navigation
import { useRouter } from "next/navigation"
// Hook to retrieve the authenticated user ID
import { useUserId } from '@nhost/nextjs'
// Custom reusable input and button ui components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// For client-side navigation between routes
import Link from 'next/link'
// Hook to check authentication state
import { useAuthenticationStatus } from '@nhost/nextjs'

// Function to render login page
export default function LoginPage() {
    // Get the router instance
    const router = useRouter();
    // Obtain authentication status from Nhost
    const { isAuthenticated, isLoading } = useAuthenticationStatus()
    // Form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Error message
    const [errorMsg, setErrorMsg] = useState("");
    // Boolean to track login status
    const [loggedIn, setLoggedIn] = useState(false);

    // Function that handles the login form submission
    const handleLogin = async (e: React.FormEvent) => {
        // Prevent page reload when form is submitted
        e.preventDefault();
        // Call Nhost login function
        const result = await nhost.auth.signIn({
            email,
            password,
        });

        // Handle errors
        if (result.error) {
            setErrorMsg(result.error.message);
        } else {
            // Reset the error message
            setErrorMsg("");
            // Mark user as logged in
            setLoggedIn(true);
        }
    };

    // Obtain the user ID and log it
    const userId = useUserId()
    console.log('UserId:', userId)

    // Redirect to boards if user is authenticated
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/boards')
        }
    }, [isAuthenticated, isLoading, router])

    // Redirect to boards if login was successful
    useEffect(() => {
        if (loggedIn) {
            router.push('/boards')
        }
    }, [loggedIn, router])

    return (
        // Centered login form logic
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                {/* Header */}
                <h1 className="text-2xl font-bold mb-6 text-center">Log in to your account</h1>
                {/* Login form */}
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    {/* Email input */}
                    <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    {/* Password input */}
                    <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    {/* Submission button */}
                    <Button type="submit" className="w-full">Log In</Button>
                    {errorMsg && <p className="text-sm text-red-600 text-center">{errorMsg}</p>}
                </form>
                {/* Link to sign up page */}
                <p className="mt-4 text-sm text-center">
                    Don&rsquo;t have an account?{' '}
                    <Link href="/signup" className="text-blue-600 underline hover:text-blue-800">Sign up</Link>
                </p>
            </div>
        </div>
    )
}