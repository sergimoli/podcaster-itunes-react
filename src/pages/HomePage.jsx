import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";

function HomePage() {
  return (
    <div>
      <PageNav />
      <Outlet />
    </div>
  );
}

export default HomePage;
