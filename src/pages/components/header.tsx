import React from "react";
import styles from "@/styles/Home.module.css";
import { Input } from "antd";
import PageBtn from "./pageBtn";
import { HeaderProps } from "../types";
import Link from "next/link";

const { Search } = Input;

export default function Header({
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
        <Link href="/">POKEMONS API</Link>
      </h1>

      <div className={styles["header-btns"]}>
        <Search
          placeholder="input search text"
          onSearch={(value) => console.log(value)}
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
