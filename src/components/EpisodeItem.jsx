import styles from "./EpisodeItem.module.css";
import { Link } from "react-router-dom";
import { convertToHoursMinutesSeconds, formatDate } from "../helpers/dateUtils";

function EpisodeItem({ episode, index }) {
  const formattedDate = formatDate(episode.date);
  const formattedDuration = convertToHoursMinutesSeconds(episode.duration);
  return (
    <Link className={styles.link} to={`episode/${episode.id}`}>
      <div
        className={`${styles.row} ${
          index % 2 === 0 ? styles.blueBackground : null
        }`}
      >
        <div className={styles.title}>{episode.title}</div>
        <div className={styles.date}>{formattedDate}</div>
        <div className={styles.duration}>{formattedDuration}</div>
      </div>
    </Link>
  );
}

export default EpisodeItem;
