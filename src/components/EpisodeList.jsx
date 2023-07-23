import styles from "./EpisodeList.module.css";
import { useParams } from "react-router-dom";
import { usePodcasts } from "../contexts/PodcasterContext";
import { useEffect } from "react";
import EpisodeItem from "./EpisodeItem";

function EpisodeList() {
  const { potcastId } = useParams();
  const { getEpisodes, getTrackCount, trackCount, episodes, isLoading } =
    usePodcasts();

  useEffect(() => {
    async function GetIt() {
      await getEpisodes(potcastId);
      await getTrackCount(potcastId);
    }
    GetIt();
  }, [potcastId]);

  console.log("episodes in List:", episodes);
  // console.log("trackcount", trackCount);

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.title}>Title</div>
        <div className={styles.date}>Description</div>
        <div className={styles.duration}>Duration</div>
      </div>
      {!isLoading &&
        episodes.map((episode, index) => (
          <EpisodeItem episode={episode} key={episode.id} index={index} />
        ))}
    </div>
  );
}

export default EpisodeList;
