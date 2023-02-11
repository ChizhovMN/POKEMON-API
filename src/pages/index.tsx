import React from "react";
import Footer from "./footer";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import PokemonLogo from "./components/headerLogo";
import { Button, Divider } from "antd";

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
      <header className={styles.header}>
        <PokemonLogo href={"/"} />
      </header>
      <main className={styles.main}>
        <section style={{ padding: "1rem" }}>
          <h2 style={{ textAlign: "right" }}>
            All the Pokémon data ever need in one place
          </h2>
          <Divider style={dividerStyle} />
          <p>
            We currently have tens of thousands of individual items in our
            database, including:
          </p>
          <Divider style={dividerStyle} />
          <ul style={{ maxWidth: "fit-content", margin: "0 0 0 auto" }}>
            {pokemonsDataBase.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link
            href="pokemons"
            style={{ display: "block", textAlign: "center" }}
          >
            {" "}
            <Button ghost>CHECK ALL OUR POKEMONS</Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
