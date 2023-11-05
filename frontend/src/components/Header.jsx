import { Logo } from "./Logo.jsx";
import React from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <div className="mt-4 d-flex justify-content-between">
      <div className="d-flex">
        <Logo></Logo>
        <p className="fs-4">Ethereum BlockTracker</p>
      </div>
      <div>
        <a href="#" className="mx-3 text-decoration-none ">
          {" "}
          Documentation{" "}
        </a>
        <a href="#" className="mx-3 text-decoration-none ">
          {" "}
          Support
        </a>
      </div>
    </div>
  );
}
