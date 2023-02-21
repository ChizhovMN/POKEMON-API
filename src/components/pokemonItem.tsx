import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { imageLoader } from "@/services";

export default function PokemonItem({
  id,
  name,
  width = 150,
  height = 150,
}: {
  id: string;
  name: string;
  width?: number;
  height?: number;
}) {
  const [imgId, setImgId] = useState(id);
  return (
    <Link className={styles["main-item"]} href={`/pokemons/pokemon/${id}`}>
      <Image
        unoptimized
        src={imageLoader(imgId)}
        onError={() => setImgId("0")}
        alt={name}
        width={width}
        height={height}
        style={{ imageRendering: "pixelated" }}
      />
      {name}
    </Link>
  );
}
