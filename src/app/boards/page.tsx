'use client'

import { ApolloProvider } from '@apollo/client'
import nhostClient from '@/lib/nhost-client'
import { useBoardsQuery } from '@/graphql/generated-boards'

function BoardsContent() {
    const { data, loading, error } = useBoardsQuery()

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <ul className="space-y-2">
            {data?.boards.map((board) => (
                <li key={board.id} className="p-2 border rounded">
                    {board.name}
                </li>
            ))}
        </ul>
    )
}

export default function BoardsPage() {
    return (
        <ApolloProvider client={nhostClient}>
            <main className="p-4">
                <h1 className="text-2xl font-bold mb-4">Boards</h1>
                <BoardsContent />
            </main>
        </ApolloProvider>
    )
}

