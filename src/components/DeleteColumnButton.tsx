'use client'

import { Button } from '@/components/ui/button'
import { useDeleteColumnMutation } from '@/graphql/generated-boards'

interface DeleteColumnButtonProps {
    columnId: string
    onColumnDeleted?: () => void
}

export const DeleteColumnButton = ({ columnId, onColumnDeleted }: DeleteColumnButtonProps) => {
    const [deleteColumn, { loading }] = useDeleteColumnMutation()

    const handleDelete = async () => {
        try {
            await deleteColumn({ variables: { id: columnId } })
            if(onColumnDeleted) {
                onColumnDeleted()
            }
        } catch (err) {
            console.error('Failed to delete column:', err)
        }
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            className="text-red-500 hover:text-red-700 ml-2"
        >
            x
        </Button>
    )
}