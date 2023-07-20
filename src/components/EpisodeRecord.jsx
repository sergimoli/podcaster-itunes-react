import { useEffect } from "react";
import styles from "./EpisodeRecord.module.css";
import { usePodcasts } from "../contexts/PodcasterContext";
import { useParams } from "react-router-dom";
function EpisodeRecord() {
  const { episodeid } = useParams();
  const { getEpisode, currentEpisode, isLoading } = usePodcasts();

  useEffect(() => {
    getEpisode(episodeid);
  }, [episodeid]);

  console.log("id is:", episodeid);
  console.log("currentEpisode is", currentEpisode);

  //   <source src={currentEpisode[0].record} type="audio/mpeg" />

  //   console.log(currentEpisode[0].record);

  return (
    <div>
      {currentEpisode[0] && (
        <>
          <h1>{currentEpisode[0].title}</h1>
          <p>Descripción del episodio</p>
          <audio controls>
            <source src={currentEpisode[0].record} type="audio/mpeg" />
            Your browser does not support the audio player.
          </audio>
        </>
      )}
    </div>
  );
}

export default EpisodeRecord;
