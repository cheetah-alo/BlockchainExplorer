import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <div className="container">
      <h1>Chain Block Explorer</h1>
      <Outlet />
    </div>
  );
}
