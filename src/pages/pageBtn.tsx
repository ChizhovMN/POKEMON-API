import React from "react";
import styles from "@/styles/Home.module.css";
export default function PageBtn({
  btnName,
  handleClick,
}: {
  btnName: string;
  handleClick: () => void;
}) {
  return (
    <>
      <button className={styles["main-btn"]} onClick={() => handleClick()}>
        {btnName}
      </button>
    </>
  );
}
