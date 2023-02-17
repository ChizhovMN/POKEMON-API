import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "@/styles/Home.module.css";
import CreatePokemonTable from "./pokemonTable";
import { PokemonPage } from "../types";
import SearchCounter from "./searchCounter";
import { Waypoint } from "react-waypoint";
import { fetcherGraphQL } from "../pokemons";

export default function InfiniteScrollPage({
  pokemonPage,
  search,
}: {
  pokemonPage: PokemonPage;
  search: string;
}) {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 16,
  });
  const [pokemons, setPokemons] = useState<PokemonPage>(pokemonPage);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetcherGraphQL(
      pagination.offset + pagination.limit,
      pagination.limit,
      search
    )
      .then((data: PokemonPage) => {
        console.log("DATA", data);
        setPagination((prevState) => ({
          ...prevState,
          offset: pagination.offset + pagination.limit,
        }));
        setPokemons((prevState) => ({
          ...prevState,
          data: {
            pokemon_v2_pokemon: [
              ...pokemons.data.pokemon_v2_pokemon,
              ...data.data.pokemon_v2_pokemon,
            ],
            pokemon_v2_pokemon_aggregate: {
              aggregate: {
                count: data.data.pokemon_v2_pokemon_aggregate.aggregate.count,
              },
            },
          },
        }));
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <SearchCounter
        search={search}
        results={pokemonPage.data.pokemon_v2_pokemon_aggregate.aggregate.count}
      />
      <div
        id="scrollableDiv"
        style={{
          height: "80vh",
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={pokemons.data.pokemon_v2_pokemon.length}
          next={loadMoreData}
          scrollThreshold="90%"
          hasMore={
            pokemons.data.pokemon_v2_pokemon.length <
            pokemonPage.data.pokemon_v2_pokemon_aggregate.aggregate.count
          }
          loader={<h2>Loading...</h2>}
          scrollableTarget="scrollableDiv"
          className={styles["main-table"]}
          pullDownToRefreshContent={<h3>Release to refresh</h3>}
        >
          {CreatePokemonTable(pokemons.data.pokemon_v2_pokemon)}
          {!loading && (
            <Waypoint
              scrollableAncestor={document.getElementById("scrollableDiv")}
              onEnter={loadMoreData}
            />
          )}
        </InfiniteScroll>
      </div>
    </>
  );
}
