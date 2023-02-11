import Link from "next/link";
import { imageLoader } from "../pokemons";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

export default function PokemonItem({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [imgId, setImgId] = useState(id);
  return (
    <Link
      key={id}
      id={id}
      className={styles["main-item"]}
      href={`pokemons/pokemon/${id}`}
    >
      <Image
        unoptimized
        src={imageLoader(imgId)}
        onError={() => setImgId("0")}
        alt={name}
        width={150}
        height={150}
      />
      {name}
    </Link>
  );
}
