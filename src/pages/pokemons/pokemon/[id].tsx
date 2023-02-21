import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button, Collapse } from "antd";
import Footer from "@/components/footer";
import { PokemonLogo } from "@/components/headerLogo";
import { PokemonDescriptionType } from "../../../types";
import { fetcherPokemonType, imageLoader } from "@/services";
import global from "@/styles/global.module.css";
import styles from "@/styles/pokemon.module.css";

const { Panel } = Collapse;

export const getServerSideProps: GetServerSideProps<{
  pokemon: PokemonDescriptionType;
}> = async (context) => {
  try {
    const { id } = context.query;
    const pokemon = await fetcherPokemonType(id as string);
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
        <div>POKEMON: {pokemon?.name.toUpperCase()}</div>
      </header>
      <main className={global.main} style={{ display: "block" }}>
        <div className={styles["pokemon-wrapper"]}>
          <div>
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
                      {item?.pokemon_v2_stat?.name} - {item?.base_stat}
                    </li>
                  ))}
                </ol>
              </Panel>
              <Panel header="MOVES" key="2" className={styles["collapse-item"]}>
                <ol className={styles["collapse-list"]}>
                  {pokemon.moves.map((item, index) => (
                    <li className={styles["list-item"]} key={index}>
                      {item?.pokemon_v2_move?.name}
                    </li>
                  ))}
                </ol>
              </Panel>
              <Panel
                header="ABILITY"
                key="3"
                className={styles["collapse-item"]}
              >
                <ol className={styles["collapse-list"]}>
                  {pokemon?.ability.map((item, index) => (
                    <li className={styles["list-item"]} key={index}>
                      {item?.pokemon_v2_ability?.name}
                    </li>
                  ))}
                </ol>
              </Panel>
            </Collapse>
          </div>
        </div>
        <div>
          <Link href={`/evolution/${pokemon?.evolution}`}>
            <Button
              type="dashed"
              style={{ display: "block", margin: "0 auto" }}
            >
              CHECK {pokemon?.name.toUpperCase()} EVOLUTION
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
