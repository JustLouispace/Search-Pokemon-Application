"use client"

import { useQuery } from "@apollo/client"
import { GET_POKEMON } from "@/lib/graphql/queries"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  formatStatValue,
  calculateStatPercentage,
  getStatVariant,
  getTypeGradient,
  getTypeLightGradient,
  getTypeBadgeClass,
  getPrimaryType,
  getTypeTextClass,
} from "@/lib/utils"
import { ChevronRight, Info, Shield, Zap, Swords, Heart, Scale, ArrowRight } from "lucide-react"

interface PokemonDetailsProps {
  name: string
}

export default function PokemonDetails({ name }: PokemonDetailsProps) {
  const router = useRouter()
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { name },
    skip: !name,
  })

  const [activeTab, setActiveTab] = useState<"stats" | "attacks" | "evolutions">("stats")
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Animation effect when data changes
  useEffect(() => {
    if (data?.pokemon) {
      setIsVisible(false)
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [data])

  if (!name) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-12 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl shadow-sm"
      >
        <div className="relative w-48 h-48 mx-auto mb-6">
          <Image src="/pokemon-silhouette.png" alt="Pokemon" width={200} height={200} className="mx-auto opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-full animate-pulse"></div>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-gray-700">Welcome to Pokémon Search!</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Search for any Pokémon by name to see detailed information, stats, attacks, and evolutions.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Pikachu", "Charizard", "Eevee", "Mewtwo", "Gengar", "Dragonite"].map((pokemon) => (
            <button
              key={pokemon}
              onClick={() => router.push(`/?name=${pokemon}`)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all hover:scale-105 shadow-md"
            >
              Try {pokemon}
            </button>
          ))}
        </div>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="w-20 h-20 relative">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-gray-800 rounded-full"></div>
        </div>
        <p className="mt-6 text-lg font-medium text-gray-600">Searching for {name}...</p>
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-8 bg-red-50 text-red-700 rounded-xl shadow-sm"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
          <Info className="h-6 w-6 text-red-600" />
        </div>
        <h2 className="text-xl font-bold mb-2">Error!</h2>
        <p className="text-red-600">{error.message}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    )
  }

  if (!data || !data.pokemon) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-8 bg-yellow-50 rounded-xl shadow-sm"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-4">
          <Info className="h-6 w-6 text-yellow-600" />
        </div>
        <h2 className="text-xl font-bold mb-2 text-yellow-800">Pokémon Not Found</h2>
        <p className="text-yellow-700">Could not find a Pokémon named "{name}".</p>
        <p className="mt-4 text-yellow-600">Try searching for another Pokémon.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Clear Search
        </button>
      </motion.div>
    )
  }

  const pokemon = data.pokemon
  const primaryType = getPrimaryType(pokemon.types)

  const handleEvolutionClick = (evolutionName: string) => {
    router.push(`/?name=${encodeURIComponent(evolutionName)}`)
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pokemon.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Pokemon Header */}
        <div className={`${getTypeGradient(primaryType)} p-6 text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="8" />
              <circle cx="50" cy="50" r="15" fill="white" />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row items-center relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0 mb-4 md:mb-0 md:mr-6"
            >
              <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm"></div>
              <div className="absolute inset-2 rounded-full bg-white/30 backdrop-blur-sm"></div>
              {pokemon.image && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-full ${!imageLoaded ? "animate-pulse" : ""}`}></div>
                  <Image
                    src={pokemon.image || "/placeholder.svg"}
                    alt={pokemon.name}
                    fill
                    className={`object-contain z-10 transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    sizes="(max-width: 768px) 128px, 192px"
                    onLoadingComplete={() => setImageLoaded(true)}
                  />
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 to-transparent opacity-60"></div>
            </motion.div>
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm font-semibold text-white/80"
              >
                #{pokemon.number}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold mb-2"
              >
                {pokemon.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg mb-3"
              >
                {pokemon.classification}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2"
              >
                {pokemon.types.map((type: string) => (
                  <Badge key={type} className={getTypeBadgeClass(type)} size="lg">
                    {type}
                  </Badge>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === "stats" ? "text-red-600 border-b-2 border-red-500" : "text-gray-600 hover:text-red-500"
              }`}
            >
              <Shield className="w-4 h-4 mr-2" />
              Stats & Info
            </button>
            <button
              onClick={() => setActiveTab("attacks")}
              className={`flex items-center px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === "attacks" ? "text-red-600 border-b-2 border-red-500" : "text-gray-600 hover:text-red-500"
              }`}
            >
              <Swords className="w-4 h-4 mr-2" />
              Attacks
            </button>
            {pokemon.evolutions && pokemon.evolutions.length > 0 && (
              <button
                onClick={() => setActiveTab("evolutions")}
                className={`flex items-center px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === "evolutions"
                    ? "text-red-600 border-b-2 border-red-500"
                    : "text-gray-600 hover:text-red-500"
                }`}
              >
                <ChevronRight className="w-4 h-4 mr-2" />
                Evolutions
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "stats" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <h2 className="text-xl font-bold mb-4 border-b pb-2 flex items-center">
                  <Heart className={`w-5 h-5 mr-2 ${getTypeTextClass(primaryType)}`} />
                  Base Stats
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">HP</span>
                      <span className="text-sm font-medium text-gray-700">{formatStatValue(pokemon.maxHP)}</span>
                    </div>
                    <Progress value={calculateStatPercentage(pokemon.maxHP)} variant={getStatVariant(pokemon.maxHP)} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">CP</span>
                      <span className="text-sm font-medium text-gray-700">{formatStatValue(pokemon.maxCP)}</span>
                    </div>
                    <Progress value={calculateStatPercentage(pokemon.maxCP)} variant={getStatVariant(pokemon.maxCP)} />
                  </div>
                </div>

                <h2 className="text-xl font-bold mt-6 mb-4 border-b pb-2 flex items-center">
                  <Scale className="w-5 h-5 mr-2 text-amber-500" />
                  <span>Physical Traits</span>
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="py-3 px-4">
                      <span className="text-sm font-medium text-gray-500">Height</span>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <p className="font-semibold">
                        {pokemon.height.minimum} - {pokemon.height.maximum}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-3 px-4">
                      <span className="text-sm font-medium text-gray-500">Weight</span>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <p className="font-semibold">
                        {pokemon.weight.minimum} - {pokemon.weight.maximum}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-3 px-4">
                      <span className="text-sm font-medium text-gray-500">Flee Rate</span>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <p className="font-semibold">{pokemon.fleeRate}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4 border-b pb-2 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-500" />
                  Type Effectiveness
                </h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700 mb-2 font-medium">Resistant to</p>
                    <div className="flex flex-wrap gap-2">
                      {pokemon.resistant.map((type: string) => (
                        <Badge key={type} className={getTypeBadgeClass(type)}>
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2 font-medium">Weak to</p>
                    <div className="flex flex-wrap gap-2">
                      {pokemon.weaknesses.map((type: string) => (
                        <Badge key={type} className={getTypeBadgeClass(type)}>
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "attacks" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 border-b pb-2 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Fast Attacks
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pokemon.attacks.fast.map((attack: any, index: number) => (
                    <motion.div
                      key={attack.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-shadow border-t-4 border-t-transparent hover:border-t-4 hover:border-t-yellow-400">
                        <div className={`h-1 ${getTypeGradient(attack.type)}`}></div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-lg">{attack.name}</h3>
                            <Badge className={getTypeBadgeClass(attack.type)}>{attack.type}</Badge>
                          </div>
                          <div className="flex items-center">
                            <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{attack.damage} DMG</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4 border-b pb-2 flex items-center">
                  <Swords className="w-5 h-5 mr-2 text-purple-500" />
                  Special Attacks
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pokemon.attacks.special.map((attack: any, index: number) => (
                    <motion.div
                      key={attack.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-shadow border-t-4 border-t-transparent hover:border-t-4 hover:border-t-purple-400">
                        <div className={`h-1 ${getTypeGradient(attack.type)}`}></div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-lg">{attack.name}</h3>
                            <Badge className={getTypeBadgeClass(attack.type)}>{attack.type}</Badge>
                          </div>
                          <div className="flex items-center">
                            <Swords className="h-4 w-4 text-purple-500 mr-1" />
                            <span className="text-sm font-medium">{attack.damage} DMG</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "evolutions" && pokemon.evolutions && pokemon.evolutions.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="text-xl font-bold mb-6 border-b pb-2 flex items-center">
                <ChevronRight className="w-5 h-5 mr-2 text-green-500" />
                Evolution Chain
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {pokemon.evolutions.map((evolution: any, index: number) => {
                  const evolutionPrimaryType = getPrimaryType(evolution.types)
                  return (
                    <motion.div
                      key={evolution.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="cursor-pointer"
                      onClick={() => handleEvolutionClick(evolution.name)}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-all border-2 border-transparent hover:border-2 hover:border-gray-200">
                        <div
                          className={`${getTypeLightGradient(evolutionPrimaryType)} p-6 flex justify-center relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 opacity-20">
                            <svg
                              className="w-full h-full"
                              viewBox="0 0 80 80"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="40"
                                cy="40"
                                r="30"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-white"
                              />
                              <circle cx="40" cy="40" r="10" fill="currentColor" className="text-white" />
                            </svg>
                          </div>
                          <div className="relative w-32 h-32 z-10">
                            {evolution.image && (
                              <Image
                                src={evolution.image || "/placeholder.svg"}
                                alt={evolution.name}
                                fill
                                className="object-contain drop-shadow-md hover:drop-shadow-xl transition-all duration-300 hover:scale-110"
                                sizes="128px"
                              />
                            )}
                          </div>
                        </div>
                        <CardContent className="p-4 text-center">
                          <h3 className={`font-bold text-lg mb-2 ${getTypeTextClass(evolutionPrimaryType)}`}>
                            {evolution.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">#{evolution.number}</p>
                          <div className="flex flex-wrap justify-center gap-1">
                            {evolution.types.map((type: string) => (
                              <Badge key={type} className={getTypeBadgeClass(type)} size="sm">
                                {type}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-3 flex justify-center">
                            <span className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                              View details <ArrowRight className="ml-1 h-3 w-3" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
