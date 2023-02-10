import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useDeferredValue, useEffect, useState } from "react";
import { PokemonPage } from "./types";
import Header from "./header";
import Footer from "./footer";
import PageBtn from "./pageBtn";
import useSWR from "swr";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import CreatePokemonTable from "./components/pokemonTable";

export const imageLoader = (id: string | string[] | undefined) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export const getServerSideProps: GetServerSideProps<{
  pokemonPage: PokemonPage;
}> = async () => {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=16&offset=0"
  );
  const pokemonPage: PokemonPage = await res.json();
  return {
    props: {
      pokemonPage,
    },
  };
};

export const fetcher = (link: string) => fetch(link).then((res) => res.json());

export default function Home({
  pokemonPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const chunkLength = 16;
  const [pokemonsData, setPokemonsData] = useState(pokemonPage);
  const [view, setView] = useState<"pages" | "all">("pages");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 16,
    lastPage: 0,
  });
  const defferedSearch = useDeferredValue(search);
  const { data } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/?limit=${pagination.limit}&offset=${pagination.offset}`,
    fetcher
  );
  useEffect(() => {
    if (data) {
      setPokemonsData(data);
    }
  }, [data]);
  const searchResults = pokemonsData.results.filter((item) =>
    item.name.startsWith(defferedSearch.trim())
  );

  const pokemonsPage = Math.floor(
    search
      ? searchResults.length / pagination.limit
      : pokemonPage.count / pagination.limit
  );
  const handleClickViewAll = () => {
    setView("all");
    setPagination((prevState) => ({ ...prevState, limit: 1000, offset: 0 }));
  };
  const handleCLickViewPage = () => {
    setView("pages");
    setPagination((prevState) => ({
      ...prevState,
      limit: 16,
      offset: pagination.lastPage,
    }));
  };
  const handleSearchField = (event: Event) => {
    if (event.target instanceof HTMLInputElement) setSearch(event.target.value);
  };
  const handleClickNext = () => {
    if (search) return;
    if (data.count && pagination.offset < data.count - chunkLength) {
      setPagination((prevState) => ({
        ...prevState,
        offset: pagination.offset + chunkLength,
        lastPage: pagination.offset + chunkLength,
      }));
    }
  };
  const handleClickPrevious = () => {
    if (search) return;
    if (pagination.offset > 0) {
      setPagination((prevState) => ({
        ...prevState,
        offset: pagination.offset - chunkLength,
        lastPage: pagination.offset - chunkLength,
      }));
    }
  };
  const PaginationField = (
    <div className={styles["main-btns"]}>
      <PageBtn btnName={"<"} handleClick={() => handleClickPrevious()} />
      <div className={styles.pagination}>
        <input
          className={styles["pagination-input"]}
          type="number"
          name="page"
          id="page"
          min={1}
          value={pagination.offset / chunkLength + 1}
          onChange={(event) => {
            if (search) return;
            if (
              1 <= +event.target.value &&
              +event.target.value <= pokemonsPage + 1
            ) {
              setPagination((prevState) => ({
                ...prevState,
                offset: Number(event.target.value) * chunkLength - chunkLength,
              }));
            }
          }}
        />
        <div>/ {pokemonsPage + 1}</div>
      </div>
      <PageBtn btnName={">"} handleClick={() => handleClickNext()} />
    </div>
  );
  const viewPort = {
    all: <></>,
    pages: PaginationField,
  };
  return (
    <>
      <Head>
        <title>POKEMON API</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        pokemonsCounter={search ? searchResults.length : pokemonPage.count}
        btnNameAllView={"ALL"}
        btnNamePageView={"PAGE"}
        handleClickAllView={handleClickViewAll}
        handleClickPageView={handleCLickViewPage}
        handleSearch={handleSearchField}
      />
      <main className={styles.main}>
        <div className={styles["main-table"]}>
          {CreatePokemonTable(search ? searchResults : pokemonsData.results)}
        </div>
        {viewPort[view]}
      </main>
      <Footer />
    </>
  );
}
