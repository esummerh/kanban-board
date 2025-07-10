'use client' // Enables client-side rendering

// Deletes card
import { useDeleteCardMutation } from '@/graphql/generated-boards'
// Imports custom UI button component
import { Button } from '@/components/ui/button'

// Defines props expected by the component
interface DeleteCardButtonProps {
    cardId: string  // ID of card to delete
    onCardDeleted?: () => void  // Optional callback function
}

// Component for rendering a delete button for a card
export const DeleteCardButton = ({ cardId, onCardDeleted }: DeleteCardButtonProps) => {
    // Hook to perform deletion of the card
    const [deleteCard, { loading }] = useDeleteCardMutation()

    // Function to handle delete button click
    const handleDelete = async () => {
        try {
            // Executes mutation with the card ID
            await deleteCard({ variables: { id: cardId } })
            // If a callback is provided, call it
            if(onCardDeleted) {
                onCardDeleted()
            }
        } catch (error) {
            console.error('Failed to delete card:', error)
        }
    }

    return (
        // Renders a small red "x" button
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