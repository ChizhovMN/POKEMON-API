import React from "react";
import styles from "@/styles/Home.module.css";
export default function Header({
  pokemonsCounter,
}: {
  pokemonsCounter: number;
}) {
  return (
    <header className={styles.header}>
      <h1>POKEMONS API</h1>
      <div>All pokemons:{pokemonsCounter}</div>
    </header>
  );
}
