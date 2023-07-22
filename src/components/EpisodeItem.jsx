import styles from "./EpisodeItem.module.css";
import { Link } from "react-router-dom";

function EpisodeItem({ episode }) {
  return (
    // <div className={styles.header}>

    <li>
      <Link to={`episode/${episode.id}`}>
        <div className={styles.column}>{episode.title}</div>
        <div className={styles.column}>{episode.date}</div>
        <div className={styles.column}>{episode.duration}</div>
      </Link>
    </li>

    // </div>
  );
}

export default EpisodeItem;
