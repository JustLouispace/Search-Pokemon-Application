import SearchInput from "@/components/SearchInput"
import PokemonDetails from "@/components/PokemonDetails"
import { Suspense } from "react"
import Image from "next/image"

export default function Home({
  searchParams,
}: {
  searchParams: { name?: string }
}) {
  const pokemonName = searchParams.name || ""

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8 relative">
          <div className="absolute top-0 left-0 w-full h-full flex justify-center opacity-5 pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="8" />
              <circle cx="50" cy="50" r="15" fill="black" />
            </svg>
          </div>

          <div className="relative inline-block">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 mb-2">
              Pokémon Search
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search for a Pokémon to see its details, attacks, and evolutions
          </p>
        </header>

        <SearchInput />

        <Suspense
          fallback={
            <div className="flex justify-center items-center p-12">
              <div className="w-16 h-16 relative">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-2 border-gray-800 rounded-full"></div>
              </div>
            </div>
          }
        >
          <PokemonDetails name={pokemonName} />
        </Suspense>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Data provided by the Pokémon GraphQL API</p>
        </footer>
      </div>
    </main>
  )
}
