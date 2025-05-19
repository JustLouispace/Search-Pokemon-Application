import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        grass: "border-transparent bg-green-100 text-green-800 hover:bg-green-200/80",
        fire: "border-transparent bg-red-100 text-red-800 hover:bg-red-200/80",
        water: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200/80",
        electric: "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200/80",
        ice: "border-transparent bg-cyan-100 text-cyan-800 hover:bg-cyan-200/80",
        fighting: "border-transparent bg-orange-100 text-orange-800 hover:bg-orange-200/80",
        poison: "border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200/80",
        ground: "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200/80",
        flying: "border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200/80",
        psychic: "border-transparent bg-pink-100 text-pink-800 hover:bg-pink-200/80",
        bug: "border-transparent bg-lime-100 text-lime-800 hover:bg-lime-200/80",
        rock: "border-transparent bg-stone-100 text-stone-800 hover:bg-stone-200/80",
        ghost: "border-transparent bg-violet-100 text-violet-800 hover:bg-violet-200/80",
        dragon: "border-transparent bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-200/80",
        dark: "border-transparent bg-gray-800 text-gray-100 hover:bg-gray-700",
        steel: "border-transparent bg-slate-300 text-slate-800 hover:bg-slate-200",
        fairy: "border-transparent bg-rose-100 text-rose-800 hover:bg-rose-200/80",
        normal: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200/80",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

export { Badge, badgeVariants }
