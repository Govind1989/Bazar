import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-bazar-gray-100 dark:bg-bazar-gray-900", className)}
      {...props}
    />
  )
}

export { Skeleton }
