import { render, screen, waitFor } from "@testing-library/react"
import PokemonDetails from "@/components/PokemonDetails"
import { MockedProvider } from "@apollo/client/testing"
import { GET_POKEMON } from "@/lib/graphql/queries"

// Mock data for Bulbasaur (Grass/Poison type)
const bulbasaurMock = {
  request: {
    query: GET_POKEMON,
    variables: { name: "Bulbasaur" },
  },
  result: {
    data: {
      pokemon: {
        id: "UG9rZW1vbjowMDE=",
        number: "001",
        name: "Bulbasaur",
        weight: { minimum: "6.04kg", maximum: "7.76kg" },
        height: { minimum: "0.61m", maximum: "0.79m" },
        classification: "Seed Pokémon",
        types: ["Grass", "Poison"],
        resistant: ["Water", "Electric", "Grass", "Fighting", "Fairy"],
        weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
        fleeRate: 0.1,
        maxCP: 951,
        maxHP: 1071,
        image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
        attacks: {
          fast: [
            { name: "Tackle", type: "Normal", damage: 12 },
            { name: "Vine Whip", type: "Grass", damage: 7 },
          ],
          special: [
            { name: "Power Whip", type: "Grass", damage: 70 },
            { name: "Seed Bomb", type: "Grass", damage: 40 },
            { name: "Sludge Bomb", type: "Poison", damage: 55 },
          ],
        },
        evolutions: [
          {
            id: "UG9rZW1vbjowMDI=",
            number: "002",
            name: "Ivysaur",
            image: "https://img.pokemondb.net/artwork/ivysaur.jpg",
            types: ["Grass", "Poison"],
          },
        ],
      },
    },
  },
}

// Mock data for Charmander (Fire type)
const charmanderMock = {
  request: {
    query: GET_POKEMON,
    variables: { name: "Charmander" },
  },
  result: {
    data: {
      pokemon: {
        id: "UG9rZW1vbjowMDQ=",
        number: "004",
        name: "Charmander",
        weight: { minimum: "7.44kg", maximum: "9.56kg" },
        height: { minimum: "0.53m", maximum: "0.67m" },
        classification: "Lizard Pokémon",
        types: ["Fire"],
        resistant: ["Fire", "Grass", "Ice", "Bug", "Steel", "Fairy"],
        weaknesses: ["Water", "Ground", "Rock"],
        fleeRate: 0.1,
        maxCP: 841,
        maxHP: 955,
        image: "https://img.pokemondb.net/artwork/charmander.jpg",
        attacks: {
          fast: [
            { name: "Ember", type: "Fire", damage: 10 },
            { name: "Scratch", type: "Normal", damage: 6 },
          ],
          special: [
            { name: "Flame Burst", type: "Fire", damage: 30 },
            { name: "Flame Charge", type: "Fire", damage: 25 },
            { name: "Flamethrower", type: "Fire", damage: 55 },
          ],
        },
        evolutions: [
          {
            id: "UG9rZW1vbjowMDU=",
            number: "005",
            name: "Charmeleon",
            image: "https://img.pokemondb.net/artwork/charmeleon.jpg",
            types: ["Fire"],
          },
        ],
      },
    },
  },
}

// Mock data for Squirtle (Water type)
const squirtleMock = {
  request: {
    query: GET_POKEMON,
    variables: { name: "Squirtle" },
  },
  result: {
    data: {
      pokemon: {
        id: "UG9rZW1vbjowMDc=",
        number: "007",
        name: "Squirtle",
        weight: { minimum: "7.88kg", maximum: "10.13kg" },
        height: { minimum: "0.44m", maximum: "0.56m" },
        classification: "Tiny Turtle Pokémon",
        types: ["Water"],
        resistant: ["Fire", "Water", "Ice", "Steel"],
        weaknesses: ["Electric", "Grass"],
        fleeRate: 0.1,
        maxCP: 891,
        maxHP: 1008,
        image: "https://img.pokemondb.net/artwork/squirtle.jpg",
        attacks: {
          fast: [
            { name: "Bubble", type: "Water", damage: 25 },
            { name: "Tackle", type: "Normal", damage: 12 },
          ],
          special: [
            { name: "Aqua Jet", type: "Water", damage: 25 },
            { name: "Aqua Tail", type: "Water", damage: 45 },
            { name: "Water Pulse", type: "Water", damage: 35 },
          ],
        },
        evolutions: [
          {
            id: "UG9rZW1vbjowMDg=",
            number: "008",
            name: "Wartortle",
            image: "https://img.pokemondb.net/artwork/wartortle.jpg",
            types: ["Water"],
          },
        ],
      },
    },
  },
}

// Mock usePathname hook
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => "",
}))

// Mock Image component to avoid warnings
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src || "/placeholder.svg"} alt={props.alt} />
  },
}))

describe("Pokemon Type Tests", () => {
  it("Bulbasaur should be a Grass type Pokemon", async () => {
    render(
      <MockedProvider mocks={[bulbasaurMock]} addTypename={false}>
        <PokemonDetails name="Bulbasaur" />
      </MockedProvider>,
    )

    // Wait for the query to complete and component to update
    await waitFor(
      () => {
        // Use a more specific query to find the type badge
        const typeBadges = screen.getAllByText("Grass")
        expect(typeBadges.length).toBeGreaterThan(0)

        // Check that at least one of them is in a badge element
        const badgeElement = typeBadges.find(
          (element) => element.className.includes("rounded-full") && element.className.includes("bg-green-100"),
        )
        expect(badgeElement).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it("Charmander should be a Fire type Pokemon", async () => {
    render(
      <MockedProvider mocks={[charmanderMock]} addTypename={false}>
        <PokemonDetails name="Charmander" />
      </MockedProvider>,
    )

    // Wait for the query to complete and component to update
    await waitFor(
      () => {
        // Use a more specific query to find the type badge
        const typeBadges = screen.getAllByText("Fire")
        expect(typeBadges.length).toBeGreaterThan(0)

        // Check that at least one of them is in a badge element
        const badgeElement = typeBadges.find(
          (element) => element.className.includes("rounded-full") && element.className.includes("bg-red-100"),
        )
        expect(badgeElement).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it("Squirtle should be a Water type Pokemon", async () => {
    render(
      <MockedProvider mocks={[squirtleMock]} addTypename={false}>
        <PokemonDetails name="Squirtle" />
      </MockedProvider>,
    )

    // Wait for the query to complete and component to update
    await waitFor(
      () => {
        // Use a more specific query to find the type badge
        const typeBadges = screen.getAllByText("Water")
        expect(typeBadges.length).toBeGreaterThan(0)

        // Check that at least one of them is in a badge element
        const badgeElement = typeBadges.find(
          (element) => element.className.includes("rounded-full") && element.className.includes("bg-blue-100"),
        )
        expect(badgeElement).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})
