import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

export function Tx() {
  const params = useParams();
  return (
    <div className="container">
      <h1>Transaction {params.tx}</h1>
      <Outlet />
    </div>
  );
}
