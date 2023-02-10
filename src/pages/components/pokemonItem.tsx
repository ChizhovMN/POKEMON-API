import Link from "next/link";
import { imageLoader } from "..";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function PokemonItem({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <Link
      key={id}
      id={id}
      className={styles["main-item"]}
      href={`pokemon/${id}`}
    >
      <Image
        unoptimized
        loader={() => imageLoader(id)}
        src={imageLoader(id)}
        alt={name}
        width={150}
        height={150}
      />
      {name}
    </Link>
  );
}
