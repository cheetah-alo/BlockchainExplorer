import { Outlet } from "react-router-dom";

export function BlockNumber() {
  return (
    <div className="container">
      <h1>BlockNumber</h1>
      <Outlet />
    </div>
  );
}
