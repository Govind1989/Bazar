import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bazar-black dark:focus-visible:ring-bazar-white disabled:pointer-events-none disabled:opacity-50 font-mono uppercase tracking-widest active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-bazar-black text-bazar-white hover:bg-bazar-gray-800 dark:bg-bazar-white dark:text-bazar-black dark:hover:bg-bazar-gray-200",
        outline: "border border-bazar-black bg-transparent text-bazar-black hover:bg-bazar-black hover:text-bazar-white dark:border-bazar-white dark:text-bazar-white dark:hover:bg-bazar-white dark:hover:text-bazar-black",
        secondary: "bg-bazar-gray-100 text-bazar-black hover:bg-bazar-gray-200 dark:bg-bazar-gray-800 dark:text-bazar-white dark:hover:bg-bazar-gray-700",
        ghost: "hover:bg-bazar-gray-100 text-bazar-black dark:hover:bg-bazar-gray-900 dark:text-bazar-white",
        link: "text-bazar-black dark:text-bazar-white underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
