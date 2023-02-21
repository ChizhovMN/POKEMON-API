import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonTable from "./pokemonTable";
import SearchCounter from "./searchCounter";
import { PokemonPageType } from "../types";
import styles from "@/styles/Home.module.css";
import { fetcherGraphQL } from "@/services";

export default function InfiniteScrollPage({
  pokemonPage,
  search,
}: {
  pokemonPage: PokemonPageType;
  search: string;
}) {
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 16,
  });
  const [pokemons, setPokemons] = useState<PokemonPageType>(pokemonPage);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    if (pokemons.count < pagination.offset) {
      setEnd(true);
    }
    setLoading(true);
    fetcherGraphQL(
      pagination.offset + pagination.limit,
      pagination.limit,
      search
    )
      .then((data: PokemonPageType) => {
        setPagination((prevState) => ({
          ...prevState,
          offset: pagination.offset + pagination.limit,
        }));
        setPokemons((prevState) => ({
          ...prevState,
          pokemons: [...pokemons.pokemons, ...data.pokemons],
          count: data.count,
        }));
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <SearchCounter search={search} results={pokemons.count} />
      <div id="scrollableDiv" className={styles["scroll-wrapper"]}>
        <InfiniteScroll
          dataLength={pokemons.pokemons.length}
          next={loadMoreData}
          scrollThreshold="90%"
          hasMore={pokemons.pokemons.length < pokemons.count}
          loader={<h2>Loading...</h2>}
          scrollableTarget="scrollableDiv"
          className={styles["main-table"]}
          pullDownToRefreshContent={<h3>Release to refresh</h3>}
        >
          {PokemonTable(pokemons.pokemons)}
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
