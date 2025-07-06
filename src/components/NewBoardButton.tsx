'use client';

import { useInsertBoardMutation, useBoardsQuery, useInsertColumnsMutation } from '@/graphql/generated-boards';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function NewBoardFunction() {
    const [boardName, setBoardName] = useState('');
    const [insertBoard, { loading, error }] = useInsertBoardMutation();
    const [insertColumns] = useInsertColumnsMutation();
    const router = useRouter()
    const { refetch } = useBoardsQuery()

    const handleCreateBoard = async () => {
        if (!boardName.trim()) return;

        try {
            const { data } = await insertBoard({ variables: { name: boardName } });
            console.log('Created board:', data?.insert_boards_one);
            await refetch();
            const newBoardId = data?.insert_boards_one?.id

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
                router.push(`/board/${newBoardId}`)
            }
        } catch (err) {
            console.error('Failed to create board:', err);
        }
    };

    return (
        <div className="p-4 flex flex-col gap-2 max-w-sm">
            <Input value={boardName} onChange={(e) => setBoardName(e.target.value)} placeholder="Enter board name"/>
            <Button onClick={handleCreateBoard} disabled={loading}>
                {loading ? 'Creating...' : 'Create Board'}
            </Button>
            {error && <p className="text-sm text-red-600">Error: {error.message}</p>}
        </div>
    );
}