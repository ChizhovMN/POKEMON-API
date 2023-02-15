import React, { useEffect, useState } from "react";
import { fetcher } from "../pokemons";
import useSWR from "swr";
import styles from "@/styles/Home.module.css";
import PageBtn from "../pageBtn";
import CreatePokemonTable from "./pokemonTable";
import { PokemonPage } from "../types";
import { useRouter } from "next/router";
import SearchCounter from "./searchCounter";

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
  const pokemonURL = (limit: number, offset: number) =>
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit || 16}&offset=${offset}`;
  const [link, setLink] = useState(
    pokemonURL(pagination.limit, pagination.offset)
  );
  const { data } = useSWR(link, fetcher);
  const [pokemons, setPokemons] = useState(pokemonPage || data);
  const pages = Math.floor(pokemonPage.count / pagination.limit);
  const pokemonsResult = !search.length
    ? pokemons.results
    : pokemons.results.filter((item) =>
        item.name.toLowerCase().trim().startsWith(search)
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
  }, [data, pagination, link]);
  const handleClickNext = () => {
    if (pokemons.next !== null) {
      setPagination((prevState) => ({
        ...prevState,
        offset: pagination.offset + pagination.limit,
      }));
    }
    setLink(pokemons.next);
  };
  const handleClickPrevious = () => {
    if (pokemons.previous !== null) {
      setPagination((prevState) => ({
        ...prevState,
        offset: pagination.offset - pagination.limit,
      }));
    }
    setLink(pokemons.previous);
  };
  return (
    <>
      <SearchCounter search={search} results={pokemonsResult.length} />
      <div className={styles["main-table"]}>
        {CreatePokemonTable(pokemonsResult)}
      </div>
      {!search.length && (
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
                if (search) return;
                if (
                  1 <= +event.target.value &&
                  +event.target.value <= pages + 1
                ) {
                  setPagination((prevState) => ({
                    ...prevState,
                    offset:
                      Number(event.target.value) * pagination.limit -
                      pagination.limit,
                  }));
                  setLink(
                    pokemonURL(
                      pagination.limit,
                      Number(event.target.value) * pagination.limit -
                        pagination.limit
                    )
                  );
                }
              }}
            />
            <div>/ {pages + 1}</div>
          </div>
          <PageBtn btnName={">"} handleClick={() => handleClickNext()} />
        </div>
      )}
    </>
  );
}
