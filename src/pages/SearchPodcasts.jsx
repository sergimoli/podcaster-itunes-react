import { usePodcasts } from "../contexts/PodcasterContext";

function SearchPodcasts() {
  const { searchQuery, setSearchQuery } = usePodcasts();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Filter podcasts..."
    ></input>
  );
}

export default SearchPodcasts;
