import { Link } from "react-router-dom";
import styles from "./PageNav.module.css";
import Spinner from "./Spinner";
function PageNav() {
  return (
    <>
      <div>
        <Link to="/">
          <span className={styles.nav}>Podcaster</span>
        </Link>
      </div>
      <div>
        <Spinner />
      </div>
    </>
  );
}

export default PageNav;
