import React from "react";
import styles from "./Results.module.css";
import { usePodcasts } from "../contexts/PodcasterContext";

function Results() {
  const { podcasts } = usePodcasts();

  return (
    <div className={styles.resultSquare}>
      <span className={styles.result}>{podcasts.length}</span>
    </div>
  );
}

export default Results;
