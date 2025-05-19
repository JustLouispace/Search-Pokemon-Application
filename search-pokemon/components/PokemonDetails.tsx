"use client"

import { useQuery } from "@apollo/client"
import { GET_POKEMON } from "../lib/graphql/queries"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface PokemonDetailsProps {
  name: string
}

export default function PokemonDetails({ name }: PokemonDetailsProps) {
  const router = useRouter()
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { name },
    skip: !name,
  })

  if (!name) {
    return (
      <div className="text-center p-8 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Welcome to Pokemon Search!</h2>
        <p>Enter a Pokemon name above to see details.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Error!</h2>
        <p>{error.message}</p>
      </div>
    )
  }

  if (!data || !data.pokemon) {
    return (
      <div className="text-center p-8 bg-yellow-100 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Pokemon Not Found</h2>
        <p>Could not find a Pokemon named "{name}".</p>
        <p className="mt-4">Try searching for another Pokemon.</p>
      </div>
    )
  }

  const pokemon = data.pokemon

  const handleEvolutionClick = (evolutionName: string) => {
    router.push(`/?name=${encodeURIComponent(evolutionName)}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Pokemon Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            {pokemon.image && (
              <Image
                src={pokemon.image || "/placeholder.svg"}
                alt={pokemon.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, 160px"
              />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-red-200">#{pokemon.number}</p>
            <h1 className="text-3xl font-bold mb-2">{pokemon.name}</h1>
            <p className="text-lg mb-2">{pokemon.classification}</p>
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((type: string) => (
                <span key={type} className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pokemon Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Max CP</p>
                <p className="font-semibold">{pokemon.maxCP}</p>
              </div>
              <div>
                <p className="text-gray-500">Max HP</p>
                <p className="font-semibold">{pokemon.maxHP}</p>
              </div>
              <div>
                <p className="text-gray-500">Height</p>
                <p className="font-semibold">
                  {pokemon.height.minimum} - {pokemon.height.maximum}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Weight</p>
                <p className="font-semibold">
                  {pokemon.weight.minimum} - {pokemon.weight.maximum}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Flee Rate</p>
                <p className="font-semibold">{pokemon.fleeRate}</p>
              </div>
            </div>

            <h2 className="text-xl font-bold mt-6 mb-4 border-b pb-2">Type Effectiveness</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-gray-500 mb-2">Resistant to</p>
                <div className="flex flex-wrap gap-2">
                  {pokemon.resistant.map((type: string) => (
                    <span key={type} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-gray-500 mb-2">Weak to</p>
                <div className="flex flex-wrap gap-2">
                  {pokemon.weaknesses.map((type: string) => (
                    <span key={type} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Attacks</h2>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Fast Attacks</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {pokemon.attacks.fast.map((attack: any) => (
                  <div key={attack.name} className="mb-3 last:mb-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{attack.name}</span>
                      <span className="text-sm px-2 py-1 bg-gray-200 rounded-full">{attack.damage} DMG</span>
                    </div>
                    <p className="text-sm text-gray-500">Type: {attack.type}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Special Attacks</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {pokemon.attacks.special.map((attack: any) => (
                  <div key={attack.name} className="mb-3 last:mb-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{attack.name}</span>
                      <span className="text-sm px-2 py-1 bg-gray-200 rounded-full">{attack.damage} DMG</span>
                    </div>
                    <p className="text-sm text-gray-500">Type: {attack.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Evolutions */}
        {pokemon.evolutions && pokemon.evolutions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Evolutions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {pokemon.evolutions.map((evolution: any) => (
                <div
                  key={evolution.id}
                  className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleEvolutionClick(evolution.name)}
                >
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    {evolution.image && (
                      <Image
                        src={evolution.image || "/placeholder.svg"}
                        alt={evolution.name}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    )}
                  </div>
                  <p className="font-medium text-blue-600 hover:underline">{evolution.name}</p>
                  <div className="flex flex-wrap justify-center gap-1 mt-2">
                    {evolution.types.map((type: string) => (
                      <span key={type} className="px-2 py-0.5 bg-gray-200 rounded-full text-xs">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
