import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "./Header.jsx";
import "../index.css";

export function Home() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [lastBlockNumber, setLastBlockNumber] = useState(null);
  const [searchValue, setSearchValue] = useState(""); // Add searchValue state

  const submitForm = (data) => {
    console.log(data);
    // Check data and depending on the data, redirect to the matching route to get information
    if (data.data.length === 66) {
      navigate(`tx/${data.data}`);
    } else if (data.data.length === 42) {
      navigate(`balance/${data.data}`);
    } else if (/^\d+\.?\d*$/.test(data.data)) {
      navigate(`block/${data.data}`);
    }
  };

  const handleHomeClick = () => {
    // Reset the input field value when clicking the Home button
    setSearchValue(""); // Clear the search bar
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function fetchLastBlockNumber() {
      try {
        const response = await fetch(`http://localhost:2525/`);
        const data = await response.json();
        setLastBlockNumber(data); // Update the state with the last block number
      } catch (error) {
        console.error("Error fetching last block number:", error);
      }
    }

    fetchLastBlockNumber(); // Fetch the last block number when the component mounts
  }, []); // The empty dependency array ensures this effect runs once

  return (
    <div className="container">
      <Header />
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="page-title-home">Ethereum Explorer</div>
        <div className="search-container">
          <div className="search-label fs-4">Search by:</div>
          <input
            {...register("data")}
            className="search-input"
            placeholder="Enter block number, transaction hash, or address"
            value={searchValue} // Bind the input value to the searchValue state
            onChange={(e) => setSearchValue(e.target.value)} // Update the searchValue state
          />
          <button className="search-button mx-2">Go</button>
        </div>
      </form>
      <div className="last-block-container">
        <div className="last-block-label ">Current Ethereum Block Number:</div>
        {lastBlockNumber !== null ? (
          <p className="last-block-number">{lastBlockNumber}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button className="home-button" onClick={handleHomeClick}>
        Home
      </button>{" "}
      {/* Add a Home button */}
      <button className="back-button" onClick={handleGoBack}>
        Go Back
      </button>{" "}
      {/* Add a Go Back button */}
      <Outlet />
    </div>
  );
}
