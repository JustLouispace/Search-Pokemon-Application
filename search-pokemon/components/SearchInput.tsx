"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("name") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  // Update the URL when the search query changes
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?name=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push("/")
    }
  }

  // Update the search input when the URL changes
  useEffect(() => {
    setSearchQuery(searchParams.get("name") || "")
  }, [searchParams])

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Pokemon by name..."
          className="w-full px-4 py-2 focus:outline-none"
        />
        <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 transition-colors">
          Search
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-2">Try searching for: Pikachu, Charizard, Bulbasaur</p>
    </form>
  )
}
