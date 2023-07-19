import styles from "./PodcatList.module.css";
import { usePodcasts } from "../contexts/PodcasterContext";
import Results from "../pages/Results";
import SearchPodcasts from "../pages/SearchPodcasts";
import PodcastItem from "./PodcastItem";

function PodcatList() {
  const { podcasts, isLoading } = usePodcasts();
  console.log("podcasts", podcasts);

  if (!podcasts.length) return <h1>no podcasts found...</h1>;

  return (
    <>
      <Results />
      <SearchPodcasts />
      <ul className={styles.container}>
        {podcasts.map((podcast) => (
          <PodcastItem podcast={podcast} key={podcast.id} />
        ))}
      </ul>
    </>
  );
}

export default PodcatList;
