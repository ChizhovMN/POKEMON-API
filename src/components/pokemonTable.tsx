import { ReactNode } from "react";
import PokemonItem from "./pokemonItem";
import { PokemonLink } from "../types";

export default function PokemonTable(arr: PokemonLink[]): ReactNode {
  return arr.map((item) => {
    return <PokemonItem key={item.id} id={"" + item.id} name={item.name} />;
  });
}
