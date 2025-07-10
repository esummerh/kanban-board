// Import React and its types
import * as React from "react"
// Import the cn utility function used to merge Tailwind class names conditionally
import { cn } from "@/lib/utils"

// Create a reusable input component
// Allows refs to be forwarded to the underlying <input> element
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, ...props }, ref) => {
        return (
            <input 
                type={type}  // Set the type of input
                // Combine default tailwind styles with any custom 'className' passed as props
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}  // Forward the ref to the native input element
                {...props}  // Spread the rest of the props
            />
        )
    }
)
// Set a readable display name for debugging tools
Input.displayName = "Input"
// Export the component to use elsewhere
export { Input }