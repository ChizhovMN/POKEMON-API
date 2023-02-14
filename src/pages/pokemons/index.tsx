import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useDeferredValue, useEffect, useState } from "react";
import { PokemonPage } from "../types";
import Header from "../header";
import Footer from "../footer";
import PageBtn from "../pageBtn";
import useSWR from "swr";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import CreatePokemonTable from "../components/pokemonTable";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

export const imageLoader = (id: string | string[] | undefined) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};
export const getServerSideProps: GetServerSideProps<{
  pokemonPage: PokemonPage;
}> = async () => {
  try {
    const params = new URLSearchParams();
    const limit = params.get("limit");
    const offset = params.get("offset");
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit || 16}&offset=${
        offset || 0
      }`
    );
    const pokemonPage: PokemonPage = await res.json();
    return {
      props: {
        pokemonPage,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export const fetcher = (link: string) => fetch(link).then((res) => res.json());

export default function Home({
  pokemonPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { push, query } = useRouter();
  const [pageView, setPageView] = useState<string>("pages");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 16,
    lastPage: 0,
  });
  const [loading, setLoading] = useState(false);
  const defferedSearch = useDeferredValue(search);
  const { data } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/?limit=${pagination.limit}&offset=${pagination.offset}`,
    fetcher
  );
  const [pokemonsData, setPokemonsData] = useState<PokemonPage>(
    data || pokemonPage
  );
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    console.log("LOAD");
    setLoading(true);
    if (data) {
      setPokemonsData((prevState) => ({
        ...prevState,
        results: [...prevState.results, ...data.results],
      }));
      setPagination((prevState) => ({
        ...prevState,
        limit: 16,
        offset: pagination.offset + 16,
      }));
      setLoading(false);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const view = params.get("view");
    const offset = params.get("offset");
    const limit = params.get("limit");
    const search = params.get("search");
    if (view) {
      setPageView(view);
    }
    if (view === "all") {
      loadMoreData();
    }
    if (offset) {
      setPagination((prevState) => ({ ...prevState, offset: +offset }));
    }
    if (limit) {
      setPagination((prevState) => ({ ...prevState, limit: +limit }));
    }
    if (search) {
      setSearch(search);
    }
  }, []);
  useEffect(() => {
    // if (data) {
    //   setPokemonsData(data);
    // }
    if (!search.length) {
      delete router.query.search;
      router.replace(
        {
          query: {
            ...query,
            view: pageView,
            offset: pagination.offset,
            limit: pagination.limit,
          },
        },
        undefined,
        { shallow: true }
      );
    } else {
      push(
        {
          query: {
            ...query,
            view: pageView,
            offset: pagination.offset,
            limit: pagination.limit,
            search: search,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [data, search, pageView, pagination]);
  const searchResults = pokemonsData.results.filter((item) =>
    item.name.startsWith(defferedSearch.trim())
  );
  const pokemonsPage = Math.floor(
    search
      ? searchResults.length / pagination.limit
      : pokemonPage.count / pagination.limit
  );
  const handleClickViewAll = () => {
    setPageView("all");
    setPagination((prevState) => ({
      ...prevState,
      limit: 16,
      offset: 16,
    }));
    setPokemonsData((prevState) => ({
      ...prevState,
      results: pokemonPage.results,
    }));
    loadMoreData();
  };
  const handleCLickViewPage = () => {
    setPageView("pages");
    setPagination((prevState) => ({
      ...prevState,
      limit: 16,
      offset: pagination.lastPage,
    }));
  };
  const handleSearchField = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      push({ query: { ...query, search: event.target.value } }, undefined, {
        shallow: true,
      });
      setSearch(event.target.value);
    }
  };
  const handleClickNext = () => {
    if (search) return;
    if (
      pokemonsData?.count &&
      pagination.offset < pokemonsData?.count - pagination.limit
    ) {
      setPagination((prevState) => ({
        ...prevState,
        offset: pagination.offset + pagination.limit,
        lastPage: pagination.offset + pagination.limit,
      }));
    }
  };
  const handleClickPrevious = () => {
    if (search) return;
    if (pagination.offset > 0) {
      setPagination((prevState) => ({
        ...prevState,
        offset: pagination.offset - pagination.limit,
        lastPage: pagination.offset - pagination.limit,
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
          value={pagination.offset / pagination.limit + 1}
          onChange={(event) => {
            if (search) return;
            if (
              1 <= +event.target.value &&
              +event.target.value <= pokemonsPage + 1
            ) {
              setPagination((prevState) => ({
                ...prevState,
                offset:
                  Number(event.target.value) * pagination.limit -
                  pagination.limit,
              }));
            }
          }}
        />
        <div>/ {pokemonsPage + 1}</div>
      </div>
      <PageBtn btnName={">"} handleClick={() => handleClickNext()} />
    </div>
  );
  return (
    <>
      <Head>
        <title>POKEMON API</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        searchField={search}
        pokemonsCounter={search ? searchResults.length : pokemonPage?.count}
        btnNameAllView={"ALL"}
        btnNamePageView={"PAGE"}
        handleClickAllView={handleClickViewAll}
        handleClickPageView={handleCLickViewPage}
        handleSearch={(event: Event) => handleSearchField(event)}
      />
      <main className={styles.main}>
        {pageView === "pages" ? (
          <div className={styles["main-table"]}>
            {CreatePokemonTable(search ? searchResults : pokemonsData.results)}
          </div>
        ) : (
          <div
            id="scrollableDiv"
            style={{
              maxHeight: "80vh",
              overflow: "auto",
              padding: "0 16px",
              border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
          >
            <InfiniteScroll
              dataLength={pokemonsData.results.length}
              next={loadMoreData}
              hasMore={
                pokemonsData.results.length < pokemonsData.count && !loading
              }
              loader={<h2>Loading...</h2>}
              scrollableTarget="scrollableDiv"
              className={styles["main-table"]}
            >
              {CreatePokemonTable(
                search ? searchResults : pokemonsData.results
              )}
            </InfiniteScroll>
          </div>
        )}
        {pageView === "pages" && PaginationField}
      </main>
      <Footer />
    </>
  );
}
