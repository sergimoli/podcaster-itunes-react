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
    <div>
      {/* {trackCount > 0 && ( */}
      <>
        <div>Episodes: {trackCount}</div>
        <div>
          <ul>
            {episodes &&
              episodes.map((episode) => (
                <EpisodeItem episode={episode} key={episode.index} />
              ))}
          </ul>
        </div>
      </>
      {/* )} */}
    </div>
  );
}

export default EpisodeList;
