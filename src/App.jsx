import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PodcastProvider } from "./contexts/PodcasterContext";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import PodcastDetail from "./components/PodcastDetail";
import EpisodeDetail from "./components/EpisodeDetail";
import ParentComponent from "./components/ParentComponent";

function App() {
  return (
    // <ParentComponent />
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
