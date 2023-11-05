import { Outlet, useParams } from "react-router-dom";

export function Block() {
  const params = useParams();
  return (
    <div className="container">
      <h1>Block Information {params.block}</h1>
      <Outlet />
    </div>
  );
}
