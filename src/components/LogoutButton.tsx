'use client'

// Reusable button ui component
import { Button } from '@/components/ui/button'
// Nhost client instance used for authentication
import { nhost } from '@/lib/nhost'
// Router hook for navigation in app directory
import { useRouter } from 'next/navigation'
// Hook to access Apollo Client instance
import { useApolloClient } from '@apollo/client'
// Hook for managing local states of components
import { useState } from 'react'

// Logout button component using React
export const LogoutButton = () => {
    // Gives access to navigation functions like push and replace
    const router = useRouter()
    // Access the apollo client instance
    const apolloClient = useApolloClient()
    // Tracks whether logout is in progress
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    // Handles logout logic
    const handleLogout = async () => {
        // Disable the button
        setIsLoggingOut(true)

        try {
            // Stop the apollo client queries and subscriptions before signing out
            await apolloClient.stop()
            // Sign out the user via Nhost
            await nhost.auth.signOut()
            // Clear apollo client cache and reset the state after logout
            await apolloClient.resetStore();
            // Redirect the user to the login page after logging out
            router.replace('/login')
        } catch (err) {
            console.error('Logout failed:', err)
        } finally {
            // Reset loading state
            setIsLoggingOut(false)
        }
    }
    // Render the styled button component
    return (
        <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoggingOut}
        >
            {isLoggingOut ? 'Logging out...' : 'Log Out'}
        </Button>
    )
}