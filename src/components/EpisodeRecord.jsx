import { useEffect } from "react";
import styles from "./EpisodeRecord.module.css";
import { usePodcasts } from "../contexts/PodcasterContext";
import { useParams } from "react-router-dom";
function EpisodeRecord() {
  const { episodeid } = useParams();
  const { getEpisode, currentEpisode, isLoading } = usePodcasts();

  // useEffect(() => {
  //   getEpisode(episodeid);
  // }, [episodeid]);

  useEffect(() => {
    async function GetIt() {
      await getEpisode(episodeid);
    }
    GetIt();
  }, [episodeid]);

  console.log("id is:", episodeid);
  console.log("currentEpisode is", currentEpisode);

  //   <source src={currentEpisode[0].record} type="audio/mpeg" />

  // console.log("currentEpisode[0].record is:", currentEpisode[0].record);

  return (
    <div className={styles.container}>
      {currentEpisode[0] && (
        <>
          <div className={styles.divrecord}>
            <p className={styles.title}>{currentEpisode[0].title}</p>
          </div>

          <div>
            <p className={styles.description}>
              {currentEpisode[0].description}
            </p>
          </div>

          <div>
            {currentEpisode[0].record}
            {currentEpisode[0].record && (
              <audio controls className={styles.audio}>
                <source src={currentEpisode[0].record} type="audio/mpeg" />
                Your browser does not support the audio player.
              </audio>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default EpisodeRecord;
