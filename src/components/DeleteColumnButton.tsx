'use client'

// Custom button ui component
import { Button } from '@/components/ui/button'
// Hook to delete a column
import { useDeleteColumnMutation } from '@/graphql/generated-boards'

// Props expected by the delete column button
interface DeleteColumnButtonProps {
    columnId: string  // ID of column to be deleted
    onColumnDeleted?: () => void  // Optional callback function
}

// Renders a delete button for the column
export const DeleteColumnButton = ({ columnId, onColumnDeleted }: DeleteColumnButtonProps) => {
    // Get the mutation function and the loading state
    const [deleteColumn, { loading }] = useDeleteColumnMutation()

    // Handle delete click event
    const handleDelete = async () => {
        try {
            // Calls mutation to delete column
            await deleteColumn({ variables: { id: columnId } })
            // If callback is provided, call it
            if(onColumnDeleted) {
                onColumnDeleted()
            }
        } catch (err) {
            console.error('Failed to delete column:', err)
        }
    }

    return (
        // Renders a small "x" button to delete the column
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