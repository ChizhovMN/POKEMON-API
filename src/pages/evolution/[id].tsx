import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { Button } from "antd";
import { PokemonLogo } from "@/components/headerLogo";
import PokemonItem from "../../components/pokemonItem";
import Footer from "@/components/footer";
import { PokemonEvolution } from "../../types";
import global from "@/styles/global.module.css";
import styles from "@/styles/evolution.module.css";
import { fetcherPokemonEvolution } from "@/services";

export const getServerSideProps: GetServerSideProps<{
  pokemon: PokemonEvolution;
}> = async (context) => {
  try {
    const { id } = context.query;
    const pokemon = await fetcherPokemonEvolution(id as string);
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
      <header className={global.header}>
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
      <main className={`${global.main},${styles["pokemon-evolution"]}`}>
        {pokemon?.data?.pokemon_v2_evolutionchain[0]?.pokemon_v2_pokemonspecies.map(
          (item) => (
            <section key={item.id}>
              <PokemonItem
                id={`${item.id}`}
                name={item.name.toLocaleUpperCase()}
                width={450}
                height={450}
              />
              <div className={styles["pokemon-description"]}>
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
