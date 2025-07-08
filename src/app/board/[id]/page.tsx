'use client'

import { useParams } from 'next/navigation'
//import { useGetBoardQuery } from '@/graphql/generated-boards'
//import nhostClient from '@/lib/nhost-client'
//import { ApolloProvider } from '@apollo/client'
import { Sidebar } from '@/components/Sidebar'
import { AddColumnButton } from '@/components/NewColumnButton'
import { EditableColumnTitle } from '@/components/EditableColumnTitle'
import { AddCardButton } from '@/components/AddCardButton'
import { DeleteCardButton } from '@/components/DeleteCardButton'
import { DeleteColumnButton } from '@/components/DeleteColumnButton'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useUpdateColumnOrderMutation, useUpdateCardOrderMutation, useOnBoardUpdatedSubscription } from '@/graphql/generated-boards'

type CardType = {
    id: string
    title: string
    description?: string | null
    order: number | null
}

type ColumnType = {
    id: string
    name: string
    order?: number | null
    cards: CardType[]
}

function BoardContent({ id }: { id: string }) {
    const { data, loading, error} = useOnBoardUpdatedSubscription({ variables: { boardId: id } });
    console.log(data?.boards_by_pk?.columns)

    const [columns, setColumns] = useState<ColumnType[]>([])
    const [updateColumnOrder] = useUpdateColumnOrderMutation()
    const [updateCardOrder] = useUpdateCardOrderMutation()
    
    const board = data?.boards_by_pk

    useEffect(() => {
        if (!board?.columns) return;

        const newColumns = board.columns
            .slice()
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((col) => ({
                id: col.id,
                name: col.name,
                order: col.order,
                cards: col.cards
                    .slice()
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map((card) => ({
                        id: card.id,
                        title: card.title,
                        description: card.description,
                        order: card.order ?? 0,
                })),
        }));

        // Only update state if the new data is different from current state
        const serializedNew = JSON.stringify(newColumns);
        const serializedCurrent = JSON.stringify(columns);
        if (serializedNew !== serializedCurrent) {
            setColumns(newColumns);
        }

    }, [board]);


    if (loading) return <p>Loading...</p>;
    if (data) console.log("Board data:", data);
    if (error) return <p>Error: {error.message}</p>;
    if (!board) return <p>Board not found</p>;
    

    const handleDragEnd = async (result: DropResult) => {
        const { source, destination, type } = result
        if (!destination) return

        if (type === 'column') {
            const reordered = Array.from(columns)
            const [moved] = reordered.splice(source.index, 1)
            reordered.splice(destination.index, 0, moved)
            setColumns(reordered)

            for (let i=0; i<reordered.length; i++) {
                await updateColumnOrder({
                    variables: {
                        id: reordered[i].id,
                        order: i,
                    },
                })
            }
            return
        }

        const sourceColIndex = columns.findIndex((col) => col.id === source.droppableId)
        const destColIndex = columns.findIndex((col) => col.id === destination.droppableId)
        if (sourceColIndex === -1 || destColIndex === -1) return

        const sourceCol = columns[sourceColIndex]
        const destCol = columns[destColIndex]

        const sourceCards = [...sourceCol.cards]
        const [movedCard] = sourceCards.splice(source.index, 1)

        if (source.droppableId === destination.droppableId) {
            sourceCards.splice(destination.index, 0, movedCard)
            const updated = [...columns]
            updated[sourceColIndex] = { ...sourceCol, cards: sourceCards }
            setColumns(updated)

            for (let i = 0; i < sourceCards.length; i++) {
                await updateCardOrder({
                    variables: {
                        id: sourceCards[i].id,
                        order: i,
                        column_id: sourceCol.id,
                    },
                })
            }
        } else {
            const destCards = [...destCol.cards]
            destCards.splice(destination.index, 0, movedCard)
            const updated = [...columns]
            updated[sourceColIndex] = { ...sourceCol, cards: sourceCards }
            updated[destColIndex] = { ...destCol, cards: destCards }
            setColumns(updated)

            for (let i = 0; i < sourceCards.length; i++) {
                await updateCardOrder({
                    variables: {
                        id: sourceCards[i].id,
                        order: i,
                        column_id: sourceCol.id,
                    },
                })
            }
            for (let i = 0; i < destCards.length; i++) {
                await updateCardOrder({
                    variables: {
                        id: destCards[i].id,
                        order: i,
                        column_id: destCol.id,
                    },
                })
            }
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{board.name}</h1>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="board" type="column" direction="horizontal">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="flex gap-4">
                            {columns.map((column, colIndex) => (
                                <Draggable draggableId={column.id} index={colIndex} key={column.id}>
                                    {(provided) => (
                                        <div className="bg-gray-100 p-4 rounded shadow w-64" ref={provided.innerRef} {...provided.draggableProps}>
                                            <div {...provided.dragHandleProps} className="flex justify-between items-center mb-2">
                                                <EditableColumnTitle columnId={column.id} initialName={column.name}/>
                                                <DeleteColumnButton columnId={column.id}/>
                                            </div>
                                            <Droppable droppableId={column.id} type="card">
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                                        {column.cards.map((card, cardIndex) => (
                                                            <Draggable draggableId={card.id} index={cardIndex} key={card.id}>
                                                                {(provided) => (
                                                                    <div className="bg-white p-2 rounded shadow mb-2" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                        <div>
                                                                            <h3 className="font-semibold">{card.title}</h3>
                                                                            <p className="text-sm text-gray-600">
                                                                                {card.description}
                                                                            </p>
                                                                        </div>
                                                                        <DeleteCardButton cardId={card.id}/>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                        {column.cards.length === 0 && (
                                                            <div className="h-10 bg-transparent border border-dashed border-gray-300 rounded"/>
                                                        )}
                                                    </div>
                                                )}
                                            </Droppable>

                                            <AddCardButton columnId={column.id}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            <div className="bg-white p-4 rounded shadow w-64 flex flex-col items-start justify-start border border-gray-300">
                                <AddColumnButton boardId={id} existingColumnCount={board.columns.length}/>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default function BoardPage() {
    const params = useParams()
    const id = params?.id as string

    return (
      <ProtectedRoute>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <BoardContent id={id} />
          </div>
        </div>
      </ProtectedRoute>
    );
}