import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "../../../public/logo.png";
export default function PokemonLogo({ href }: { href: string }) {
  return (
    <Link href={href}>
      <Image src={Logo} alt="pokemons" />
    </Link>
  );
}
