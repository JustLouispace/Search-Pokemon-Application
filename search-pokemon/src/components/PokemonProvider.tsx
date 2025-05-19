"use client"

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import type { ReactNode } from "react"

// Create Apollo Client with caching configuration
const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemon: {
            // Cache Pokemon by name
            keyArgs: ["name"],
            merge: true,
          },
          pokemons: {
            // Cache the list of Pokemon
            keyArgs: ["first"],
            merge: true,
          },
        },
      },
    },
  }),
})

export default function PokemonProvider({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
