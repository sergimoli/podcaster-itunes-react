import styles from "./PodcastItem.module.css";
import SearchPodcasts from "../pages/SearchPodcasts";
import { Link } from "react-router-dom";

function PodcastItem({ podcast }) {
  const { id, img, name, author, summary } = podcast;

  return (
    <>
      <li key={podcast.id} className={styles.li}>
        <Link to={`/podcast/${id}`} className={styles.link}>
          <img className={styles.img} src={img} alt={name}></img>
          <p className={styles.name}>{name}</p>
          <p className={styles.author}>{author}</p>
        </Link>
      </li>
    </>
  );
}

export default PodcastItem;
