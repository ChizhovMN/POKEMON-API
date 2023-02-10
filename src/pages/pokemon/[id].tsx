import React from "react";
import styles from "@/styles/pokemon.module.css";
import Link from "next/link";
import Footer from "../footer";
import Image from "next/image";
import { myLoader } from "..";
import { Collapse } from "antd";
import { PokemonType } from "../types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const { Panel } = Collapse;

export const getServerSideProps: GetServerSideProps<{
  data: PokemonType;
}> = async (context) => {
  const { id } = context.query;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data: PokemonType = await res.json();
  console.log("DATA", data);
  return {
    props: {
      data,
    },
  };
};

export default function PokemonPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <header className={styles.header}>
        <Link
          href={{
            pathname: "/",
          }}
        >
          <h1>POKEMONS API</h1>
        </Link>
        <div>POKEMON: {data?.name.toUpperCase()}</div>
      </header>
      <main className={styles.main}>
        <div className={styles.pokemon}>
          <Image
            className={styles["pokemon-img"]}
            unoptimized
            loader={() => myLoader(`${data?.id}`)}
            src={myLoader(`${data?.id}`)}
            alt={data?.name ? data?.name : "Unnamed"}
            width={600}
            height={600}
          />
        </div>
        <div className={styles["pokemon-info"]}>
          <h2>{data?.name.toUpperCase()}</h2>
          <p>Weight: {data?.weight} kg</p>
          <Collapse className={styles.collapse}>
            <Panel header="STATS" key="1" className={styles["collapse-item"]}>
              <ol className={styles["collapse-list"]}>
                {data?.stats.map((item, index) => (
                  <li className={styles["list-item"]} key={index}>
                    {item?.stat?.name} - {item?.base_stat}
                  </li>
                ))}
              </ol>
            </Panel>
            <Panel header="MOVES" key="2" className={styles["collapse-item"]}>
              <ol className={styles["collapse-list"]}>
                {data?.moves.map((item, index) => (
                  <li className={styles["list-item"]} key={index}>
                    {item?.move?.name}
                  </li>
                ))}
              </ol>
            </Panel>
            <Panel header="TYPES" key="3" className={styles["collapse-item"]}>
              <ol className={styles["collapse-list"]}>
                {data?.types.map((item, index) => (
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
