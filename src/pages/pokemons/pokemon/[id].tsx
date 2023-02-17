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
import { useRouter } from "next/router";

const { Panel } = Collapse;

export const getServerSideProps: GetServerSideProps<{
  pokemon: PokemonType;
}> = async (context) => {
  try {
    const { id } = context.query;
    console.log(id);
    const res = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query getPokemon($id: Int_comparison_exp = {}) {
          pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
            id
            name
            pokemon_v2_pokemonspecy {
              evolution_chain_id
            }
            pokemon_v2_pokemonabilities {
              pokemon_v2_ability {
                name
                id
              }
            }
            pokemon_v2_pokemonmoves {
              pokemon_v2_move {
                name
                id
              }
            }
            pokemon_v2_pokemonstats {
              base_stat
              pokemon_v2_stat {
                name
                id
              }
              id
            }
            weight
          }
        }`,
      }),
    });
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
  const router = useRouter();
  return (
    <>
      <header className={styles.header}>
        <div>
          <PokemonLogo href="/" />
          <Button
            type="dashed"
            style={{ display: "block" }}
            onClick={() => router.back()}
          >
            GO BACK
          </Button>
        </div>
        <div>
          POKEMON: {pokemon?.data?.pokemon_v2_pokemon[0]?.name.toUpperCase()}
        </div>
      </header>
      <main className={styles.main} style={{ display: "block" }}>
        <div style={{ display: "flex" }}>
          <div className={styles.pokemon}>
            <Image
              className={styles["pokemon-img"]}
              unoptimized
              loader={() =>
                imageLoader(`${pokemon?.data?.pokemon_v2_pokemon[0]?.id}`)
              }
              src={imageLoader(`${pokemon?.data?.pokemon_v2_pokemon[0]?.id}`)}
              alt={pokemon?.data?.pokemon_v2_pokemon[0]?.name || "Unnamed"}
              width={600}
              height={600}
            />
          </div>
          <div className={styles["pokemon-info"]}>
            <h2>{pokemon?.data?.pokemon_v2_pokemon[0]?.name.toUpperCase()}</h2>
            <p>Weight: {pokemon?.data?.pokemon_v2_pokemon[0]?.weight} kg</p>
            <Collapse className={styles.collapse}>
              <Panel header="STATS" key="1" className={styles["collapse-item"]}>
                <ol className={styles["collapse-list"]}>
                  {pokemon?.data?.pokemon_v2_pokemon[0]?.pokemon_v2_pokemonstats.map(
                    (item, index) => (
                      <li className={styles["list-item"]} key={index}>
                        {item?.pokemon_v2_stat?.name} - {item?.base_stat}
                      </li>
                    )
                  )}
                </ol>
              </Panel>
              <Panel header="MOVES" key="2" className={styles["collapse-item"]}>
                <ol className={styles["collapse-list"]}>
                  {pokemon?.data?.pokemon_v2_pokemon[0]?.pokemon_v2_pokemonmoves.map(
                    (item, index) => (
                      <li className={styles["list-item"]} key={index}>
                        {item?.pokemon_v2_move?.name}
                      </li>
                    )
                  )}
                </ol>
              </Panel>
              <Panel
                header="ABILITY"
                key="3"
                className={styles["collapse-item"]}
              >
                <ol className={styles["collapse-list"]}>
                  {pokemon?.data?.pokemon_v2_pokemon[0]?.pokemon_v2_pokemonabilities.map(
                    (item, index) => (
                      <li className={styles["list-item"]} key={index}>
                        {item?.pokemon_v2_ability?.name}
                      </li>
                    )
                  )}
                </ol>
              </Panel>
            </Collapse>
          </div>
        </div>
        <div>
          <Link
            href={`/evolution/${pokemon?.data?.pokemon_v2_pokemon[0]?.pokemon_v2_pokemonspecy?.evolution_chain_id}`}
          >
            <Button
              type="dashed"
              style={{ display: "block", margin: "0 auto" }}
            >
              CHECK {pokemon?.data?.pokemon_v2_pokemon[0]?.name.toUpperCase()}{" "}
              EVOLUTION
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
