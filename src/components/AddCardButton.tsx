'use client'  // Ensures component runs in the browser

// Mutation for inserting a new card
import { useInsertCardMutation } from '@/graphql/generated-boards'
// Manages local input store
import { useState } from 'react'
// Reusable Input and Button UI components
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Props for AddCardButton component
interface AddCardButtonProps {
    columnId: string  // ID of column card will belong to upon insert
    onCardAdded?: () => void  // Optional callback to notify parent when card is added
}

// AddCardButton component definition
export const AddCardButton = ({ columnId, onCardAdded }: AddCardButtonProps) => {
    // Local state for card title and description
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    // Hook to insert a card
    // Loading tells us whether the request is in progress
    const [insertCard, { loading }] = useInsertCardMutation()

    // Handles the card creation logic
    const handleAddCard = async () => {
        // Don't submit if there is no description provided
        if (!description.trim()) return

        try {
            // Run the insert card mutation
            await insertCard({
                variables: {
                    column_id: columnId,  // Add card to this column
                    title,  // Give card this title
                    description,  // Give card this description
                },
            })
            // Clear input fields
            setDescription('')
            setTitle('')
            // Call optional callback
            onCardAdded?.()
        } catch (err) {
            console.error('Failed to add card:', err)
        }
    }

    return (
        <div className="flex flex-col gap-2 mt-2">
            {/* Input for card title */}
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Card title"
            />
            {/* Input for card description */}
            <Input 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Card description"
            />
            {/* Add card button */}
            <Button onClick={handleAddCard} disabled={loading}>
                {loading ? 'Adding...' : 'Add Card'}
            </Button>
        </div>
    )
}