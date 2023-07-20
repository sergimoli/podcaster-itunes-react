import { useParams } from "react-router-dom";
import { usePodcasts } from "../contexts/PodcasterContext";
import { useEffect } from "react";
import PageNav from "./PageNav";
import EpisodeRecord from "./EpisodeRecord";

function Episode() {
  const { episodeid, id } = useParams();

  const { getPodcast, getEpisode, currentEpisode, isLoading, currentPodcast } =
    usePodcasts();

  console.log(episodeid);

  useEffect(() => {
    getEpisode(episodeid);
  }, [episodeid]);

  useEffect(() => {
    getPodcast(id);
  }, [id]);

  return (
    <>
      <PageNav />
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
            <h3>Title: {currentPodcast[0].title}</h3>
            <h3>Summary: {currentPodcast[0].summary}</h3>
          </>
        )}
      </div>
      <div>
        <EpisodeRecord />
      </div>
    </>
  );
}

export default Episode;
