"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search, X, Clock } from "lucide-react"
import { useQuery } from "@apollo/client"
import { GET_POKEMONS } from "@/lib/graphql/queries"
import { getTypeBadgeClass } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface SearchInputProps {
  initialPath?: string
}

interface PokemonSuggestion {
  id: string
  number: string
  name: string
  image: string
  types: string[]
}

export default function SearchInput({ initialPath = "" }: SearchInputProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("name") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Search history stored in localStorage
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // Load search history on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem("pokemonSearchHistory")
    if (storedHistory) {
      try {
        setSearchHistory(JSON.parse(storedHistory))
      } catch (e) {
        console.error("Failed to parse search history", e)
        setSearchHistory([])
      }
    }
  }, [])

  // Fetch all Pokemon for suggestions
  const { data: pokemonsData } = useQuery(GET_POKEMONS, {
    variables: { first: 151 }, // Fetch first 151 Pokemon (first generation)
  })

  // Filter Pokemon based on search query
  const filteredPokemon: PokemonSuggestion[] = pokemonsData?.pokemons
    ? pokemonsData.pokemons.filter((pokemon: PokemonSuggestion) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  // Filter search history based on search query
  const filteredHistory = searchQuery
    ? searchHistory.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
    : searchHistory

  // Determine if we're on the home page or a pokemon page
  const isHomePage = pathname === "/"
  const isPokemonPathPage = pathname.startsWith("/pokemon/")

  // Extract pokemon name from path if we're on a pokemon page
  useEffect(() => {
    if (isPokemonPathPage) {
      const pokemonName = pathname.split("/").pop() || ""
      setSearchQuery(decodeURIComponent(pokemonName))
    } else if (isHomePage && initialQuery) {
      setSearchQuery(initialQuery)
    }
  }, [pathname, isPokemonPathPage, isHomePage, initialQuery])

  // Popular Pokemon suggestions
  const popularSuggestions = ["Pikachu", "Charizard", "Bulbasaur", "Squirtle", "Eevee", "Mewtwo"]

  // Update the URL when the search query changes
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Add to search history
      if (!searchHistory.includes(searchQuery)) {
        const newHistory = [searchQuery, ...searchHistory].slice(0, 5) // Keep only 5 most recent searches
        setSearchHistory(newHistory)
        localStorage.setItem("pokemonSearchHistory", JSON.stringify(newHistory))
      }

      // Use path parameter routing if initialPath is provided, otherwise use query parameter
      if (initialPath) {
        router.push(`${initialPath}/${encodeURIComponent(searchQuery.trim())}`)
      } else {
        router.push(`/?name=${encodeURIComponent(searchQuery.trim())}`)
      }
    } else {
      router.push("/")
    }
    if (inputRef.current) {
      inputRef.current.blur()
    }
    setShowSuggestions(false)
  }

  // Clear search input
  const handleClear = () => {
    setSearchQuery("")
    router.push("/")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)

    // Add to search history
    if (!searchHistory.includes(suggestion)) {
      const newHistory = [suggestion, ...searchHistory].slice(0, 5)
      setSearchHistory(newHistory)
      localStorage.setItem("pokemonSearchHistory", JSON.stringify(newHistory))
    }

    if (initialPath) {
      router.push(`${initialPath}/${encodeURIComponent(suggestion)}`)
    } else {
      router.push(`/?name=${encodeURIComponent(suggestion)}`)
    }
    setShowSuggestions(false)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalSuggestions = filteredHistory.length + filteredPokemon.slice(0, 6).length

    // Down arrow
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setShowSuggestions(true)
      setActiveSuggestionIndex((prevIndex) => (prevIndex < totalSuggestions - 1 ? prevIndex + 1 : 0))
    }
    // Up arrow
    else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveSuggestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalSuggestions - 1))
    }
    // Enter key
    else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      e.preventDefault()
      if (activeSuggestionIndex < filteredHistory.length) {
        // It's a history item
        handleSuggestionClick(filteredHistory[activeSuggestionIndex])
      } else {
        // It's a Pokemon suggestion
        const pokemonIndex = activeSuggestionIndex - filteredHistory.length
        if (filteredPokemon[pokemonIndex]) {
          handleSuggestionClick(filteredPokemon[pokemonIndex].name)
        }
      }
    }
    // Escape key
    else if (e.key === "Escape") {
      setShowSuggestions(false)
      setActiveSuggestionIndex(-1)
    }
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <form onSubmit={handleSearch} className="relative">
          <div
            className={`flex items-center border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
              isFocused ? "border-red-500 shadow-md" : "border-gray-300"
            } ${showSuggestions && (filteredHistory.length > 0 || filteredPokemon.length > 0) ? "rounded-b-none" : ""}`}
          >
            <div className="pl-4">
              <Search className={`h-5 w-5 transition-colors ${isFocused ? "text-red-500" : "text-gray-400"}`} />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSuggestions(true)
                setActiveSuggestionIndex(-1)
              }}
              onFocus={() => {
                setIsFocused(true)
                setShowSuggestions(true)
              }}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Search Pokémon by name..."
              className="w-full px-4 py-3 focus:outline-none text-lg"
              aria-label="Search for a Pokémon"
              autoComplete="off"
            />
            {searchQuery && (
              <button type="button" onClick={handleClear} className="pr-2" aria-label="Clear search">
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
              </button>
            )}
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 font-medium transition-colors"
              aria-label="Search"
            >
              Search
            </button>
          </div>
        </form>

        {/* Google-style Suggestions dropdown */}
        {showSuggestions && (filteredHistory.length > 0 || filteredPokemon.length > 0) && (
          <div
            ref={suggestionsRef}
            className="absolute z-50 w-full bg-white border-2 border-t-0 border-red-500 rounded-b-2xl shadow-lg max-h-96 overflow-y-auto"
          >
            {/* Search history */}
            {filteredHistory.length > 0 && (
              <div className="border-b border-gray-100">
                {filteredHistory.map((historyItem: string, index: number) => (
                  <div
                    key={`history-${index}`}
                    className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                      index === activeSuggestionIndex ? "bg-gray-100" : ""
                    }`}
                    onClick={() => handleSuggestionClick(historyItem)}
                    onMouseEnter={() => setActiveSuggestionIndex(index)}
                  >
                    <Clock className="h-4 w-4 text-gray-400 mr-3" />
                    <div className="flex-grow">
                      <span className="text-gray-800">{historyItem}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pokemon suggestions */}
            {filteredPokemon.slice(0, 6).map((pokemon: PokemonSuggestion, index: number) => {
              const suggestionIndex = index + filteredHistory.length
              return (
                <div
                  key={pokemon.id}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                    suggestionIndex === activeSuggestionIndex ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleSuggestionClick(pokemon.name)}
                  onMouseEnter={() => setActiveSuggestionIndex(suggestionIndex)}
                >
                  <Search className="h-4 w-4 text-gray-400 mr-3" />
                  <div className="flex-grow">
                    <span className="text-gray-800">{pokemon.name}</span>
                  </div>
                  <div className="flex gap-1">
                    {pokemon.types.map((type: string) => (
                      <Badge key={type} className={getTypeBadgeClass(type)} size="sm">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })}

            {searchQuery && (
              <div
                className="p-3 cursor-pointer hover:bg-gray-50 transition-colors border-t border-gray-100"
                onClick={() => handleSearch({ preventDefault: () => {} } as React.FormEvent)}
              >
                <div className="flex items-center">
                  <Search className="h-4 w-4 text-blue-500 mr-3" />
                  <span className="text-blue-500">Search for "{searchQuery}"</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {popularSuggestions.map((suggestion: string) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
