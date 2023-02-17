import React, { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "@/styles/Home.module.css";
import PageBtn from "../pageBtn";
import CreatePokemonTable from "./pokemonTable";
import { PokemonPage } from "../types";
import { useRouter } from "next/router";
import SearchCounter from "./searchCounter";
import { fetcherGraphQL } from "../pokemons";
import { useDebouncedCallback } from "use-debounce";

export default function PaginationPage({
  pokemonPage,
  search,
  page,
}: {
  pokemonPage: PokemonPage;
  search: string;
  page: { limit: number; offset: number };
}) {
  const { push, query } = useRouter();
  const [pagination, setPagination] = useState({
    offset: page.offset || 0,
    limit: page.limit || 16,
  });
  const defferedPagination = useDebouncedCallback(
    (pagination: { offset: number; limit: number }) => {
      setPagination(pagination);
    },
    500
  );
  const { data: data } = useSWR(
    [pagination.limit, pagination.offset, search],
    () =>
      fetcherGraphQL(
        pagination.offset,
        pagination.limit,
        !search.length ? "" : search
      )
  );

  const [pokemons, setPokemons] = useState<PokemonPage>(data || pokemonPage);
  const pages = Math.floor(
    pokemons?.data?.pokemon_v2_pokemon_aggregate.aggregate.count /
      pagination.limit
  );
  useEffect(() => {
    if (data) {
      setPokemons(data);
    }
    push(
      {
        query: {
          ...query,
          offset: pagination.offset,
          limit: pagination.limit,
          view: "pages",
        },
      },
      undefined,
      { shallow: true }
    );
    if (
      pokemons.data.pokemon_v2_pokemon_aggregate.aggregate.count <
      pagination.offset
    ) {
      setPagination((prevState) => ({
        ...prevState,
        offset:
          Math.floor(
            pokemons?.data?.pokemon_v2_pokemon_aggregate.aggregate.count /
              pagination.limit
          ) * pagination.limit,
      }));
    }
  }, [data, pokemons.data.pokemon_v2_pokemon_aggregate.aggregate.count]);
  const handleClickNext = () => {
    if (
      pokemons.data.pokemon_v2_pokemon_aggregate.aggregate.count <
      pagination.offset + pagination.limit
    )
      return;
    setPagination((prevState) => ({
      ...prevState,
      offset: pagination.offset + pagination.limit,
    }));
  };
  const handleClickPrevious = () => {
    if (pagination.offset < pagination.limit) return;
    setPagination((prevState) => ({
      ...prevState,
      offset: pagination.offset - pagination.limit,
    }));
  };
  return (
    <>
      <SearchCounter
        search={search}
        results={pokemons.data.pokemon_v2_pokemon_aggregate.aggregate.count}
      />
      <div className={styles["main-table"]}>
        {CreatePokemonTable(pokemons.data.pokemon_v2_pokemon)}
      </div>
      <div className={styles["main-btns"]}>
        <PageBtn btnName={"<"} handleClick={() => handleClickPrevious()} />
        <div className={styles.pagination}>
          <input
            className={styles["pagination-input"]}
            type="number"
            name="page"
            id="page"
            value={pagination.offset / pagination.limit + 1}
            onChange={(event) => {
              if (1 > +event.target.value || +event.target.value > pages + 1)
                return;
              defferedPagination({
                offset:
                  Number(Math.floor(+event.target.value)) * pagination.limit -
                  pagination.limit,
                limit: pagination.limit,
              });
            }}
          />
          <div>/ {pages + 1}</div>
        </div>
        <PageBtn btnName={">"} handleClick={() => handleClickNext()} />
      </div>
    </>
  );
}
