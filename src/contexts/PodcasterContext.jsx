import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "https://itunes.apple.com/";
const CORS_PROXY = "https://api.allorigins.win/get?url=";
// fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://wikipedia.org')}`)
// fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://wikipedia.org')}`)

const PodcasterContext = createContext();

const inititalState = {
  podcasts: [],
  isLoading: false,
  currentPodcast: {},
  error: "",
  episodes: [],
};

function reducer(state, action) {
  // console.log("hello");
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
    console.log("hello");
    dispatch({ type: "loading" });

    const url = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;
    try {
      const res = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
      );

      console.log("fufdsaf");
      const data = await res.json();
      const parsedResult_datacontents = await JSON.parse(data.contents);
      console.log(parsedResult_datacontents);

      await parsedResult_datacontents.results.forEach((element, index) => {
        // console.log("hello");
        if (index >= 1) {
          let episodes2 = {
            id: element.id,
            title: element.collectionName,
            description: element.description,
            record: element.episodeUrl,
            duration: element.trackTimeMillis,
            date: element.releaseDate,
            mp3: element.episodeUrl,
          };
          episodes.push(episodes2);
        }
      });
      console.log("episodes found", episodes);

      dispatch({ type: "podcast/loaded", payload: parsedResult_datacontents });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the podcast...",
      });
    }
  }

  return (
    <PodcasterContext.Provider
      value={{
        // podcasts,
        podcasts: searchedPodCasts,
        isLoading,
        currentPodcast,
        error,
        getPodcast,
        searchQuery,
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
