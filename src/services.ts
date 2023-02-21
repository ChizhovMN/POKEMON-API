import {
  PokemonEvolution,
  PokemonPage,
  PokemonPageType,
  PokemonType,
  PokemonDescriptionType,
} from "./types";
export const imageLoader = (id: string | string[] | undefined) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};
export const fetcherGraphQL = (
  offset = 0,
  limit = 16,
  search = ""
): Promise<PokemonPageType> =>
  fetch("https://beta.pokeapi.co/graphql/v1beta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query getPokemons($offset: Int = 0, $limit: Int = 16, $_like: String = "%${search}%") {
          pokemon_v2_pokemon(offset: $offset, limit: $limit, where: {name: {_ilike:$_like }}) {
            id
            name
          }
          pokemon_v2_pokemon_aggregate(where: {name: {_ilike: $_like}}) {
            aggregate {
              count
            }
          }
        }
        `,
      variables: {
        offset: offset,
        limit: limit,
      },
    }),
  }).then(async (res) => {
    const data: PokemonPage = await res.json();
    const {
      data: {
        pokemon_v2_pokemon: pokemons,
        pokemon_v2_pokemon_aggregate: {
          aggregate: { count },
        },
      },
    } = data;
    return {
      pokemons,
      count,
    };
  });
export const fetcherPokemonType = (
  id: string
): Promise<PokemonDescriptionType> =>
  fetch("https://beta.pokeapi.co/graphql/v1beta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query getPokemon($id: Int_comparison_exp = {}) {
        pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
          id
          name
          pokemon_v2_pokemonspecy {
            evolution_chain_id
          }
          pokemon_v2_pokemonabilities {
            pokemon_v2_ability {
              name
              id
            }
          }
          pokemon_v2_pokemonmoves {
            pokemon_v2_move {
              name
              id
            }
          }
          pokemon_v2_pokemonstats {
            base_stat
            pokemon_v2_stat {
              name
              id
            }
            id
          }
          weight
        }
      }`,
    }),
  }).then(async (res) => {
    const data: PokemonType = await res.json();
    const {
      data: {
        pokemon_v2_pokemon: [
          {
            id,
            name,
            weight,
            pokemon_v2_pokemonspecy: { evolution_chain_id: evolution },
            pokemon_v2_pokemonabilities: ability,
            pokemon_v2_pokemonmoves: moves,
            pokemon_v2_pokemonstats: stats,
          },
        ],
      },
    } = data;
    return {
      id,
      name,
      weight,
      evolution,
      ability,
      moves,
      stats,
    };
  });

export const fetcherPokemonEvolution = (
  id: string
): Promise<PokemonEvolution> =>
  fetch("https://beta.pokeapi.co/graphql/v1beta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query MyQuery {
        pokemon_v2_evolutionchain(where: {id: {_eq: ${id}}}) {
          id
          pokemon_v2_pokemonspecies {
            name
            id
            pokemon_v2_pokemons {
              pokemon_v2_pokemonstats {
                base_stat
                id
                pokemon_v2_stat {
                  name
                }
              }
            }
          }
        }
      }
      `,
    }),
  }).then((res) => res.json());
