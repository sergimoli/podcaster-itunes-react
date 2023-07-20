import { Link } from "react-router-dom";

function EpisodeItem({ episode }) {
  return (
    <div>
      <li>
        <Link to={`episode/${episode.id}`}>
          <h3>Id: {episode.id}</h3>

          <h3>title: {episode.title}</h3>
          <h3>date: {episode.date}</h3>
          <h3>duration: {episode.duration}</h3>
        </Link>
      </li>
    </div>
  );
}

export default EpisodeItem;
