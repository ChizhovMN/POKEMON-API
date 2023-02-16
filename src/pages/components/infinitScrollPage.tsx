import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "@/styles/Home.module.css";
import CreatePokemonTable from "./pokemonTable";
import { PokemonPage } from "../types";
import SearchCounter from "./searchCounter";
import { Waypoint } from "react-waypoint";

export default function InfiniteScrollPage({
  pokemonPage,
  search,
}: {
  pokemonPage: PokemonPage;
  search: string;
}) {
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const [pokemons, setPokemons] = useState<PokemonPage>(pokemonPage);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(pokemons.next)
      .then((res) => res.json())
      .then((data: PokemonPage) => {
        if (data.next === null) {
          setEnd(true);
        }
        setPokemons((prevState) => ({
          ...prevState,
          next: data.next,
          results: [...prevState.results, ...data.results],
        }));
        setLoading(false);
      })
      .catch(() => setLoading(false))
      .finally(() => setLoading(false));
  };
  useEffect(() => {}, []);
  const pokemonsResult = !search.length
    ? pokemons.results
    : pokemons.results.filter((item) =>
        item.name.toLowerCase().trim().startsWith(search)
      );
  return (
    <>
      <SearchCounter search={search} results={pokemonsResult.length} />
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
          dataLength={pokemons.results.length}
          next={loadMoreData}
          scrollThreshold="90%"
          hasMore={pokemons.results.length < pokemons.count}
          loader={<h2>Loading...</h2>}
          scrollableTarget="scrollableDiv"
          className={styles["main-table"]}
          pullDownToRefreshContent={<h3>Release to refresh</h3>}
        >
          {CreatePokemonTable(pokemonsResult)}
          {!loading && !end && (
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
