import { usePodcasts } from "../contexts/PodcasterContext";

function Results() {
  const { podcasts } = usePodcasts();

  return <p>{podcasts.length}</p>;
}

export default Results;
