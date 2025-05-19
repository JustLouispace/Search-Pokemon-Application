import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Type-based color mapping
export const typeColors = {
  Normal: {
    light: "from-gray-200 to-gray-300",
    medium: "from-gray-400 to-gray-500",
    dark: "from-gray-600 to-gray-700",
    badge: "bg-gray-100 text-gray-800",
    border: "border-gray-400",
    text: "text-gray-700",
  },
  Fire: {
    light: "from-red-200 to-orange-200",
    medium: "from-red-500 to-orange-500",
    dark: "from-red-700 to-orange-700",
    badge: "bg-red-100 text-red-800",
    border: "border-red-500",
    text: "text-red-700",
  },
  Water: {
    light: "from-blue-200 to-cyan-200",
    medium: "from-blue-500 to-cyan-500",
    dark: "from-blue-700 to-cyan-700",
    badge: "bg-blue-100 text-blue-800",
    border: "border-blue-500",
    text: "text-blue-700",
  },
  Electric: {
    light: "from-yellow-200 to-amber-200",
    medium: "from-yellow-400 to-amber-400",
    dark: "from-yellow-600 to-amber-600",
    badge: "bg-yellow-100 text-yellow-800",
    border: "border-yellow-400",
    text: "text-yellow-700",
  },
  Grass: {
    light: "from-green-200 to-emerald-200",
    medium: "from-green-500 to-emerald-500",
    dark: "from-green-700 to-emerald-700",
    badge: "bg-green-100 text-green-800",
    border: "border-green-500",
    text: "text-green-700",
  },
  Ice: {
    light: "from-cyan-200 to-sky-200",
    medium: "from-cyan-400 to-sky-400",
    dark: "from-cyan-600 to-sky-600",
    badge: "bg-cyan-100 text-cyan-800",
    border: "border-cyan-400",
    text: "text-cyan-700",
  },
  Fighting: {
    light: "from-orange-200 to-red-200",
    medium: "from-orange-600 to-red-600",
    dark: "from-orange-800 to-red-800",
    badge: "bg-orange-100 text-orange-800",
    border: "border-orange-600",
    text: "text-orange-700",
  },
  Poison: {
    light: "from-purple-200 to-fuchsia-200",
    medium: "from-purple-500 to-fuchsia-500",
    dark: "from-purple-700 to-fuchsia-700",
    badge: "bg-purple-100 text-purple-800",
    border: "border-purple-500",
    text: "text-purple-700",
  },
  Ground: {
    light: "from-amber-200 to-yellow-200",
    medium: "from-amber-600 to-yellow-600",
    dark: "from-amber-800 to-yellow-800",
    badge: "bg-amber-100 text-amber-800",
    border: "border-amber-600",
    text: "text-amber-700",
  },
  Flying: {
    light: "from-indigo-200 to-blue-200",
    medium: "from-indigo-400 to-blue-400",
    dark: "from-indigo-600 to-blue-600",
    badge: "bg-indigo-100 text-indigo-800",
    border: "border-indigo-400",
    text: "text-indigo-700",
  },
  Psychic: {
    light: "from-pink-200 to-purple-200",
    medium: "from-pink-500 to-purple-500",
    dark: "from-pink-700 to-purple-700",
    badge: "bg-pink-100 text-pink-800",
    border: "border-pink-500",
    text: "text-pink-700",
  },
  Bug: {
    light: "from-lime-200 to-green-200",
    medium: "from-lime-500 to-green-500",
    dark: "from-lime-700 to-green-700",
    badge: "bg-lime-100 text-lime-800",
    border: "border-lime-500",
    text: "text-lime-700",
  },
  Rock: {
    light: "from-stone-200 to-gray-200",
    medium: "from-stone-500 to-gray-500",
    dark: "from-stone-700 to-gray-700",
    badge: "bg-stone-100 text-stone-800",
    border: "border-stone-500",
    text: "text-stone-700",
  },
  Ghost: {
    light: "from-violet-200 to-purple-200",
    medium: "from-violet-500 to-purple-500",
    dark: "from-violet-700 to-purple-700",
    badge: "bg-violet-100 text-violet-800",
    border: "border-violet-500",
    text: "text-violet-700",
  },
  Dragon: {
    light: "from-blue-200 to-indigo-200",
    medium: "from-blue-600 to-indigo-600",
    dark: "from-blue-800 to-indigo-800",
    badge: "bg-blue-100 text-blue-800",
    border: "border-blue-600",
    text: "text-blue-700",
  },
  Dark: {
    light: "from-gray-700 to-gray-800",
    medium: "from-gray-800 to-gray-900",
    dark: "from-gray-900 to-black",
    badge: "bg-gray-700 text-gray-100",
    border: "border-gray-800",
    text: "text-gray-200",
  },
  Steel: {
    light: "from-slate-300 to-gray-300",
    medium: "from-slate-500 to-gray-500",
    dark: "from-slate-700 to-gray-700",
    badge: "bg-slate-200 text-slate-800",
    border: "border-slate-500",
    text: "text-slate-700",
  },
  Fairy: {
    light: "from-pink-200 to-rose-200",
    medium: "from-pink-400 to-rose-400",
    dark: "from-pink-600 to-rose-600",
    badge: "bg-pink-100 text-pink-800",
    border: "border-pink-400",
    text: "text-pink-700",
  },
}

