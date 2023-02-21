import React from "react";
import { Input } from "antd";
import PageBtn from "./pageBtn";
import { PokemonLogo } from "./headerLogo";
import { HeaderProps } from "../types";
import styles from "@/styles/Home.module.css";

const { Search } = Input;

export default function Header({
  searchField,
  pokemonsCounter,
  btnNameAllView,
  btnNamePageView,
  handleClickAllView,
  handleClickPageView,
  handleSearch,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1>
        <PokemonLogo href="/" />
      </h1>

      <div className={styles["header-btns"]}>
        <Search
          placeholder="input search text"
          defaultValue={searchField}
          style={{ width: 200 }}
          onChange={handleSearch}
        />
        <PageBtn btnName={btnNameAllView} handleClick={handleClickAllView} />
        <PageBtn btnName={btnNamePageView} handleClick={handleClickPageView} />
        <div>All pokemons:{pokemonsCounter}</div>
      </div>
    </header>
  );
}
