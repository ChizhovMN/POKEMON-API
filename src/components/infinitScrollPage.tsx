import React, { useEffect, useState } from "react";
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
  const refresh = () => {
    setPokemons((prevState) => ({ ...prevState, pokemons: [], count: 0 }));
    setPagination((prevState) => ({
      ...prevState,
      offset: 0,
    }));
  };
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    // if (pokemons.count <= pokemons.pokemons.length) {
    //   setEnd(true);
    //   return;
    // }
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
          pokemons: search.length
            ? [...prevState.pokemons, ...data.pokemons]
            : [...pokemons.pokemons, ...data.pokemons],
          count: data.count,
        }));
        console.log("DATA", data);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setEnd(false);
    refresh();
    loadMoreData();
  }, [search]);

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
        </InfiniteScroll>
      </div>
    </>
  );
}
