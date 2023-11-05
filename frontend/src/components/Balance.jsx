import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

export function Balance() {
  const params = useParams();
  return (
    <div className="container">
      <h1>Balance {params.address}</h1>
      <Outlet />
    </div>
  );
}
