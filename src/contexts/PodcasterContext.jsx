import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "https://itunes.apple.com/";

const PodcasterContext = createContext();

const inititalState = {
  podcasts: [],
  isLoading: false,
  currentPodcast: {},
  error: "",
};

function reducer(state, action) {
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
    //mirar si es necessari...
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
  const [{ podcasts, isLoading, currentPodcast, error }, dispatch] = useReducer(
    reducer,
    inititalState
  );

  useEffect(() => {
    async function fetchPodcasts() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(
          `${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`
        );
        const data = await res.json();
        dispatch({ type: "100podcasts/loaded", payload: data });
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
    try {
      const res = await fetch(
        `${BASE_URL}lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
      );
      const data = await res.json();
      dispatch({ type: "podcast/loaded", payload: data });
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
        podcasts,
        isLoading,
        currentPodcast,
        error,
        getPodcast,
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
