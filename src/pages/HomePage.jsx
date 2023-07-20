import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";
import PodcatList from "../components/PodcatList";

function HomePage() {
  return (
    <div>
      <PageNav />
      {/* <Outlet /> */}
      <PodcatList />
    </div>
  );
}

export default HomePage;
