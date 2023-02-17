export interface PokemonPage {
  data: {
    pokemon_v2_pokemon: PokemonLink[];
    pokemon_v2_pokemon_aggregate: { aggregate: { count: number } };
  };
}
export interface PokemonType {
  data: {
    pokemon_v2_pokemon: {
      id: number;
      name: string;
      pokemon_v2_pokemonspecy: {
        evolution_chain_id: number;
      };
      pokemon_v2_pokemonabilities: {
        pokemon_v2_ability: NameID;
      }[];
      pokemon_v2_pokemonmoves: {
        pokemon_v2_move: NameID;
      }[];
      pokemon_v2_pokemonstats: {
        id: number;
        base_stat: number;
        pokemon_v2_stat: NameID;
      }[];
      weight: number;
    }[];
  };
}
interface NameID {
  name: string;
  id: number;
}
export interface QueryType {
  getFirstPokemons: string;
}
// export interface PokemonPage {
//   count: number;
//   next: string;
//   previous: string;
//   results: PokemonLink[];
// }
export interface PokemonLink {
  name: string;
  id: number;
}

export interface Pokemon {
  name: string;
  url: string;
}
export type HeaderProps = {
  searchField: string;
  pokemonsCounter: number;
  btnNameAllView: string;
  btnNamePageView: string;
  handleClickAllView: () => void;
  handleClickPageView: () => void;
  handleSearch: (event: Event) => void;
};
