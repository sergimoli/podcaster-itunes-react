import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "https://itunes.apple.com/";
const CORS_PROXY = "https://api.allorigins.win/get?url=";

const PodcasterContext = createContext();

const inititalState = {
  podcasts: [],
  isLoading: false,
  currentPodcast: {},
  error: "",
  episodes: [],
  currentEpisode: {},
};

function reducer(state, action) {
  console.log(action);
  console.log("action.payload", action.payload);
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "100podcasts/loaded":
      return {
        ...state,
        isLoading: false,
        podcasts: action.payload,
      };
    case "podcast/loaded":
      return {
        ...state,
        isLoading: false,
        currentPodcast: action.payload,
      };
    case "episodes/loaded":
      return {
        ...state,
        isLoading: false,
        episodes: action.payload,
      };

    case "episode/loaded":
      return {
        ...state,
        isLoading: false,
        currentEpisode: action.payload,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknow action type");
  }
}

function PodcastProvider({ children }) {
  const [
    { podcasts, isLoading, currentPodcast, error, episodes, currentEpisode },
    dispatch,
  ] = useReducer(reducer, inititalState);

  const [searchQuery, setSearchQuery] = useState("");

  const searchedPodCasts =
    searchQuery.length > 0
      ? podcasts.filter((podcast) =>
          `${podcast.name} ${podcast.author}`
            .toLowerCase()
            .includes(searchQuery.toLocaleLowerCase())
        )
      : podcasts;

  useEffect(() => {
    async function fetchPodcasts() {
      dispatch({ type: "loading" });

      //si ja està enmagatzemat en caché.

      try {
        //Recordem de posar-ho a 100 de nou...
        const res = await fetch(
          `${BASE_URL}/us/rss/toppodcasts/limit=5/genre=1310/json`
        );
        const data = await res.json();
        await data.feed.entry.forEach((element) => {
          let podcast2 = {
            id: element.id.attributes["im:id"],
            img: element["im:image"][2].label,
            name: element["im:name"].label,
            author: element["im:artist"].label,
            summary: element.summary
              ? element.summary.label
              : "No summary info",
          };
          podcasts.push(podcast2);
        });

        dispatch({ type: "100podcasts/loaded", payload: podcasts });
      } catch {
        dispatch({
          type: "rejected",
          payload:
            "There was an error loading those 100 podcasts... sorry man!",
        });
      }
    }
    fetchPodcasts();
  }, []);

  async function getPodcast(id) {
    dispatch({ type: "loading" });
    const filteredData = podcasts.filter((item) => item.id === id);
    console.log("filteredDataPodcasts", filteredData);
    dispatch({ type: "podcast/loaded", payload: filteredData });
  }

  async function getEpisode(id) {
    console.log("entro a getEpisode function");

    console.log("episodes found in getEpisodes:", episodes);

    dispatch({ type: "loading" });
    const filteredData = episodes.filter(
      (item) => item.id.toString() === id.toString()
    );
    console.log("filteredDataEpisodes", filteredData);
    dispatch({ type: "episode/loaded", payload: filteredData });
  }

  async function getEpisodes(id) {
    console.log("id", id);

    dispatch({ type: "loading" });

    const podcastId = id.toString();
    //const podcastId = "1535809341";

    const url = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=3`;
    try {
      const res = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
      );

      const data = await res.json();
      const parsedResult_datacontents = await JSON.parse(data.contents);
      console.log("parsedResult_datacontents", parsedResult_datacontents);

      episodes.splice(0, episodes.length); //we force to delete everything...

      await parsedResult_datacontents.results.forEach((element, index) => {
        if (index >= 1) {
          let episodes2 = {
            id: element.trackId,
            title: element.trackName,
            description: element.description,
            record: element.episodeUrl,
            duration: element.trackTimeMillis,
            date: element.releaseDate,
          };
          episodes.push(episodes2);
        }
      });
      console.log("episodes found", episodes);

      dispatch({ type: "episodes/loaded", payload: episodes });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the episodes from the podcast...",
      });
    }
  }

  return (
    <PodcasterContext.Provider
      value={{
        podcasts: searchedPodCasts,
        isLoading,
        currentPodcast,
        currentEpisode,
        error,
        getPodcast,
        getEpisodes,
        getEpisode,
        searchQuery,
        episodes,
        setSearchQuery,
      }}
    >
      {children}
    </PodcasterContext.Provider>
  );
}

function usePodcasts() {
  const context = useContext(PodcasterContext);
  if (context === undefined)
    throw new Error(
      "Podcast context is used outside the PodcastsProvider! Be careful!"
    );
  return context;
}

export { PodcastProvider, usePodcasts };
