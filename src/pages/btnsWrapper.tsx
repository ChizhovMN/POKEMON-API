import React, { ReactChild } from "react";
import styles from "@/styles/Home.module.css";
import PageBtn from "./pageBtn";

export default function BtnsWrapper({
  styleWrapper,
  btnName,
  handleClick,
  children,
}: {
  styleWrapper: string;
  btnName: string;
  handleClick: () => void;
  children: ReactChild;
}) {
  return (
    <div className={styles[styleWrapper]}>
      <PageBtn btnName={btnName} handleClick={handleClick} />
      {children}
      <PageBtn btnName={btnName} handleClick={handleClick} />
    </div>
  );
}
