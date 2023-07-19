import { useParams } from "react-router-dom";
import { usePodcasts } from "../contexts/PodcasterContext";
import { useEffect } from "react";

function Podcast() {
  const { id } = useParams();
  const { getPodcast, currentPodcast, isLoading } = usePodcasts();

  console.log(id);

  useEffect(() => {
    getPodcast(id);
  }, [id]);

  return <div>Podcast by id</div>;
}

export default Podcast;
