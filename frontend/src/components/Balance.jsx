import { Outlet } from "react-router-dom";

export function Balance() {
  return (
    <div className="container">
      <h1>Balance</h1>
      <Outlet />
    </div>
  );
}
