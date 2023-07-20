import { useParams } from "react-router-dom";
import { usePodcasts } from "../contexts/PodcasterContext";
import { useEffect } from "react";
import PageNav from "./PageNav";
import EpisodeList from "./EpisodeList";

function Podcast() {
  const { potcastId } = useParams();
  const { getPodcast, currentPodcast, isLoading } = usePodcasts();

  console.log(potcastId);

  useEffect(() => {
    getPodcast(potcastId);
  }, [potcastId]);

  // const { id, img, name, author, summary } = currentPodcast;
  // const { id, title, description, record, duration, date, mp3 } =
  //   currentPodcast;
  // console.log(currentPodcast);
  // console.log(currentPodcast.results);

  console.log("currentPodcast", currentPodcast);

  return (
    <div>
      <PageNav />
      {/* aquest div hauria de fer que es partís en dos... */}
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
            <h3>Title: {currentPodcast[0].title}</h3>
            <h3>Summary: {currentPodcast[0].summary}</h3>
          </>
        )}
      </div>
      <div>
        <EpisodeList />
      </div>
    </div>
  );
}

export default Podcast;
