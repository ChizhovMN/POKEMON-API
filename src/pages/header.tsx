import React from "react";
import styles from "@/styles/Home.module.css";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import PageBtn from "./pageBtn";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

export default function Header({
  pokemonsCounter,
  btnNameAllView,
  btnNamePageView,
  handleClickAllView,
  handleClickPageView,
  handleSearch,
}: {
  pokemonsCounter: number;
  btnNameAllView: string;
  btnNamePageView: string;
  handleClickAllView: () => void;
  handleClickPageView: () => void;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <header className={styles.header}>
      <h1>POKEMONS API</h1>

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
