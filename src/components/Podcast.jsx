import styles from "./Podcast.module.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { usePodcasts } from "../contexts/PodcasterContext";
import { useEffect } from "react";

function Podcast() {
  const { potcastId } = useParams();
  const { getPodcast, currentPodcast, isLoading } = usePodcasts();
  const navigate = useNavigate();

  // console.log(potcastId);

  useEffect(() => {
    getPodcast(potcastId);
  }, [potcastId]);

  // console.log("currentPodcast", currentPodcast);

  const handleGoBack = () => {
    if (location.pathname.includes("/episode")) {
      navigate(-1);
    }
  };

  return (
    <div className={styles.container} onClick={handleGoBack}>
      {currentPodcast[0] && !isLoading && (
        <>
          <div className={styles.img}>
            <img
              className={styles.picture}
              src={currentPodcast[0].img}
              alt={currentPodcast[0].name}
            />
          </div>
          <div>
            <p className={styles.name}>{currentPodcast[0].name}</p>
            <p className={styles.author}>by {currentPodcast[0].author}</p>
          </div>
          <div className={styles.separator} />
          <div>
            <p className={styles.descriptionlabel}>Description:</p>
            <p className={styles.description}>{currentPodcast[0].summary}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Podcast;
