'use client'

import { Button } from '@/components/ui/button'
import { nhost } from '@/lib/nhost'
import { useRouter } from 'next/navigation'
//import { apolloClient } from '@/lib/apollo'
import { useApolloClient } from '@apollo/client'
import { useState } from 'react'

export const LogoutButton = () => {
    const router = useRouter()
    const apolloClient = useApolloClient()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            
            await apolloClient.stop()
            await nhost.auth.signOut()
            await apolloClient.resetStore();
            
            router.replace('/login')
        } catch (err) {
            console.error('Logout failed:', err)
        } finally {
            setIsLoggingOut(false)
        }
    }

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