import React from "react";
import { render } from "@testing-library/react";
// import Results from "./Results";
import {
  PodcastProvider,
  PodcasterContext,
} from "../contexts/PodcasterContext";
import Results from "../pages/Results";
import PageNav from "./PageNav";

// TODO!
//it should be similar that what it has been done for 'Results.jsx' ...

// const mockPodcasts = {
//   podcasts: new Array(100),
// };

// test("should display 100 podcasts in the result", () => {
//   const { getByText } = render(
//     <PodcasterContext.Provider value={mockPodcasts}>
//       <PageNav />
//     </PodcasterContext.Provider>
//   );

//   //   const resultElement = getByText("100");
//   //   expect(resultElement).toBeInTheDocument;
// });
