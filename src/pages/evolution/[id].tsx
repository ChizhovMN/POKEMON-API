import React from "react";
import styles from "@/styles/pokemon.module.css";
import Footer from "../footer";
import { Button } from "antd";
import { PokemonEvolution } from "../types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import PokemonLogo from "@/pages/components/headerLogo";
import { useRouter } from "next/router";
import PokemonItem from "../components/pokemonItem";

export const getServerSideProps: GetServerSideProps<{
  pokemon: PokemonEvolution;
}> = async (context) => {
  try {
    const { id } = context.query;
    const res = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query MyQuery {
          pokemon_v2_evolutionchain(where: {id: {_eq: ${id}}}) {
            id
            pokemon_v2_pokemonspecies {
              name
              id
              pokemon_v2_pokemons {
                pokemon_v2_pokemonstats {
                  base_stat
                  id
                  pokemon_v2_stat {
                    name
                  }
                }
              }
            }
          }
        }
        `,
      }),
    });
    const pokemon: PokemonEvolution = await res.json();
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

export default function PokemonEvolutionPage({
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
        <div>EVOLUTION CHAIN</div>
      </header>
      <main className={styles.main} style={{ gap: "1rem" }}>
        {pokemon?.data?.pokemon_v2_evolutionchain[0]?.pokemon_v2_pokemonspecies.map(
          (item) => (
            <section key={item.id}>
              <PokemonItem
                id={`${item.id}`}
                name={item.name.toLocaleUpperCase()}
                width={450}
                height={450}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                {item?.pokemon_v2_pokemons[0]?.pokemon_v2_pokemonstats.map(
                  (stats) => (
                    <div key={stats.id}>
                      {stats.pokemon_v2_stat.name} - {stats.base_stat}
                    </div>
                  )
                )}
              </div>
            </section>
          )
        )}
      </main>
      <Footer />
    </>
  );
}
