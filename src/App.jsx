import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PodcastProvider } from "./contexts/PodcasterContext";
import HomePage from "./pages/HomePage";
import Podcast from "./components/Podcast";
import PodcatList from "./components/PodcatList";
import Episode from "./components/Episode";
import PageNotFound from "./pages/PageNotFound";
import { useEffect } from "react";
import PodcastDetail from "./components/PodcastDetail";
import EpisodeDetail from "./components/EpisodeDetail";

function App() {
  return (
    <PodcastProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />

          <Route path="/podcast/:potcastId" element={<PodcastDetail />} />
          <Route
            path="podcast/:potcastId/episode/:episodeid"
            element={<EpisodeDetail />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </PodcastProvider>
  );
}

export default App;
