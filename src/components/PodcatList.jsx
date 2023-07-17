import { usePodcasts } from "../contexts/PodcasterContext";

function PodcatList() {
  const { podcasts, isLoading } = usePodcasts();
  console.log("podcasts", podcasts);

  return <div>PodcastList</div>;
}

export default PodcatList;
