import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ReactJson from "react-json-pretty";
import "react-json-pretty/themes/monikai.css"; // Import a theme for styling (you can choose a different theme)
import { getBlock } from "../api";

export function Block() {
  const params = useParams();
  const { isLoading, isError, data } = useQuery(
    ["block", params.block],
    getBlock
  );

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>There is an error...</h2>;

  return (
    <div className="container">
      <h1>Block Information {params.block}</h1>
      <div className="json-output">
        <ReactJson data={data} theme="monikai" />
      </div>
      <Outlet />
    </div>
  );
}
