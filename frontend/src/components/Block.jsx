import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ReactJson from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { getBlock } from "../api";
import { Link } from "react-router-dom";
import "../index.css";

export function Block() {
  const params = useParams();
  const { isLoading, isError, data } = useQuery(
    ["block", params.block],
    getBlock
  );

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorIndicator />;

  return (
    <div>
      <div className="block-container">
        {data.transactions ? (
          data.transactions.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Transaction Hash List</th>
                </tr>
              </thead>
              <tbody>
                {data.transactions && data.transactions.length > 0 ? (
                  data.transactions.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/tx/${item}`}>{item}</Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No transactions available</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <p>No transactions available</p>
          )
        ) : (
          <p>Loading transactions...</p>
        )}
      </div>
      <div className="block-container">
        <div className="page-title-block">Block Information</div>
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
