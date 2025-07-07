'use client'

import { useDeleteCardMutation } from '@/graphql/generated-boards'
import { Button } from '@/components/ui/button'

interface DeleteCardButtonProps {
    cardId: string
    onCardDeleted: () => void
}

export const DeleteCardButton = ({ cardId, onCardDeleted }: DeleteCardButtonProps) => {
    const [deleteCard, { loading }] = useDeleteCardMutation()

    const handleDelete = async () => {
        try {
            await deleteCard({ variables: { id: cardId } })
            onCardDeleted()
        } catch (error) {
            console.error('Failed to delete card:', error)
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