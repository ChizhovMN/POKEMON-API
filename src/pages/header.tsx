import React from "react";
import styles from "@/styles/Home.module.css";
import PageBtn from "./pageBtn";
export default function Header({
  pokemonsCounter,
  btnNameAllView,
  btnNamePageView,
  handleClickAllView,
  handleClickPageView,
}: {
  pokemonsCounter: number;
  btnNameAllView: string;
  btnNamePageView: string;
  handleClickAllView: () => void;
  handleClickPageView: () => void;
}) {
  return (
    <header className={styles.header}>
      <h1>POKEMONS API</h1>

      <div className={styles["header-btns"]}>
        <PageBtn btnName={btnNameAllView} handleClick={handleClickAllView} />
        <PageBtn btnName={btnNamePageView} handleClick={handleClickPageView} />
        <div>All pokemons:{pokemonsCounter}</div>
      </div>
    </header>
  );
}
