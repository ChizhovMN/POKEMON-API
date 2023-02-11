import React from "react";
import styles from "@/styles/pokemon.module.css";
import Link from "next/link";
import Footer from "../../footer";
import Image from "next/image";
import { imageLoader } from "..";
import { Button, Collapse } from "antd";
import { PokemonType } from "../../types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import PokemonLogo from "@/pages/components/headerLogo";

const { Panel } = Collapse;

export const getServerSideProps: GetServerSideProps<{
  pokemon: PokemonType;
}> = async (context) => {
  try {
    const { id } = context.query;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon: PokemonType = await res.json();

    return {
      props: {
        pokemon,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default function PokemonPage({
  pokemon,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <header className={styles.header}>
        <div>
          <PokemonLogo href="/" />
          <Link href="/pokemons">
            <Button type="dashed" style={{ display: "block" }}>
              GO BACK
            </Button>
          </Link>
        </div>
        <div>POKEMON: {pokemon?.name.toUpperCase()}</div>
      </header>
      <main className={styles.main}>
        <div className={styles.pokemon}>
          <Image
            className={styles["pokemon-img"]}
            unoptimized
            loader={() => imageLoader(`${pokemon?.id}`)}
            src={imageLoader(`${pokemon?.id}`)}
            alt={pokemon?.name || "Unnamed"}
            width={600}
            height={600}
          />
        </div>
        <div className={styles["pokemon-info"]}>
          <h2>{pokemon?.name.toUpperCase()}</h2>
          <p>Weight: {pokemon?.weight} kg</p>
          <Collapse className={styles.collapse}>
            <Panel header="STATS" key="1" className={styles["collapse-item"]}>
              <ol className={styles["collapse-list"]}>
                {pokemon?.stats.map((item, index) => (
                  <li className={styles["list-item"]} key={index}>
                    {item?.stat?.name} - {item?.base_stat}
                  </li>
                ))}
              </ol>
            </Panel>
            <Panel header="MOVES" key="2" className={styles["collapse-item"]}>
              <ol className={styles["collapse-list"]}>
                {pokemon?.moves.map((item, index) => (
                  <li className={styles["list-item"]} key={index}>
                    {item?.move?.name}
                  </li>
                ))}
              </ol>
            </Panel>
            <Panel header="TYPES" key="3" className={styles["collapse-item"]}>
              <ol className={styles["collapse-list"]}>
                {pokemon?.types.map((item, index) => (
                  <li className={styles["list-item"]} key={index}>
                    {item?.type?.name}
                  </li>
                ))}
              </ol>
            </Panel>
          </Collapse>
        </div>
      </main>
      <Footer />
    </>
  );
}
