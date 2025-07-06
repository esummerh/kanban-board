'use client'

import { useInsertColumnsMutation } from '@/graphql/generated-boards'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface AddColumnButtonProps {
    boardId: string
    existingColumnCount?: number
    onColumnAdded?: () => void
}

export const AddColumnButton = ({ boardId, existingColumnCount = 0, onColumnAdded }: AddColumnButtonProps) => {
    const [columnName, setColumnName] = useState('')
    const [insertColumn, { loading }] = useInsertColumnsMutation()

    const handleAddColumn = async () => {
        if (!columnName.trim()) return

        try {
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
            setColumnName('')
            if (onColumnAdded) onColumnAdded()
        } catch (err) {
            console.error('Error adding column:', err)
        }
    }

    return (
        <div className="flex flex-col gap-2 max-w-xs p-2">
            <Input
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
                placeholder="New column name"
            />
            <Button onClick={handleAddColumn} disabled={loading}>
                {loading ? 'Adding...' : 'Add Column'}
            </Button>
        </div>
    )
}