import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ReactJson from "react-json-pretty";
import "react-json-pretty/themes/monikai.css"; // Import a theme for styling (you can choose a different theme)
import { getBalance } from "../api";

export function Balance() {
  const params = useParams();
  const { isLoading, isError, data } = useQuery(
    ["address", params.address],
    getBalance
  );
  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>There is an error...</h2>;
  return (
    <div className="container">
      <h1>Balance {params.address}</h1>
      <div className="json-output">
        <ReactJson data={data} theme="monikai" />
      </div>
      <Outlet />
    </div>
  );
}
