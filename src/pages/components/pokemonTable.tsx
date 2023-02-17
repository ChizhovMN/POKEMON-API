import { ReactNode } from "react";
import { PokemonLink } from "../types";
import PokemonItem from "./pokemonItem";

export default function CreatePokemonTable(arr: PokemonLink[]): ReactNode {
  return arr.map((item) => {
    return <PokemonItem key={item.id} id={"" + item.id} name={item.name} />;
  });
}
