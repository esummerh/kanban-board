'use client'

import { ApolloProvider } from '@apollo/client'
import nhostClient from '@/lib/nhost-client'
import { useBoardsQuery } from '@/graphql/generated-boards'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function BoardsRedirector() {
    const { data, loading, error } = useBoardsQuery()
    const router = useRouter()

    useEffect(() => {
        if ((data?.boards ?? []).length > 0) {
            const firstBoardId = data?.boards[0].id
            router.replace(`/board/${firstBoardId}`)
        }
    }, [data, router])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    if ((data?.boards ?? []).length === 0) {
        return (
            <div className="p-4 text-center text-gray-600">
                No boards found. Create one to get started!
            </div>
        )
    }

    return null
}

export default function BoardsPage() {
    return (
        <ApolloProvider client={nhostClient}>
            <main className="p-4">
                <h1 className="text-2xl font-bold mb-4">Boards</h1>
                <BoardsRedirector />
            </main>
        </ApolloProvider>
    )
}

