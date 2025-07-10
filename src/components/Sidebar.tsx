"use client"

// For navigation links
import Link from "next/link"
// Hooks for fetching and deleting boards
import { useBoardsQuery, useDeleteBoardMutation } from "@/graphql/generated-boards"
// Button to create a new board
import NewBoardFunction from "@/components/NewBoardButton"
// Custom button ui component
import { Button } from '@/components/ui/button'
// For navigation and URL param access
import { useRouter, useParams } from 'next/navigation'
// Custom logout button component
import { LogoutButton } from '@/components/LogoutButton'

// Sidebar component definition
export const Sidebar = () => {
    // Fetch all boards from database
    const { data, loading, error, refetch } = useBoardsQuery()
    // Hook for deleting a board
    const [deleteBoard] = useDeleteBoardMutation()
    // Router for navigation
    const router = useRouter()
    // Get the current board ID from the route params
    const params = useParams()
    const currentBoardId = params?.id as string

    // Function to handle board deletion logic
    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this board?')) {
            try {
                // Delete the board from the database
                await deleteBoard({ variables: { id } })
                // Refresh the list of boards after the deletion
                await refetch()
                // If the deleted board is the currently viewed one
                if (id === currentBoardId) {
                    // Find a different board to redirect to
                    const remainingBoards = data?.boards.filter((b) => b.id !== id)
                    if (remainingBoards && remainingBoards.length > 0) {
                        // Redirect to first remaining board
                        router.push(`/board/${remainingBoards[0].id}`)
                    } else {
                        // If no boards remain, go to boards overview
                        router.push('/boards')
                    }
                }
            } catch (err) {
                console.error('Failed to delete board:', err)
            }
        }
    }

    // Handle loading and error states
    if (loading) return <div className="w-64 p-4 bg-gray-100">Loading boards...</div>
    if (error) return <div className="w-64 p-4 bg-gray-100">Error loading boards</div>

    // Render sidebar
    return (
        <div className="w-64 bg-gray-100 p-4 border-r h-full flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold mb-4">Boards</h2>
                <ul className="space-y-2">
                    {/* List all boards */}
                    {data?.boards.map((board) => {
                        // Check if this board is the one currently being viewed
                        const isActive = board.id === currentBoardId;
                        return (
                            <li key={board.id} className="flex justify-between items-center">
                                {/* Highlight the active board */}
                                <Link href={`/board/${board.id}`} className={`block p-2 rounded transition w-full ${ isActive ? 'bg-white font-semibold border-l-4 border-blue-500 text-black' : 'hover:bg-gray-200'}`}>
                                    {board.name}
                                </Link>
                                {/* Delete button next to each board */}
                                <Button
                                    variant="ghost"
                                    className="text-red-600 px-2"
                                    onClick={() => handleDelete(board.id)}
                                >
                                    x
                                </Button>
                            </li>
                    )})}
                </ul>
            </div>
            {/* New board creation form */}
            <div className="mt-auto">
                <NewBoardFunction />
            </div>
            {/* Log out button */}
            <LogoutButton />
        </div>
    )
}