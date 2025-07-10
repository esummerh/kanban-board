'use client';

// Hooks for inserting boards and columns and querying boards
import { useInsertBoardMutation, useBoardsQuery, useInsertColumnsMutation } from '@/graphql/generated-boards';
// The custom input and button ui components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// Hook for managing component states
import { useState } from 'react';
// Hook for navigating through app directory
import { useRouter } from 'next/navigation'

// Function to create a new board
export default function NewBoardFunction() {
    // Local state for storing board name input
    const [boardName, setBoardName] = useState('');
    // Mutation hook for inserting a new board
    const [insertBoard, { loading, error }] = useInsertBoardMutation();
    // Mutation hook for inserting default columns
    const [insertColumns] = useInsertColumnsMutation();
    // Redirecting after a board creation
    const router = useRouter()
    // Hook to re-fetch all boards when a new board is created
    const { refetch } = useBoardsQuery()

    // Triggered when create board button is pressed
    const handleCreateBoard = async () => {
        if (!boardName.trim()) return;  // Don't create a board if the name is missing in the input field

        try {
            // Insert a board with the provided name
            const { data } = await insertBoard({ variables: { name: boardName } });
            console.log('Created board:', data?.insert_boards_one);
            // Refresh the list of boards in the sidebar
            await refetch();
            // Get the new board's ID
            const newBoardId = data?.insert_boards_one?.id

            // If the board was successfully created, insert default columns
            if (newBoardId) {
                await insertColumns({
                    variables: {
                        objects: [
                            { name: 'To Do', order: 1, board_id: newBoardId },
                            { name: 'In Progress', order: 2, board_id: newBoardId },
                            { name: 'Done', order: 3, board_id: newBoardId }
                        ]
                    }
                });
                // Redirect the user to the newly created board
                router.push(`/board/${newBoardId}`)
            }
        } catch (err) {
            console.error('Failed to create board:', err);
        }
    };

    return (
        <div className="p-4 flex flex-col gap-2 max-w-sm">
            {/* Input field to enter new board name */}
            <Input value={boardName} onChange={(e) => setBoardName(e.target.value)} placeholder="Enter board name"/>
            {/* Button to trigger board creation */}
            <Button onClick={handleCreateBoard} disabled={loading}>
                {loading ? 'Creating...' : 'Create Board'}
            </Button>
            {error && <p className="text-sm text-red-600">Error: {error.message}</p>}
        </div>
    );
}