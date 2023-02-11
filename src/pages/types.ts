export interface PokemonPage {
  count: number;
  next: string;
  previous: string;
  results: PokemonLink[];
}
export interface PokemonLink {
  name: string;
  url: string;
}

export interface PokemonType {
  abilities: PokemonAbilities;
  base_experience: number;
  forms: Pokemon[];
  game_indices: {
    game_index: number;
    version: Pokemon;
  }[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: MovesType[];
  name: string;
  order: number;
  past_types: [];
  species: Pokemon;
  sprites: PartialGeneration & {
    other: {
      dream_world: PartialGeneration;
      home: PartialGeneration;
      official_artwork: PartialGeneration;
    };
    versions: {
      "generation-i": {
        "red-blue": PartialGeneration;
        yellow: PartialGeneration;
      };
      "generation-ii": {
        crystal: PartialGeneration;
        gold: PartialGeneration;
        silver: PartialGeneration;
      };
      "generation-iii": {
        emerald: PartialGeneration;
        "firered-leafgreen": PartialGeneration;
        "ruby-sapphire": PartialGeneration;
      };
      "generation-iv": {
        "diamond-pearl": PartialGeneration;
        "heartgold-soulsilver": PartialGeneration;
        platinum: PartialGeneration;
      };
      "generation-v": PartialGeneration;
      "generation-vi": {
        omegaruby_alphasapphire: PartialGeneration;
        "x-y": PartialGeneration;
      };
      "generation-vii": {
        icons: PartialGeneration;
        "ultra-sun-ultra-moon": PartialGeneration;
      };
      "generation-viii": {
        icons: PartialGeneration;
      };
    };
  };
  stats: StatsType[];
  types: TypesType[];
  weight: number;
}

interface PokemonAbilities {
  ability: Pokemon[];
  is_hidden: boolean;
  slot: number;
}
export interface Pokemon {
  name: string;
  url: string;
}
interface Generation {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  back_gray: string | null;
  front_gray: string | null;
  back_transparent: string | null;
  back_shiny_transparent: string | null;
  front_transparent: string | null;
  front_shiny_transparent: string | null;
}
type PartialGeneration = Partial<Generation>;

interface StatsType {
  base_stat: number;
  effort: number;
  stat: Pokemon;
}
interface TypesType {
  slot: number;
  type: Pokemon;
}
interface MovesType {
  move: Pokemon;
  version_group_details: {
    level_learned_at: 0;
    move_learn_method: Pokemon;
    version_group: Pokemon;
  }[];
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
