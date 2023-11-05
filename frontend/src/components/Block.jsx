import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";

async function getBlock(block) {
  const response = await fetch(`http://localhost:2525/block/${block}`);
  const data = await response.json();
  return data;
}

export function Block() {
  const params = useParams();
  const { isLoading, isError, data } = useQuery(
    ["block", params.block],
    getBlock
  );
  //access to server
  if (isloading) return <h1>Loading...</h1>;
  if (isError) return <h1>There is an error...</h1>;

  return (
    <div className="container">
      <h1>Block Information {params.block}</h1>
      {JSON.stringify(data, null, 4)}
      <Outlet />
    </div>
  );
}
