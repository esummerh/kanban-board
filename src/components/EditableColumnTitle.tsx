'use client'

// React hook for managing local component state
import { useState } from 'react'
// Custom input component
import { Input } from './ui/input'
// Mutation to update columns
import { useUpdateColumnMutation } from '@/graphql/generated-boards'

// Props expected by this component
interface EditableColumnTitleProps {
    columnId: string
    initialName: string
}

// Editable column name component
export const EditableColumnTitle = ({ columnId, initialName }: EditableColumnTitleProps) => {
    const [isEditing, setIsEditing] = useState(false)  // Whether we are in edit mode
    const [name, setName] = useState(initialName)  // Hold the current value of name
    const [updateColumn] = useUpdateColumnMutation()  // Mutation function for updating the name

    // Called when input loses focus
    const handleBlur = async () => {
        setIsEditing(false)  // Exit editing mode
        if (name !== initialName) {  // Update if the name is changed
            try {
                await updateColumn({
                    variables: {
                        id: columnId,
                        name: name.trim()  // Remove extra whitespace before saving
                    }
                })
            } catch (err) {
                console.error('Failed to update column name:', err)
                setName(initialName)  // Revert to original name if update fails
            }
        }
    }

    // Render input field if in editing mode
    return isEditing ? (
        <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
                if (e.key === 'Enter') e.currentTarget.blur()
            }}
            autoFocus
            className="text-sm font-semibold"
        />
    ) : (
        // If not editing, just render a static title that can be clicked to edit
        <h2 className="font-semibold mb-2 cursor-pointer" onClick={() => setIsEditing(true)}>{name}</h2>
    )
}