'use client'

// Mutation hook to insert new columns
import { useInsertColumnsMutation } from '@/graphql/generated-boards'
// Custom button and input ui components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// Hook to keep track of local states
import { useState } from 'react'

// Props expected by add column button component
interface AddColumnButtonProps {
    boardId: string  // ID of board new column belongs to
    existingColumnCount?: number  // Number of existing columns in the board
    onColumnAdded?: () => void  // Optional callback
}

// Component to render add column form
export const AddColumnButton = ({ boardId, existingColumnCount = 0, onColumnAdded }: AddColumnButtonProps) => {
    // Local state to track value of input field
    const [columnName, setColumnName] = useState('')
    // Mutation hook to insert a new column
    const [insertColumn, { loading }] = useInsertColumnsMutation()

    // Handle creation of new column when button is pressed
    const handleAddColumn = async () => {
        // Do nothing if input is not provided
        if (!columnName.trim()) return

        try {
            // Call mutation to insert a new column with provided data
            await insertColumn({
                variables: {
                    objects: [
                        {
                            name: columnName,
                            board_id: boardId,
                            order: existingColumnCount + 1,
                        }
                    ]
                }
            })
            // Reset input field
            setColumnName('')
            // Call optional callback
            if (onColumnAdded) onColumnAdded()
        } catch (err) {
            console.error('Error adding column:', err)
        }
    }

    return (
        <div className="flex flex-col gap-2 max-w-xs p-2">
            {/* Input field for column name */}
            <Input
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
                placeholder="New column name"
            />
            {/* Button to create the new column */}
            <Button onClick={handleAddColumn} disabled={loading}>
                {loading ? 'Adding...' : 'Add Column'}
            </Button>
        </div>
    )
}