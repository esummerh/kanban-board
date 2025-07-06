'use client'

import { useState } from 'react'
import { Input } from './ui/input'
import { useUpdateColumnMutation } from '@/graphql/generated-boards'

interface EditableColumnTitleProps {
    columnId: string
    initialName: string
}

export const EditableColumnTitle = ({ columnId, initialName }: EditableColumnTitleProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(initialName)
    const [updateColumn] = useUpdateColumnMutation()

    const handleBlur = async () => {
        setIsEditing(false)
        if (name !== initialName) {
            try {
                await updateColumn({
                    variables: {
                        id: columnId,
                        name: name.trim()
                    }
                })
            } catch (err) {
                console.error('Failed to update column name:', err)
                setName(initialName)
            }
        }
    }

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
        <h2 className="font-semibold mb-2 cursor-pointer" onClick={() => setIsEditing(true)}>{name}</h2>
    )
}