export function getTypeColor(type: string): string {
  const normalizedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  return typeColors[normalizedType as keyof typeof typeColors]?.medium || typeColors.Normal.medium
}

export function getTypeGradient(type: string): string {
  const normalizedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  return `bg-gradient-to-r ${typeColors[normalizedType as keyof typeof typeColors]?.medium || typeColors.Normal.medium}`
}

export function getTypeLightGradient(type: string): string {
  const normalizedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  return `bg-gradient-to-r ${typeColors[normalizedType as keyof typeof typeColors]?.light || typeColors.Normal.light}`
}

export function getTypeDarkGradient(type: string): string {
  const normalizedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  return `bg-gradient-to-r ${typeColors[normalizedType as keyof typeof typeColors]?.dark || typeColors.Normal.dark}`
}

export function getTypeBadgeClass(type: string): string {
  const normalizedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  return typeColors[normalizedType as keyof typeof typeColors]?.badge || typeColors.Normal.badge
}

export function getTypeBorderClass(type: string): string {
  const normalizedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  return typeColors[normalizedType as keyof typeof typeColors]?.border || typeColors.Normal.border
}

export function getTypeTextClass(type: string): string {
  const normalizedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  return typeColors[normalizedType as keyof typeof typeColors]?.text || typeColors.Normal.text
}

export function getTypeVariant(type: string): string {
  const typeMap: Record<string, string> = {
    Normal: "normal",
    Fire: "fire",
    Water: "water",
    Electric: "electric",
    Grass: "grass",
    Ice: "ice",
    Fighting: "fighting",
    Poison: "poison",
    Ground: "ground",
    Flying: "flying",
    Psychic: "psychic",
    Bug: "bug",
    Rock: "rock",
    Ghost: "ghost",
    Dragon: "dragon",
    Dark: "dark",
    Steel: "steel",
    Fairy: "fairy",
  }

  return typeMap[type] || "default"
}

export function formatStatValue(value: number): string {
  return value.toString().padStart(3, "0")
}

export function calculateStatPercentage(value: number, max = 255): number {
  return (value / max) * 100
}

export function getStatVariant(value: number): "default" | "success" | "warning" | "danger" {
  if (value >= 100) return "success"
  if (value >= 70) return "default"
  if (value >= 40) return "warning"
  return "danger"
}

export function getPrimaryType(types: string[]): string {
  return types && types.length > 0 ? types[0] : "Normal"
}
