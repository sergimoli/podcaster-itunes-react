import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PodcastProvider } from "./contexts/PodcasterContext";
import HomePage from "./pages/HomePage";
import Podcast from "./components/Podcast";
import PodcatList from "./components/PodcatList";
import Episode from "./components/Episode";

function App() {
  return (
    <PodcastProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route index element={<Navigate replace to="podcast" />} />
          <Route path="podcast" element={<PodcatList />} />
          <Route path="podcast/:id" element={<Podcast />} />
          <Route path="podcast/:id/episode/:id" element={<Episode />} />
        </Routes>
      </BrowserRouter>
    </PodcastProvider>
  );
}

export default App;
