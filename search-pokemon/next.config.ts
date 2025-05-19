/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["img.pokemondb.net", "graphql-pokemon2.vercel.app"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.pokemondb.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "graphql-pokemon2.vercel.app",
        pathname: "**",
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
