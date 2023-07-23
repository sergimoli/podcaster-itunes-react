import { useParams } from "react-router-dom";
import styles from "./HeaderEpisodesNum.module.css";
import { usePodcasts } from "../contexts/PodcasterContext";
import { useEffect } from "react";
function HeaderEpisodesNum() {
  const { potcastId } = useParams();
  const { getTrackCount, trackCount, isLoading } = usePodcasts();

  useEffect(() => {
    async function GetIt() {
      await getTrackCount(potcastId);
    }
    GetIt();
  }, [potcastId]);

  return (
    <div className={styles.container}>
      {!isLoading && <p className={styles.title}>Episodes: {trackCount}</p>}
    </div>
  );
}

export default HeaderEpisodesNum;
