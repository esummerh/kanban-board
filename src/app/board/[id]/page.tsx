'use client'

// Import hooks and utilities
import { useParams } from 'next/navigation'
import { Sidebar } from '@/components/Sidebar'
import { AddColumnButton } from '@/components/NewColumnButton'
import { EditableColumnTitle } from '@/components/EditableColumnTitle'
import { AddCardButton } from '@/components/AddCardButton'
import { DeleteCardButton } from '@/components/DeleteCardButton'
import { DeleteColumnButton } from '@/components/DeleteColumnButton'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useState, useEffect } from 'react'
// Import drag-and-drop tools from the Hello Pangea DnD library
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useUpdateColumnOrderMutation, useUpdateCardOrderMutation, useOnBoardUpdatedSubscription } from '@/graphql/generated-boards'

// Define typescript types for cards and columns
type CardType = {
    id: string  // ID of card
    title: string  // Title of the card
    description?: string | null  // Optional card description
    order: number | null  // Order of the card for drag and drop
}

type ColumnType = {
    id: string  // ID of column
    name: string  // Name of column
    order?: number | null  // Order of the column
    cards: CardType[]  // Array of associated cards
}

// Renders main contents of the board
function BoardContent({ id }: { id: string }) {
    // Subscribe to real-time updates for a specific board
    const { data, loading, error} = useOnBoardUpdatedSubscription({ variables: { boardId: id } });
    console.log(data?.boards_by_pk?.columns)

    // Holds the current column structure as an empty array of columns
    const [columns, setColumns] = useState<ColumnType[]>([])
    // Hooks to update positions of columns and cards
    const [updateColumnOrder] = useUpdateColumnOrderMutation()
    const [updateCardOrder] = useUpdateCardOrderMutation()
    
    // Get teh board from the subscription data
    const board = data?.boards_by_pk

    // Sync local state when subscription data changes
    useEffect(() => {
        if (!board?.columns) return;

        const newColumns = board.columns
            .slice()  // Copy to avoid mutating original array
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))  // Sort by order
            .map((col) => ({
                id: col.id,
                name: col.name,
                order: col.order,
                cards: col.cards
                    .slice()
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))  // Sort the cards in each column
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


    // Handle loading state
    if (loading) return <p>Loading...</p>;
    if (data) console.log("Board data:", data);
    // Hanlde error state
    if (error) return <p>Error: {error.message}</p>;
    // Handle empty board case
    if (!board) return <p>Board not found</p>;
    
    // Handle drag and drop behavior when user stops dragging
    const handleDragEnd = async (result: DropResult) => {
        const { source, destination, type } = result
        if (!destination) return  // Do nothing if dropped outside
        // Handle reordering columns
        if (type === 'column') {
            const reordered = Array.from(columns)
            const [moved] = reordered.splice(source.index, 1)
            reordered.splice(destination.index, 0, moved)
            setColumns(reordered)
            // Update order in the backend
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

        // Handle reordering cards within or across columns
        const sourceColIndex = columns.findIndex((col) => col.id === source.droppableId)
        const destColIndex = columns.findIndex((col) => col.id === destination.droppableId)
        if (sourceColIndex === -1 || destColIndex === -1) return

        const sourceCol = columns[sourceColIndex]
        const destCol = columns[destColIndex]

        const sourceCards = [...sourceCol.cards]
        const [movedCard] = sourceCards.splice(source.index, 1)

        // If moved within same column
        if (source.droppableId === destination.droppableId) {
            sourceCards.splice(destination.index, 0, movedCard)
            const updated = [...columns]
            updated[sourceColIndex] = { ...sourceCol, cards: sourceCards }
            setColumns(updated)

            // Update backend order
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
            // Moved to a different column
            const destCards = [...destCol.cards]
            destCards.splice(destination.index, 0, movedCard)
            const updated = [...columns]
            updated[sourceColIndex] = { ...sourceCol, cards: sourceCards }
            updated[destColIndex] = { ...destCol, cards: destCards }
            setColumns(updated)

            // Update both columns' cards in backend
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
    // Render board ui
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{board.name}</h1>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="board" type="column" direction="horizontal">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: '100px' }}>
                            {/* Render each column */}
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
                                                        {/* Render cards in each column */}
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
                                            {/* Button to add card*/}
                                            <AddCardButton columnId={column.id}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            {/* Add new column section */}
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

// Wraps BoardContent in protected route and layout
export default function BoardPage() {
    // Get board ID from URL
    const params = useParams()
    // Cast to string
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