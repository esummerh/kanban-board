'use client'

// Hook to get the auth status from Nhost to check if user is authenticated
import { useAuthenticationStatus } from '@nhost/nextjs'
// Hook to navigate through the app
import { useRouter } from 'next/navigation'
// Hook to run side effects
import { useEffect } from 'react'

// Wraps protected children components
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    // Authentication status and loading state from nhost hook
    const { isAuthenticated, isLoading } = useAuthenticationStatus()
    // Used to redirect if user is not authenticated
    const router = useRouter()
    // Run when authentication status or loading status is changed
    useEffect(() => {
        // If auth has finished loading and the user is not authenticated
        if (!isLoading && !isAuthenticated) {
            // Redirect to login page
            router.replace('/login')
        }
    }, [isLoading, isAuthenticated, router])

    // While loading or not authenticated, do nothing
    if (isLoading || !isAuthenticated) return null

    // If authenticated, render content
    return <>{children}</>
}