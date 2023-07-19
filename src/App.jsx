import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PodcastProvider } from "./contexts/PodcasterContext";
import HomePage from "./pages/HomePage";
import Podcast from "./components/Podcast";
import PodcatList from "./components/PodcatList";
import Episode from "./components/Episode";
import PageNotFound from "./pages/PageNotFound";
import { useEffect, useState } from "react";

function App() {
  return (
    <PodcastProvider>
      <BrowserRouter>
        {/* a fer! els podcast list/podcas/episode haurien d'estar englobats en el principal. */}
        <Routes>
          <Route index element={<HomePage />} />
          <Route index element={<Navigate replace to="podcast" />} />
          <Route path="podcast" element={<PodcatList />} />
          <Route path="podcast/:id" element={<Podcast />} />
          <Route path="podcast/:id/episode/:id" element={<Episode />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </PodcastProvider>
  );
}

export default App;
