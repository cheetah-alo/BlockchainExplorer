import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ReactJson from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { getBalance } from "../api";
import "../index.css";

export function Balance() {
  const params = useParams();
  const { isLoading, isError, data } = useQuery(
    ["address", params.address],
    getBalance
  );

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorIndicator />;

  return (
    <div className="balance-container">
      <h1 className="page-title-balance">Balance for the Account</h1>
      <div className="balance-content">
        <ReactJson data={data} theme="manokai" />
      </div>
      <Outlet />
    </div>
  );
}

function LoadingIndicator() {
  return <div className="loading-indicator">Loading...</div>;
}

function ErrorIndicator() {
  return <div className="error-indicator">There was an error...</div>;
}
