import styles from "./PodcastItem.module.css";
import SearchPodcasts from "../pages/SearchPodcasts";

function PodcastItem({ podcast }) {
  const { id, img, name, author, summary } = podcast;

  return (
    <>
      <li className={styles.li}>
        <h3>Id: {id}</h3>
        <img src={img} alt={name}></img>
        <h3>Name: {name}</h3>
        <h3>Author: {author}</h3>
        <h3>Summary: {summary}</h3>
      </li>
    </>
  );
}

export default PodcastItem;
