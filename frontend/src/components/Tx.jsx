import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ReactJson from "react-json-pretty";
import "react-json-pretty/themes/monikai.css"; // Import a theme for styling (you can choose a different theme)
import { getTransaction } from "../api";
import { Link } from "react-router-dom";
import "../index.css";

export function Tx() {
  const params = useParams();
  const { isLoading, isError, data } = useQuery(
    ["tx", params.tx],
    getTransaction
  );

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorIndicator />;

  return (
    <div className="tx-container">
      <h2 className="page-title-tx">Transaction Details</h2>
      <div className="tx-details">
        <table className="table">
          <tbody>
            <tr>
              <th>Block Number:</th>
              <td>
                <Link to={`/block/${data.blockNumber}`}>
                  {data.blockNumber}
                </Link>
              </td>
            </tr>
            <tr>
              <th>From:</th>
              <td>
                <Link to={`/balance/${data.from}`}>{data.from}</Link>
              </td>
            </tr>
            <tr>
              <th>To:</th>
              <td>
                <Link to={`/balance/${data.to}`}>{data.to}</Link>
              </td>
            </tr>
            <tr>
              <th>Value:</th>
              <td>{data.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="block-container">
        <h1 className="page-title">Block Information</h1>
        <div className="block-content">
          <ReactJson data={data} theme="monikai" />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

function LoadingIndicator() {
  return <div className="loading-indicator">Loading...</div>;
}

function ErrorIndicator() {
  return <div className="error-indicator">There was an error...</div>;
}
