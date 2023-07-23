import { Link } from "react-router-dom";
import styles from "./PageNav.module.css";
import Spinner from "./Spinner";
import { usePodcasts } from "../contexts/PodcasterContext";
function PageNav() {
  const { isLoading } = usePodcasts();

  return (
    <div className={styles.navContainer}>
      <div className={styles.navLeft}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className={styles.nav}>Podcaster</span>
        </Link>
      </div>
      <div className={styles.navRight}>
        {isLoading && <Spinner />}
        {/* <Spinner /> */}
      </div>
    </div>
  );
}

export default PageNav;
