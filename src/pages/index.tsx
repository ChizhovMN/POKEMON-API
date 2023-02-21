import React from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import { PokemonLogo } from "../components/headerLogo";
import { Button, Divider } from "antd";
import styles from "@/styles/welcome.module.css";
import global from "@/styles/Home.module.css";

export default function WelcomePage() {
  const dividerStyle = { backgroundColor: "white" };
  const pokemonsDataBase = [
    "Moves",
    "Abilities",
    "Pokémon",
    "Types",
    "Egg Groups",
    "Game Versions",
    "Items",
    "Pokémon Evolution Chains",
  ];
  return (
    <>
      <header className={global.header}>
        <PokemonLogo href={"/"} />
      </header>
      <main className={global.main}>
        <section className={styles["welcome-main"]}>
          <h2 className={styles["welcome-text"]}>
            All the Pokémon data ever need in one place
          </h2>
          <Divider style={dividerStyle} />
          <p>
            We currently have tens of thousands of individual items in our
            database, including:
          </p>
          <Divider style={dividerStyle} />
          <ul className={styles["welcome-list"]}>
            {pokemonsDataBase.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link href="pokemons" className={styles["pokemon-link"]}>
            {" "}
            <Button ghost>CHECK ALL OUR POKEMONS</Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
