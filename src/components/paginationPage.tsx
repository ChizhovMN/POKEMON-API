import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";
import PageBtn from "./pageBtn";
import SearchCounter from "./searchCounter";
import PokemonTable from "./pokemonTable";
import { PokemonPageType } from "../types";
import styles from "@/styles/Home.module.css";
import { fetcherGraphQL } from "@/services";

export default function PaginationPage({
  pokemonPage,
  search,
  page,
}: {
  pokemonPage: PokemonPageType;
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

  const [pokemons, setPokemons] = useState<PokemonPageType>(
    data || pokemonPage
  );

  const pages = Math.floor(pokemons.count / pagination.limit);
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
    if (pokemons.count < pagination.offset) {
      setPagination((prevState) => ({
        ...prevState,
        offset:
          Math.floor(pokemons.count / pagination.limit) * pagination.limit,
      }));
    }
  }, [data, pokemons.count]);
  const handleClickNext = () => {
    if (pokemons.count < pagination.offset + pagination.limit) return;
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
      <SearchCounter search={search} results={pokemons.count} />
      <div className={styles["main-table"]}>
        {PokemonTable(pokemons.pokemons)}
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
