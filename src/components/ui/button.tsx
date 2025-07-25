// Import the entire React library
import * as React from "react"
// Slot allows this component to wrap other component while preserving props and styles
import { Slot } from "@radix-ui/react-slot"
// cva helps create a variant-based className logic
// VariantProps extracts types for our variant options
import { cva, type VariantProps } from "class-variance-authority"
// Utility function to merge class names
import { cn } from "@/lib/utils"

// Defines button variants using cva
// This enables different styles based on "variant" and "size" props
const buttonVariants = cva(
  // Styles shared by all buttons
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      // Button style variants
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      // Button size variants
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    // The fallback variants used if none are specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Button component definition
function Button({
  className,  // Optional class override
  variant,  // Variant type
  size,  // Size type
  asChild = false,  // If true, use Slot to wrap custom component
  ...props  // other button props like onClick, etc.
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  // Determine which element to render
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// Export the component and the variant utility for external use
export { Button, buttonVariants }
