import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textVariants = cva("tracking-normal transition-colors", {
  variants: {
    variant: {
      displayXl: "font-mono text-[40px] md:text-[64px] font-semibold leading-[1.05] tracking-[-0.04em] text-bazar-black dark:text-bazar-white",
      displayLg: "font-mono text-[32px] md:text-[48px] font-semibold leading-[1.1] tracking-[-0.03em] text-bazar-black dark:text-bazar-white",
      displayMd: "font-mono text-[28px] md:text-[36px] font-semibold leading-[1.15] tracking-[-0.02em] text-bazar-black dark:text-bazar-white",
      displaySm: "font-mono text-[24px] md:text-[28px] font-semibold leading-[1.2] tracking-[-0.01em] text-bazar-black dark:text-bazar-white",
      titleLg: "font-sans text-[22px] font-semibold leading-[1.3] tracking-[-0.01em]",
      titleMd: "font-sans text-[18px] font-semibold leading-[1.4]",
      titleSm: "font-sans text-[16px] font-semibold leading-[1.4]",
      bodyMd: "font-sans text-[16px] font-normal leading-[1.5] text-bazar-gray-600 dark:text-bazar-gray-400",
      bodySm: "font-sans text-[14px] font-normal leading-[1.5] text-bazar-gray-600 dark:text-bazar-gray-400",
      caption: "font-sans text-[13px] font-medium leading-[1.4] uppercase tracking-wider opacity-80",
      navLink: "font-sans text-[14px] font-medium leading-[1.4]",
    },
  },
  defaultVariants: {
    variant: "bodyMd",
  },
})

interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as: Component = "p", ...props }, ref) => {
    return (
      <Component
        className={cn(textVariants({ variant, className }))}
        ref={ref as any}
        {...props}
      />
    )
  }
)

Typography.displayName = "Typography"

export { Typography, textVariants }
