'use client'

// Hook to fetch boards
import { useBoardsQuery } from '@/graphql/generated-boards'
// Hook for side effects
import { useEffect } from 'react'
// Hook to navigate
import { useRouter } from 'next/navigation'
// Hook to obtain current user ID
import { useUserId } from '@nhost/nextjs'
// Hooks to get auth status and user data from Nhost
import { useAuthenticationStatus, useUserData } from '@nhost/nextjs'
// Lets user create a new board
import NewBoardFunction from '@/components/NewBoardButton'
// Restricts this page to authenticated users only
import { ProtectedRoute } from '@/components/ProtectedRoute'

// Handles redirection if the user already has boards created
function BoardsRedirector() {
    // Obtain data on the existing boards
    const { data, loading, error } = useBoardsQuery()
    // Hook to redirect users to another page
    const router = useRouter()
    // Get authentication and user status
    const { isAuthenticated, isLoading } = useAuthenticationStatus()
    const user = useUserData()

    console.log('Auth status:', { isAuthenticated, isLoading, user })

    // When boards are fetched and exist, redirect user to first board
    useEffect(() => {
        if ((data?.boards ?? []).length > 0) {
            const firstBoardId = data?.boards[0].id
            router.replace(`/board/${firstBoardId}`)
        }
    }, [data, router])

    const userId = useUserId()
    console.log('User ID:', userId)
    // Show loading message while fetching data
    if (loading) return <p>Loading...</p>
    // Show error message if query fails
    if (error) return <p>Error: {error.message}</p>
    // If user has no boards, show a message prompting them to create one
    if ((data?.boards ?? []).length === 0) {
        return (
            <div className="p-4 text-center text-gray-600">
                No boards found. Create one to get started!
            </div>
        )
    }
    // Return null because we've already redirected the user
    return null
}

// Main page component
export default function BoardsPage() {
    return (
        // Protect the route so only authenticated users can access it
        <ProtectedRoute>
            <main className="p-4">
                <h1 className="text-2xl font-bold mb-4">Boards</h1>
                <NewBoardFunction />
                <BoardsRedirector />
            </main>
        </ProtectedRoute>
    )
}

