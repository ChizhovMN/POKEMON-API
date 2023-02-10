import Link from "next/link";
import React from "react";
import Footer from "./components/footer";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Link href="pokemons">SEE ALL POKEMONS</Link>
      </main>
      <Footer />
    </>
  );
}
