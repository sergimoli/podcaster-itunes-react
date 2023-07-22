import { useParams } from "react-router-dom";
import { usePodcasts } from "../contexts/PodcasterContext";
import { useEffect } from "react";

function Episode() {
  const { potcastId } = useParams();

  const { getPodcast, isLoading, currentPodcast } = usePodcasts();

  console.log(potcastId);

  useEffect(() => {
    getPodcast(potcastId);
  }, [potcastId]);

  return (
    <>
      <div>episodes by id</div>
      <div>
        {currentPodcast[0] && (
          <>
            <h3>Id: {currentPodcast[0].id}</h3>
            <h3>
              <img
                src={currentPodcast[0].img}
                alt={currentPodcast[0].name}
              ></img>
            </h3>
            <h3>Author: {currentPodcast[0].author}</h3>
            <h3>Description: {currentPodcast[0].summary}</h3>
          </>
        )}
      </div>
    </>
  );
}

export default Episode;
