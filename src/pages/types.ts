export interface PokemonsAPI {
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
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_shemale: string | null;
    other: {
      dream_world: Pick<Generation, "front_default" | "front_female">;
      home: Pick<
        Generation,
        "front_default" | "front_female" | "front_shiny" | "front_shiny_female"
      >;
      official_artwork: Pick<Generation, "front_default" | "front_shiny">;
    };
    versions: {
      "generation-i": {
        "red-blue": PokemonBackColor;
        yellow: PokemonBackColor;
      };
      "generation-ii": {
        crystal: {
          back_default: string | null;
          back_shiny: string | null;
          back_shiny_transparent: string | null;
          back_transparent: string | null;
          front_default: string | null;
          front_shiny: string | null;
          front_shiny_transparent: string | null;
          front_transparent: string | null;
        };
        gold: {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
          front_transparent: string | null;
        };
        silver: {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
          front_transparent: string | null;
        };
      };
      "generation-iii": {
        emerald: Pick<Generation, "front_default" | "front_shiny">;
        "firered-leafgreen": Pick<
          Generation,
          "back_default" | "back_shiny" | "front_default" | "front_shiny"
        >;
        "ruby-sapphire": Pick<
          Generation,
          "back_default" | "back_shiny" | "front_default" | "front_shiny"
        >;
      };
      "generation-iv": {
        "diamond-pearl": Generation;
        "heartgold-soulsilver": Generation;
        platinum: Generation;
      };
      "generation-v": {
        animated: Generation;
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      "generation-vi": {
        omegaruby_alphasapphire: Pick<
          Generation,
          | "front_default"
          | "front_female"
          | "front_shiny"
          | "front_shiny_female"
        >;
        "x-y": Pick<
          Generation,
          | "front_default"
          | "front_female"
          | "front_shiny"
          | "front_shiny_female"
        >;
      };
      "generation-vii": {
        icons: Pick<Generation, "front_default" | "front_female">;
        "ultra-sun-ultra-moon": Pick<
          Generation,
          | "front_default"
          | "front_female"
          | "front_shiny"
          | "front_shiny_female"
        >;
      };
      "generation-viii": {
        icons: Pick<Generation, "front_default" | "front_female">;
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
interface Pokemon {
  name: string;
  url: string;
}

interface PokemonBackColor {
  back_default: string | null;
  back_gray: string | null;
  back_transparent: string | null;
  front_default: string | null;
  front_gray: string | null;
  front_transparent: string | null;
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
}

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
