import { redirect } from "next/navigation"

export default function PokemonPage({ params }: { params: { name: string } }) {
  const decodedName = decodeURIComponent(params.name)

  // Redirect to the home page with the name as a query parameter
  redirect(`/?name=${encodeURIComponent(decodedName)}`)
}
