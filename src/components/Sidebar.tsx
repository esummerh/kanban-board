"use client"

import Link from "next/link"
import { useBoardsQuery, useDeleteBoardMutation } from "@/graphql/generated-boards"
import NewBoardFunction from "@/components/NewBoardButton"
import { Button } from '@/components/ui/button'
import { useRouter, useParams } from 'next/navigation'
import { LogoutButton } from '@/components/LogoutButton'

export const Sidebar = () => {
    const { data, loading, error, refetch } = useBoardsQuery()
    const [deleteBoard] = useDeleteBoardMutation()
    const router = useRouter()
    const params = useParams()
    const currentBoardId = params?.id as string

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this board?')) {
            try {
                await deleteBoard({ variables: { id } })
                await refetch()

                if (id === currentBoardId) {
                    const remainingBoards = data?.boards.filter((b) => b.id !== id)
                    if (remainingBoards && remainingBoards.length > 0) {
                        router.push(`/board/${remainingBoards[0].id}`)
                    } else {
                        router.push('/boards')
                    }
                }
            } catch (err) {
                console.error('Failed to delete board:', err)
            }
        }
    }

    if (loading) return <div className="w-64 p-4 bg-gray-100">Loading boards...</div>
    if (error) return <div className="w-64 p-4 bg-gray-100">Error loading boards</div>

    return (
        <div className="w-64 bg-gray-100 p-4 border-r h-full flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold mb-4">Boards</h2>
                <ul className="space-y-2">
                    {data?.boards.map((board) => {
                        const isActive = board.id === currentBoardId;
                        return (
                            <li key={board.id} className="flex justify-between items-center">
                                <Link href={`/board/${board.id}`} className={`block p-2 rounded transition w-full ${ isActive ? 'bg-white font-semibold border-l-4 border-blue-500 text-black' : 'hover:bg-gray-200'}`}>
                                    {board.name}
                                </Link>
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
            <div className="mt-auto">
                <NewBoardFunction />
            </div>
            <LogoutButton />
        </div>
    )
}