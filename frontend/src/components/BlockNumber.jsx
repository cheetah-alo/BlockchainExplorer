import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import ReactJson from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { getLastBlockNumber } from "../api";

export function BlockNumber() {
  const { data, error, isLoading } = useQuery(
    "lastBlockNumber",
    getLastBlockNumber
  );

  return (
    <div className="container">
      <h1>The Last Block Number</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="json-output">
          <ReactJson data={data} theme="monikai" />
        </div>
      )}
      <Outlet />
    </div>
  );
}
