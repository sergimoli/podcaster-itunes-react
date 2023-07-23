import DOMPurify from "dompurify";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { isOutdated } from "../helpers/dateUtils";

const BASE_URL = "https://itunes.apple.com/";
const CORS_PROXY = "https://api.allorigins.win/get?url=";

//this will be used for localstorage.
const allPodcastKey = "allpodcasts";

const currentDate = new Date().getTime();

const PodcasterContext = createContext();

const inititalState = {
  podcasts: [],
  isLoading: false,
  currentPodcast: {},
  error: "",
  episodes: [],
  currentEpisode: {},
  trackCount: 0,
};

function reducer(state, action) {
  // console.log(action);
  // console.log("action.payload", action.payload);
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

    case "episodes/trackcount":
      return {
        ...state,
        isLoading: false,
        trackCount: action.payload,
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
    {
      podcasts,
      isLoading,
      currentPodcast,
      error,
      episodes,
      currentEpisode,
      trackCount,
    },
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

      if (
        !localStorage.getItem(allPodcastKey) ||
        isOutdated(JSON.parse(localStorage.getItem(allPodcastKey)).date)
      ) {
        try {
          // console.log("data from the API...");

          const res = await fetch(
            `${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`
          );
          const data = await res.json();
          await data.feed.entry.forEach((element) => {
            let podcast2 = {
              id: element.id.attributes["im:id"],
              img: element["im:image"][2].label,
              name: element["im:name"].label,
              author: element["im:artist"].label,
              summary: element.summary
                ? DOMPurify.sanitize(element.summary.label)
                : "No summary info",
            };
            podcasts.push(podcast2);
          });

          saveDataToLocalStorage(allPodcastKey, podcasts);

          dispatch({ type: "100podcasts/loaded", payload: podcasts });
        } catch {
          dispatch({
            type: "rejected",
            payload:
              "There was an error loading those 100 podcasts... sorry man!",
          });
        }
      } else {
        getDataFromLocalStorage(allPodcastKey, "100podcasts/loaded");
      }
    }

    fetchPodcasts();
  }, []);

  async function saveDataToLocalStorage(localStorageName, storage, trackCount) {
    try {
      // console.log("save data to localstorage", localStorageName, storage);

      localStorage.removeItem(localStorageName); //we force to delete it.
      let dataToStorage = {
        value: storage,
        date: currentDate,
        trackCount: trackCount,
      };
      localStorage.setItem(localStorageName, JSON.stringify(dataToStorage));
    } catch {
      dispatch({
        type: "rejected",
        payload: "error saving data in localstorage",
      });
    }
  }
  async function getDataFromLocalStorage(localStorageName, dispatchAction) {
    // console.log(
    //   "data get from localstorage!",
    //   localStorageName,
    //   dispatchAction
    // );
    const getData = await JSON.parse(localStorage.getItem(localStorageName))
      .value;
    dispatch({ type: dispatchAction, payload: getData });
  }

  async function getPodcast(id) {
    dispatch({ type: "loading" });
    const filteredData = podcasts.filter((item) => item.id === id);
    // console.log("filteredDataPodcasts", filteredData);
    dispatch({ type: "podcast/loaded", payload: filteredData });
  }

  async function getEpisode(id) {
    // console.log("episodes found in getEpisodes:", episodes);

    dispatch({ type: "loading" });
    const filteredData = await episodes.filter(
      (item) => item.id.toString() === id.toString()
    );
    // console.log("filteredDataEpisodes", filteredData);
    dispatch({ type: "episode/loaded", payload: filteredData });
  }

  async function getEpisodes(id) {
    // console.log("id", id);

    const podcastkey = "podcast" + id;

    dispatch({ type: "loading" });

    const podcastId = id.toString();

    if (
      !localStorage.getItem(podcastkey) ||
      isOutdated(JSON.parse(localStorage.getItem(podcastkey)).date)
    ) {
      const url = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
        );

        const data = await res.json();
        let trackCount = 0;
        const parsedResult_datacontents = await JSON.parse(data.contents);
        // console.log("parsedResult_datacontents", parsedResult_datacontents);

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
          } else {
            trackCount = element.trackCount;
          }
        });
        await saveDataToLocalStorage(podcastkey, episodes, trackCount);
        // console.log("episodes saved in localstorage", episodes);
        // console.log("trackount is: ", trackCount);

        dispatch({ type: "episodes/loaded", payload: episodes });
      } catch {
        dispatch({
          type: "rejected",
          payload:
            "There was an error loading the episodes from the podcast...",
        });
      }
    } else {
      await getDataFromLocalStorage(podcastkey, "episodes/loaded");
    }
  }

  async function getTrackCount(id) {
    dispatch({ type: "loading" });

    try {
      const podcastkey = "podcast" + id;
      const trackCount = await JSON.parse(localStorage.getItem(podcastkey))
        .trackCount;
      // console.log("entro a veure quants tracks tinc, collons", trackCount);
      dispatch({ type: "episodes/trackcount", payload: trackCount });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error getting the track",
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
        getTrackCount,
        trackCount,
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
