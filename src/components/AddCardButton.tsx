'use client'

import { useInsertCardMutation } from '@/graphql/generated-boards'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface AddCardButtonProps {
    columnId: string
    onCardAdded?: () => void
}

export const AddCardButton = ({ columnId, onCardAdded }: AddCardButtonProps) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [insertCard, { loading }] = useInsertCardMutation()

    const handleAddCard = async () => {
        if (!description.trim()) return

        try {
            await insertCard({
                variables: {
                    column_id: columnId,
                    title,
                    description,
                },
            })
            setDescription('')
            setTitle('')
            onCardAdded?.()
        } catch (err) {
            console.error('Failed to add card:', err)
        }
    }

    return (
        <div className="flex flex-col gap-2 mt-2">
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Card title"
            />
            <Input 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Card description"
            />
            <Button onClick={handleAddCard} disabled={loading}>
                {loading ? 'Adding...' : 'Add Card'}
            </Button>
        </div>
    )
}