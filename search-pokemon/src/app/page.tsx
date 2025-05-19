import SearchInput from "@/components/SearchInput"
import PokemonDetails from "@/components/PokemonDetails"
import { Suspense } from "react"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>
}) {
  // Await the searchParams before accessing its properties
  const params = await searchParams
  const pokemonName = params.name || ""

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600 mb-2">Pokémon Search</h1>
        <p className="text-gray-600">Search for a Pokémon to see its details, attacks, and evolutions</p>
      </div>

      <SearchInput />

      <Suspense
        fallback={
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        }
      >
        <PokemonDetails name={pokemonName} />
      </Suspense>
    </main>
  )
}
