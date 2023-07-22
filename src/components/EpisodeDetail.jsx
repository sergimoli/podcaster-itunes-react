import styles from "./EpisodeDetail.module.css";
import EpisodeRecord from "./EpisodeRecord";
import PageNav from "./PageNav";
import Podcast from "./Podcast";

function EpisodeDetail() {
  return (
    <div className={styles.container}>
      <section className={styles.pageNav}>
        <PageNav />
      </section>
      <section className={styles.podcast}>
        <Podcast />
      </section>
      <section className={styles.episodeRecord}>
        <EpisodeRecord />
      </section>
    </div>
  );
}

export default EpisodeDetail;
