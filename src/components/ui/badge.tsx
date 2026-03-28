import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground",
        accent:
          "bg-accent text-accent-foreground",
        success:
          "bg-success/10 text-success border border-success/20",
        warning:
          "bg-gold/10 text-gold border border-gold/20",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20",
        outline: 
          "border border-border text-foreground bg-transparent",
        muted:
          "bg-muted text-muted-foreground",
        beginner:
          "bg-success/10 text-success border border-success/20",
        intermediate:
          "bg-gold/10 text-gold border border-gold/20",
        advanced:
          "bg-accent/10 text-accent border border-accent/20",
        explorer:
          "bg-success/10 text-success border border-success/20",
        builder:
          "bg-primary/10 text-primary border border-primary/20",
        strategist:
          "bg-accent/10 text-accent border border-accent/20",
        investor:
          "bg-gold/10 text-gold border border-gold/20",
        "capital-architect":
          "bg-destructive/10 text-destructive border border-destructive/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
