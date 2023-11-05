import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ReactJson from "react-json-pretty";
import "react-json-pretty/themes/monikai.css"; // Import a theme for styling (you can choose a different theme)
import { getTransaction } from "../api";

export function Tx() {
  const params = useParams();
  const { isLoading, isError, data } = useQuery(
    ["tx", params.tx],
    getTransaction
  );
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>There is an error...</h1>;

  return (
    <div className="container">
      <h1>Transaction {params.tx}</h1>
      <div className="json-output">
        <ReactJson data={data} theme="monikai" />
      </div>
      <Outlet />
    </div>
  );
}
