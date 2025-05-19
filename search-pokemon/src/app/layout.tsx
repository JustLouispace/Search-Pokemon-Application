import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import PokemonProvider from "@/components/PokemonProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pokémon Search",
  description: "Search for Pokémon and view their details, attacks, and evolutions",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PokemonProvider>{children}</PokemonProvider>
      </body>
    </html>
  )
}
