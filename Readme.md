# Pokémon Search Application

## Overview

Pokémon Search is a modern web application that allows users to search for Pokémon and view detailed information about them. The application uses the Pokémon GraphQL API to fetch data and provides a clean, responsive interface for exploring Pokémon details, attacks, and evolutions.

## Features

- **Search Functionality**: Search for any Pokémon by name with real-time suggestions
- **Detailed Information**: View comprehensive details about each Pokémon including:
  - Type classifications
  - Base stats (HP, CP)
  - Physical traits (height, weight)
  - Type effectiveness (resistances and weaknesses)
- **Attack Information**: Browse both fast and special attacks with damage details
- **Evolution Chains**: Explore the evolution path of each Pokémon
- **Responsive Design**: Fully responsive interface that works on mobile, tablet, and desktop
- **Search History**: Recent searches are saved for quick access

## Technologies Used

- **Next.js 14**: React framework with App Router for server-side rendering and routing
- **TypeScript**: For type safety and better developer experience
- **Apollo Client**: For GraphQL data fetching
- **Tailwind CSS**: For styling and responsive design
- **Framer Motion**: For smooth animations and transitions
- **Shadcn/UI**: For UI components
- **Lucide React**: For icons

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm 

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/pokemon-search.git
   cd pokemon-search

2. Install dependencies:
   \`\`\`bash
   npm install

3. Run the development server:
   \`\`\`bash
   npm run dev



4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

To create an optimized production build:

\`\`\`bash
npm run build


To start the production server:

\`\`\`bash
npm run start


## Project Structure

\`\`\`
src/
├── app/                  # Next.js App Router
│   ├── [name]/           # Dynamic route for Pokémon pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page component
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── PokemonDetails.tsx # Pokémon details component
│   ├── PokemonProvider.tsx # Apollo provider component
│   └── SearchInput.tsx   # Search input component
├── lib/                  # Utility functions and libraries
│   ├── graphql/          # GraphQL queries
│   └── utils.ts          # Helper functions
└── types/                # TypeScript type definitions
\`\`\`

## API Reference

This application uses the [Pokémon GraphQL API](https://graphql-pokemon2.vercel.app/) to fetch Pokémon data. The main queries used are:

- `GET_POKEMON`: Fetches detailed information about a specific Pokémon
- `GET_POKEMONS`: Fetches a list of Pokémon for search suggestions

## Performance Optimization

The application includes several performance optimizations:

- Image optimization with Next.js Image component
- Component-level code splitting
- Caching of GraphQL queries
- Lazy loading of Pokémon details
- Suspense boundaries for improved loading states

## Acknowledgements

- [Pokémon GraphQL API](https://graphql-pokemon2.vercel.app/)
- [Next.js](https://nextjs.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Shadcn/UI](https://ui.shadcn.com/)
