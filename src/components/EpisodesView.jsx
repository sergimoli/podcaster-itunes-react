import EpisodeList from "./EpisodeList";
import styles from "./EpisodesView.module.css";
import HeaderEpisodesNum from "./HeaderEpisodesNum";
function EpisodesView() {
  return (
    <div>
      <section>
        <HeaderEpisodesNum />
      </section>
      <section>
        <EpisodeList />
      </section>
    </div>
  );
}

export default EpisodesView;
