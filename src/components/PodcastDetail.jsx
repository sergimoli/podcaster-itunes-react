import styles from "./PodcastDetail.module.css";
import EpisodesView from "./EpisodesView";
import PageNav from "./PageNav";
import Podcast from "./Podcast";

function PodcastDetail() {
  return (
    <div className={styles.container}>
      <section className={styles.pageNav}>
        <PageNav />
      </section>
      <section className={styles.podcast}>
        <Podcast />
      </section>
      <section className={styles.episodeview}>
        <EpisodesView />
      </section>
    </div>
  );
}

export default PodcastDetail;
