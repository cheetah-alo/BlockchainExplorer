import { Outlet } from "react-router-dom";

export function Block() {
  return (
    <div className="container">
      <h1>Block Information</h1>
      <Outlet />
    </div>
  );
}
