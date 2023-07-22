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

  const episodesData = [
    { id: 1, title: "Episodio 1", date: "2023-07-01", duration: "30:00" },
    { id: 2, title: "Episodio 2", date: "2023-07-08", duration: "25:30" },
    { id: 3, title: "Episodio 3", date: "2023-07-15", duration: "22:45" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Title</div>
        <div>Date</div>
        <div>Duration</div>
      </div>
      <ul className={styles.ulhori}>
        {episodes.map((episode) => (
          <EpisodeItem episode={episode} key={episode.id} />
        ))}
      </ul>
    </div>
  );
}

export default EpisodeList;
