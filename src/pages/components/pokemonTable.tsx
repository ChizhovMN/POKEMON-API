import { ReactNode } from "react";
import { PokemonLink } from "../types";
import PokemonItem from "./pokemonItem";

export default function CreatePokemonTable(arr: PokemonLink[]): ReactNode {
  return arr.map((item) => {
    const urlSplit = item.url.split("/");
    const id = urlSplit[urlSplit.length - 2];
    return <PokemonItem key={id} id={id} name={item.name} />;
  });
}
