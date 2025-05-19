"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("name") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Popular Pokemon suggestions
  const suggestions = ["Pikachu", "Charizard", "Bulbasaur", "Squirtle", "Eevee", "Mewtwo"]

  // Update the URL when the search query changes
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?name=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push("/")
    }
    if (inputRef.current) {
      inputRef.current.blur()
    }
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
    router.push(`/?name=${encodeURIComponent(suggestion)}`)
  }

  // Update the search input when the URL changes
  useEffect(() => {
    setSearchQuery(searchParams.get("name") || "")
  }, [searchParams])

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative">
        <div
          className={`flex items-center border-2 rounded-2xl overflow-hidden transition-all duration-300 ${isFocused ? "border-red-500 shadow-md" : "border-gray-300"}`}
        >
          <div className="pl-4">
            <Search className={`h-5 w-5 transition-colors ${isFocused ? "text-red-500" : "text-gray-400"}`} />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search Pokémon by name..."
            className="w-full px-4 py-3 focus:outline-none text-lg"
            aria-label="Search for a Pokémon"
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

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {suggestions.map((suggestion) => (
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
