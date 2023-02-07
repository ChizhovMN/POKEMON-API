import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pokemon.module.css";
import Link from "next/link";
import Footer from "../footer";
import Image from "next/image";
import { myLoader } from "..";
import { PokemonType, PokemonsAPI } from "../types";
import { Collapse } from "antd";

const { Panel } = Collapse;

export default function PokemonPage() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemonInfo, setPokemonInfo] = useState<PokemonType>();
  const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const pokemonImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const fetcher = (link: string) => {
    fetch(link)
      .then((res) => res.json())
      .then((data: PokemonType) => {
        setPokemonInfo(data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => fetcher(pokemonURL), []);
  return (
    <>
      <header className={styles.header}>
        <Link href={"/"}>
          <h1>POKEMONS API</h1>
        </Link>
        <div>POKEMON: {pokemonInfo?.name.toUpperCase()}</div>
      </header>
      <main className={styles.main}>
        <div className={styles.pokemon}>
          <Image
            className={styles["pokemon-img"]}
            unoptimized
            loader={() => myLoader(id)}
            src={myLoader(id)}
            alt={pokemonInfo ? pokemonInfo.name : "Unnamed"}
            width={600}
            height={600}
          />
        </div>
        <div className={styles["pokemon-info"]}>
          <h2>{pokemonInfo?.name.toUpperCase()}</h2>
          <p>Weight: {pokemonInfo?.weight} kg</p>
          <Collapse className={styles.collapse} accordion={true}>
            <Panel header="STATS" key="1" className={styles["collapse-item"]}>
              <ol className={styles["collapse-list"]}>
                {pokemonInfo?.stats.map((item, index) => {
                  return (
                    <li className={styles["list-item"]} key={index}>
                      {item.stat.name} - {item.base_stat}
                    </li>
                  );
                })}
              </ol>
            </Panel>
            <Panel header="MOVES" key="2" className={styles["collapse-item"]}>
              <ol className={styles["collapse-list"]}>
                {pokemonInfo?.moves.map((item, index) => {
                  return (
                    <li className={styles["list-item"]} key={index}>
                      {item.move.name}
                    </li>
                  );
                })}
              </ol>
            </Panel>
            <Panel header="TYPES" key="3" className={styles["collapse-item"]}>
              <ol className={styles["collapse-list"]}>
                {pokemonInfo?.types.map((item, index) => {
                  return (
                    <li className={styles["list-item"]} key={index}>
                      {item.type.name}
                    </li>
                  );
                })}
              </ol>
            </Panel>
          </Collapse>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}
