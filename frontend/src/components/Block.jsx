import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ReactJson from "react-json-pretty";
import "react-json-pretty/themes/monikai.css"; // Import a theme for styling (you can choose a different theme)

async function getBlock(block) {
  const response = await fetch(
    `http://localhost:2525/block/${block.queryKey[1]}`
  );
  const data = await response.json();
  return data;
}

export function Block() {
  const params = useParams();
  const { isLoading, isError, data } = useQuery(
    ["block", params.block],
    getBlock
  );

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>There is an error...</h1>;

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
