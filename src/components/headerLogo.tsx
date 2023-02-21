import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";
export const PokemonLogo = ({ href }: { href: string }) => (
  <Link href={href}>
    <Image src={Logo} alt="pokemons" />
  </Link>
);
