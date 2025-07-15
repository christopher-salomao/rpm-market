import { Outlet } from "react-router-dom";
import Header from "../Header";

export function Layout() {
  return (
    <>
      <Header />
      <div className="grow">
        <Outlet />
      </div>
    </>
  );
}
