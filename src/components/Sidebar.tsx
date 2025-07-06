"use client"

import Link from "next/link"
import { useBoardsQuery } from "@/graphql/generated-boards"
import NewBoardFunction from "@/components/NewBoardButton"

export const Sidebar = () => {
    const { data, loading, error } = useBoardsQuery()

    if (loading) return <div className="w-64 p-4 bg-gray-100">Loading boards...</div>
    if (error) return <div className="w-64 p-4 bg-gray-100">Error loading boards</div>

    return (
        <div className="w-64 bg-gray-100 p-4 border-r h-full flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold mb-4">Boards</h2>
                <ul className="space-y-2">
                    {data?.boards.map((board) => (
                        <li key={board.id}>
                            <Link href={`/board/${board.id}`} className="block p-2 rounded hover:bg-gray-200 transition">
                                {board.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-auto">
                <NewBoardFunction />
            </div>
        </div>
    )
}