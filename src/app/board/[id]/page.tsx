'use client'

import { useParams } from 'next/navigation'
import { useGetBoardQuery } from '@/graphql/generated-boards'
//import nhostClient from '@/lib/nhost-client'
//import { ApolloProvider } from '@apollo/client'
import { Sidebar } from '@/components/Sidebar'
import { AddColumnButton } from '@/components/NewColumnButton'
import { EditableColumnTitle } from '@/components/EditableColumnTitle'

function BoardContent({ id }: { id: string }) {
    const { data, loading, error, refetch } = useGetBoardQuery({ variables: { id }, skip: !id, })
    console.log(data?.boards_by_pk?.columns)

    if (loading) return <p>Loading...</p>
    if (data) console.log('Board data:', data)
    if (error) return <p>Error: {error.message}</p>
    if (!data?.boards_by_pk) return <p>Board not found</p>

    const board = data.boards_by_pk

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{board.name}</h1>
            <div className="flex gap-4">
                {board.columns?.map((column) => (
                    <div key={column.id} className="bg-gray-100 p-4 rounded shadow w-64">
                        <EditableColumnTitle columnId={column.id} initialName={column.name} />
                        {column.cards.map((card) => (
                            <div key={card.id} className="bg-white p-2 rounded shadow mb-2">
                                {card.description}
                            </div>
                        ))}
                    </div>
                ))}
                <div className="bg-white p-4 rounded shadow w-64 flex flex-col items-start justify-start border border-gray-300">
                    <AddColumnButton boardId={id} existingColumnCount={board.columns.length} onColumnAdded={refetch}/>
                </div>
            </div>
        </div>
    )
}

export default function BoardPage() {
    const params = useParams()
    const id = params?.id as string

    return (
      //<ApolloProvider client={nhostClient}>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <BoardContent id={id} />
          </div>
        </div>
      //</ApolloProvider>
    );
}