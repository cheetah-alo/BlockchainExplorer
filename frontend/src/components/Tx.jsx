import { Outlet } from "react-router-dom";

export function Tx() {
  return (
    <div className="container">
      <h1>Transaction</h1>
      <Outlet />
    </div>
  );
}
