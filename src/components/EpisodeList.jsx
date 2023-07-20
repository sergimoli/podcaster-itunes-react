import { useParams } from "react-router-dom";
import { usePodcasts } from "../contexts/PodcasterContext";
import { useEffect } from "react";
import EpisodeItem from "./EpisodeItem";

function EpisodeList() {
  const { potcastId } = useParams();
  const { getEpisodes, episodes, isLoading } = usePodcasts();

  useEffect(() => {
    getEpisodes(potcastId);
  }, [potcastId]);

  console.log("episodes in List:", episodes);

  return (
    <div>
      episode list
      <ul>
        {episodes &&
          episodes.map((episode) => (
            <EpisodeItem episode={episode} key={episode.index} />
          ))}
      </ul>
    </div>
  );
}

export default EpisodeList;
