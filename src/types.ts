export interface PokemonPage {
  data: {
    pokemon_v2_pokemon: PokemonLink[];
    pokemon_v2_pokemon_aggregate: { aggregate: { count: number } };
  };
}
export interface PokemonPageType {
  pokemons: PokemonLink[];
  count: number;
}
type PokemonStats = {
  id: number;
  base_stat: number;
  pokemon_v2_stat: NameID;
};

export interface PokemonDescriptionType {
  id: number;
  name: string;
  weight: number;
  evolution: number;
  ability: {
    pokemon_v2_ability: NameID;
  }[];
  moves: {
    pokemon_v2_move: NameID;
  }[];
  stats: PokemonStats[];
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
      pokemon_v2_pokemonstats: PokemonStats[];
      weight: number;
    }[];
  };
}
export interface PokemonEvolution {
  data: {
    pokemon_v2_evolutionchain: {
      id: number;
      pokemon_v2_pokemonspecies: {
        name: string;
        id: number;
        pokemon_v2_pokemons: {
          pokemon_v2_pokemonstats: {
            base_stat: number;
            id: number;
            pokemon_v2_stat: {
              name: string;
            };
          }[];
        }[];
      }[];
    }[];
  };
}
interface NameID {
  name: string;
  id: number;
}
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
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
