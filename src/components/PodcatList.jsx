import styles from "./PodcatList.module.css";
import { usePodcasts } from "../contexts/PodcasterContext";
import Results from "../pages/Results";
import SearchPodcasts from "../pages/SearchPodcasts";
import PodcastItem from "./PodcastItem";

function PodcatList() {
  const { podcasts, isLoading } = usePodcasts();
  console.log("podcasts", podcasts);

  if (!podcasts.length && isLoading) return <h1>no podcasts found...</h1>;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.results}>
          <Results />
        </div>
        <div className={styles.searchContainer}>
          <SearchPodcasts />
        </div>
      </div>

      <div>
        <ul className={styles.ul}>
          {podcasts.map((podcast) => (
            <PodcastItem podcast={podcast} key={podcast.id} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default PodcatList;
